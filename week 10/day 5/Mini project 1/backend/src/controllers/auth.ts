import { createHash } from "node:crypto";
import bcrypt from "bcrypt";
import type { Request, Response } from "express";
import { pool } from "../db/pool";
import { HttpError } from "../helpers/errors";
import {
  createAccessToken,
  createRefreshToken,
  hashToken,
  refreshCookieOptions,
  verifyRefreshToken,
} from "../helpers/tokens";
import { createUser, findUserByEmail, findUserById } from "../models/users";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRounds = 12;

export async function register(req: Request, res: Response): Promise<void> {
  const username = typeof req.body?.username === "string" ? req.body.username.trim() : "";
  const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body?.password === "string" ? req.body.password : "";
  if (!username || username.length > 50 || !emailPattern.test(email) || email.length > 254 ||
      password.length < 8 || Buffer.byteLength(password, "utf8") > 72) {
    throw new HttpError(400, "Enter a username, valid email, and password (8–72 characters).");
  }

  const passwordHash = await bcrypt.hash(password, passwordRounds);
  let user;
  try {
    user = await createUser(username, email, passwordHash);
  } catch (error) {
    if (typeof error === "object" && error !== null && "code" in error && error.code === "23505") {
      throw new HttpError(409, "An account with that email already exists.");
    }
    throw error;
  }

  const refreshToken = await createRefreshToken(user.id);
  res.cookie("refreshToken", refreshToken, refreshCookieOptions);
  res.status(201).json({ accessToken: createAccessToken(user.id), user });
}

export async function login(req: Request, res: Response): Promise<void> {
  const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body?.password === "string" ? req.body.password : "";
  if (!email || !password) throw new HttpError(400, "Email and password are required.");

  const user = await findUserByEmail(email);
  if (!user?.password_hash || !(await bcrypt.compare(password, user.password_hash))) {
    throw new HttpError(401, "Email or password is incorrect.");
  }

  const refreshToken = await createRefreshToken(user.id);
  res.cookie("refreshToken", refreshToken, refreshCookieOptions);
  res.json({
    accessToken: createAccessToken(user.id),
    user: { id: user.id, username: user.username, email: user.email },
  });
}

export async function refresh(req: Request, res: Response): Promise<void> {
  const token: unknown = req.cookies?.refreshToken;
  if (typeof token !== "string") throw new HttpError(401, "Your session has expired. Please sign in again.");

  let userId: number;
  try {
    userId = verifyRefreshToken(token);
  } catch {
    res.clearCookie("refreshToken", refreshCookieOptions);
    throw new HttpError(401, "Your session has expired. Please sign in again.");
  }

  const oldHash = hashToken(token);
  const session = await pool.query(
    "DELETE FROM refresh_sessions WHERE user_id = $1 AND token_hash = $2 AND expires_at > NOW() RETURNING id",
    [userId, oldHash],
  );
  if (session.rowCount !== 1) {
    res.clearCookie("refreshToken", refreshCookieOptions);
    throw new HttpError(401, "Your session has expired. Please sign in again.");
  }

  const user = await findUserById(userId);
  if (!user) throw new HttpError(401, "Your session is no longer valid.");
  const refreshToken = await createRefreshToken(userId);
  res.cookie("refreshToken", refreshToken, refreshCookieOptions);
  res.json({ accessToken: createAccessToken(userId), user });
}

export async function logout(req: Request, res: Response): Promise<void> {
  const token: unknown = req.cookies?.refreshToken;
  if (typeof token === "string") {
    await pool.query("DELETE FROM refresh_sessions WHERE token_hash = $1", [
      createHash("sha256").update(token).digest("hex"),
    ]);
  }
  res.clearCookie("refreshToken", refreshCookieOptions);
  res.status(204).end();
}
