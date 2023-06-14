/**
 * @authors: [@ferittuncer, @hbarcelos]
 * @reviewers: []
 * @auditors: []
 * @bounties: []
 * @deployments: []
 * SPDX-License-Identifier: MIT
 */
pragma solidity ^0.8.9;

import "./interfaces/IArbitrator.sol";

contract Arbitrator is IArbitrator {
    address public owner = msg.sender;

    error NotOwner();
    error InsufficientPayment(uint256 _available, uint256 _required);
    error InvalidRuling(uint256 _ruling, uint256 _numberOfChoices);
    error InvalidStatus(DisputeStatus _current, DisputeStatus _expected);
    
    uint256 arbitrationFee =  0;

    struct Dispute {
        IArbitrable arbitrated;
        uint256 choices;
        uint256 ruling;
        DisputeStatus status;
    }

    Dispute[] public disputes;

     // Receive function to receive Ether transfers
    receive() external payable {}

    // Fallback function to receive Ether transfers (required for older Solidity versions)
    fallback() external payable {}

    function arbitrationCost(bytes memory _extraData) public view override returns (uint256) {
        return arbitrationFee;
    }

    function setArbitrationCost(uint256 _arbitrationFee) public {
        arbitrationFee =  _arbitrationFee;
    }

    function createDispute(uint256 _choices, bytes memory _extraData)
        public
        payable
        override
        returns (uint256 disputeID)
    {
        disputes.push(
            Dispute({arbitrated: IArbitrable(msg.sender), choices: _choices, ruling: 0, status: DisputeStatus.Waiting})
        );

        disputeID = disputes.length - 1;
        emit DisputeCreation(disputeID, IArbitrable(msg.sender));
    }

    function disputeStatus(uint256 _disputeID) public view override returns (DisputeStatus status) {
        status = disputes[_disputeID].status;
    }

    function currentRuling(uint256 _disputeID) public view override returns (uint256 ruling) {
        ruling = disputes[_disputeID].ruling;
    }

    function rule(uint256 _disputeID, uint256 _ruling) public override {
        if (msg.sender != owner) {
            revert NotOwner();
        }

        Dispute storage dispute = disputes[_disputeID];

        if (_ruling > dispute.choices) {
            revert InvalidRuling(_ruling, dispute.choices);
        }
        if (dispute.status != DisputeStatus.Waiting) {
            revert InvalidStatus(dispute.status, DisputeStatus.Waiting);
        }

        dispute.ruling = _ruling;
        dispute.status = DisputeStatus.Solved;

        dispute.arbitrated.rule(_disputeID, _ruling);
    }
}