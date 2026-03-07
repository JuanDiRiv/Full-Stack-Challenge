import { Router } from "express";
import healthRouter from "./health.routes";
import authRouter from "../modules/auth/auth.routes";
import usersRouter from "../modules/users/users.routes";

const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use("/auth", authRouter);
apiRouter.use("/users", usersRouter);

export default apiRouter;
