import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import { isHttpError } from "../utils/http-error";

export function errorMiddleware(
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
): void {
  const statusCode = isHttpError(error) ? error.statusCode : 500;
  const message =
    error instanceof Error ? error.message : "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
    // ...(env.NODE_ENV === "development" && { stack: error.stack }),
  });
}
