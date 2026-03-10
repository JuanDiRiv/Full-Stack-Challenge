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

type ApiEnvelope<TData> = {
  success: boolean;
  message: string;
  data: TData;
};

type BasicApiResponse = {
  success: boolean;
  message: string;
};

const getApiBaseUrl = (): string => {
  return process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:4000";
};

const CREDENTIALS_INCLUDE: RequestCredentials = "include";
const NO_STORE_CACHE: RequestCache = "no-store";

const getJsonHeaders = (): HeadersInit => {
  return {
    "Content-Type": "application/json",
  };
};

const parseApiResponse = async <TData>(
  httpResponse: Response,
): Promise<ApiEnvelope<TData>> => {
  const apiResponseBody = (await httpResponse.json()) as ApiEnvelope<TData>;

  if (!httpResponse.ok) {
    throw new Error(apiResponseBody.message || "Request failed");
  }

  return apiResponseBody;
};

export const loginRequest = async (
  payload: LoginPayload,
): Promise<BasicApiResponse> => {
  const httpResponse = await fetch(`${getApiBaseUrl()}/api/auth/login`, {
    method: "POST",
    credentials: CREDENTIALS_INCLUDE,
    headers: getJsonHeaders(),
    body: JSON.stringify(payload),
  });

  const responseBody = (await httpResponse.json()) as BasicApiResponse;

  if (!httpResponse.ok) {
    throw new Error(responseBody.message || "Login failed");
  }

  return responseBody;
};

export const logoutRequest = async (): Promise<BasicApiResponse> => {
  const httpResponse = await fetch(`${getApiBaseUrl()}/api/auth/logout`, {
    method: "POST",
    credentials: CREDENTIALS_INCLUDE,
  });

  const responseBody = (await httpResponse.json()) as BasicApiResponse;

  if (!httpResponse.ok) {
    throw new Error(responseBody.message || "Logout failed");
  }

  return responseBody;
};

export const getSessionStatus = async (): Promise<SessionStatusResponse> => {
  const httpResponse = await fetch(`${getApiBaseUrl()}/api/auth/session`, {
    method: "GET",
    credentials: CREDENTIALS_INCLUDE,
    cache: NO_STORE_CACHE,
  });

  const responseBody = (await httpResponse.json()) as SessionStatusResponse;

  if (!httpResponse.ok) {
    throw new Error(responseBody.message || "Unable to verify session");
  }

  return responseBody;
};

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

const normalizeReqResUser = (user: RawReqResUser): ReqResUser => {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName || user.first_name || "",
    lastName: user.lastName || user.last_name || "",
    avatar: user.avatar,
  };
};

export const getUsers = async (
  page: number,
): Promise<ApiEnvelope<ReqResUsersPage>> => {
  const httpResponse = await fetch(
    `${getApiBaseUrl()}/api/users?page=${encodeURIComponent(String(page))}`,
    {
      method: "GET",
      credentials: CREDENTIALS_INCLUDE,
      cache: NO_STORE_CACHE,
    },
  );

  const usersPageResponse =
    await parseApiResponse<RawReqResUsersData>(httpResponse);
  const reqResUsers =
    usersPageResponse.data.users || usersPageResponse.data.data || [];

  return {
    success: usersPageResponse.success,
    message: usersPageResponse.message,
    data: {
      users: reqResUsers.map(normalizeReqResUser),
      page: usersPageResponse.data.page || page,
      totalPages:
        usersPageResponse.data.totalPages ||
        usersPageResponse.data.total_pages ||
        1,
    },
  };
};

export const getUserById = async (
  id: string | number,
): Promise<ApiEnvelope<ReqResUser>> => {
  const httpResponse = await fetch(
    `${getApiBaseUrl()}/api/users/${encodeURIComponent(id)}`,
    {
      method: "GET",
      credentials: CREDENTIALS_INCLUDE,
      cache: NO_STORE_CACHE,
    },
  );

  const userResponse = await parseApiResponse<
    RawReqResUser | { user: RawReqResUser }
  >(httpResponse);
  const rawUser =
    "user" in userResponse.data ? userResponse.data.user : userResponse.data;

  return {
    success: userResponse.success,
    message: userResponse.message,
    data: normalizeReqResUser(rawUser),
  };
};

export const importUserByExternalId = async (
  id: string | number,
): Promise<ApiEnvelope<SavedUser>> => {
  const httpResponse = await fetch(
    `${getApiBaseUrl()}/api/users/import/${encodeURIComponent(String(id))}`,
    {
      method: "POST",
      credentials: CREDENTIALS_INCLUDE,
      headers: getJsonHeaders(),
    },
  );

  return parseApiResponse<SavedUser>(httpResponse);
};

export const getSavedUsers = async (): Promise<ApiEnvelope<SavedUser[]>> => {
  const httpResponse = await fetch(`${getApiBaseUrl()}/api/users/saved`, {
    method: "GET",
    credentials: CREDENTIALS_INCLUDE,
    cache: NO_STORE_CACHE,
  });

  return parseApiResponse<SavedUser[]>(httpResponse);
};

export const createPost = async (
  payload: CreatePostPayload,
): Promise<ApiEnvelope<Post>> => {
  const httpResponse = await fetch(`${getApiBaseUrl()}/api/posts`, {
    method: "POST",
    credentials: CREDENTIALS_INCLUDE,
    headers: getJsonHeaders(),
    body: JSON.stringify(payload),
  });

  return parseApiResponse<Post>(httpResponse);
};

export const getPosts = async (): Promise<ApiEnvelope<Post[]>> => {
  const httpResponse = await fetch(`${getApiBaseUrl()}/api/posts`, {
    method: "GET",
    credentials: CREDENTIALS_INCLUDE,
    cache: NO_STORE_CACHE,
  });

  return parseApiResponse<Post[]>(httpResponse);
};

export const getPostById = async (id: string): Promise<ApiEnvelope<Post>> => {
  const httpResponse = await fetch(
    `${getApiBaseUrl()}/api/posts/${encodeURIComponent(id)}`,
    {
      method: "GET",
      credentials: CREDENTIALS_INCLUDE,
      cache: NO_STORE_CACHE,
    },
  );

  return parseApiResponse<Post>(httpResponse);
};

export const updatePost = async (
  id: string,
  payload: UpdatePostPayload,
): Promise<ApiEnvelope<Post>> => {
  const httpResponse = await fetch(
    `${getApiBaseUrl()}/api/posts/${encodeURIComponent(id)}`,
    {
      method: "PATCH",
      credentials: CREDENTIALS_INCLUDE,
      headers: getJsonHeaders(),
      body: JSON.stringify(payload),
    },
  );

  return parseApiResponse<Post>(httpResponse);
};

export const deletePost = async (id: string): Promise<ApiEnvelope<null>> => {
  const httpResponse = await fetch(
    `${getApiBaseUrl()}/api/posts/${encodeURIComponent(id)}`,
    {
      method: "DELETE",
      credentials: CREDENTIALS_INCLUDE,
    },
  );

  return parseApiResponse<null>(httpResponse);
};
