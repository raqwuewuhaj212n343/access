import { CustomError } from "./custom-error";

export class AuthorizationError extends CustomError {
    statusCode = 403;

    constructor() {
        super("Not Authorized to perform this operation")

        Object.setPrototypeOf(this, AuthorizationError.prototype);
    };

    serializeErrors() {
        return [{ message: "Not Authorized to perform this operation" }];
    }
};