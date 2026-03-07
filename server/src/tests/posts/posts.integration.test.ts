import mongoose from "mongoose";
import request from "supertest";
import app from "../../app";
import { PostModel } from "../../modules/posts/posts.model";

describe("Posts API", () => {
  it("should create a post successfully", async () => {
    const payload = {
      title: "My first post",
      content: "This is a test post",
      authorUserId: "user-123",
    };

    const response = await request(app).post("/api/posts").send(payload);

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe("Post created");
    expect(response.body.data).toEqual(
      expect.objectContaining({
        _id: expect.any(String),
        title: payload.title,
        content: payload.content,
        authorUserId: payload.authorUserId,
      }),
    );
  });

  it("should reject an empty update body", async () => {
    const post = await PostModel.create({
      title: "Original title",
      content: "Original content",
      authorUserId: "user-456",
    });

    const response = await request(app).patch(`/api/posts/${post.id}`).send({});

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(
      "At least one field is required to update a post",
    );
  });

  it("should return 404 when requesting a non-existing post", async () => {
    const nonExistingId = new mongoose.Types.ObjectId().toString();

    const response = await request(app).get(`/api/posts/${nonExistingId}`);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Post not found");
  });
});
