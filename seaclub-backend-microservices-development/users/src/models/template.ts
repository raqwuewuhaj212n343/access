import { model, Schema, Model, Types } from "mongoose";
import { ETemplate } from "../utils/enums";
import ITemplate, { IAboutUsTemplate, IPortfolioTemplate, ITeamTemplate } from "../@types/template";

const TemplateSchema = new Schema<ITemplate, Model<ITemplate>>({
    userId: Types.ObjectId,
    section: { required: true, type: String, enum: Object.values(ETemplate) },
    selected: { required: true, type: Number },
    description: String,
}, { timestamps: true });

const Template = model("Template", TemplateSchema);

export default Template;

export const TeamTemplate = Template.discriminator("Team", (
    new Schema<ITeamTemplate, Model<ITeamTemplate>>({
        team: [{ title: String, imageURL: String }],
    })
));

export const AboutUsTemplate = Template.discriminator("AboutUs", (
    new Schema<IAboutUsTemplate, Model<IAboutUsTemplate>>({
        title: String,
        bannerURL: String,
        secondaryTitle: String,
        list: [{ paragraph: String, imageURL: String }]
    })
));

export const PortfolioTemplate = Template.discriminator("Portfolio", (
    new Schema<IPortfolioTemplate, Model<IPortfolioTemplate>>({
        title: String,
        secondaryTitle: String,
        secondaryDescription: String,
        logoURL: String,
        banner: { imageURL: String, text: String },
        list: [{ paragraph: String, imageURL: String }]
    })
));