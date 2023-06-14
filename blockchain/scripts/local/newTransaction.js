// 0x5FbDB2315678afecb367f032d93F642f64180aa3
async function main() {
    const [owner, addr1, addr2, _] = await ethers.getSigners();

    const Escrow = await ethers.getContractFactory("Escrow");
    const escrow = await Escrow.attach("0x5FbDB2315678afecb367f032d93F642f64180aa3"); // The deployed contract address
    const evidence = "QmSB21ecZxYB3sEqH2htJ86mJDn9KC95NdamozpKpmme5H"

    const txId = await escrow.connect(addr1).newTransaction(
        addr2.address,
        "0x988b3a538b618c7a603e1c11ab82cd16dbe28069",
        evidence,
        5 * 86_400_000, // X days in miliseconds
        { value: ethers.utils.parseUnits(".5") }
    );

    // console.log({ txId });

    const revenue = await escrow.getRevenue();

    console.log({ revenue });
}

main()
    .then(() => process.exit(0))
    .catch((err) => { console.log(err); process.exit(1) });