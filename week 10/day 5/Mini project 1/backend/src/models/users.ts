import { pool } from "../db/pool";
import type { User } from "../../../types/models";

interface UserRow {
  id: number;
  username: string;
  email: string;
  password_hash?: string;
}

export async function findUserByEmail(email: string): Promise<UserRow | undefined> {
  const result = await pool.query<UserRow>(
    "SELECT id, username, email, password_hash FROM users WHERE email = $1",
    [email],
  );
  return result.rows[0];
}

export async function findUserById(id: number): Promise<User | undefined> {
  const result = await pool.query<UserRow>(
    "SELECT id, username, email FROM users WHERE id = $1",
    [id],
  );
  return result.rows[0];
}

export async function createUser(username: string, email: string, passwordHash: string): Promise<User> {
  const result = await pool.query<UserRow>(
    "INSERT INTO users (username, email, password_hash) VALUES ($1, $2, $3) RETURNING id, username, email",
    [username, email, passwordHash],
  );
  return result.rows[0];
}

export async function searchUsers(search: string, currentUserId: number): Promise<User[]> {
  const result = await pool.query<UserRow>(
    `SELECT id, username, email FROM users
     WHERE id <> $1 AND (username ILIKE $2 OR email ILIKE $2)
     ORDER BY username LIMIT 10`,
    [currentUserId, `%${search}%`],
  );
  return result.rows;
}
