import { Schema, model } from "mongoose";

export interface Post {
  title: string;
  content: string;
  authorUserId: string;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new Schema<Post>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    authorUserId: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const PostModel = model<Post>("Post", postSchema);
