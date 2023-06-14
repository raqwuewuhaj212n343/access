import express from "express";
import { web3Routers } from "./web3";
import { accountRouters } from "./account";
import passport from "passport";
import checkToken from "../middlewares/checkAuth";
import * as email from "../controllers/emailAuth";
import * as company from "../controllers/company";
import { socialAuth } from '../constants/index'
import { onSuccessfulOauthLogin } from "../controllers/user";
import { saveParams } from "../middlewares/socialAuth";


const router = express.Router();

// Routes to be added here

router.use("/web3", web3Routers);

router.use("/account", accountRouters);

// EMAIL

router.post("/signup", email.signup);

router.post("/login", email.login);

router.get("/password-reset-link/:email", email.requestPasswordResetLink);

router.post("/password-reset/:token", email.resetPasswordWithLink);

router.get("/email-otp/:email", checkToken, email.requestValidationOTP);

router.post("/validate-email-otp", checkToken, email.validateOTP);

router.post("/password-reset", checkToken, email.resetPassword);

// COMPANY

router.get("/company", checkToken, company.get);

router.patch("/company", checkToken, company.update);



/* Social - Auth routes */
// // Google
router.get("/auth/google", passport.authenticate('google', { scope: socialAuth.googleScope }));
router.get("/auth/google/callback", passport.authenticate("google", { failureRedirect: process.env.OAUTH_FAILURE_REDIRECT_URL }),
    onSuccessfulOauthLogin
);

// linkedIn client
router.get('/auth/linkedin', passport.authenticate('oauthStrategy'));
router.get('/auth/linkedin/callback', passport.authenticate('oauthStrategy', { failureRedirect: process.env.OAUTH_FAILURE_REDIRECT_URL }),
    onSuccessfulOauthLogin
);

// LlinkedIn Orgs
router.get('/auth/organizations/linkedin', saveParams);
router.get('/auth/organizations/linkedin/callback', passport.authenticate('organizationStrategy', { failureRedirect: process.env.OAUTH_FAILURE_REDIRECT_URL }),
    (req, res) => { res.status(200).send(req.user) }
);


// // Facebook
router.get('/auth/facebook', passport.authenticate('facebook'));
router.get('/auth/facebook/callback', passport.authenticate('facebook', {
    scope: ['email']
  }),
    onSuccessfulOauthLogin
);


export { router as userRouter };