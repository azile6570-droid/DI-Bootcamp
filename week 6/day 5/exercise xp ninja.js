const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const questions = [
  {
    id: 1,
    question: "What does HTTP stand for?",
    options: [
      "HyperText Transfer Protocol",
      "High Transfer Text Protocol",
      "Hyperlink Text Transfer System",
      "Home Text Transfer Protocol"
    ],
    correctAnswer: 0
  },
  {
    id: 2,
    question: "Which Node.js module is used to build web servers?",
    options: ["fs", "path", "http", "url"],
    correctAnswer: 2
  },
  {
    id: 3,
    question: "What status code represents 'Not Found'?",
    options: ["200", "500", "404", "302"],
    correctAnswer: 2
  },
  {
    id: 4,
    question: "Which HTTP method is typically used to create a new resource?",
    options: ["GET", "POST", "PUT", "DELETE"],
    correctAnswer: 1
  }
];

app.get('/api/questions', (req, res) => {
  const safeQuestions = questions.map(({ id, question, options }) => ({
    id,
    question,
    options
  }));
  res.json(safeQuestions);
});

app.post('/api/answer', (req, res) => {
  const { questionId, selectedAnswer } = req.body;
  const question = questions.find((q) => q.id === questionId);

  if (!question) {
    return res.status(404).json({ error: "Question not found" });
  }

  const isCorrect = question.correctAnswer === selectedAnswer;

  res.json({
    isCorrect,
    correctAnswer: question.options[question.correctAnswer]
  });
});

app.listen(PORT, () => {
  console.log(`Quiz Game running at http://localhost:${PORT}`);
});
