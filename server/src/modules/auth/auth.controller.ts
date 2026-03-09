import { NextFunction, Request, Response } from "express";
import { LoginInput } from "./auth.schema";
import { loginWithReqRes } from "./auth.service";
import { env } from "../../config/env";

const AUTH_COOKIE_NAME = "auth_token";

function getAuthCookieOptions() {
  const isProduction = env.NODE_ENV === "production";

  return {
    httpOnly: true,
    sameSite: isProduction ? ("none" as const) : ("lax" as const),
    secure: isProduction,
    path: "/",
  };
}

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const body = req.body as LoginInput;
    const token = await loginWithReqRes(body);

    res.cookie(AUTH_COOKIE_NAME, token, getAuthCookieOptions());

    res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    next(error);
  }
}

export async function logoutController(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    res.clearCookie(AUTH_COOKIE_NAME, {
      ...getAuthCookieOptions(),
      maxAge: 0,
    });

    res.status(200).json({
      success: true,
      message: "Logout successful",
    });
  } catch (error) {
    next(error);
  }
}

export async function sessionController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const token = req.cookies?.[AUTH_COOKIE_NAME];

    res.status(200).json({
      success: true,
      message: "Session status retrieved",
      data: {
        authenticated: typeof token === "string" && token.length > 0,
      },
    });
  } catch (error) {
    next(error);
  }
}
