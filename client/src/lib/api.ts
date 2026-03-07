import type { ReqResUser, ReqResUsersPage } from "@/types/reqres-user";

type LoginPayload = {
  email: string;
  password: string;
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
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

async function parseApiResponse<T>(
  response: Response,
): Promise<ApiResponse<T>> {
  const responseBody = (await response.json()) as ApiResponse<T>;

  if (!response.ok) {
    throw new Error(responseBody.message || "Request failed");
  }

  return responseBody;
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

type RawReqResUser = {
  id: number;
  email: string;
  first_name?: string;
  last_name?: string;
  firstName?: string;
  lastName?: string;
  avatar: string;
};

type RawReqResUsersData = {
  users?: RawReqResUser[];
  data?: RawReqResUser[];
  page?: number;
  totalPages?: number;
  total_pages?: number;
};

function normalizeReqResUser(user: RawReqResUser): ReqResUser {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName || user.first_name || "",
    lastName: user.lastName || user.last_name || "",
    avatar: user.avatar,
  };
}

export async function getUsers(
  page: number,
): Promise<ApiResponse<ReqResUsersPage>> {
  const response = await fetch(
    `${getApiBaseUrl()}/api/users?page=${encodeURIComponent(String(page))}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const parsed = await parseApiResponse<RawReqResUsersData>(response);
  const list = parsed.data.users || parsed.data.data || [];

  return {
    success: parsed.success,
    message: parsed.message,
    data: {
      users: list.map(normalizeReqResUser),
      page: parsed.data.page || page,
      totalPages: parsed.data.totalPages || parsed.data.total_pages || 1,
    },
  };
}

export async function getUserById(
  id: string | number,
): Promise<ApiResponse<ReqResUser>> {
  const response = await fetch(
    `${getApiBaseUrl()}/api/users/${encodeURIComponent(id)}`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  const parsed = await parseApiResponse<
    RawReqResUser | { user: RawReqResUser }
  >(response);
  const user = "user" in parsed.data ? parsed.data.user : parsed.data;

  return {
    success: parsed.success,
    message: parsed.message,
    data: normalizeReqResUser(user),
  };
}
