import { Router } from "express";
import { search } from "../controllers/users";
import { authenticate } from "../middleware/authenticate";

const router = Router();
router.get("/", authenticate, search);

export default router;
