import { Request, Response } from "express";
import Web3 from "web3";
import * as US from "../services"
import { responses } from "../constants";
import { genNonce } from "../utils/randomGenerators";
import { InternalServerError } from "../errors/internal-server-error";
import { jwtEncrypt } from "../utils/jwtEncryption";
import { AuthorizationError } from "../errors/authorization-error";


const { user: userM, system: sysM } = responses;

const web3 = new Web3("");

export async function createUser (req: Request, res: Response) {
    const { address, provider } = req.body;

    if (!web3.utils.isAddress(address)) throw new Error(userM.INVALID_ADDRESS);

    const { user, error } = await US.create({ web3Wallets: [{ address, provider }] });
    
    if(error) throw new InternalServerError()
    else if (!user) throw new Error(userM.NOT_FOUND); 
    
    res.status(200).json({ message: userM.SUCCESS, user });
};


export async function getWeb3LoginHash(req: Request, res: Response) {
    const address = req.params.address?.toLowerCase();

    if (!web3.utils.isAddress(address)) throw new Error(userM.INVALID_ADDRESS);

    const { user, error } = await US.getOneInWallets(address);

    if (error) throw new InternalServerError();
    else if (!user) throw new Error(userM.NOT_FOUND); 

    let hash = userM.SIGNIN_PREFIX + web3.utils.sha3(user.nonce);
    res.status(200).json({ message: userM.SUCCESS, hash });
};


export async function web3Login (req: Request, res: Response) {
    const { address, hash } = req.body;

    if (!web3.utils.isAddress(address)) throw new Error(userM.INVALID_ADDRESS);
    if (!hash) throw new Error (userM.HASH_REQURIED);

    const { user, error: err } = await US.getOneInWallets(address?.toLowerCase());

    if (err) throw new InternalServerError();
    else if (!user) throw new Error(userM.NOT_FOUND); 

    const hashedNonce = userM.SIGNIN_PREFIX + web3.utils.sha3(user.nonce);
    const signedAddress = web3.eth.accounts.recover(hashedNonce, hash)?.toLowerCase();
    const walletAdress = user.web3Wallets[user.settings?.primaryWallet]?.address;
    
    if (signedAddress !== walletAdress) throw new Error(userM.AUTHENTCATION_FAILED);
    
    let token = jwtEncrypt( { _id: user._id, address: walletAdress },"1d");
    req.session = { token }
    
    res.status(200).json({
        id: user._id,
        walletAdress: walletAdress,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    });
    
    user.nonce = genNonce().toString();
    await user.save();
};


export async function web3TestLogin(req: Request, res: Response) {
    const address = req.params.address;

    if (address != process.env.TEST_ADDRESS) throw new Error(userM.INVALID_ADDRESS);

    const { user, error: err } = await US.getOneInWallets(address);

    if (err) throw new InternalServerError();
    else if (!user)throw new Error(userM.NOT_FOUND);

    let token = jwtEncrypt({ _id: user._id, address }, "30d");
    req.session = { token };

    res.status(200).json({
        id: user._id,
        walletAdress: address,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt
    });
};


export async function addWallet(req: Request, res: Response) {
    let _id = req.user._id;

    const { provider, address } = req.body;

    if (!web3.utils.isAddress(address)) throw new Error(userM.INVALID_ADDRESS);
    
    const { user, error } = await US.getOne({ _id })

    if (error) throw new InternalServerError();
    else if (!user) throw new Error(userM.NOT_FOUND);

    user.web3Wallets.push({ provider, address })
    await user.save()
    
    res.status(200).json({ message: userM.SUCCESS, user });
} 

export async function removeWallet(req: Request, res: Response){
    
    let address = req.params.address;
    
    const { user, error } = await US.getOneInWallets(address);
    
    if (error) throw new InternalServerError();
    else if (!user) throw new Error(userM.INVALID_ADDRESS);
    else if(user._id.toString() != req.user._id) throw new Error(userM.AUTHENTCATION_FAILED);

    const { settings: { primaryWallet:index }, web3Wallets } = user;

    const found = web3Wallets.find((w) => w.address == address);
    if(found?.address == web3Wallets[index]?.address) throw new AuthorizationError()
        
    user.web3Wallets.filter(w => w.address != address);
    const us = await user.save();

    res.status(200).json({ message: userM.SUCCESS, user: us});
}

export async function activateWallet(req: Request, res: Response){
    let _id = req.user._id, address = req.params.address;

    const { user, error } = await US.activateWallet(_id, address);

    if (error) throw new InternalServerError();
    else if (!user) throw new Error(userM.NOT_FOUND);
    
    res.status(200).json({ message: userM.SUCCESS, user });
}
