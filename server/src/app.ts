import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import apiRouter from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { env } from "./config/env";

const app = express();

app.use(
  cors({
    origin: env.CORS_ORIGIN,
  }),
);
app.use(express.json());

app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use("/api", apiRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
