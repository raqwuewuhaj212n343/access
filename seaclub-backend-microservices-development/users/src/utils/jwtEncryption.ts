import dotenv from  "dotenv";
import JWT from "jsonwebtoken";

dotenv.config()

export function jwtEncrypt(data: Record<string, any>, expiration: string = "5m") {
    let accessToken = JWT.sign(data, process.env.ACCESS_TOKEN, {
        expiresIn: expiration,
    });
    return accessToken;
}

export function jwtDecrypt(token: string):any {
    let data = null;
    JWT.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
        if (err) return;
        else data = user;
    });
    return data;
}

