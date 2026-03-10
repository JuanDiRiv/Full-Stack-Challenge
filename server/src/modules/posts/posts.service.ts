import { isValidObjectId } from "mongoose";
import { createHttpError } from "../../utils/http-error";
import { PostModel } from "./posts.model";
import { CreatePostInput, UpdatePostInput } from "./posts.schema";

export async function createPost(input: CreatePostInput) {
  return PostModel.create(input);
}

export async function listPosts() {
  return PostModel.find().sort({ createdAt: -1 });
}

export async function getPostById(id: string) {
  if (!isValidObjectId(id)) {
    throw createHttpError("Invalid post id", 400);
  }

  const post = await PostModel.findById(id);

  if (!post) {
    throw createHttpError("Post not found", 404);
  }

  return post;
}

export async function updatePostById(id: string, input: UpdatePostInput) {
  if (!isValidObjectId(id)) {
    throw createHttpError("Invalid post id", 400);
  }

  const updatedPost = await PostModel.findByIdAndUpdate(id, input, {
    new: true,
    runValidators: true,
  });

  if (!updatedPost) {
    throw createHttpError("Post not found", 404);
  }

  return updatedPost;
}

export async function deletePostById(id: string) {
  if (!isValidObjectId(id)) {
    throw createHttpError("Invalid post id", 400);
  }

  const deletedPost = await PostModel.findByIdAndDelete(id);

  if (!deletedPost) {
    throw createHttpError("Post not found", 404);
  }
}
