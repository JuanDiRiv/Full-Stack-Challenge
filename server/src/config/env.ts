import dotenv from "dotenv";

dotenv.config();

type NodeEnvironment = "development" | "test" | "production";

interface Env {
  NODE_ENV: NodeEnvironment;
  PORT: number;
  MONGODB_URI: string;
  CORS_ORIGIN: string;
  REQRES_BASE_URL: string;
  REQRES_API_KEY?: string;
}

function getRequiredEnv(key: string): string {
  const value = process.env[key];

  if (!value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value;
}

function parsePort(value?: string): number {
  if (!value) {
    return 4000;
  }

  const port = Number(value);

  if (!Number.isInteger(port) || port <= 0) {
    throw new Error(
      "Environment variable PORT must be a valid positive number when provided",
    );
  }

  return port;
}

function parseNodeEnv(value: string): NodeEnvironment {
  const allowedValues: NodeEnvironment[] = [
    "development",
    "test",
    "production",
  ];

  if (!allowedValues.includes(value as NodeEnvironment)) {
    throw new Error(
      "Environment variable NODE_ENV must be development, test, or production",
    );
  }

  return value as NodeEnvironment;
}

export const env: Env = {
  NODE_ENV: parseNodeEnv(process.env.NODE_ENV || "development"),
  PORT: parsePort(process.env.PORT),
  MONGODB_URI: getRequiredEnv("MONGODB_URI"),
  CORS_ORIGIN: getRequiredEnv("CORS_ORIGIN"),
  REQRES_BASE_URL: getRequiredEnv("REQRES_BASE_URL"),
  REQRES_API_KEY: process.env.REQRES_API_KEY,
};
