import { Router } from "express";
import { listComments, postComment, removeComment } from "../controllers/comments";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.use(authenticate);
router.get("/:storyId/comments", listComments);
router.post("/:storyId/comments", postComment);
router.delete("/comments/:id", removeComment);

export default router;
