import { NextFunction, Request, Response } from "express";
import { AuthenticationError } from "../errors/auth-error"
import { jwtDecrypt } from "../utils/jwtEncryption";

const authenticateToken = (req: Request, res:Response, next: NextFunction) => {

  const { token } = req.session;
 
  if (!token) throw new AuthenticationError();

  const user = jwtDecrypt(token);

  if (!user) throw new AuthenticationError();
  else {
    req.user = user;
    next()
  };
};

export default authenticateToken
