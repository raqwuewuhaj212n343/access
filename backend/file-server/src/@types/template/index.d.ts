import { Types, SchemaDefinitionProperty } from "mongoose";

export default interface IFile extends SchemaDefinitionProperty<unknown> {
    _id: Types.ObjectId | string;
    // userId: Types.ObjectId | string;
    key: string;
    hoursToExpiry: number | null;
    createdAt: string;
    updatedAt: string;
};