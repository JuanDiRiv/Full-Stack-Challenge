import { NextFunction, Request, Response } from "express";
import {
  createPost,
  deletePostById,
  getPostById,
  listPosts,
  updatePostById,
} from "./posts.service";
import { CreatePostInput, UpdatePostInput } from "./posts.schema";

export async function createPostController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const post = await createPost(req.body as CreatePostInput);

    res.status(201).json({
      success: true,
      message: "Post created",
      data: post,
    });
  } catch (error) {
    next(error);
  }
}

export async function getPostsController(
  _req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const posts = await listPosts();

    res.status(200).json({
      success: true,
      message: "Posts retrieved",
      data: posts,
    });
  } catch (error) {
    next(error);
  }
}

export async function getPostByIdController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const post = await getPostById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Post retrieved",
      data: post,
    });
  } catch (error) {
    next(error);
  }
}

export async function updatePostController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    const post = await updatePostById(
      req.params.id,
      req.body as UpdatePostInput,
    );

    res.status(200).json({
      success: true,
      message: "Post updated",
      data: post,
    });
  } catch (error) {
    next(error);
  }
}

export async function deletePostController(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  try {
    await deletePostById(req.params.id);

    res.status(200).json({
      success: true,
      message: "Post deleted",
      data: null,
    });
  } catch (error) {
    next(error);
  }
}
