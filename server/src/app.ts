import cors from "cors";
import cookieParser from "cookie-parser";
import express, { NextFunction, Request, Response } from "express";
import apiRouter from "./routes";
import { errorMiddleware } from "./middlewares/error.middleware";
import { notFoundMiddleware } from "./middlewares/not-found.middleware";
import { env } from "./config/env";

const app = express();

function parseAllowedOrigins(corsOriginValue: string): string[] {
  return corsOriginValue
    .split(",")
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);
}

const allowedOrigins = parseAllowedOrigins(env.CORS_ORIGIN);

function isAllowedCorsOrigin(requestOrigin?: string): boolean {
  if (!requestOrigin) {
    return true;
  }

  return allowedOrigins.includes(requestOrigin);
}

app.use(
  cors({
    credentials: true,
    origin: (requestOrigin, callback) => {
      if (isAllowedCorsOrigin(requestOrigin)) {
        callback(null, true);
        return;
      }

      callback(new Error(`CORS blocked for origin: ${requestOrigin}`));
    },
  }),
);
app.use(cookieParser());
app.use(express.json());

app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

app.use("/api", apiRouter);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
