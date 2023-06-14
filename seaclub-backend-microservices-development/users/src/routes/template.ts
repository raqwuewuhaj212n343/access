import express from "express";
import checkToken from "../middlewares/checkAuth";
import * as template from "../controllers/template";

const router = express.Router();

router.post("/:section", checkToken, template.create);

router.put("/:section/:id", checkToken, template.update);

router.delete("/:id", checkToken, template.deleteOne);

router.get("/", checkToken, template.getManyByUserId);

router.get("/:id", checkToken, template.getOne);

export { router as templateRouter };