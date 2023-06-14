export const preferences = {
    language: "english",
    currency: {
        name: "dollar",
        code: "USD",
    },
};
export const notification = {
    emailNotifications: [],
    pushNotifications: [],
};

export const web3 = {
    
    invalidInput: {
        address: "0x885f65a865298b6d4829eeefe52dd51f8ec85",
        provider: "metamask",
    },
    validNotPrimary: {
        address: "0x99b4b272f955c09c27bbc62afa6076d9253fcf39",
        provider: "metamask"
    },
    validInput: function () {
        return {
            ...this.invalidInput,
            address: "0xd04ef3908db7f003887525c684794d77dc764655",
        };
    },
    payload: {
        provider: "metamask",
        web3Wallets: [
            {
                provider: "metamask",
                address: "0xd04ef3908db7f003887525c684794d77dc764655",
                _id: "6457ea32b5e98301bcce3b36",
            },
            {
                provider: "metamask",
                address: "0x99b4b272f955c09c27bbc62afa6076d9253fcf39",
                _id: "6457ea32b5e98301bdcf3b36",
            },
        ],
        settings: {
            primaryEmail: 0,
            primaryWallet: 0,
            emailNotifications: [],
            pushNotifications: [],
        },
        deletedAt: null,
        isActive: true,
        accountType: "freelancer",
        company: null,
        nonce: "563368",
        _id: "6457ea32b5e98301bcce3b35",
        emails: [],
        createdAt: "2023-05-07T18:13:06.217Z",
        updatedAt: "2023-05-07T18:13:06.217Z",
        __v: 0,
        save: function () {},
    },
    hash: "mockHash",
    token: "token",
    invalidloginInput: {
        address: "0xd04ef3908db7f003887525c684794d77dc7646",
        hash: "mockHash",
    },
    validLoginInput: {
        address: "0xd04ef3908db7f003887525c684794d77dc764655",
        hash: "mockHash",
    },
};


export const emails = {
    resetPasswordInput: {
        email: "odunayoshittu55@gmail.com",
        currentPassword: "odundlaw",
        newPassword: "examplePassword",
    },
    validInput: {
        email: "odunayoshittu55@gmail.com",
        password: "odundlaw",
    },
    validNotPrimary: {
        email: "odunayoshittu55@yahoo.com",
        password: "odundlaw",
    },
    invalidInput: {
        email: "dlaw",
        password: "odundlaw",
    },
    emailOTP2: {
        email: "odunayoshittu55@hotmail.com",
        otp: 12345,
    },
    emailOTP: {
        email: "odunayoshittu55@gmail.com",
        otp: 123456,
    },
    payload: {
        provider: "",
        emails: [
            {
                address: "odunayoshittu55@gmail.com",
                password: "odundlaw",
                verified: false,
                otp: 123456,
                otpExpiry: 1684720030687,
                _id: "6457ea32b5e98301bcce3b36",
            },
            {
                address: "odunayoshittu55@yahoo.com",
                password: "odundlaw",
                verified: true,
                otp: 0,
                otpExpiry: "",
                _id: "6457ea32b5e98301bcce3b37",
            },
            {
                address: "odunayoshittu55@hotmail.com",
                password: "odundlaw",
                verified: false,
                otp: 123456,
                otpExpiry: 1716290691176,
                _id: "6457ea32b5e98301bccd3b37",
            },
        ],
        settings: {
            primaryEmail: 0,
            primaryWallet: 0,
            emailNotifications: [],
            pushNotifications: [],
        },
        deletedAt: null,
        isActive: false,
        accountType: "freelancer",
        company: null,
        nonce: "563368",
        _id: "6457ea32b5e98301bcce3b35",
        web3Wallets: [],
        createdAt: "2023-05-07T18:13:06.217Z",
        updatedAt: "2023-05-07T18:13:06.217Z",
        __v: 0,
        save: () => {},
    },
};