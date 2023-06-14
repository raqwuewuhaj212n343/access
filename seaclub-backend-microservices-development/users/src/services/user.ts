import User from "../models/user";
import IUser, { Profile } from "../@types/user";

export async function create(body: Partial<IUser>) {
    try {
        const user = await User.create(body);
        return { user };
    } catch (error) {
        return { error };
    }
}

export async function update(filter: Partial<IUser>, body: Record<string, any>) {
    try {
        const user = await User.findOneAndUpdate(
            { ...filter, deletedAt: null },
            { $set: body },
            { new: true }
        );
        return { user };
    } catch (error) {
        return { error };
    }
}


export async function deleteById(id: string) {
    try {
        const user = await User.findByIdAndUpdate(id, { $currentDate: { deletedAt: true } });
        return { user };
    } catch (error) {
        return { error };
    }
}

export async function getOne(filter: Partial<IUser>, projection: object = {}) {
    try {
        const user = await User.findOne({ ...filter, deletedAt: null }, projection);
        return { user };
    } catch (error) {
        return { error };
    }
}

export function getOneInWallets(address: string) {
    const query: Record<string, any> = { 'web3Wallets.address': address };
    return getOne(query);
}

export function getOneInEmails(address: string) {
    const query: Record<string, any> = { 'emails.address': address };
    return getOne(query);
}

export function getUserCompany(id: string) {
    return getOne({ _id: id }, { company: 1 });
}

export async function activateWallet(_id: string, address: string) {
    const { user } = await getOne({ _id });
    const index = user?.web3Wallets.findIndex(wa => wa.address === address);
    if (index === undefined || index < 0) return { error: "WALLET NOT FOUND" };

    try {
        const user = await User.findByIdAndUpdate(_id, { $set: { "settings.primaryWallet": index } }, { new: true });
        return { user };
    } catch (error) {
        return { error };
    }
}


export async function removeElementFromArray(_id: string, filter: Record<string, any>) {
    try {
        const user = await User.findOneAndUpdate({ _id }, { $pull: filter }, { new: true })
        return { user }
    } catch (error) {
        return { error }
    }
}

export async function addElementToArray(_id: string, filter: Record<string, any>) {
    try {
        const user = await User.findOneAndUpdate({ _id }, { $push: filter }, { new: true }); 
        return { user };
    } catch (error) {
        return { error };
    }
}

export async function findByEmailOrCreateUser(profile: Profile) {
    
    const { id, emails, provider } = profile;
    const user = await User.findOne({ email: emails[0].value });
    
    if (!user) {
        try  {
            return await User.create({
                emails: [{ address: emails[0].value.toLowerCase().trim(), verified: false, otp: 0, otpExpiry: '' }], 
                provider: { id, name: provider },
            });
        } catch(error) {
            return error;
        }
    } 

    return user;
};

