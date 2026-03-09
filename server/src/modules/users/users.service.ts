import { isValidObjectId } from "mongoose";
import { env } from "../../config/env";
import { HttpError } from "../../utils/http-error";
import { SavedUserModel } from "./users.model";

interface ReqResUser {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface ReqResUserResponse {
  data?: ReqResUser;
}

interface ReqResUsersListResponse {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ReqResUser[];
}

interface ListReqResUsersResult {
  users: ReqResUser[];
  page: number;
  totalPages: number;
}

function buildReqResHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "User-Agent": "fullstack-challenge/1.0",
  };

  if (env.REQRES_API_KEY) {
    headers["x-api-key"] = env.REQRES_API_KEY;
  }

  return headers;
}

async function fetchReqResUserById(externalId: number): Promise<ReqResUser> {
  const reqResBaseUrl = env.REQRES_BASE_URL.replace(/\/+$/, "");
  let reqResResponse: Response;

  try {
    reqResResponse = await fetch(`${reqResBaseUrl}/api/users/${externalId}`, {
      method: "GET",
      headers: buildReqResHeaders(),
    });
  } catch {
    throw new HttpError("Unable to fetch user from external API", 502);
  }

  if (!reqResResponse.ok) {
    if (reqResResponse.status === 404) {
      throw new HttpError("User not found in external API", 404);
    }

    if (reqResResponse.status === 401 || reqResResponse.status === 403) {
      throw new HttpError(
        "External user request rejected",
        reqResResponse.status,
      );
    }

    throw new HttpError(
      "Failed to fetch user from external API",
      reqResResponse.status || 502,
    );
  }

  const reqResUserResponse =
    (await reqResResponse.json()) as ReqResUserResponse;

  if (!reqResUserResponse.data) {
    throw new HttpError("User not found in external API", 404);
  }

  return reqResUserResponse.data;
}

async function fetchReqResUsersByPage(
  page: number,
): Promise<ReqResUsersListResponse> {
  const reqResBaseUrl = env.REQRES_BASE_URL.replace(/\/+$/, "");
  let reqResResponse: Response;

  try {
    reqResResponse = await fetch(`${reqResBaseUrl}/api/users?page=${page}`, {
      method: "GET",
      headers: buildReqResHeaders(),
    });
  } catch {
    throw new HttpError("Unable to fetch users from external API", 502);
  }

  if (!reqResResponse.ok) {
    if (reqResResponse.status === 401 || reqResResponse.status === 403) {
      throw new HttpError(
        "External users request rejected",
        reqResResponse.status,
      );
    }

    throw new HttpError(
      "Failed to fetch users from external API",
      reqResResponse.status || 502,
    );
  }

  return (await reqResResponse.json()) as ReqResUsersListResponse;
}

export async function listReqResUsers(
  page: number,
): Promise<ListReqResUsersResult> {
  if (!Number.isInteger(page) || page <= 0) {
    throw new HttpError("Invalid page query parameter", 400);
  }

  const reqResUsersResponse = await fetchReqResUsersByPage(page);

  return {
    users: reqResUsersResponse.data,
    page: reqResUsersResponse.page,
    totalPages: reqResUsersResponse.total_pages,
  };
}

export async function getReqResUserById(externalId: number) {
  if (!Number.isInteger(externalId) || externalId <= 0) {
    throw new HttpError("Invalid user id", 400);
  }

  return fetchReqResUserById(externalId);
}

export async function importUserByExternalId(externalId: number) {
  const existingUser = await SavedUserModel.findOne({ externalId });

  if (existingUser) {
    return {
      user: existingUser,
      created: false,
    };
  }

  const reqResUser = await fetchReqResUserById(externalId);

  const newUser = await SavedUserModel.create({
    externalId: reqResUser.id,
    email: reqResUser.email,
    firstName: reqResUser.first_name,
    lastName: reqResUser.last_name,
    avatar: reqResUser.avatar,
  });

  return {
    user: newUser,
    created: true,
  };
}

export async function listSavedUsers() {
  return SavedUserModel.find().sort({ createdAt: -1 });
}

export async function getSavedUserById(id: string) {
  if (!isValidObjectId(id)) {
    throw new HttpError("Invalid user id", 400);
  }

  const user = await SavedUserModel.findById(id);

  if (!user) {
    throw new HttpError("Saved user not found", 404);
  }

  return user;
}
