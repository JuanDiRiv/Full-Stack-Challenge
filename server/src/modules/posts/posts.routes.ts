import { Router } from "express";
import { validateBody } from "../../middlewares/validate.middleware";
import {
  createPostController,
  deletePostController,
  getPostByIdController,
  getPostsController,
  updatePostController,
} from "./posts.controller";
import { createPostSchema, updatePostSchema } from "./posts.schema";

const postsRouter = Router();

postsRouter.post("/", validateBody(createPostSchema), createPostController);
postsRouter.get("/", getPostsController);
postsRouter.get("/:id", getPostByIdController);
postsRouter.patch("/:id", validateBody(updatePostSchema), updatePostController);
postsRouter.delete("/:id", deletePostController);

export default postsRouter;
