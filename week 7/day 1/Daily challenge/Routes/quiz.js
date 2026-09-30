// routes/quiz.js
const express = require('express');
const router = express.Router();

const triviaQuestions = [
  {
    question: "What is the capital of France?",
    answer: "Paris",
  },
  {
    question: "Which planet is known as the Red Planet?",
    answer: "Mars",
  },
  {
    question: "What is the largest mammal in the world?",
    answer: "Blue whale",
  },
];

// In-memory game state tracker
let currentQuestionIndex = 0;
let userScore = 0;

// GET /quiz - Start or view the current question
router.get('/', (req, res) => {
  if (currentQuestionIndex >= triviaQuestions.length) {
    return res.json({
      message: "Quiz finished! Please visit GET /quiz/score to view your final score.",
    });
  }

  res.json({
    questionNumber: currentQuestionIndex + 1,
    totalQuestions: triviaQuestions.length,
    question: triviaQuestions[currentQuestionIndex].question,
  });
});

// POST /quiz - Submit answer and move to the next question
router.post('/', (req, res) => {
  const { answer } = req.body;

  if (currentQuestionIndex >= triviaQuestions.length) {
    return res.status(400).json({
      message: "The quiz has already ended. Visit GET /quiz/score to see your score.",
    });
  }

  if (!answer) {
    return res.status(400).json({ error: "Please provide an answer in the request body." });
  }

  const correctAnswer = triviaQuestions[currentQuestionIndex].answer;
  const isCorrect = answer.trim().toLowerCase() === correctAnswer.toLowerCase();

  if (isCorrect) {
    userScore += 1;
  }

  const feedback = {
    isCorrect,
    submittedAnswer: answer,
    correctAnswer: correctAnswer,
    message: isCorrect ? "Correct answer!" : "Incorrect answer.",
  };

  currentQuestionIndex += 1;

  if (currentQuestionIndex < triviaQuestions.length) {
    res.json({
      feedback,
      nextQuestion: {
        questionNumber: currentQuestionIndex + 1,
        question: triviaQuestions[currentQuestionIndex].question,
      },
    });
  } else {
    res.json({
      feedback,
      message: "You have completed the quiz! Visit GET /quiz/score to view your final score.",
    });
  }
});

// GET /quiz/score - Display the final score
router.get('/score', (req, res) => {
  res.json({
    finalScore: userScore,
    totalQuestions: triviaQuestions.length,
    message: `You scored ${userScore} out of ${triviaQuestions.length}!`,
  });
});

module.exports = router;