import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieParser from "cookie-parser";
import { projectRouter } from "./routes/project";
import { NotFoundError } from './errors/not-found-error';
import { errorHandler } from "@seaclub/common";
import { session } from "@seaclub/common";
import cors from'cors';

const app = express();

app.use(json());
app.use(session());
app.use(cookieParser());

app.use(cors({
    origin: [
      "http://localhost:3000",
      "https://www.seaclub-prod.online",
      "*"
    ],
    credentials: true
}));

app.use('/api/v1/projects', projectRouter);

app.all('*', async(req, res, next) => {
    throw new NotFoundError();
});

app.use(errorHandler);

export { app };