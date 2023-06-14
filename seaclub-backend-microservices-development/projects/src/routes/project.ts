import express from "express";
import { authenticateToken as checkToken } from "@seaclub/common";
import * as project from "../controllers";

const router = express.Router();

router.post("/", checkToken, project.create);

router.patch("/:id", checkToken, project.update);

router.delete("/:id", checkToken, project.deleteOne);

router.get("/:id", checkToken, project.getOne);

router.get("/", checkToken, project.getManyByUserId);

export { router as projectRouter };