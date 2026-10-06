import express from "express";
import usersRouter from "./users-router.js";

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use("/users", usersRouter);

app.listen(port, "127.0.0.1", () => {
  console.log(`Users API listening at http://127.0.0.1:${port}/users`);
});
