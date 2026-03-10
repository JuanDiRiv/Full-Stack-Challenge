import { NextFunction, Request, Response } from "express";
import { createHttpError } from "../../utils/http-error";
import {
  getReqResUserById,
  getSavedUserById,
  importUserByExternalId,
  listReqResUsers,
  listSavedUsers,
} from "./users.service";

export async function getUsersController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const pageQuery = req.query.page;
    const requestedPage = pageQuery ? Number(pageQuery) : 1;

    const paginatedUsers = await listReqResUsers(requestedPage);

    res.status(200).json({
      success: true,
      message: "Users retrieved",
      data: paginatedUsers,
    });
  } catch (error) {
    next(error);
  }
}

export async function getUserByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const externalId = Number(req.params.id);
    const user = await getReqResUserById(externalId);

    res.status(200).json({
      success: true,
      message: "User retrieved",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}

export async function importUserController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const externalId = Number(req.params.id);

    if (!Number.isInteger(externalId) || externalId <= 0) {
      throw createHttpError("Invalid external user id", 400);
    }

    const importResult = await importUserByExternalId(externalId);

    res.status(200).json({
      success: true,
      message: importResult.created
        ? "User imported successfully"
        : "User already saved",
      data: importResult.user,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSavedUsersController(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const users = await listSavedUsers();

    res.status(200).json({
      success: true,
      message: "Saved users retrieved",
      data: users,
    });
  } catch (error) {
    next(error);
  }
}

export async function getSavedUserByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const user = await getSavedUserById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Saved user retrieved",
      data: user,
    });
  } catch (error) {
    next(error);
  }
}
