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
  const baseUrl = env.REQRES_BASE_URL.replace(/\/+$/, "");
  let response: Response;

  try {
    response = await fetch(`${baseUrl}/api/users/${externalId}`, {
      method: "GET",
      headers: buildReqResHeaders(),
    });
  } catch {
    throw new HttpError("Unable to fetch user from external API", 502);
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new HttpError("User not found in external API", 404);
    }

    if (response.status === 401 || response.status === 403) {
      throw new HttpError("External user request rejected", response.status);
    }

    throw new HttpError(
      "Failed to fetch user from external API",
      response.status || 502,
    );
  }

  const responseBody = (await response.json()) as ReqResUserResponse;

  if (!responseBody.data) {
    throw new HttpError("User not found in external API", 404);
  }

  return responseBody.data;
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
