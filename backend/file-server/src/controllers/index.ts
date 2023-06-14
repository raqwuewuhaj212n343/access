import { Request, Response } from "express";
import * as FS from "../services";
import { responses } from "../constants";
import { InternalServerError } from "../errors/internal-server-error";
import { AuthorizationError } from "../errors/authorization-error";
import { deleteFiles, getFiles } from '../utils/s3Bucket';
const { file: fileM } = responses;
/*
req.files.images
req.files.banner
req.files.logo
req.files.visuals
req.files.showcaseImage
*/
export async function create(req: Request, res: Response) {
    let data: any = null;
    const body: any = [];
    if (req.files) {
        Object.entries(req.files).forEach(([key, val]) => {
            data[key] = val.map(({ key }: any) => {
                body.push({ key });
                return key;
            });
        });
    }

    if (!data) throw new Error(fileM.NO_FILES);

    const { files, error } = await FS.createMany(body);

    if (error) throw new InternalServerError();

    res.status(200).json({ message: fileM.SUCCESS, keys: data });
};

export async function deleteMany(req: Request, res: Response) {
    if (!Array.isArray(req.body.keys) && !req.body.keys.length) throw new Error(fileM.NO_FILES);

    // chek if id is in key as proof of ownership
    if (req.body.keys.every((key: string) => key.includes(req.user._id))) {

        const { deleted, error } = await deleteFiles(req.body.keys);

        if (error) throw new InternalServerError();
        else res.sendStatus(204);
    } else {
        throw new AuthorizationError();
    }
};

export async function getFilesAtPath(req: Request, res: Response) {
    if (!req.params.path) throw new Error(fileM.NO_FILES);

    const { error, data, isTruncated } = await getFiles(`${req.user._id}/${req.params.path}/`);

    if (error) throw new InternalServerError();
    else res.status(200).json({ message: fileM.SUCCESS, keys: data, isTruncated });
};