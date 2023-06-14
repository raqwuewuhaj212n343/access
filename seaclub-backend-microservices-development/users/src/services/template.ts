import Template, { AboutUsTemplate, PortfolioTemplate, TeamTemplate } from "../models/template";
import { ITemplateGroup } from "../@types/template";
import { ETemplate } from "../utils/enums";

export async function create(body: Partial<ITemplateGroup>): Promise<any> {
    let template;
    try {
        if (body.section === ETemplate.team) template = await TeamTemplate.create(body);
        else if (body.section === ETemplate.portfolio) template = await PortfolioTemplate.create(body);
        else if (body.section === ETemplate.aboutUs) template = await AboutUsTemplate.create(body);

        return { template };
    } catch (error) {
        return { error };
    }
}

export async function update(filter: Partial<ITemplateGroup>, body: Record<string, any>): Promise<any> {
    let template;
    const args = [filter, { $set: body }, { new: false }];
    try {
        if (filter.section === ETemplate.team) template = await TeamTemplate.findOneAndUpdate(...args).lean();
        else if (filter.section === ETemplate.portfolio) template = await PortfolioTemplate.findOneAndUpdate(...args).lean();
        else if (filter.section === ETemplate.aboutUs) template = await AboutUsTemplate.findOneAndUpdate(...args).lean();

        return { template };
    } catch (error) {
        return { error };
    }
}

export async function deleteById(id: string, userId: string) {
    try {
        const template = await TeamTemplate.findOneAndDelete({ _id: id, userId });
        return { template };
    } catch (error) {
        return { error };
    }
}

export async function getOneById(id: string, userId: string) {
    try {
        const template = await Template.findOne({ _id: id, userId });
        return { template };
    } catch (error) {
        return { error };
    }
}

export async function getManyByUserId(userId: string) {
    try {
        const templates = await Template.find({ userId });
        return { templates };
    } catch (error) {
        return { error };
    }
}