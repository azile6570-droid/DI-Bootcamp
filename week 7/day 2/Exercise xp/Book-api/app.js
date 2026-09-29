const express = require('express');
const booksRouter = require('./server/routes/books.router');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api', booksRouter);

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
  console.log(`Book API server running on port ${PORT}`);
});