import { Router } from "express";
import {
  create,
  leaveStory,
  listStories,
  readStory,
  remove,
  update,
} from "../controllers/stories";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.use(authenticate);
router.get("/", listStories);
router.get("/:id", readStory);
router.post("/", create);
router.patch("/:id", update);
router.delete("/:id", remove);
router.delete("/:storyId/contributors/me", leaveStory);

export default router;
