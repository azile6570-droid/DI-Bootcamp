const quizModel = require('../models/quiz.model');

const getQuestions = async (req, res, next) => {
  try {
    const questions = await quizModel.getAllQuestionsWithOptions();
    res.status(200).json(questions);
  } catch (error) {
    next(error);
  }
};

const verifyAnswer = async (req, res, next) => {
  try {
    const { questionId, selectedAnswer } = req.body;

    if (!questionId || !selectedAnswer) {
      return res.status(400).json({ message: 'questionId and selectedAnswer are required' });
    }

    const result = await quizModel.checkAnswer(questionId, selectedAnswer);

    if (!result) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getQuestions,
  verifyAnswer,
};