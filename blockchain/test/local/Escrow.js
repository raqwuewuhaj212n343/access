const { expect } = require("chai");

describe('Escrow contract', () => {
    let Escrow, escrow, owner, addr1, addr2;

    beforeEach(async () => {
        Escrow = await ethers.getContractFactory('Escrow');
        escrow = await Escrow.deploy();
        [owner, addr1, addr2, _] = await ethers.getSigners();
    })

    describe('viewing revenue', () => {
        it('Should fail not owner', async () => {
            await expect(
                escrow.connect(addr1).getRevenue()
            )
                .to
                .be
                .reverted;
        })

        it('Should show current revenue amount', async () => {
            const rev = await escrow.getRevenue();
            // console.log('revenue amount', rev);
            expect(rev).to.equal(0);
        })
    });

    describe('Setting fees', () => {
        it('Should only set vendor fee', async () => {
            let beforeBuyerFee = await escrow.buyerFee();

            await escrow.setFees(5 * 100, 101 * 100);

            let afterBuyerFee = await escrow.buyerFee();

            expect(beforeBuyerFee).to.equal(afterBuyerFee);
        })
    });

    describe('Revenue transactions', () => {

        it('Should increase the escrow revenue', async () => {
            const value = ethers.utils.parseUnits(".5");

            await escrow.connect(addr1).depositTest({ value });

            const rev = await escrow.getRevenue();

            expect(rev).equal(value);
        })

        it('Withdrawing funds from revenue', async () => {
            await escrow.connect(addr1).depositTest({ value: ethers.utils.parseUnits(".5") });

            // console.log('owner balance: ', await owner.getBalance());

            await escrow.withdraw(ethers.utils.parseUnits(".2"));

            rev = await escrow.getRevenue();

            // console.log('owner balance: ', await owner.getBalance());
            expect(rev).equal(ethers.utils.parseUnits(".3"));
        })
    });

    describe('transfering ownership', () => {

        it('Should give ownership to given address', async () => {
            escrow.transferOwnership(addr1);
        })
    });

    describe('Ordering a service', () => {

        const evidence = JSON.stringify({
            title: "Web development",
            description: "build your website fast",
            paymentInUSD: 12,
            days: 3,
            parties: {
                1: 'payer',
                2: 'payee'
            }
        })

        var txId, reclamationPeriod = 5 * 86_400_000; // X days in miliseconds

        beforeEach(async () => {
            txId = await escrow.connect(addr1).newTransaction(
                addr2.address,
                "0x988b3a538b618c7a603e1c11ab82cd16dbe28069",
                evidence,
                reclamationPeriod,
            );
        })


        it('Should insert a new transaction', async () => {

            expect(txId.value).equal(0);
        })

        it('Should submit evidence', async () => {
            const meta_evidence = JSON.stringify({ "chatMessages": [] });
            await escrow.connect(addr1).submitEvidence(0, meta_evidence);
        })

        it('Should get remaining time until reclaimation', async () => {
            const time = await escrow.connect(addr1).remainingTimeToReclaim(0);
            expect(time).equal(reclamationPeriod);
        })

        it('Payee should release funds after period', async () => {
            await timeSkip();
            await escrow.connect(addr2).releaseFunds(0);
        })

        it('Payee should not release funds before period', async () => {
            await expect(
                escrow.connect(addr2).releaseFunds(0)
            )
                .to
                .be
                .reverted;
        })

        it('Payer should release funds', async () => {
            await escrow.connect(addr1).releaseFunds(0);
        })

        // FOLLOWING TESTS WILL NOT WORK UNLESS ESCROW CONTRACT IS EDITED:
        // CHANGE transaction.arbitrator to custom values
        /* 
        it('Payee should deposit arbitrationFee', async () => {
            await escrow.connect(addr1).reclaimFunds(0, { value: 1000 });
            await escrow.connect(addr1).depositArbitrationFeeForPayee(0, { value: 1000 });
        })
        
        it('Payer should not reclaim funds before payee arbitrationFeeDepositPeriod', async () => {
            await escrow.connect(addr1).reclaimFunds(0, { value: 1000 });
            expect(escrow.connect(addr1).reclaimFunds(0)).reverted;
        })
        
        it('Payer should reclaim funds', async () => {
            await escrow.connect(addr1).reclaimFunds(0, { value: 1000 });
            await timeSkip();
            await escrow.connect(addr1).reclaimFunds(0);
        })
        */
    });
});

async function timeSkip() {
    const day = days(1);
    const year = days(365);
    await network.provider.send("evm_increaseTime", [days(5)]);
    await network.provider.send("evm_mine");
}

function days(days = 1) {
    return Math.round(days * 86_400_000);
}

async function timestamp() {

    const blockNumber = await ethers.provider.getBlockNumber();
    const blockBefore = await ethers.provider.getBlock(blockNumber);
    return blockBefore.timestamp;
}