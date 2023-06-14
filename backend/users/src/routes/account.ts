import express from "express";
import * as account from "../controllers/account";
import checkToken from "../middlewares/checkAuth";

const router = express.Router();

// Routes to be added here
router.get("/", checkToken, account.getUser);

router.patch("/activate", checkToken, account.activateAccount);

router.patch("/deactivate", checkToken, account.deactivateAccount);

router.patch("/settings/notification", checkToken, account.accountNotification);

router.patch("/settings/preferences", checkToken, account.accountPreferencnes)

router.delete("/", checkToken, account.deleteUserById);

export { router as accountRouters };
