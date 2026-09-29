const express = require('express');
const path = require('path');
const quizRouter = require('./server/routes/quiz.router');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Serve Static Frontend Files
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/quiz', quizRouter);

// Handle Invalid Routes
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Server Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

app.listen(PORT, () => {
  console.log(`Quiz Game running on http://localhost:${PORT}`);
});