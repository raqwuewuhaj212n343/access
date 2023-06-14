/**
 * @authors: [, ]
 * @reviewers: []
 * @auditors: []
 * @bounties: []
 * @deployments: []
 * SPDX-License-Identifier: MIT
 */
pragma solidity ^0.8.9;

import "./interfaces/IArbitrable.sol";
import "./interfaces/IEvidence.sol";

contract Escrow is IArbitrable, IEvidence {
    //////////////////////////////// MODIFIERS ///////////////////////////////    
    modifier validTransaction(uint256 _txID){
        uint lastID = txs.length-1;
        require( _txID >= 0 && _txID <= lastID, "Invalid Transaction Index" );
        _;
    }

    modifier onlyOwner() {
        require(owner == msg.sender, "Only Owner of the contract can access this function");
        _;
    }

    modifier onlyPayer(uint256 _txID) {
        require(msg.sender == txs[_txID].payer, "Only Payer can access this function");
        _;
    }

    modifier onlyPayee(uint256 _txID) {
        require(msg.sender == txs[_txID].payee, "Only Payee can access this function");
        _;
    }    

    modifier onlyParties(uint256 _txID) {
        require(msg.sender == txs[_txID].payee || msg.sender == txs[_txID].payer, "Only Payer or Payee can access this function");
        _;
    }

    modifier onlyArbitrator(uint256 _disputeID) {
        require(msg.sender == address(txs[disputeIDtoTXID[_disputeID]].arbitrator), "Only Arbitrator can access this function");
        _;
    }

    modifier onlyPartiesAndArbitrator(uint256 _txID) {
        require(msg.sender == address(txs[_txID].arbitrator) ||
                msg.sender == txs[_txID].payee || msg.sender == txs[_txID].payer, "Only Arbitrator and Parties can access this function");
        _;
    }

    modifier onlyBalancedDistributions(uint256 _txID) {
        require(uint8(txs[_txID].payerFundDistribution) + uint8(txs[_txID].payeeFundDistribution) == uint8(FundsDistribution.fullAmount), 
                "Parties should agree on the distribution of funds");
        _;
    }

    modifier validEvidence(bytes memory _evidence) {
        require(_evidence[0] != 0x00, "IPFS Hash for File is not valid");
        _;
    }

    ////////////////////////////////// EVENTS ///////////////////////////////////
    event FundsReleased(uint256 indexed _transactionID);
    event FundsRefunded(uint256 indexed _transactionID);
    event FundsReclaimed(uint256 indexed _transactionID, uint256 indexed _disputeID);
    event FundsDistributionSet(uint256 indexed _transactionID, uint8 indexed _payerDistribution, uint8 indexed _payeeDistribution);
    event FundsDistributionReseted(uint256 indexed _transactionID);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event NewTransaction(uint256 indexed _transactionID);

    //////////////////////////////// DEFINITIONS ///////////////////////////////    
    uint16 public payeeFee = 500;
    uint16 public payerFee = 500;
    uint16 immutable private maxFeePercentge = 1000; //10%
    uint16 immutable private minFeePercentage = 0; //0%
    
    uint immutable  private toWEI  = 10e18;
    uint16 immutable private scaledPercentage = 10_000; // 2 decimal place percentage
    uint24 immutable private maxArbitrationFeeDepositPeriod = 7 days;
    uint24 immutable private minArbitrationFeeDepositPeriod = 2 days;
    
    uint private revenue;
    address payable private owner;

    enum Status {
        Initiated,
        Concluded,
        PartiallyPaid,
        PartiallyRefunded,
        DisputeRequested,
        DisputeOfficiated,
        DisputeResolved
    }
    
    uint constant numberOfrefundOptions = 3;
    enum RulingOptions {
        RefusedToArbitrate,
        refundPayer,
        refundPayee,
        refundBoth
    }

    enum FundsDistribution {
        nothing,
        tenPercent,
        twentyPercent,
        thirtyPercent,
        fortyPercent,
        fiftyPercent,
        sixtyPercent,
        seventyPercent,
        eightyPercent,
        nightyPercent,
        fullAmount
    }

    struct TX {
        address payable payer;
        address payable payee;
        IArbitrator arbitrator;
        Status status;
        uint value;
        uint disputeID;
        uint createdAt;
        uint arbitrationFeeDepositPeriod;
        uint DisputeRequestedAt;
        uint payerFeeDeposit;
        uint payeeFeeDeposit;
        bool payerRequestedDispute;
        bool payeeRequestedDispute;
        bytes[2] requiredFfiles; //Identifier to files. Idx 0: Requirements. Idx 1: Dispute Resolution Agreement
        bytes[] payerFiles;
        bytes[] payeeFiles;
        FundsDistribution payerFundDistribution;
        FundsDistribution payeeFundDistribution;
    }

    TX[] private txs;
    mapping(uint => uint) disputeIDtoTXID;
    
    //////////////////////////////// MAIN ESCROW FUNCTIONS ///////////////////////////////    
    constructor() {
        owner = payable(msg.sender);  
    }

    function newTransaction(
        address payable _payee,
        IArbitrator _arbitrator,
        bytes memory requirements,
        bytes memory disputeResolutionAgreement,
        uint _arbitrationFeeDepositPeriod)
    public payable returns (uint txID) {
        bytes[2] memory requiredFiles;
        requiredFiles[0] = requirements;
        requiredFiles[1] = disputeResolutionAgreement;

        txs.push(
            TX({
                payer: payable(msg.sender),
                payee: _payee,
                arbitrator: _arbitrator,
                status: Status.Initiated,
                value: msg.value,
                disputeID: 0,
                createdAt: block.timestamp,
                arbitrationFeeDepositPeriod: _arbitrationFeeDepositPeriod,
                DisputeRequestedAt: 0,
                payerFeeDeposit: 0,
                payeeFeeDeposit: 0,
                payerRequestedDispute: false,
                payeeRequestedDispute: false,
                requiredFfiles: requiredFiles,
                payerFiles: new bytes[](0),
                payeeFiles: new bytes[](0),
                payerFundDistribution: FundsDistribution.nothing,
                payeeFundDistribution: FundsDistribution.fullAmount
            })
        );

        txID = txs.length - 1;
        emit MetaEvidence(txID, string(requirements));
        emit MetaEvidence(txID, string(disputeResolutionAgreement));
        emit NewTransaction(txID);
    }

    function payerReleaseFunds(uint256 _txID, bytes memory _evidence) external validTransaction(_txID) onlyPayer(_txID) onlyBalancedDistributions(_txID) {
        TX storage transaction = txs[_txID];

        require(transaction.status == Status.Initiated || transaction.status == Status.PartiallyRefunded || transaction.status == Status.DisputeRequested,
                "Only transactions at the Initiated state, Partially Refunded or with Dispute Requested can release funds");

        if (transaction.payeeRequestedDispute && transaction.payeeFeeDeposit > 0){
            (bool result, ) = transaction.payee.call{value: (transaction.payeeFeeDeposit)}("");
            require(result == true, "Failed to send funds for Arbitration Request to Payee");
            transaction.payeeFeeDeposit = 0;
        }

        if ((transaction.payerFundDistribution == FundsDistribution.nothing) && (transaction.payeeFundDistribution == FundsDistribution.fullAmount)) {
            require(sendCompleteFundsTo(_txID, transaction.payee), "Failed to send funds to Payee");
            transaction.status = Status.Concluded;
        } else {
            require(sendPartialFundsTo(_txID, transaction.payee), "Failed to send funds to Payee");
            
            if(transaction.status == Status.Initiated || transaction.status == Status.DisputeRequested) {
                transaction.status = Status.PartiallyRefunded;
            } else {
                transaction.status = Status.Concluded;
            }
        }

        if (_evidence[0] != 0x00) {
            transaction.payerFiles.push(_evidence);
            emit Evidence(transaction.arbitrator, _txID, msg.sender, string(_evidence));
        }

        if (transaction.status == Status.Concluded) emit FundsReleased(_txID);
    }

    function payeeReleaseFunds(uint _txID, bytes memory _evidence) external validTransaction(_txID) onlyPayee(_txID) onlyBalancedDistributions(_txID) {
        TX storage transaction = txs[_txID];

        require(transaction.status == Status.Initiated || transaction.status == Status.PartiallyPaid || transaction.status == Status.DisputeRequested,
                "Only transactions at the Initiated state, Partially Refunded or with Dispute Requested can release funds");

        if (transaction.payerRequestedDispute && transaction.payerFeeDeposit > 0){
            (bool result, ) = transaction.payer.call{value: (transaction.payerFeeDeposit)}("");
            require(result == true, "Failed to send funds for Arbitration Request to Payer");
            transaction.payerFeeDeposit = 0;
        }

        if ((transaction.payerFundDistribution == FundsDistribution.nothing) && (transaction.payeeFundDistribution == FundsDistribution.fullAmount)) {
            require(sendCompleteFundsTo(_txID, transaction.payer), "Failed to send funds to Payer");
            transaction.status = Status.Concluded;
        } else {
            require(sendPartialFundsTo(_txID, transaction.payer), "Failed to send funds to Payer");
            if(transaction.status == Status.Initiated || transaction.status == Status.DisputeRequested) {
                transaction.status = Status.PartiallyRefunded;
            } else {
                transaction.status = Status.Concluded;
            }
        }
        
        if (_evidence[0] != 0x00) {
            transaction.payeeFiles.push(_evidence);
            emit Evidence(transaction.arbitrator, _txID, msg.sender, string(_evidence));
        }

        if (transaction.status == Status.Concluded) emit FundsRefunded(_txID);
    }

    function setFundsDistributionByParties(uint256 _txID, uint fundDistributionForParty) external validTransaction(_txID) onlyParties(_txID) {
        TX storage transaction = txs[_txID];
        address user = msg.sender;
        FundsDistribution fundDistributionEnum = FundsDistribution(fundDistributionForParty / 10);

        require((fundDistributionForParty % 10 == 0) && 
                (fundDistributionEnum > FundsDistribution.nothing && fundDistributionEnum < FundsDistribution.fullAmount),
                "Only values from 10 to 90 in steps of 10 are accepted");
        require(transaction.status == Status.Initiated || transaction.status == Status.DisputeRequested, "Invalid State to set funds distribution");
        
        if (((transaction.payerFundDistribution != FundsDistribution.nothing) && (transaction.payeeFundDistribution != FundsDistribution.fullAmount)) && 
           (uint8(transaction.payerFundDistribution) + uint8(transaction.payeeFundDistribution) == uint8(FundsDistribution.fullAmount))) {
            transaction.payerFundDistribution = FundsDistribution.nothing;
            transaction.payeeFundDistribution = FundsDistribution.fullAmount;

            emit FundsDistributionReseted(_txID);
        }

        if (user == transaction.payer) {
            transaction.payerFundDistribution = fundDistributionEnum;
        }

        if (user == transaction.payee) {
            transaction.payeeFundDistribution = fundDistributionEnum;
        }

        if (((transaction.payerFundDistribution != FundsDistribution.nothing) && (transaction.payeeFundDistribution != FundsDistribution.fullAmount)) && 
           (uint8(transaction.payerFundDistribution) + uint8(transaction.payeeFundDistribution) != uint8(FundsDistribution.fullAmount))) {
            transaction.payerFundDistribution = FundsDistribution.nothing;
            transaction.payeeFundDistribution = FundsDistribution.fullAmount;
            revert("Values should sum up to 100%");
        } else if (uint8(transaction.payerFundDistribution) + uint8(transaction.payeeFundDistribution) == uint8(FundsDistribution.fullAmount)) {
            emit FundsDistributionSet(_txID, uint8(transaction.payerFundDistribution)*10, uint8(transaction.payeeFundDistribution)*10);
        }
    }

    function setFundsDistributionByArbitrator(uint256 _disputeID, uint8 fundDistributionForPayer, uint8 fundDistributionForPayee) external onlyArbitrator(_disputeID) {
        uint txID = disputeIDtoTXID[_disputeID];
        TX storage transaction = txs[txID];

        FundsDistribution fundDistributionEnumPayer = FundsDistribution(fundDistributionForPayer / 10);
        FundsDistribution fundDistributionEnumPayee = FundsDistribution(fundDistributionForPayee / 10);

        require(transaction.status == Status.DisputeOfficiated, 
                "Invalid State for Arbitrator to set funds distribution");
        require((fundDistributionForPayee % 10 == 0) && 
                (fundDistributionEnumPayer >= FundsDistribution.nothing && fundDistributionEnumPayer <= FundsDistribution.fullAmount),
                "Only values from 0 to 100 in steps of 10 are accepted for Payer");
        require((fundDistributionForPayer % 10 == 0) && 
                (fundDistributionEnumPayee >= FundsDistribution.nothing && fundDistributionEnumPayee <= FundsDistribution.fullAmount),
                "Only values from 0 to 100 in steps of 10 are accepted for Payee");                
        require(uint8(fundDistributionEnumPayer) + uint8(fundDistributionEnumPayee) == uint8(FundsDistribution.fullAmount),
                "Percentages of distribution must sum up to 100%");

        transaction.payerFundDistribution = fundDistributionEnumPayer;
        transaction.payerFundDistribution = fundDistributionEnumPayee;

        emit FundsDistributionSet(txID, uint8(transaction.payerFundDistribution) * 10, uint8(transaction.payeeFundDistribution) * 10);
    }

    function arbitrationRequest(uint256 _txID, bytes memory disputeJustification) external payable validTransaction(_txID) onlyParties(_txID) {        
        TX storage transaction = txs[_txID];
        uint256 toleranceFeeDeposit = 100; //WEI 

        address user = msg.sender;
        uint disputeFeeDeposit = msg.value;
        uint arbitrationCost = getArbitrationCost(_txID);
        
        require(transaction.status == Status.Initiated || transaction.status == Status.DisputeRequested,
                "Invalid State to carry arbitration");
        if (arbitrationCost > 0 && arbitrationCost >= toleranceFeeDeposit) require(disputeFeeDeposit >= arbitrationCost - toleranceFeeDeposit, "Deposit too low to start Arbitration");
        require(disputeFeeDeposit <= arbitrationCost + toleranceFeeDeposit,
                "Deposit too high to start Arbitration");

        if(user == transaction.payer){
            if(!transaction.payerRequestedDispute){
                transaction.payerFeeDeposit = disputeFeeDeposit;
                transaction.payerRequestedDispute = true;
            } else {
                revert("Payer has already paid and requested for an Arbitration");
            }
        }else if(user == transaction.payee){
            if(!transaction.payeeRequestedDispute){
                transaction.payeeFeeDeposit = disputeFeeDeposit;
                transaction.payeeRequestedDispute = true;
            } else {
                revert("Payee had already paid and requested for an Arbitration");
            }
        }

        if (disputeJustification[0] != 0x00) {           
            transaction.payeeFiles.push(disputeJustification);
            emit Evidence(transaction.arbitrator, _txID, msg.sender, string(disputeJustification));
        }
        
        if(transaction.status == Status.Initiated) {
            transaction.DisputeRequestedAt = block.timestamp;
            transaction.status = Status.DisputeRequested;
        }

        if((transaction.payerRequestedDispute && transaction.payeeRequestedDispute) ||
          ((transaction.payerRequestedDispute || transaction.payeeRequestedDispute) && remainingTimeToDepositArbitrationFee(_txID) == 0)){
            transaction.payerFundDistribution = FundsDistribution.nothing;
            transaction.payeeFundDistribution = FundsDistribution.fullAmount;

            if (transaction.payerFeeDeposit + transaction.payeeFeeDeposit > 0) {
                (bool result, ) = address(transaction.arbitrator).call{value: transaction.payerFeeDeposit + transaction.payeeFeeDeposit}("");
                require(result == true, "Unable to send arbitration fee from Parties to Arbitrator");
            }

            transaction.disputeID = transaction.arbitrator.createDispute(numberOfrefundOptions, "");
            disputeIDtoTXID[transaction.disputeID] = _txID;
            transaction.status = Status.DisputeOfficiated;

            emit Dispute(transaction.arbitrator, transaction.disputeID, _txID, _txID);
        }
    }

    function submitEvidence(uint _txID, bytes memory _evidence) external validTransaction(_txID) onlyParties(_txID) validEvidence(_evidence){
        TX storage transaction = txs[_txID];
        require(transaction.status < Status.DisputeOfficiated, "Parties cannot send evidences anymore");
        
        address user = msg.sender;
        if (user == transaction.payer){
            transaction.payerFiles.push(_evidence);
        } else {
            transaction.payeeFiles.push(_evidence);
        }

        emit Evidence(transaction.arbitrator, _txID, msg.sender, string(_evidence));
    }

    function submitRequirements(uint _txID, bytes memory requirements) external validTransaction(_txID) onlyParties(_txID) validEvidence(requirements) {
        TX storage transaction = txs[_txID];
        require(transaction.status < Status.DisputeOfficiated, "Parties cannot send Dispute Resolution Agreement anymore");
        
        transaction.requiredFfiles[0] = requirements;
        emit Evidence(transaction.arbitrator, _txID, msg.sender, string(requirements));
    }

    function submitDisputeResolutionAgreement(uint _txID, bytes memory disputeResolutionAgreement) external validTransaction(_txID) onlyParties(_txID) validEvidence(disputeResolutionAgreement) {
        TX storage transaction = txs[_txID];
        require(transaction.status < Status.DisputeOfficiated, "Parties cannot send Dispute Resolution Agreement anymore");
        
        transaction.requiredFfiles[1] = disputeResolutionAgreement;
        emit Evidence(transaction.arbitrator, _txID, msg.sender, string(disputeResolutionAgreement));
    }

    function rule(uint _disputeID, uint _ruling) external override onlyArbitrator(_disputeID) {
        uint txID = disputeIDtoTXID[_disputeID];
        TX storage transaction = txs[txID];

        require(transaction.status == Status.DisputeOfficiated, "Only Disputed transactions can be ruled");
        require(_ruling >= 0 && _ruling <= numberOfrefundOptions, "Ruling option not recognized");
        
        if (_ruling == uint(RulingOptions.refundPayer)) {
            require(sendCompleteFundsTo(txID, transaction.payer), "Failed to send funds to Payer");
        } else if (_ruling == uint(RulingOptions.refundPayee)) {
            require(sendCompleteFundsTo(txID, transaction.payee), "Failed to send funds to Payee");
        } else if (_ruling == uint(RulingOptions.refundBoth)) {
            require(((transaction.payerFundDistribution != FundsDistribution.nothing) && (transaction.payeeFundDistribution != FundsDistribution.fullAmount)) && 
                    (uint8(transaction.payerFundDistribution) + uint8(transaction.payeeFundDistribution) == uint8(FundsDistribution.fullAmount)), 
                    "Fund distribution has to be set first so that the sum of both parties comes to 100%");
            require(sendPartialFundsTo(txID, transaction.payer), "Failed to send funds to Payer");
            require(sendPartialFundsTo(txID, transaction.payee), "Failed to send funds to Payee");
        } else { //_ruling == 0 -> RefusedToArbitrate
            uint percentageAmount = (transaction.value * (uint(FundsDistribution.fiftyPercent) * 1000)) / scaledPercentage;
            uint payerFeeAmount = (percentageAmount * payerFee) / scaledPercentage;
            uint payeeFeeAmount = (percentageAmount * payeeFee) / scaledPercentage;
            
            revenue += payerFeeAmount;
            revenue += payeeFeeAmount;

            (bool result, ) = transaction.payer.call{value: (percentageAmount - payerFeeAmount)}("");
            require(result == true, "Failed to send funds to Payer");
            (result, ) = transaction.payee.call{value: (percentageAmount - payeeFeeAmount)}("");
            require(result == true, "Failed to send funds to Payee");
        }

        transaction.status = Status.DisputeResolved;
        emit Ruling(transaction.arbitrator, _disputeID, _ruling);
    }

    ///////////////////////////////////// INTERNAL FUNCTIONS ///////////////////////////////////
    function sendCompleteFundsTo(uint _txID, address targetParty) internal validTransaction(_txID) onlyPartiesAndArbitrator(_txID) returns (bool result) {
        TX storage transaction = txs[_txID];

        uint feePercentage;
        if(targetParty == transaction.payer) feePercentage = payerFee;
        else if (targetParty == transaction.payee) feePercentage = payerFee;

        uint feeAmount = (transaction.value * feePercentage ) / scaledPercentage;
        revenue += feeAmount;

        if (targetParty == transaction.payer) (result, ) = transaction.payer.call{value: (transaction.value - feeAmount)}("");
        else if (targetParty == transaction.payee) (result, ) = transaction.payee.call{value: (transaction.value - feeAmount)}("");

        return result;
    }

    function sendPartialFundsTo(uint _txID, address targetParty) internal validTransaction(_txID) onlyPartiesAndArbitrator(_txID) returns (bool result) {
        TX storage transaction = txs[_txID];

        if (targetParty == transaction.payer) {
            uint percentageAmount = (transaction.value * (uint(transaction.payerFundDistribution) * 1000)) / scaledPercentage;
            uint fee = (percentageAmount * payerFee ) / scaledPercentage;
            revenue += fee;

            (result, ) = transaction.payer.call{value: (percentageAmount - fee)}("");  
        } else if (targetParty == transaction.payee) {
            uint percentageAmount = (transaction.value * (uint(transaction.payeeFundDistribution) * 1000)) / scaledPercentage;
            uint fee = (percentageAmount * payeeFee ) / scaledPercentage;
            revenue += fee;

            (result, ) = transaction.payee.call{value: (percentageAmount - fee)}(""); 
        }

        return result;
    }

    //////////////////////////////////// BACKEND FUNCTIONS ////////////////////////////////////
    function getTransaction(uint _txID) external view validTransaction(_txID) returns (TX memory transaction){
        transaction = txs[_txID];
    }

    function getNumTransactions() external view returns (uint256 numTxs){
        return txs.length;
    }

    function getRequiredFiles(uint _txID) external view validTransaction(_txID) returns (bytes[2] memory requiredFfiles){
        return txs[_txID].requiredFfiles;
    }

    function getPayerFile(uint _txID, uint fileID) external view validTransaction(_txID) returns (bytes memory file){
        return txs[_txID].payerFiles[fileID];
    }

    function getNumberOfPayerFiles(uint _txID) external view validTransaction(_txID) returns (uint numFiles){
        return txs[_txID].payerFiles.length;
    }

    function getPayeeFile(uint _txID, uint fileID) external validTransaction(_txID) view returns (bytes memory file){
        return txs[_txID].payeeFiles[fileID];
    }

    function getNumberOfPayeeFiles(uint _txID) external view validTransaction(_txID) returns (uint numFiles){
        return txs[_txID].payeeFiles.length;
    }

    function getArbitrationCost(uint256 _txID) public view validTransaction(_txID) returns (uint cost) {   
        require(address(txs[_txID].arbitrator).code.length > 0, "Address is not valid");
        return txs[_txID].arbitrator.arbitrationCost("");
    }

    function getTxIDfromDisputeID(uint _disputeID) external view returns (uint txID){
        txID = disputeIDtoTXID[_disputeID];
    }
    
    function remainingTimeToDepositArbitrationFee(uint _txID) public view validTransaction(_txID) returns (uint) {
        TX storage transaction = txs[_txID];

        require(transaction.status == Status.DisputeRequested, "Dispute has to be requested first");

        return (block.timestamp - transaction.DisputeRequestedAt) > transaction.arbitrationFeeDepositPeriod ?
                0 : (transaction.DisputeRequestedAt + transaction.arbitrationFeeDepositPeriod - block.timestamp);
    }

    ///////////////////////////////// ADMIN FUNCTIONS ///////////////////////////////    
    function setArbitrator(uint _txID, IArbitrator _arbitrator) external onlyOwner validTransaction(_txID) {
        require(txs[_txID].status != Status.DisputeOfficiated, "Only Transactions with no dispute can change Arbitrator");
        txs[_txID].arbitrator = _arbitrator;
    }

    function transferOwnership(address payable newOwner) external onlyOwner returns(address){
        require(newOwner != address(0), "Invalid Address for new Owner");

        address oldOwner = owner;
        owner = newOwner;
        
        emit OwnershipTransferred(oldOwner, owner);
        return owner;
    }

    function withdraw(uint _amount) external onlyOwner returns (bool success){
        require(_amount <= revenue, "Not enough revenue");
        
        (success, ) = msg.sender.call{value: _amount}(""); 
        revenue -= _amount;

        require(success, "Unable to send amount to owner");
    }

    function setFees(uint16 _payerFee, uint16 _payeeFee) external onlyOwner {
        require(_payerFee >= minFeePercentage && _payerFee <= maxFeePercentge, "Percentage fee not allowed for Payer");
        require(_payeeFee >= minFeePercentage && _payeeFee <= maxFeePercentge, "Percentage fee not allowed for Payee");

        unchecked {payeeFee = _payeeFee;}
        unchecked {payerFee = _payerFee;}
    }

    function getRevenue() external view onlyOwner returns(uint){
        return revenue; 
    }

    function ownerAddFunds() external onlyOwner payable {
        revenue += msg.value;
    }
}