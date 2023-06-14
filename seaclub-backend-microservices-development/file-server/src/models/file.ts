import { model, Schema, Model, Types } from "mongoose";
import IFile from "../@types/template";

const FileSchema = new Schema<IFile, Model<IFile>>({
    hoursToExpiry: { type: Number, default: 2, min: 1, max: 4 },
    // userId: Types.ObjectId,
    key: { type: String, index: true }
}, { timestamps: true });

const File = model("File", FileSchema);

export default File;