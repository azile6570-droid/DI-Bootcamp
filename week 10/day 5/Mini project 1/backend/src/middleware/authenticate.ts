import type { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../helpers/tokens";

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

export function authenticate(req: Request, res: Response, next: NextFunction): void {
  const authorization = req.get("authorization");
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];

  if (!token) {
    res.status(401).json({ message: "Sign in to continue." });
    return;
  }

  try {
    req.userId = verifyAccessToken(token);
    next();
  } catch {
    res.status(401).json({ message: "Your session has expired. Please sign in again." });
  }
}
