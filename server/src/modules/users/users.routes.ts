import { Router } from "express";
import {
  getSavedUserByIdController,
  getSavedUsersController,
  importUserController,
} from "./users.controller";

const usersRouter = Router();

usersRouter.post("/import/:id", importUserController);
usersRouter.get("/", getSavedUsersController);
usersRouter.get("/:id", getSavedUserByIdController);

export default usersRouter;
