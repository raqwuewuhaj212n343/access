require('dotenv').config();
const ESCROW_ADDRESS = process.env.ESCROW_ADDRESS;

async function main()
{
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contracts with account: ${deployer.address}`)

    var balance = await deployer.getBalance();
    var escrowAddress = `${ESCROW_ADDRESS}`
    console.log(`Account balance: ${balance.toString()}`)

    const Escrow = await ethers.getContractFactory('Escrow');
    const existingContract = await Escrow.attach(escrowAddress);
    if (await existingContract.deployed())
    {
        console.log('Contract already deployed to the network');
        console.log(`Escrow Address: ${escrowAddress}`);
        console.log(`Account balance: ${balance.toString()}`)
        return;
    }

    const escrow = await Escrow.deploy();
    balance = await deployer.getBalance();
    console.log(`Account balance: ${balance.toString()}`)
    console.log(`Escrow address: ${escrow.address}`)
}

main()
    .then(() => process.exit(0))
    .catch((err) => { console.log(err); process.exit(1) });