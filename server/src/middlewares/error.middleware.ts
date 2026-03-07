import { NextFunction, Request, Response } from "express";
import { env } from "../config/env";
import { HttpError } from "../utils/http-error";

export function errorMiddleware(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  const statusCode = error instanceof HttpError ? error.statusCode : 500;

  res.status(statusCode).json({
    success: false,
    message: error.message || "Internal server error",
    ...(env.NODE_ENV === "development" && { stack: error.stack })
  });
}
