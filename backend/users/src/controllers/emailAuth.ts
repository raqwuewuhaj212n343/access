import { Request, Response } from "express";
import * as US from "../services"
import { responses, emails } from "../constants";
import { hashPassword, comparePassword } from "../utils/bcrypt";
import { validateEmail } from "../utils/validators";
import { InternalServerError } from "../errors/internal-server-error";
import { jwtEncrypt, jwtDecrypt } from "../utils/jwtEncryption";
import { sendEmail } from "../utils/sendgrid";
import { genOTP } from "../utils/randomGenerators";

const { user: userM, email: emailM } = responses;
export async function signup(req: Request, res: Response) {
    const { email, password } = req.body;
 
    if (!validateEmail(email)) throw new Error(userM.INVALID_EMAIL);
    if (!password) throw new Error(userM.INVALID_PASSWORD);

    const hashed = await hashPassword(password); // TODO: run password check

    const { user, error } = await US.create({
        emails: [{ address: email.toLowerCase().trim(), password: hashed, verified: false, otp: 0, otpExpiry: '' }],
        isActive: false
    });

    if (error) throw error;
    if (user) res.status(200).json({ message: userM.SUCCESS, user });
    else throw new InternalServerError();
};

export async function login(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email) throw new Error(userM.EMAIL_REQUIRED);

    const { user, error } = await US.getOneInEmails(email);

    if (error) throw new InternalServerError();
    else if (!user) throw new Error(userM.NOT_FOUND);

    const primary = user.emails[user.settings.primaryEmail];

    if (primary.address !== email) throw new Error(userM.INVALID_LOGIN_CREDENTIALS);

    const result = await comparePassword(password, primary.password);
    if (!result) throw new Error(userM.INVALID_LOGIN_CREDENTIALS);

    let token = jwtEncrypt({ _id: user._id, isVerified: primary.verified, isAcvtive: user.isActive }, "1d");
    req.session = { token }

    res.status(200).json({
        id: user._id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        email: primary.address,
        verified: primary.verified,
    });
};

export async function requestValidationOTP(req: Request, res: Response) {
    const { email } = req.params;
    const { user, error } = await US.getOneInEmails(email);

    if (error) throw new InternalServerError();
    else if (!user) throw new Error(userM.NOT_FOUND);

    const ind = user.emails.findIndex((e) => e.address == email);

    if (user.emails[ind].verified) throw new Error(userM.EMAIL_VERIFIED);

    const otp = genOTP();
    const expiry = new Date(Date.now() + 1000 * (60 * 5)).toDateString(); // 5 minutes ahead
    user.emails[ind].otp = otp;
    user.emails[ind].otpExpiry = expiry
    await user.save();

    try {
        await sendEmail(emails.VERIFY_EMAIL(email, otp));
        res.sendStatus(204);
    } catch (error) {
        throw new Error(emailM.FAILURE)
    }
};

export async function validateOTP(req: Request, res: Response) {
    const { email, otp } = req.body;
    const { user, error } = await US.getOneInEmails(email);

    if (error) throw new InternalServerError();
    else if (!user) throw new Error(userM.NOT_FOUND);

    const ind = user.emails.findIndex((e) => e.address == email);
    const found = user.emails[ind];

    if (!found.otp) throw new Error(userM.INVALID_EMAIL)
    else if ((new Date()).getTime() > (new Date(found.otpExpiry)).getTime()) throw new Error(emailM.EXPIRED_OTP)
    else if (otp !== found.otp) throw new Error(emailM.INVALID_OTP)

    res.sendStatus(204);

    user.emails[ind].otp = 0;
    user.emails[ind].otpExpiry = '';
    user.emails[ind].verified = true;
    user.save();
};

export async function requestPasswordResetLink(req: Request, res: Response) {
    const { email } = req.params;
    const { user, error } = await US.getOneInEmails(email);

    if (error) throw new InternalServerError();
    else if (!user) throw new Error(userM.NOT_FOUND);

    const index = user.emails.findIndex(e => e.address == email);
    const token = jwtEncrypt({ _id: user._id, email: email, index }, "5m");

    try {
        await sendEmail(emails.RESET_PASSWORD(email, token));
        res.sendStatus(204);
    } catch (error) {
        throw new Error(emailM.FAILURE)
    }
};

export async function resetPasswordWithLink(req: Request, res: Response) {
    if (!req.body.password) throw new Error(userM.INVALID_PASSWORD);

    const hashed = await hashPassword(req.body.password);

    const token = jwtDecrypt(req.params.token);

    if (!token) throw new Error(userM.AUTHENTCATION_FAILED);

    const { user, error } = await US.update({ _id: token._id },
        { [`emails.${token.index}.password`]: hashed }
    );

    if (error) throw new InternalServerError();
    else if (!user) throw new Error(userM.NOT_FOUND);

    res.sendStatus(204);
};

export async function resetPassword(req: Request, res: Response) {
    const { newPassword, currentPassword, email } = req.body;

    if (!newPassword || !currentPassword) throw new Error(userM.INVALID_PASSWORD);

    const { user, error } = await US.getOneInEmails(email);

    if (error) throw new InternalServerError();
    else if (!user) throw new Error(userM.NOT_FOUND);
    else if(user._id.toString() != req.user._id) throw new Error(userM.AUTHENTCATION_FAILED);

    const index = user.emails.findIndex(e => e.address == email);
    const result = await comparePassword(currentPassword, user.emails[index].password);

    if (!result) throw new Error(userM.WRONG_PASSWORD)
    
    user.emails[index].password = await hashPassword(newPassword);

    await user.save();

    res.sendStatus(204);
};