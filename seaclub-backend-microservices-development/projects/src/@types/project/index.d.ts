import { Types, ObjectId, SchemaDefinitionProperty } from "mongoose";

export default interface IProject extends SchemaDefinitionProperty<unknown> {
    _id: string | Types.ObjectId;
    user: any;
    title: string; // min 7 max 75 characters
    description: string; // min 120 max 1200 characters
    requirements: string[]; // min 10 max 250 characters
    faq: { q: string; a: string }[];
    isDraft: boolean;
    category: string;
    subCategory: string;
    minPrice: number;
    days: number;
    priceRange: {
        min: number;
        max: number;
    };
    showcaseImageURL: string; // max-size 10MB
    visualURLs: string[]; //pdf - 2MB | video - 100MB | image - 10MB
    currency: string;
    createdAt: string;
    updatedAt: string;
    deletedAt: string;
}