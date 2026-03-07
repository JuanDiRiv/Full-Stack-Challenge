export type Post = {
  _id: string;
  title: string;
  content: string;
  authorUserId: string;
  createdAt: string;
  updatedAt: string;
};

export type CreatePostPayload = {
  title: string;
  content: string;
  authorUserId: string;
};

export type UpdatePostPayload = {
  title?: string;
  content?: string;
  authorUserId?: string;
};
