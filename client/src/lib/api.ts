import type { ReqResUser, ReqResUsersPage } from "@/types/reqres-user";
import type { SavedUser } from "@/types/saved-user";
import type { CreatePostPayload, Post, UpdatePostPayload } from "@/types/post";

type LoginPayload = {
  email: string;
  password: string;
};

type SessionStatusResponse = {
  success: boolean;
  message: string;
  data: {
    authenticated: boolean;
  };
};

type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

type BasicApiResponse = {
  success: boolean;
  message: string;
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
): Promise<BasicApiResponse> {
  const response = await fetch(`${getApiBaseUrl()}/api/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const responseBody = (await response.json()) as BasicApiResponse;

  if (!response.ok) {
    throw new Error(responseBody.message || "Login failed");
  }

  return responseBody;
}

export async function logoutRequest(): Promise<BasicApiResponse> {
  const response = await fetch(`${getApiBaseUrl()}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  const responseBody = (await response.json()) as BasicApiResponse;

  if (!response.ok) {
    throw new Error(responseBody.message || "Logout failed");
  }

  return responseBody;
}

export async function getSessionStatus(): Promise<SessionStatusResponse> {
  const response = await fetch(`${getApiBaseUrl()}/api/auth/session`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  const responseBody = (await response.json()) as SessionStatusResponse;

  if (!response.ok) {
    throw new Error(responseBody.message || "Unable to verify session");
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
      credentials: "include",
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
      credentials: "include",
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

export async function importUserByExternalId(
  id: string | number,
): Promise<ApiResponse<SavedUser>> {
  const response = await fetch(
    `${getApiBaseUrl()}/api/users/import/${encodeURIComponent(String(id))}`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return parseApiResponse<SavedUser>(response);
}

export async function getSavedUsers(): Promise<ApiResponse<SavedUser[]>> {
  const response = await fetch(`${getApiBaseUrl()}/api/users/saved`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  return parseApiResponse<SavedUser[]>(response);
}

export async function createPost(
  payload: CreatePostPayload,
): Promise<ApiResponse<Post>> {
  const response = await fetch(`${getApiBaseUrl()}/api/posts`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return parseApiResponse<Post>(response);
}

export async function getPosts(): Promise<ApiResponse<Post[]>> {
  const response = await fetch(`${getApiBaseUrl()}/api/posts`, {
    method: "GET",
    credentials: "include",
    cache: "no-store",
  });

  return parseApiResponse<Post[]>(response);
}

export async function getPostById(id: string): Promise<ApiResponse<Post>> {
  const response = await fetch(
    `${getApiBaseUrl()}/api/posts/${encodeURIComponent(id)}`,
    {
      method: "GET",
      credentials: "include",
      cache: "no-store",
    },
  );

  return parseApiResponse<Post>(response);
}

export async function updatePost(
  id: string,
  payload: UpdatePostPayload,
): Promise<ApiResponse<Post>> {
  const response = await fetch(
    `${getApiBaseUrl()}/api/posts/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  return parseApiResponse<Post>(response);
}

export async function deletePost(id: string): Promise<ApiResponse<null>> {
  const response = await fetch(
    `${getApiBaseUrl()}/api/posts/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      credentials: "include",
    },
  );

  return parseApiResponse<null>(response);
}
