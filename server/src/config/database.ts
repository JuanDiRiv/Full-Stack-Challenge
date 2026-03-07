import mongoose from "mongoose";
import { env } from "./env";

export async function connectToDatabase(): Promise<void> {
  try {
    await mongoose.connect(env.MONGODB_URI);
    console.log("MongoDB connection established at " + env.MONGODB_URI);
  } catch (error) {
    console.error("MongoDB connection failed", error);
    throw new Error(
      "Could not connect to MongoDB. Check MONGODB_URI and MongoDB service status.",
    );
  }
}
