import { NextFunction, Request, Response } from "express";
import { LoginInput } from "./auth.schema";
import { loginWithReqRes } from "./auth.service";

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const body = req.body as LoginInput;
    const token = await loginWithReqRes(body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
}
