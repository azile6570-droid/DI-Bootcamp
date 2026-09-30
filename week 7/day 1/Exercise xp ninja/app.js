// app.js
const express = require('express');
const app = express();
const PORT = 3000;

// Enable URL-encoded form data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const greetRouter = require('./routes/greet');
app.use('/', greetRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});