import { ObjectId, SchemaDefinitionProperty } from "mongoose";

export interface Address {
    country: string;
    stateOrProvince: string;
    city: string;
    area: string;
}

export interface Services {
    category: string;
    percengate: number;
}

export interface Company {
    name: string;
    industry: string;
    location: Address;
    companySize: number;
    descrption: string;
    services: Services[];
    bannerURL: string;
    logoURL: string;
    languages: string[];
    timezones: number;
    targetLocations: Address[];
}

export default interface IUser extends SchemaDefinitionProperty<unknown> {
    _id: string | any;
    settings: {
        language: string;
        currency: { name: String; code: String };
    };
    deletedAt: Date | null;
    isActive: boolean;
    accountType: typeof enums.accountType;
    company: Company | null;
}