const express = require('express');
const todosRouter = require('./server/routes/todos.router');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Routes attached under /api endpoint
app.use('/api', todosRouter);

// Handle invalid routes (404)
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global server error handler (500)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error', details: err.message });
});

app.listen(PORT, () => {
  console.log(`Todo List API server running on port ${PORT}`);
});