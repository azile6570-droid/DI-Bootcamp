import type { Request, Response } from "express";
import { HttpError } from "../helpers/errors";
import {
  addContributor,
  canEditStory,
  contributorRow,
  contributorStory,
  createStory,
  deleteStory,
  getStories,
  getStory,
  isStoryAuthor,
  removeContributor,
  updateStory,
} from "../models/stories";
import { findUserById } from "../models/users";

function positiveId(value: string | string[] | undefined): number {
  if (typeof value !== "string") throw new HttpError(400, "A valid ID is required.");
  const id = Number(value);
  if (!Number.isSafeInteger(id) || id < 1) throw new HttpError(400, "A valid ID is required.");
  return id;
}

function storyFields(body: unknown): { title: string; content: string } {
  const data = body as { title?: unknown; content?: unknown } | null;
  const title = typeof data?.title === "string" ? data.title.trim() : "";
  const content = typeof data?.content === "string" ? data.content.trim() : "";
  if (!title || title.length > 255 || !content || content.length > 50000) {
    throw new HttpError(400, "A title (up to 255 characters) and story (up to 50,000 characters) are required.");
  }
  return { title, content };
}

export async function listStories(_req: Request, res: Response): Promise<void> {
  res.json(await getStories());
}

export async function readStory(req: Request, res: Response): Promise<void> {
  const story = await getStory(positiveId(req.params.id));
  if (!story) throw new HttpError(404, "Story not found.");
  res.json(story);
}

export async function create(req: Request, res: Response): Promise<void> {
  const { title, content } = storyFields(req.body);
  const story = await createStory(title, content, req.userId!);
  res.status(201).json(story);
}

export async function update(req: Request, res: Response): Promise<void> {
  const id = positiveId(req.params.id);
  const { title, content } = storyFields(req.body);
  if (!(await canEditStory(id, req.userId!))) {
    const existing = await getStory(id);
    if (!existing) throw new HttpError(404, "Story not found.");
    throw new HttpError(403, "Only the author and contributors can edit this story.");
  }
  const story = await updateStory(id, title, content);
  if (!story) throw new HttpError(404, "Story not found.");
  res.json(story);
}

export async function remove(req: Request, res: Response): Promise<void> {
  const id = positiveId(req.params.id);
  if (!(await isStoryAuthor(id, req.userId!))) {
    if (!(await getStory(id))) throw new HttpError(404, "Story not found.");
    throw new HttpError(403, "Only the author can delete this story.");
  }
  await deleteStory(id);
  res.status(204).end();
}

export async function addStoryContributor(req: Request, res: Response): Promise<void> {
  const storyId = positiveId(String(req.body?.story_id ?? ""));
  const userId = positiveId(String(req.body?.user_id ?? ""));
  if (!(await isStoryAuthor(storyId, req.userId!))) {
    if (!(await getStory(storyId))) throw new HttpError(404, "Story not found.");
    throw new HttpError(403, "Only the author can invite contributors.");
  }
  const user = await findUserById(userId);
  if (!user) throw new HttpError(404, "User not found.");
  if (user.id === req.userId) throw new HttpError(400, "You are already the story author.");
  await addContributor(storyId, userId);
  res.status(201).json({ message: "Contributor added." });
}

export async function listStoryContributors(req: Request, res: Response): Promise<void> {
  const story = await getStory(positiveId(req.params.story_id));
  if (!story) throw new HttpError(404, "Story not found.");
  res.json(story.contributors);
}

export async function removeStoryContributor(req: Request, res: Response): Promise<void> {
  const contributorId = positiveId(req.params.id);
  const storyId = await contributorStory(contributorId);
  if (!storyId) throw new HttpError(404, "Contributor not found.");
  if (!(await isStoryAuthor(storyId, req.userId!))) {
    throw new HttpError(403, "Only the author can remove contributors.");
  }
  await removeContributor(contributorId);
  res.status(204).end();
}

export async function leaveStory(req: Request, res: Response): Promise<void> {
  const storyId = positiveId(req.params.storyId);
  const contributorId = await contributorRow(storyId, req.userId!);
  if (!contributorId) throw new HttpError(404, "You are not a contributor to this story.");
  await removeContributor(contributorId);
  res.status(204).end();
}
