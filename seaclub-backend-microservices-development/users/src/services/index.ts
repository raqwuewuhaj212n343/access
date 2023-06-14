import User from "../models/user";
import IUser from "../@types/user";

export async function create(body: Partial<IUser>) {
    try {
        const user = await User.create(body);
        return { user };
    } catch (error) {
        return { error };
    }
}

export async function update(filter: Partial<IUser>, body: Partial<IUser>) {
    try {
        const user = await User.findOneAndUpdate(
            { ...filter, deletedAt: null }, { $set: body }, { new: false }
        ).lean();
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

export async function getMany(filter: Partial<IUser>){
    return new Promise(async (resolve, reject) => {
        try {
            const users = await User.find(filter);
            resolve(users)
        }catch(error){
            reject(error)
        }
    })
}

export function getOneInWallets(address: string) {
    const query: Record<string, any> = { 'web3Wallets.address': { $in: address } };
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

export async function updatePreferences(_id: string, filter: Record<string, any>) {
    const updates = { 'settings.language': filter.language, 'settings.currency': filter.currency }
    try {
        const user = await User.findOneAndUpdate({ _id }, { $set: updates }, { new: true })
        return { user }
    } catch (error) {
        return { error }
    }
}

export async function updateNotification(_id: string, filter: Record<string, any>) {
    const updates = {
        "settings.emailNotifications": filter.emailNotifications,
        "settings.pushNotifications": filter.pushNotifications,
    };
    try {
        const user = await User.findOneAndUpdate({ _id }, { $set: updates }, { new: true })
        return { user }
    } catch (error) {
        return { error }
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


