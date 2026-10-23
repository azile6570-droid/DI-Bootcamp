import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import { pool } from "./db/pool";
import { errorHandler, notFound } from "./middleware/errors";
import authRoutes from "./routes/auth";
import commentRoutes from "./routes/comments";
import contributorRoutes from "./routes/contributors";
import storyRoutes from "./routes/stories";
import userRoutes from "./routes/users";

const app = express();
const port = Number(process.env.PORT ?? 4000);
const frontendUrl = process.env.FRONTEND_URL ?? "http://localhost:5173";

app.disable("x-powered-by");
app.use(cors({ origin: frontendUrl, credentials: true }));
app.use(express.json({ limit: "100kb" }));
app.use(cookieParser());

app.get("/api/health", async (_req, res, next) => {
  try {
    await pool.query("SELECT 1");
    res.json({ status: "ok" });
  } catch (error) {
    next(error);
  }
});
app.use("/api/auth", authRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/stories", commentRoutes);
app.use("/api/contributors", contributorRoutes);
app.use("/api/users", userRoutes);
app.use(notFound);
app.use(errorHandler);

const server = app.listen(port, () => {
  console.log(`Story Weave API listening on port ${port}.`);
});

async function shutdown(): Promise<void> {
  server.close(async () => {
    await pool.end();
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
