import { model, Schema, Model } from "mongoose";
import IUser, { Web3Wallets } from "../@types/user";
import { accountType, WalletProvider } from "../utils/enums";
import { genNonce } from "../utils/randomGenerators";
import { maxArrayLength, validateAddress } from "../utils/validators";
import { UserCreatedPublisher } from "../events/publishers/user-created-publisher";
import { rabbitmqWrapper } from "@seaclub/common";
import { UserUpdatedPublisher } from "../events/publishers/user-updated-publisher";
import { FileConfirmationPublisher } from "../events/publishers/file-confirmation-publisher";

type UserTypes = Model<Omit<IUser, "_id">>;

const AddressSchema = new Schema(
    {
        country: { type: String, required: true },
        stateOrProvince: { type: String, required: true },
        city: { type: String, required: true },
        area: { type: String },
    },
    { _id: false, timestamps: false }
);

const CompanySchema = new Schema({
    name: String,
    industry: String,
    location: { type: AddressSchema },
    companySize: Number,
    descrption: String, // biography
    services: {
        validate: [maxArrayLength(100), "{PATH} exceeds the limit of {MAXLENGTH}"],
        type: [{ category: String, percentage: Number }]
    },
    bannerURL: String,
    logoURL: String,
    languages: [String],
    timezones: [{ type: Number, min: -11, max: 12 }],
    targetLocations: [AddressSchema],
}, { _id: false, timestamps: false });

const UserSchema = new Schema<Omit<IUser, "_id">, UserTypes>({
    provider: { type: Object, id: String, name: String },
    emails: {
        type: [{ address: String, password: String, verified: Boolean, otp: Number, otpExpiry: Date }],
        validate: [{
            validator: function (this: IUser) { return maxArrayLength(5)(this.emails) },
            message: `Emails exceeds the limit of {MAXLENGTH}`,
        }],
    },
    web3Wallets: {
        type: [{
            provider: { type: String, enum: Object.values(WalletProvider) },
            address: { type: String }
        }],
        validate: [
            {
                validator: function (this: IUser) { return maxArrayLength(5)(this?.web3Wallets) },
                message: 'Wallet Address Naximum reached'
            },
            {
                validator: function (this: IUser) {
                    return !validateAddress(this.web3Wallets.map(wb => ({ address: wb?.address as string })))
                },
                message: 'wallet Address already exists'
            }
        ]
    },
    settings: {
        primaryEmail: { type: Number, default: 0 }, // index
        primaryWallet: { type: Number, default: 0 }, // index
        language: String,
        currency: { type: Object, name: String, code: String },
        emailNotifications: [],
        pushNotifications: [],
    },
    deletedAt: { type: Date, default: null }, // default null
    isActive: { type: Boolean, default: true, partialFilterExpression: { isActive: true } },
    accountType: { type: String, enum: Object.values(accountType), default: accountType.AgencyOrCorporation },
    company: { type: CompanySchema, default: null },
    otp: Number,
    nonce: { type: String, default: genNonce().toString() },
    deactivate: { type: Boolean, default: false },
    deactivateUntil: { type: Number, default: null }

}, { timestamps: true });

/*
UserSchema.pre(/^find/, function (this: QueryWithHelpers<Document[], Document>, next) {
    // NOTE: might be better to add it to actual query incase admins need access to deleted docs
    // const query = this.getFilter();
    this.where({deletedAt: null}); 
    next();
});
*/


UserSchema.index({ "emails.address": 1 }, { unique: true, partialFilterExpression: { "emails.address": { $exists: true } } });

UserSchema.index({ "web3Wallets.address": 1 }, { unique: true, partialFilterExpression: { "web3Wallets.address": { $exists: true } } });

UserSchema.post("save", async function(doc, next) {
    await new UserCreatedPublisher(rabbitmqWrapper.channel).publish(doc);

    const files = [];
    if (doc.company?.logoURL) files.push(doc.company.logoURL);
    if (doc.company?.bannerURL) files.push(doc.company.bannerURL);
    if (files.length) await new FileConfirmationPublisher(rabbitmqWrapper.channel).publish(files);

    next();
});

UserSchema.post('findOneAndUpdate', async function (result) {
    try {
        // Access the updated document using the result object
        const updatedDocument = await this.model.findOne(this.getFilter());

        await new UserUpdatedPublisher(rabbitmqWrapper.channel).publish(updatedDocument)

    } catch (error) {
        console.error('Error in findOneAndUpdate post middleware:', error);
    }
  });
  
const User = model<Omit<IUser, "_id">, UserTypes>("User", UserSchema);

export default User;

