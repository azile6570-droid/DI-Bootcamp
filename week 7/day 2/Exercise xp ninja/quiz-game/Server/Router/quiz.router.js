const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quiz.controller');

router.get('/questions', quizController.getQuestions);
router.post('/answer', quizController.verifyAnswer);

module.exports = router;