import { pool } from "../db/pool";
import type { Story, User } from "../../../types/models";

interface StoryRow {
  id: number;
  title: string;
  content: string;
  author_id: number;
  author_username: string;
  author_email: string;
  created_at: Date;
  updated_at: Date;
}

interface UserRow {
  id: number;
  username: string;
  email: string;
}

const storySelect = `
  SELECT s.id, s.title, s.content, s.author_id, s.created_at, s.updated_at,
         u.username AS author_username, u.email AS author_email
  FROM stories s JOIN users u ON u.id = s.author_id`;

async function attachContributors(rows: StoryRow[]): Promise<Story[]> {
  if (!rows.length) return [];
  const ids = rows.map((row) => row.id);
  const contributors = await pool.query<UserRow & { story_id: number; contributor_id: number }>(
    `SELECT c.story_id, c.id AS contributor_id, u.id, u.username, u.email
     FROM contributors c JOIN users u ON u.id = c.user_id
     WHERE c.story_id = ANY($1::int[]) ORDER BY u.username`,
    [ids],
  );
  const byStory = new Map<number, User[]>();
  for (const user of contributors.rows) {
    const list = byStory.get(user.story_id) ?? [];
    list.push({
      id: user.id,
      username: user.username,
      email: user.email,
      contributorId: user.contributor_id,
    });
    byStory.set(user.story_id, list);
  }
  return rows.map((row) => ({
    id: row.id,
    title: row.title,
    content: row.content,
    author: { id: row.author_id, username: row.author_username, email: row.author_email },
    contributors: byStory.get(row.id) ?? [],
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  }));
}

export async function getStories(): Promise<Story[]> {
  const result = await pool.query<StoryRow>(`${storySelect} ORDER BY s.updated_at DESC`);
  return attachContributors(result.rows);
}

export async function getStory(id: number): Promise<Story | undefined> {
  const result = await pool.query<StoryRow>(`${storySelect} WHERE s.id = $1`, [id]);
  return (await attachContributors(result.rows))[0];
}

export async function createStory(title: string, content: string, authorId: number): Promise<Story> {
  const result = await pool.query<StoryRow>(
    `WITH created AS (
       INSERT INTO stories (title, content, author_id) VALUES ($1, $2, $3) RETURNING *
     )
     SELECT c.id, c.title, c.content, c.author_id, c.created_at, c.updated_at,
            u.username AS author_username, u.email AS author_email
     FROM created c JOIN users u ON u.id = c.author_id`,
    [title, content, authorId],
  );
  return (await attachContributors(result.rows))[0];
}

export async function updateStory(
  id: number,
  title: string,
  content: string,
): Promise<Story | undefined> {
  const result = await pool.query<StoryRow>(
    `WITH updated AS (
       UPDATE stories SET title = $2, content = $3, updated_at = NOW()
       WHERE id = $1 RETURNING *
     )
     SELECT u.id, u.title, u.content, u.author_id, u.created_at, u.updated_at,
            a.username AS author_username, a.email AS author_email
     FROM updated u JOIN users a ON a.id = u.author_id`,
    [id, title, content],
  );
  return (await attachContributors(result.rows))[0];
}

export async function deleteStory(id: number): Promise<boolean> {
  const result = await pool.query("DELETE FROM stories WHERE id = $1", [id]);
  return result.rowCount === 1;
}

export async function canEditStory(storyId: number, userId: number): Promise<boolean> {
  const result = await pool.query(
    `SELECT 1 FROM stories s
     LEFT JOIN contributors c ON c.story_id = s.id AND c.user_id = $2
     WHERE s.id = $1 AND (s.author_id = $2 OR c.user_id = $2)`,
    [storyId, userId],
  );
  return result.rowCount === 1;
}

export async function isStoryAuthor(storyId: number, userId: number): Promise<boolean> {
  const result = await pool.query(
    "SELECT 1 FROM stories WHERE id = $1 AND author_id = $2",
    [storyId, userId],
  );
  return result.rowCount === 1;
}

export async function addContributor(storyId: number, userId: number): Promise<void> {
  await pool.query(
    "INSERT INTO contributors (story_id, user_id) VALUES ($1, $2) ON CONFLICT (story_id, user_id) DO NOTHING",
    [storyId, userId],
  );
}

export async function removeContributor(id: number): Promise<void> {
  await pool.query("DELETE FROM contributors WHERE id = $1", [id]);
}

export async function contributorStory(id: number): Promise<number | undefined> {
  const result = await pool.query<{ story_id: number }>(
    "SELECT story_id FROM contributors WHERE id = $1",
    [id],
  );
  return result.rows[0]?.story_id;
}

export async function contributorRow(storyId: number, userId: number): Promise<number | undefined> {
  const result = await pool.query<{ id: number }>(
    "SELECT id FROM contributors WHERE story_id = $1 AND user_id = $2",
    [storyId, userId],
  );
  return result.rows[0]?.id;
}
