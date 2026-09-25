const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const emojis = [
  { emoji: '😀', name: 'Smile' },
  { emoji: '🐶', name: 'Dog' },
  { emoji: '🌮', name: 'Taco' },
  { emoji: '🍕', name: 'Pizza' },
  { emoji: '🚀', name: 'Rocket' },
  { emoji: '🐱', name: 'Cat' },
  { emoji: '🎉', name: 'Party' },
  { emoji: '🚗', name: 'Car' },
  { emoji: '🎸', name: 'Guitar' },
  { emoji: '📚', name: 'Books' }
];

let playerScore = 0;
const leaderboard = [];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

app.get('/api/game/question', (req, res) => {
  const correctEmoji = emojis[Math.floor(Math.random() * emojis.length)];

  const distractors = emojis
    .filter((e) => e.name !== correctEmoji.name)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .map((e) => e.name);

  const options = shuffle([correctEmoji.name, ...distractors]);

  res.json({
    emoji: correctEmoji.emoji,
    options,
    currentScore: playerScore
  });
});

app.post('/api/game/guess', (req, res) => {
  const { emoji, guess, playerName } = req.body;
  const target = emojis.find((e) => e.emoji === emoji);

  if (!target) {
    return res.status(400).json({ error: 'Invalid emoji provided' });
  }

  const isCorrect = target.name.toLowerCase() === guess.trim().toLowerCase();

  if (isCorrect) {
    playerScore += 10;
  }

  if (playerName) {
    const existingPlayer = leaderboard.find((p) => p.name.toLowerCase() === playerName.toLowerCase());
    if (existingPlayer) {
      existingPlayer.score = Math.max(existingPlayer.score, playerScore);
    } else {
      leaderboard.push({ name: playerName, score: playerScore });
    }
    leaderboard.sort((a, b) => b.score - a.score);
  }

  res.json({
    isCorrect,
    correctName: target.name,
    updatedScore: playerScore
  });
});

app.get('/api/leaderboard', (req, res) => {
  res.json(leaderboard.slice(0, 5)); // Top 5
});

app.post('/api/game/reset', (req, res) => {
  playerScore = 0;
  res.json({ message: 'Score reset', score: playerScore });
});

app.listen(PORT, () => {
  console.log(`Emoji Guessing Game server running on http://localhost:${PORT}`);
});
