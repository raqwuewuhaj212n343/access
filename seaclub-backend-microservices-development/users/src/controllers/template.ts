import { Request, Response } from "express";
import * as TS from "../services/template";
import { responses } from "../constants";
import { InternalServerError } from "../errors/internal-server-error";
import { FileConfirmationPublisher } from "../events/publishers/file-confirmation-publisher";
import { FileRemovePublisher } from "../events/publishers/file-removal-publisher";
import { rabbitmqWrapper } from "@seaclub/common";
const { template: tempM } = responses;

export async function create(req: Request, res: Response) {
    const { error, template } = await TS.create({ ...req.body, userId: req.user._id, section: req.params.section });

    if (error) throw new InternalServerError();

    res.status(200).json({ message: tempM.SUCCESS, template });

    const files = [];

    if (template?.team) files.push(...template.team.map((t: any) => t?.imageURL));
    if (template?.list) files.push(...template.list.map((t: any) => t?.imageURL));
    if (template?.bannerURL) files.push(template.bannerURL);
    if (template?.logoURL) files.push(template.logoURL);
    if (template?.banner?.imageURL) files.push(template.banner?.imageURL);

    if (files.length) await new FileConfirmationPublisher(rabbitmqWrapper.channel).publish(files);
};

export async function update(req: Request, res: Response) {
    const { section, id } = req.params;
    const { error, template } = await TS.update({ userId: req.user._id, section, _id: id }, req.body);

    if (error) throw new InternalServerError();
    else if (!template) throw new Error(tempM.NOT_FOUND);

    res.status(200).json({ message: tempM.SUCCESS, template });

    const remove = [], confirm = [];

    if (req.body?.bannerURL && template?.bannerURL != req.body.bannerURL) {
        confirm.push(req.body.bannerURL);
        remove.push(template?.bannerURL);
    }
    if (req.body?.logoURL && template?.logoURL != req.body.logoURL) {
        confirm.push(req.body.logoURL);
        remove.push(template?.logoURL);
    }
    if (req.body?.banner?.imageURL && template?.banner?.imageURL != req.body.banner.imageURL) {
        confirm.push(req.body.banner.imageURL);
        remove.push(template?.bannerURL);
    }
    if (req.body.team) {
        const urls: string[] = req.body.team.map((t: any) => t.imageURL);

        const toRemove = template.team?.reduce((prev: any, t: any) => {
            const index = urls.indexOf(t.imageURL);
            if (index > -1) urls.splice(index, 1);
            else prev.push(t.imageURL);
            return prev;
        }, []);
        remove.push(...toRemove);
        confirm.push(...urls);
    }
    if (req.body.list) {
        const urls: string[] = req.body.list.map((t: any) => t.imageURL);

        const toRemove = template.list?.reduce((prev: any, l: any) => {
            const index = urls.indexOf(l.imageURL);
            if (index > -1) urls.splice(index, 1);
            else prev.push(l.imageURL);
            return prev;
        }, []);
        remove.push(...toRemove);
        confirm.push(...urls);
    }

    if (remove.length) await new FileConfirmationPublisher(rabbitmqWrapper.channel).publish(remove);
    if (confirm.length) await new FileRemovePublisher(rabbitmqWrapper.channel).publish(confirm);
};

export async function getOne(req: Request, res: Response) {
    const { template, error } = await TS.getOneById(req.params.id, req.user._id);

    if (error) throw new InternalServerError();
    else if (!template) throw new Error(tempM.NOT_FOUND);

    res.status(200).json({ message: tempM.SUCCESS, template });
};

export async function deleteOne(req: Request, res: Response) {
    const { template, error } = await TS.deleteById(req.params.id, req.user._id);

    if (error) throw new InternalServerError();
    else if (!template) throw new Error(tempM.NOT_FOUND);

    res.sendStatus(204);
};

export async function getManyByUserId(req: Request, res: Response) {
    const { templates, error } = await TS.getManyByUserId(req.user._id);

    if (error) throw new InternalServerError();

    res.status(200).json({ message: tempM.SUCCESS, templates });
};