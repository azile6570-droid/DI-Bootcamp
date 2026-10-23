import { pool } from "../db/pool";
import type { StoryComment } from "../../../types/models";

interface CommentRow {
  id: number;
  content: string;
  created_at: Date;
  user_id: number;
  username: string;
  email: string;
}

export async function getComments(storyId: number): Promise<StoryComment[]> {
  const result = await pool.query<CommentRow>(
    `SELECT c.id, c.content, c.created_at, u.id AS user_id, u.username, u.email
     FROM comments c JOIN users u ON u.id = c.user_id
     WHERE c.story_id = $1 ORDER BY c.created_at`,
    [storyId],
  );
  return result.rows.map((row) => ({
    id: row.id,
    content: row.content,
    author: { id: row.user_id, username: row.username, email: row.email },
    createdAt: row.created_at.toISOString(),
  }));
}

export async function createComment(storyId: number, userId: number, content: string): Promise<StoryComment> {
  const result = await pool.query<CommentRow>(
    `WITH created AS (
       INSERT INTO comments (story_id, user_id, content) VALUES ($1, $2, $3) RETURNING *
     )
     SELECT c.id, c.content, c.created_at, u.id AS user_id, u.username, u.email
     FROM created c JOIN users u ON u.id = c.user_id`,
    [storyId, userId, content],
  );
  const row = result.rows[0];
  return {
    id: row.id,
    content: row.content,
    author: { id: row.user_id, username: row.username, email: row.email },
    createdAt: row.created_at.toISOString(),
  };
}

export async function deleteComment(commentId: number, userId: number): Promise<boolean> {
  const result = await pool.query(
    "DELETE FROM comments WHERE id = $1 AND user_id = $2",
    [commentId, userId],
  );
  return result.rowCount === 1;
}

export async function deleteCommentAsStoryAuthor(commentId: number, userId: number): Promise<boolean> {
  const result = await pool.query(
    `DELETE FROM comments c USING stories s
     WHERE c.id = $1 AND c.story_id = s.id AND s.author_id = $2`,
    [commentId, userId],
  );
  return result.rowCount === 1;
}
