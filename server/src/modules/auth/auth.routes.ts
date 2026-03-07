import { Router } from "express";
import { loginController } from "./auth.controller";
import { validateBody } from "../../middlewares/validate.middleware";
import { loginSchema } from "./auth.schema";

const authRouter = Router();

authRouter.post("/login", validateBody(loginSchema), loginController);

export default authRouter;
