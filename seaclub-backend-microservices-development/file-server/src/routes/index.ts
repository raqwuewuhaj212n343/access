import express from "express";
import checkToken from "../middlewares/checkAuth";
import * as file from "../controllers";
import { multerInstance } from "../middlewares/fileManagement";

const template = multerInstance('templates', 50).fields([
    { name: 'images' }, { name: 'banner', maxCount: 1 }, { name: 'logo', maxCount: 1 }
]);
const project = multerInstance('projects').fields([{ name: 'visuals' }, { name: 'showcaseImage', maxCount: 1 }]);
const company = multerInstance('company', 50).fields([{ name: 'banner', maxCount: 1 }, { name: 'logo', maxCount: 1 }]);

const router = express.Router();

router.get("/path/:path", checkToken, file.getFilesAtPath);

router.post("/company", checkToken, company, file.create);

router.post("/template", checkToken, template, file.create);

router.post("/project", checkToken, project, file.create);

router.post("/delete", checkToken, project, file.deleteMany);

export { router as fileRouter };