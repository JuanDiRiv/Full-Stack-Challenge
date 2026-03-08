import serverless from "serverless-http";
import app from "./app";
import { connectToDatabase } from "./config/database";

const expressHandler = serverless(app);

export const handler = async (
  event: Record<string, unknown>,
  context: Record<string, unknown>,
) => {
  await connectToDatabase();
  return expressHandler(event, context);
};
