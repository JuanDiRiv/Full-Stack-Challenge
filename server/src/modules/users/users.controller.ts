import { NextFunction, Request, Response } from "express";
import { HttpError } from "../../utils/http-error";
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
    const page = pageQuery ? Number(pageQuery) : 1;

    const result = await listReqResUsers(page);

    res.status(200).json({
      success: true,
      message: "Users retrieved",
      data: result,
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
      throw new HttpError("Invalid external user id", 400);
    }

    const result = await importUserByExternalId(externalId);

    res.status(200).json({
      success: true,
      message: result.created
        ? "User imported successfully"
        : "User already saved",
      data: result.user,
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
