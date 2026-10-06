import express from "express";

const app = express();
const port = Number(process.env.PORT) || 3001;

app.use(express.json());

app.get("/api/hello", (_request, response) => {
  response.send("Hello From Express");
});

app.post("/api/world", (request, response) => {
  const { message } = request.body ?? {};

  if (typeof message !== "string") {
    response.status(400).json({ error: "The request must include a string message." });
    return;
  }

  console.log("Received POST request body:", request.body);
  response.json({
    message: `I received your POST request. This is what you sent me: ${message}`,
  });
});

app.listen(port, "127.0.0.1", () => {
  console.log(`Express server listening at http://127.0.0.1:${port}`);
});
