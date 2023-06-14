async function main() {
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contracts with account: ${deployer.address}`)

    var balance = await deployer.getBalance();
    console.log(`Account balance: ${balance.toString()}`)
    
    const Escrow = await ethers.getContractFactory('Escrow');
    
    const escrow = await Escrow.deploy();

    balance = await deployer.getBalance();
    console.log(`Account balance: ${balance.toString()}`)

    console.log(`Escrow address: ${escrow.address}`)

}

main()
    .then(() => process.exit(0))
    .catch((err) => { console.log(err); process.exit(1) });