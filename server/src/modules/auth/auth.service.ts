import { HttpError } from "../../utils/http-error";
import { env } from "../../config/env";
import { LoginInput } from "./auth.schema";

interface ReqResLoginSuccess {
  token: string;
}

interface ReqResLoginError {
  error?: string;
}

export async function loginWithReqRes(input: LoginInput): Promise<string> {
  let response: Response;
  const baseUrl = env.REQRES_BASE_URL.replace(/\/+$/, "");
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": "fullstack-challenge/1.0",
  };

  if (env.REQRES_API_KEY) {
    headers["x-api-key"] = env.REQRES_API_KEY;
  }

  try {
    response = await fetch(`${baseUrl}/api/login`, {
      method: "POST",
      headers,
      body: JSON.stringify({
        email: input.email,
        password: input.password,
      }),
    });
  } catch {
    throw new HttpError("Unable to complete login request", 502);
  }

  if (!response.ok) {
    let errorMessage = "Invalid email or password";

    if (response.status === 401 || response.status === 403) {
      throw new HttpError("Authentication request rejected", response.status);
    }

    try {
      const errorBody = (await response.json()) as ReqResLoginError;

      if (errorBody.error) {
        errorMessage =
          response.status === 400
            ? "Invalid email or password"
            : "Login request failed";
      }
    } catch {
      errorMessage = "Login request failed";
    }

    throw new HttpError(errorMessage, response.status || 500);
  }

  const data = (await response.json()) as ReqResLoginSuccess;

  if (!data.token) {
    throw new HttpError("Login failed: token not received", 502);
  }

  return data.token;
}
