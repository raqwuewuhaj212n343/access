import { Types, SchemaDefinitionProperty } from "mongoose";

export default interface ITemplate extends SchemaDefinitionProperty<unknown> {
    _id: Types.ObjectId | string;
    userId: Types.ObjectId | string;
    section: string;
    selected: Number;
    description: string;
};

export interface ITeamTemplate extends SchemaDefinitionProperty<unknown> {
    team: Types.Array<{ title: string; imageURL: string; }>;
};

export interface IAboutUsTemplate extends SchemaDefinitionProperty<unknown> {
    title: string;
    bannerURL: string;
    secondaryTitle: string | null;
    list: Types.Array<{ paragraph: string; imageURL: string; }> | null;
};

export interface IPortfolioTemplate extends SchemaDefinitionProperty<unknown> {
    title: string;
    secondaryTitle: string;
    secondaryDescription: string | null;
    banner: { imageURL: string; text: string } | null;
    logoURL: string | null;
    list: Types.Array<{ paragraph: string | null; imageURL: string; }> | null;
};

export interface ITemplateGroup extends ITemplate, IAboutUsTemplate, IPortfolioTemplate, ITeamTemplate { };