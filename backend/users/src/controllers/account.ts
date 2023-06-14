import { Request, Response } from "express";
import { InternalServerError } from "../errors/internal-server-error";
import * as US from "../services";
import { responses } from "../constants";
import { comparePassword } from "../utils/bcrypt";

const { user: userM  } = responses;

export async function getUser(req:Request, res:Response){

     const { user, error } = await US.getOne({ _id: req.user._id });

     if (error) throw new InternalServerError();
     else if (!user) throw new Error(userM.NOT_FOUND);

     res.status(200).json({message: userM.SUCCESS, user });
}

export async function deleteUserById(req: Request, res: Response){
     let _id: string | null = req.user._id, admin = req.user.isAdmin;

     if (req.params?.id) _id = admin ? req.params.id : null;

     const { user, error } = await US.update({ _id }, { isActive: false });

     if(error) throw new InternalServerError()
     else if (! user) throw new Error(userM.NOT_FOUND);
     
     res.sendStatus(201);
}

export async function deactivateAccount(req: Request, res: Response){
     const { password, duration } = req.body;
     let _id: string | null = req.user._id, admin = req.user.isAdmin;

     if(!duration) throw new Error(userM.DURATION_REQUIRED)
     if (req.params?.id) _id = admin ? req.params.id : null;

     const { user, error } = await US.getOne({ _id });

     if (error) throw new InternalServerError();
     else if (!user) throw new Error(userM.NOT_FOUND);

     const { emails, settings: { primaryEmail } } = user;
     const deactivateUntil = (new Date()).setDate(new Date().getDate() + duration);

     if(emails?.length && !admin) {
          const result = await comparePassword(password, emails[primaryEmail]?.password)
          if (!result) throw new Error(userM.WRONG_PASSWORD); 
     }

     user.deactivate = true;
     user.deactivateUntil = deactivateUntil;
     await user.save()

     res.sendStatus(201);
}

export async function activateAccount(req: Request, res: Response){
     let _id: string | null = req.user._id, admin = req.user.isAdmin;

     if (req.params?.id) _id = admin ? req.params.id : null;

     const { user, error } = await US.update({ _id }, { deactivate: false, deactivateUntil: null })

     if (error) throw new InternalServerError();
     else if (!user) throw new Error(userM.NOT_FOUND);

     res.sendStatus(201);
}

export async function accountPreferencnes(req: Request, res: Response){

     const { language, currency } = req.body;

     const { user, error } = await US.updatePreferences(req.user._id, { language, currency } )

     if (error) throw new InternalServerError();
     else if (!user) throw new Error(userM.NOT_FOUND);

     res.sendStatus(201);
}
 
export async function accountNotification(req: Request, res: Response){
     
      const { emailNotifications, pushNotifications } = req.body;

     const { user, error } = await US.updateNotification(req.user._id, { emailNotifications, pushNotifications} )

     if (error) throw new InternalServerError();
     else if (!user) throw new Error(userM.NOT_FOUND);

     res.sendStatus(201);
}