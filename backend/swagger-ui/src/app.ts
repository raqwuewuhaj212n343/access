import express from "express";
import "express-async-errors";
import { json } from "body-parser";
import cookieParser from "cookie-parser";

import swaggerUi from 'swagger-ui-express';

const options = {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: `/api-docs/urls/users.v1.json`,
        name: 'users'
      },
      {
        url: `/api-docs/urls/projects.v1.json`,
        name: 'projects'
      },
      {
        url: `/api-docs/urls/files.v1.json`,
        name: 'files'
      }
    ]
  }
};

const app = express();

app.use(json());
app.use(cookieParser());

app.use('/api-docs/urls', express.static("src/urls"));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(undefined, options));

app.all('/*', async () => { console.log("not Found error", __dirname) });

export { app };