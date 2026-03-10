import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { createHttpError } from "../utils/http-error";

export function validateBody(schema: ZodTypeAny) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const firstIssue = result.error.issues[0];
      const message = firstIssue?.message || "Invalid request body";
      next(createHttpError(message, 400));
      return;
    }

    req.body = result.data;
    next();
  };
}
