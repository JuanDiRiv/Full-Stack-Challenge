type LoginPayload = {
  email: string;
  password: string;
};

type LoginApiResponse = {
  success: boolean;
  message: string;
  data?: {
    token?: string;
  };
};

function getApiBaseUrl(): string {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
}

export async function loginRequest(
  payload: LoginPayload,
): Promise<LoginApiResponse> {
  const response = await fetch(`${getApiBaseUrl()}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responseBody = (await response.json()) as LoginApiResponse;

  if (!response.ok) {
    throw new Error(responseBody.message || "Login failed");
  }

  return responseBody;
}
