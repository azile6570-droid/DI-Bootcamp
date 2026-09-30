let questions = [];
let currentQuestionIndex = 0;
let score = 0;
let selectedOptionText = null;

const questionEl = document.getElementById('question');
const optionsContainer = document.getElementById('options-container');
const submitBtn = document.getElementById('submit-btn');
const feedbackEl = document.getElementById('feedback');
const quizEl = document.getElementById('quiz');
const resultEl = document.getElementById('result');
const scoreEl = document.getElementById('score');
const totalQuestionsEl = document.getElementById('total-questions');

// Fetch questions from database via API
async function fetchQuestions() {
  try {
    const res = await fetch('/api/quiz/questions');
    questions = await res.json();
    if (questions.length > 0) {
      loadQuestion();
    } else {
      questionEl.textContent = 'No questions found.';
    }
  } catch (err) {
    questionEl.textContent = 'Failed to load questions.';
  }
}

function loadQuestion() {
  feedbackEl.textContent = '';
  submitBtn.disabled = true;
  selectedOptionText = null;

  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = `${currentQuestionIndex + 1}. ${currentQuestion.question}`;
  optionsContainer.innerHTML = '';

  currentQuestion.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.classList.add('option-btn');
    btn.textContent = opt.option_text;
    btn.onclick = () => selectOption(btn, opt.option_text);
    optionsContainer.appendChild(btn);
  });
}

function selectOption(btn, optionText) {
  document.querySelectorAll('.option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  selectedOptionText = optionText;
  submitBtn.disabled = false;
}

submitBtn.onclick = async () => {
  submitBtn.disabled = true;
  const currentQuestion = questions[currentQuestionIndex];

  const res = await fetch('/api/quiz/answer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      questionId: currentQuestion.id,
      selectedAnswer: selectedOptionText
    })
  });

  const data = await res.json();

  if (data.isCorrect) {
    score++;
    feedbackEl.textContent = 'Correct!';
    feedbackEl.className = 'feedback correct';
  } else {
    feedbackEl.textContent = `Incorrect! Correct answer: ${data.correctAnswer}`;
    feedbackEl.className = 'feedback incorrect';
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      loadQuestion();
    } else {
      showResults();
    }
  }, 1500);
};

function showResults() {
  quizEl.classList.add('hidden');
  resultEl.classList.remove('hidden');
  scoreEl.textContent = score;
  totalQuestionsEl.textContent = questions.length;
}

fetchQuestions();