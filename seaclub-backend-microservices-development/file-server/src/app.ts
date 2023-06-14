import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import { fileRouter } from "./routes";
import { errorHandler } from "./middlewares/error-handler";
import { NotFoundError } from './errors/not-found-error';
import session from "./middlewares/session";
import passport from "passport";
import "../src/config/schedule";
import './utils/passport'

const app = express();

app.use(json());
app.use(session())
app.use(cookieParser());
app.use(passport.initialize());

app.use('/api/v1/files', fileRouter);

app.all('*', async(req, res, next) => {
    throw new NotFoundError();
});

app.use(errorHandler);


export { app };