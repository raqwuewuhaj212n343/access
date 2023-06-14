import { Request, Response } from "express";
import * as PS from "../services";
import { responses } from "../constants";
import { FileConfirmationPublisher } from "../events/publishers/file-confirmation-publisher";
import { FileRemovePublisher } from "../events/publishers/file-removal-publisher";
import { rabbitmqWrapper } from "@seaclub/common";
import { InternalServerError } from "../errors/internal-server-error";
const { project: projM } = responses;

export async function create(req: Request, res: Response) {
    const { error, project } = await PS.create(req.user._id, req.body);

    if (error) throw new InternalServerError();

    res.status(200).json({ message: projM.SUCCESS, project });

    const files = [];

    if (project?.visualURLs) files.push(...project.visualURLs.map((v) => v));
    if (project?.showcaseImageURL) files.push(project.showcaseImageURL);

    if (files.length) await new FileConfirmationPublisher(rabbitmqWrapper.channel).publish(files);
};

export async function update(req: Request, res: Response) {
    const { error, project } = await PS.update(req.user._id, { _id: req.params.id }, req.body);

    if (error) throw new InternalServerError();
    else if (!project) throw new Error(projM.NOT_FOUND);

    res.status(200).json({ message: projM.SUCCESS, project });

    if (req.body.visualURLs) {
        const visualURLs = req.body.visualURLs;

        const toDelete = project.visualURLs.filter((key) => {
            const index = visualURLs.indexOf(key);
            if (index > -1) visualURLs.splice(index, 1);
            return index === -1;
        });

        if (toDelete.length) await new FileConfirmationPublisher(rabbitmqWrapper.channel).publish(toDelete.length);
        if (visualURLs.length) await new FileRemovePublisher(rabbitmqWrapper.channel).publish(visualURLs.length);
    }
};

export async function getOne(req: Request, res: Response) {
    const { project, error } = await PS.getOneById(req.user._id, req.params.id);

    if (error) throw new InternalServerError();
    else if (!project) throw new Error(projM.NOT_FOUND);

    res.status(200).json({ message: projM.SUCCESS, project });
};

export async function deleteOne(req: Request, res: Response) {
    const { project, error } = await PS.deleteById(req.user._id, req.params.id);

    if (error) throw new InternalServerError();
    else if (!project) throw new Error(projM.NOT_FOUND);

    res.sendStatus(204);
};

export async function getManyByUserId(req: Request, res: Response) {
    const { projects, error } = await PS.getMany(req.user._id, req.query);

    if (error) throw new InternalServerError();

    res.status(200).json({ message: projM.SUCCESS, projects });
};