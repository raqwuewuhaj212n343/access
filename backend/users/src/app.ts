import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import { userRouter } from "./routes/user";
import { templateRouter } from "./routes/template";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from './errors/not-found-error';
import session from "./middlewares/session";
import passport from "passport";
import { Request, Response, NextFunction } from 'express';
import "../src/config/schedule";
import './utils/passport'
import cors from'cors';

const app = express();
app.use(json());
app.use(session())
app.use(cookieParser());
app.use(passport.initialize());

app.use(function(req: Request, res: Response, next: NextFunction) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "*");
    next();
});

app.use(cors({
    origin: [
      "http://localhost:3000",
      "https://www.seaclub-prod.online/",
      "*"
    ],
    credentials: true
}));

app.use('/api/v1/users', userRouter);

app.use('/api/v1/templates', templateRouter);

app.all('*', async(req, res, next) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };
