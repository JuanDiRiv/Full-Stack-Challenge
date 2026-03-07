import { NextFunction, Request, Response } from "express";
import { HttpError } from "../utils/http-error";

export function notFoundMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  next(new HttpError(`Route not found: ${req.method} ${req.originalUrl}`, 404));
}
