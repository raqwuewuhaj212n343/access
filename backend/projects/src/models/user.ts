import { model, Schema, Model } from "mongoose";
import IUser from '../@types/user';

type UserTypes = Model<Omit<IUser, "_id">>;

const AddressSchema = new Schema({
    country: { type: String, required: true },
    stateOrProvince: { type: String, required: true },
    city: { type: String, required: true },
    area: { type: String },

}, { _id: false, timestamps: false });

const CompanySchema = new Schema({
    name: String,
    industry: String,
    location: { type: AddressSchema },
    companySize: Number,
    descrption: String,
    services: {
        type: [{ category: String, percentage: Number }]
    },
    bannerURL: String,
    logoURL: String,
    languages: [String],
    timezones: [{ type: Number, min: -11, max: 12 }],
    targetLocations: [AddressSchema]

}, { _id: false, timestamps: false });

const UserSchema = new Schema<Omit<IUser, "_id">, UserTypes>({
    settings: {
        primaryEmail: { type: Number, default: 0 },
        primaryWallet: { type: Number, default: 0 },
        language: String,
        currency: { type: Object, name: String, code: String },
        emailNotifications: [],
        pushNotifications: [],
    },
    deletedAt: { type: Date, default: null },
    isActive: Boolean,
    accountType: String,
    company: { type: CompanySchema, default: null },

}, { timestamps: true });

const User = model<Omit<IUser, "_id">, UserTypes>("User", UserSchema);

export default User;