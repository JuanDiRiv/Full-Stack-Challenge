import { NextFunction, Request, Response } from "express";
import { createHttpError } from "../utils/http-error";

export function notFoundMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  next(
    createHttpError(`Route not found: ${req.method} ${req.originalUrl}`, 404),
  );
}
