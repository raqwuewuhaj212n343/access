import sg from "@sendgrid/mail";
import {MailData} from '../@types/sendgrid';

export const sendEmail = async (msg:MailData) => {
    if (!process.env.SENDGRID_API_KEY) throw new Error('No API key')
    sg.setApiKey(process.env.SENDGRID_API_KEY)
    return sg.send(msg);
};