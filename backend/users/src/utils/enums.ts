const languages = Object.freeze([
    { name: "english", code: "usa" },
    { name: "english", code: "cad" },
    { name: "english", code: "eng" },
    { name: "french", code: "fr" },
    { name: "urdu", code: "pak" },
    { name: "urdu", code: "ind" },
]);

const currencies = Object.freeze([
    { name: "canada", code: "CAD $" },
    { name: "usa", code: "USA $" },
    { name: "england", code: "GBR £" },
    { name: "france", code: "FR €" },
    { name: "germany", code: "DE €" },
    { name: "india", code: "RS ₹" },
]);

const permission = Object.freeze(["finances", "orders", "services", "users"]);

export enum accountType {
    AgencyOrCorporation = "agency/corporation",
    Freelancer = "freelancer",
    Client = "client",
}

export enum WalletProvider {
    Metamask = "metamask",
    WalletConnect = "wallet-connect",
}

export const enums = {
    currencies,
    languages,
    permission,
};

export enum ETemplate {
    team = "team",
    aboutUs = "about-us",
    portfolio = "portfolio",
}
