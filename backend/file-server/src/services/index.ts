import File from "../models/file";
import IFile from "../@types/template";

export async function createMany(body: Partial<IFile>[]) {
    try {
        const files = await File.insertMany(body);

        return { files };
    } catch (error) {
        return { error };
    }
}

export async function deleteByKeys(keys: string[]) {
    try {
        const files = await File.deleteMany({key: { $in: keys } });

        return { files };
    } catch (error) {
        return { error };
    }
}

export async function getOne(filter: Partial<IFile>) {
    try {
        const file = await File.findOne(filter);
        return { file };
    } catch (error) {
        return { error };
    }
}

export async function getMany(userId: string, filters: object) {
    try {
        const files = await File.find({ ...filters, userId });
        return { files };
    } catch (error) {
        return { error };
    }
}