import { ObjectId, SchemaDefinitionProperty } from "mongoose";
import { WalletProvider } from "../../utils/enums";
import { enums } from "../utils/enums";

export interface Address {
    country: string;
    stateOrProvince: string;
    city: string;
    area: string;
}

export interface Emails {
    address: string;
    password: string;
    verified: boolean;
    otp: number;
    otpExpiry: string;
}

export interface Teams {
    title: String;
    photoRUL: String;
}

export interface Services {
    category: string;
    percengate: number;
}

export interface Web3Wallets {
    provider?: WalletProvider;
    address?: string;
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
    teamTemplate: {
        selectedTemplate: number;
        content: {
            description: string;
            team: Teams[];
        };
    };
    aboutUsTemplate: {
        selectedTemplate: number;
        content: object;
    };
    portfolioTemplate: {
        selectedTemplate: number;
        content: object;
    };
}

export default interface IUser extends SchemaDefinitionProperty<unknown> {
    _id: string | any;
    provider: { id: string; name: string };
    emails: Emails[];
    web3Wallets: Web3Wallets[];
    settings: {
        primaryEmail: number;
        primaryWallet: number;
        language: string;
        currency: { name: string; code: string };
        emailNotifications: [];
        pushNotifications: [];
    };
    deletedAt: Date | null;
    isActive: boolean;
    accountType: typeof enums.accountType;
    company: Company | null;
    nonce: string;
    otp: number;
    deactivate: boolean;
    deactivateUntil: number | null;
    createdAt: string;
    updatedAt: string;
}

export interface Profile {
    id: string;
    emails: { value: string, type: string }[];
    provider: string;
}