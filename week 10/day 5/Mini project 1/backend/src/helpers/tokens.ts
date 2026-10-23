import { createHash, randomUUID } from "node:crypto";
import jwt from "jsonwebtoken";
import { pool } from "../db/pool";

function requireSecret(value: string | undefined, name: string): string {
  if (!value || value.length < 32) {
    throw new Error(`${name} must contain at least 32 characters.`);
  }
  return value;
}

const accessSecret = requireSecret(process.env.JWT_SECRET, "JWT_SECRET");
const refreshSecret = requireSecret(process.env.REFRESH_SECRET, "REFRESH_SECRET");

const refreshLifetimeMs = 7 * 24 * 60 * 60 * 1000;

export function createAccessToken(userId: number): string {
  return jwt.sign({ userId }, accessSecret, { expiresIn: "15m" });
}

export async function createRefreshToken(userId: number): Promise<string> {
  const token = jwt.sign({ userId, jti: randomUUID() }, refreshSecret, { expiresIn: "7d" });
  const hash = createHash("sha256").update(token).digest("hex");
  await pool.query(
    "INSERT INTO refresh_sessions (user_id, token_hash, expires_at) VALUES ($1, $2, $3)",
    [userId, hash, new Date(Date.now() + refreshLifetimeMs)],
  );
  return token;
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}

export function verifyAccessToken(token: string): number {
  const payload = jwt.verify(token, accessSecret);
  if (typeof payload === "string" || typeof payload.userId !== "number") {
    throw new Error("Invalid access token.");
  }
  return payload.userId;
}

export function verifyRefreshToken(token: string): number {
  const payload = jwt.verify(token, refreshSecret);
  if (typeof payload === "string" || typeof payload.userId !== "number") {
    throw new Error("Invalid refresh token.");
  }
  return payload.userId;
}

export const refreshCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/api/auth",
  maxAge: refreshLifetimeMs,
};
