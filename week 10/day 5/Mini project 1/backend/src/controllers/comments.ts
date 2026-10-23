import type { Request, Response } from "express";
import { HttpError } from "../helpers/errors";
import { createComment, deleteComment, deleteCommentAsStoryAuthor, getComments } from "../models/comments";
import { getStory } from "../models/stories";

function positiveId(value: string | string[] | undefined): number {
  if (typeof value !== "string") throw new HttpError(400, "A valid ID is required.");
  const id = Number(value);
  if (!Number.isSafeInteger(id) || id < 1) throw new HttpError(400, "A valid ID is required.");
  return id;
}

export async function listComments(req: Request, res: Response): Promise<void> {
  const storyId = positiveId(req.params.storyId);
  if (!(await getStory(storyId))) throw new HttpError(404, "Story not found.");
  res.json(await getComments(storyId));
}

export async function postComment(req: Request, res: Response): Promise<void> {
  const storyId = positiveId(req.params.storyId);
  const content = typeof req.body?.content === "string" ? req.body.content.trim() : "";
  if (!content || content.length > 2000) {
    throw new HttpError(400, "A comment of 1–2,000 characters is required.");
  }
  if (!(await getStory(storyId))) throw new HttpError(404, "Story not found.");
  res.status(201).json(await createComment(storyId, req.userId!, content));
}

export async function removeComment(req: Request, res: Response): Promise<void> {
  const commentId = positiveId(req.params.id);
  if (await deleteComment(commentId, req.userId!)) {
    res.status(204).end();
    return;
  }

  if (await deleteCommentAsStoryAuthor(commentId, req.userId!)) {
    res.status(204).end();
    return;
  }
  throw new HttpError(404, "Comment not found or you do not have permission to delete it.");
}
