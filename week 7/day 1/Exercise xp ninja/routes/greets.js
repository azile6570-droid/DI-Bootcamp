// routes/greet.js
const express = require('express');
const router = express.Router();

const emojis = ["😀", "🎉", "🌟", "🎈", "👋"];

// GET / - Form page
router.get('/', (req, res) => {
  const optionsHtml = emojis
    .map((emoji) => `<option value="${emoji}">${emoji}</option>`)
    .join('');

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Emoji Greeting App</title>
      <style>
        body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #f0f2f5; margin: 0; }
        .card { background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 10px rgba(0,0,0,0.1); width: 320px; text-align: center; }
        input, select, button { width: 100%; padding: 10px; margin-top: 10px; border-radius: 6px; border: 1px solid #ccc; box-sizing: border-box; }
        button { background: #007bff; color: white; border: none; font-weight: bold; cursor: pointer; }
        button:hover { background: #0056b3; }
      </style>
    </head>
    <body>
      <div class="card">
        <h2>Emoji Greeting App</h2>
        <form action="/greet" method="POST">
          <input type="text" name="name" placeholder="Enter your name" required />
          <select name="emoji">
            ${optionsHtml}
          </select>
          <button type="submit">Send Greeting</button>
        </form>
      </div>
    </body>
    </html>
  `);
});

// POST /greet - Display personalized greeting
router.post('/greet', (req, res) => {
  const { name, emoji } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).send('<h3>Error: Name is required! <a href="/">Go back</a></h3>');
  }

  const selectedEmoji = emojis.includes(emoji) ? emoji : "😀";

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <title>Greeting</title>
      <style>
        body { font-family: Arial, sans-serif; display: flex; justify-content: center; align-items: center; height: 100vh; background: #e3f2fd; margin: 0; }
        .card { background: white; padding: 2.5rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); text-align: center; }
        h1 { color: #1565c0; margin-bottom: 1rem; }
        a { text-decoration: none; color: #007bff; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="card">
        <h1>Hello, ${name.trim()}! ${selectedEmoji}</h1>
        <p>Hope you have a fantastic day!</p>
        <br />
        <a href="/">← Back to Form</a>
      </div>
    </body>
    </html>
  `);
});

module.exports = router;