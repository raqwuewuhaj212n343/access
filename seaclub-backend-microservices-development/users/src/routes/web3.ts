import express from "express";
import * as user from "../controllers/web3";
import checkToken from "../middlewares/checkAuth";

const router = express.Router();

// Routes to be added here

router.get("/login-hash/:address", user.getWeb3LoginHash);

router.get("/login/test/:address", user.web3TestLogin);

router.post("/login", user.web3Login);

router.post("/signup", user.createUser);

router.patch("/activate-wallet/:address", checkToken, user.activateWallet);

router.patch("/add-wallet", checkToken, user.addWallet);

router.delete("/remove-wallet/:address", checkToken, user.removeWallet);

export { router as web3Routers };
