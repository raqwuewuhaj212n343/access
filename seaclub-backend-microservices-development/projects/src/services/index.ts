import Project from "../models/project";
import IProject from "../@types/project";

export async function create(userId: string, body: Partial<IProject>) {
    try {
        const project = await Project.create({ ...body, user: userId });
        return { project };
    } catch (error) {
        return { error };
    }
}

export async function update(userId: string, filter: Partial<IProject>, body: Partial<IProject>) {
    try {
        const project = await Project.findOneAndUpdate(
            { ...filter, user: userId, deletedAt: null },
            { $set: body },
            { new: false }
        ).lean();
        return { project };
    } catch (error) {
        return { error };
    }
}

export function deleteById(userId: string, id: string) {
    return update(userId, { _id: id }, { deletedAt: Date.now().toLocaleString() });
}

export async function getOne(filter: Partial<IProject>, projection: object = {}) {
    try {
        const project = await Project
            .findOne({ ...filter, deletedAt: null }, projection)
            .populate('user')
            .lean();
        return { project };
    } catch (error) {
        return { error };
    }
}

export function getOneById(userId: string, id: string) {
    return getOne({ user: userId, _id: id })
}

export async function getMany(userId: string, filter: Partial<IProject>) {
    try {
        const projects = await Project.find({ ...filter, user: userId, deletedAt: null }).populate('user').lean();
        return { projects };
    } catch (error) {
        return { error };
    }
}