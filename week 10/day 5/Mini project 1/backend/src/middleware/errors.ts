import type { ErrorRequestHandler, RequestHandler } from "express";
import { HttpError } from "../helpers/errors";

export const notFound: RequestHandler = (_req, res) => {
  res.status(404).json({ message: "The requested resource was not found." });
};

export const errorHandler: ErrorRequestHandler = (error: unknown, _req, res, _next) => {
  if (error instanceof HttpError) {
    res.status(error.status).json({ message: error.message });
    return;
  }

  if (typeof error === "object" && error !== null && "type" in error) {
    if (error.type === "entity.parse.failed") {
      res.status(400).json({ message: "Request body must be valid JSON." });
      return;
    }
    if (error.type === "entity.too.large") {
      res.status(413).json({ message: "Request body is too large." });
      return;
    }
  }

  console.error("Unhandled request error:", error);
  res.status(500).json({ message: "Something went wrong. Please try again." });
};
