import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1, "Title is required"),
  content: z.string().min(1, "Content is required"),
  authorUserId: z.string().min(1, "Author user id is required"),
});

export const updatePostSchema = z
  .object({
    title: z.string().min(1, "Title cannot be empty").optional(),
    content: z.string().min(1, "Content cannot be empty").optional(),
    authorUserId: z
      .string()
      .min(1, "Author user id cannot be empty")
      .optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "At least one field is required to update a post",
  });

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type UpdatePostInput = z.infer<typeof updatePostSchema>;
