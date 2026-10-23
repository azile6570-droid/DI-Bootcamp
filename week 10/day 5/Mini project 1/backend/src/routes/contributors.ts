import { Router } from "express";
import {
  addStoryContributor,
  listStoryContributors,
  removeStoryContributor,
} from "../controllers/stories";
import { authenticate } from "../middleware/authenticate";

const router = Router();

router.use(authenticate);
router.post("/", addStoryContributor);
router.get("/:story_id", listStoryContributors);
router.delete("/:id", removeStoryContributor);

export default router;
