import type { Request, Response } from "express";
import { HttpError } from "../helpers/errors";
import { searchUsers } from "../models/users";

export async function search(req: Request, res: Response): Promise<void> {
  const query = typeof req.query.q === "string" ? req.query.q.trim() : "";
  if (query.length < 2) throw new HttpError(400, "Search for at least 2 characters.");
  res.json(await searchUsers(query, req.userId!));
}
