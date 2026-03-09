import mongoose from "mongoose";
import { env } from "./env";

let cachedConnectionPromise: Promise<typeof mongoose> | null = null;

export async function connectToDatabase(): Promise<void> {
  if (mongoose.connection.readyState === 1) {
    console.log("MongoDB already connected. Reusing existing connection.");
    return;
  }

  if (!cachedConnectionPromise) {
    console.log("MongoDB connection not found. Creating a new connection.");
    cachedConnectionPromise = mongoose.connect(env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      family: 4,
    });
  } else {
    console.log("MongoDB connection in progress. Reusing pending connection.");
  }

  try {
    await cachedConnectionPromise;
    console.log("MongoDB connection established successfully.");
  } catch (error) {
    cachedConnectionPromise = null;
    console.error("MongoDB connection failed.", error);
    throw error;
  }
}
