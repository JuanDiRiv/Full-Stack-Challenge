import { Router } from "express";
import {
  getUserByIdController,
  getUsersController,
  getSavedUserByIdController,
  getSavedUsersController,
  importUserController,
} from "./users.controller";

const usersRouter = Router();

usersRouter.get("/", getUsersController);
usersRouter.post("/import/:id", importUserController);
usersRouter.get("/saved", getSavedUsersController);
usersRouter.get("/saved/:id", getSavedUserByIdController);
usersRouter.get("/:id", getUserByIdController);

export default usersRouter;
