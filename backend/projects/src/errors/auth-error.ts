import { CustomError } from "./custom-error";

export class AuthenticationError extends CustomError {
    statusCode = 401;

    constructor() {
        super("Not Authenticated")

        Object.setPrototypeOf(this, AuthenticationError.prototype);
    };

    serializeErrors() {
        return [{ message: "Not Authenticated" }];
    }
};