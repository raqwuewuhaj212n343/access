import { model, Schema, Model, Types } from "mongoose";
import IProject from '../@types/project';

const ProjectSchema = new Schema<IProject, Model<IProject>>({
    user: { type: Types.ObjectId, ref: 'User', index: true },
    title: { type: String, required: true, maxLength: 75, minlength: 7 },
    description: { type: String, required: true, maxLength: 1200, minlength: 120 },
    requirements: { type: [{ type: String, maxLength: 250, minlength: 10 }], required: true },
    faq: [{ a: String, q: String }],
    isDraft: Boolean,
    category: String,
    subCategory: String,
    minPrice: Number,
    days: Number,
    priceRange: { min: Number, max: Number },
    showcaseImageURL: String,
    visualURLs: [String],
    currency: String,
    deletedAt: String
}, {
    timestamps: true,
    toJSON: {
        transform(doc, ret, options) {
            if (ret.user?._id) {
                ret.currency = ret.user?.settings?.currency;
            }
            else ret.user = { _id: ret?.user };
            return ret;
        },
    }
});

const Project = model("Project", ProjectSchema);

export default Project;