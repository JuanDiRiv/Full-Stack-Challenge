import { Router } from "express";
import {
  loginController,
  logoutController,
  sessionController,
} from "./auth.controller";
import { validateBody } from "../../middlewares/validate.middleware";
import { loginSchema } from "./auth.schema";

const authRouter = Router();

authRouter.post("/login", validateBody(loginSchema), loginController);
authRouter.post("/logout", logoutController);
authRouter.get("/session", sessionController);

export default authRouter;
