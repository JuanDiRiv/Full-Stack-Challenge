import { createHttpError } from "../../utils/http-error";
import { env } from "../../config/env";
import { LoginInput } from "./auth.schema";

interface ReqResLoginSuccess {
  token: string;
}

interface ReqResLoginErrorResponse {
  error?: string;
}

export async function loginWithReqRes(
  credentials: LoginInput,
): Promise<string> {
  let reqResResponse: Response;
  const reqResBaseUrl = env.REQRES_BASE_URL.replace(/\/+$/, "");
  const requestHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": "fullstack-challenge/1.0",
  };

  if (env.REQRES_API_KEY) {
    requestHeaders["x-api-key"] = env.REQRES_API_KEY;
  }

  try {
    reqResResponse = await fetch(`${reqResBaseUrl}/api/login`, {
      method: "POST",
      headers: requestHeaders,
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
  } catch {
    throw createHttpError("Unable to complete login request", 502);
  }

  if (!reqResResponse.ok) {
    let errorMessage = "Invalid email or password";

    if (reqResResponse.status === 401 || reqResResponse.status === 403) {
      throw createHttpError(
        "Authentication request rejected",
        reqResResponse.status,
      );
    }

    try {
      const errorResponse =
        (await reqResResponse.json()) as ReqResLoginErrorResponse;

      if (errorResponse.error) {
        errorMessage =
          reqResResponse.status === 400
            ? "Invalid email or password"
            : "Login request failed";
      }
    } catch {
      errorMessage = "Login request failed";
    }

    throw createHttpError(errorMessage, reqResResponse.status || 500);
  }

  const loginSuccessResponse =
    (await reqResResponse.json()) as ReqResLoginSuccess;

  if (!loginSuccessResponse.token) {
    throw createHttpError("Login failed: token not received", 502);
  }

  return loginSuccessResponse.token;
}
