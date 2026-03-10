export type HttpError = Error & {
  statusCode: number;
  name: "HttpError";
};

export function createHttpError(message: string, statusCode = 500): HttpError {
  const error = new Error(message) as HttpError;
  error.name = "HttpError";
  error.statusCode = statusCode;
  return error;
}

export function isHttpError(error: unknown): error is HttpError {
  if (typeof error !== "object" || error === null) {
    return false;
  }

  if (!("statusCode" in error)) {
    return false;
  }

  return typeof error.statusCode === "number";
}
