import passport from "passport";
import { linkedIn } from "../constants";
import { Request, Response, NextFunction } from "express";

// save user req params since req object will be reset by linkedin  
function saveParams(req: Request, res: Response, next: NextFunction) {
    const { organizationId, vanityName } = req.query;
    if (organizationId) linkedIn.organizationId = organizationId as string;
    if (vanityName) linkedIn.vanityName = vanityName as string;
 
    // authenticate middleware returns middleware, So (req, res, next) must be added to run it.
    passport.authenticate('organizationStrategy')(req, res, next)
 };

 export { saveParams, linkedIn };
 