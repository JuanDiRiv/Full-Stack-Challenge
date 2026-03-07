import dotenv from "dotenv";

dotenv.config();

type NodeEnvironment = "development" | "test" | "production";

interface Env {
  NODE_ENV: NodeEnvironment;
  PORT: number;
  MONGODB_URI: string;
  CORS_ORIGIN: string;
}

function getRequiredEnv(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

export const env: Env = {
  NODE_ENV: (process.env.NODE_ENV as NodeEnvironment) || "development",
  PORT: Number(process.env.PORT) || 4000,
  MONGODB_URI: getRequiredEnv("MONGODB_URI"),
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*"
};
