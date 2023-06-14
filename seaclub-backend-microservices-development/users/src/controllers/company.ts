import { Request, Response } from "express";
import * as US from "../services"
import { responses } from "../constants";
import { InternalServerError } from "../errors/internal-server-error";
import { FileConfirmationPublisher } from "../events/publishers/file-confirmation-publisher";
import { FileRemovePublisher } from "../events/publishers/file-removal-publisher";
import { rabbitmqWrapper } from "@seaclub/common";
const { user: userM } = responses;

// bannerURL
// logoURL
export async function update(req: Request, res: Response) {
    const { user, error } = await US.update({ _id: req.user._id }, { company: req.body });

    if (error) throw new InternalServerError();
    else if (!user) throw new Error(userM.NOT_FOUND);

    res.status(200).json({ message: userM.SUCCESS, company: user.company });

    const remove = [];
    const confirm = [];

    if (req.body?.bannerURL && user.company?.bannerURL != req.body.bannerURL) {
        confirm.push(req.body.bannerURL);
        remove.push(user.company?.bannerURL);
    }

    if (req.body.logoURL && user.company?.bannerURL != req.body.bannerURL) {
        confirm.push(req.body.bannerURL);
        remove.push(user.company?.bannerURL);
    }

    if (remove.length) await new FileConfirmationPublisher(rabbitmqWrapper.channel).publish(remove);
    if (confirm.length) await new FileRemovePublisher(rabbitmqWrapper.channel).publish(confirm);
};

export async function get(req: Request, res: Response) {
    const { user, error } = await US.getUserCompany(req.user._id);

    if (error) throw new InternalServerError();
    else if (!user) throw new Error(userM.NOT_FOUND);

    res.status(200).json({ message: userM.SUCCESS, company: user.company });
};