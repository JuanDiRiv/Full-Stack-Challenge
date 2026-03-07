import { Router } from "express";
import healthRouter from "./health.routes";
import authRouter from "../modules/auth/auth.routes";

const apiRouter = Router();

apiRouter.use(healthRouter);
apiRouter.use("/auth", authRouter);

export default apiRouter;
