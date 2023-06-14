import { Express } from "express-serve-static-core";
import { SessionData } from "cookie-session";

interface User {
    _id: string;
    permissions: string;
    isAdmin: boolean;
    isVendor: boolean;
    isBuyer: boolean;
    allowed: boolean;
}

declare module "express-serve-static-core" {
    interface Request {
        session: SessionData & { token?: string };
        user: User;
    }
}
