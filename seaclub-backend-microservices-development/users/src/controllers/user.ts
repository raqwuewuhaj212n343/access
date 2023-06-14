import { Request, Response } from "express";
import * as US from "../services"
import { jwtEncrypt } from "../utils/jwtEncryption";

export const onSuccessfulOauthLogin = async (req: Request, res: Response) => {
    const userSession = req.session.passport.user;
    const { user } = await US.getOneInEmails(userSession.emails[0].value);
    let token = jwtEncrypt({ _id: user?._id, isAcvtive: user?.isActive }, "1d");
    req.session = { token }
    process.env.OAUTH_SUCCESS_REDIRECT_URL && res.redirect(process.env.OAUTH_SUCCESS_REDIRECT_URL) 
};
