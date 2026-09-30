// app.js
const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const quizRouter = require('./routes/quiz');
app.use('/quiz', quizRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});