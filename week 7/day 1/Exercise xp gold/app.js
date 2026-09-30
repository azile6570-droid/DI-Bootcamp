// app.js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const postsRouter = require('./routes/posts');
app.use('/posts', postsRouter);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});