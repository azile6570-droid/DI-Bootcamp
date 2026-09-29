const db = require('../config/db');

// Fetch all questions along with their options (without exposing the correct answer)
const getAllQuestionsWithOptions = async () => {
  const questions = await db('questions').select('id', 'question');

  for (let q of questions) {
    const options = await db('options')
      .join('questions_options', 'options.id', 'questions_options.option_id')
      .where('questions_options.question_id', q.id)
      .select('options.id', 'options.option_text');
    
    q.options = options;
  }

  return questions;
};

// Check if user answer is correct
const checkAnswer = async (questionId, selectedAnswer) => {
  const question = await db('questions')
    .where({ id: questionId })
    .select('correct_answer')
    .first();

  if (!question) return null;

  const isCorrect = question.correct_answer.trim().toLowerCase() === selectedAnswer.trim().toLowerCase();
  return { isCorrect, correctAnswer: question.correct_answer };
};

module.exports = {
  getAllQuestionsWithOptions,
  checkAnswer,
};