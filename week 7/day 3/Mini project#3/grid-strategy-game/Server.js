const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// In-Memory Data Storage
const users = {}; // { username: password }
let gameSession = null; // Active game instance

const GRID_SIZE = 10;
const OBSTACLES = [
  { r: 2, c: 2 }, { r: 2, c: 3 }, { r: 3, c: 2 },
  { r: 7, c: 7 }, { r: 7, c: 6 }, { r: 6, c: 7 },
  { r: 4, c: 5 }, { r: 5, c: 4 }
];

// Helper: Check if cell contains an obstacle
function isObstacle(r, c) {
  return OBSTACLES.some((obs) => obs.r === r && obs.c === c);
}

// 1. User Authentication Routes
app.post('/api/register', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required' });
  }
  if (users[username]) {
    return res.status(400).json({ error: 'User already exists' });
  }
  users[username] = password;
  res.json({ message: 'User registered successfully' });
});

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (!users[username] || users[username] !== password) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }
  res.json({ message: 'Login successful', username });
});

// 2. Start Game Session
app.post('/api/game/start', (req, res) => {
  const { player1, player2 } = req.body;
  if (!player1 || !player2) {
    return res.status(400).json({ error: 'Two players are required' });
  }

  gameSession = {
    gridSize: GRID_SIZE,
    obstacles: OBSTACLES,
    players: {
      p1: { name: player1, pos: { r: 0, c: 0 }, base: { r: 0, c: 0 }, hp: 100 },
      p2: { name: player2, pos: { r: 9, c: 9 }, base: { r: 9, c: 9 }, hp: 100 }
    },
    turn: 'p1', // 'p1' or 'p2'
    winner: null,
    statusMessage: `Game started! It is ${player1}'s turn.`
  };

  res.json(gameSession);
});

// 3. Get Game State
app.get('/api/game/state', (req, res) => {
  if (!gameSession) {
    return res.status(404).json({ error: 'No active game session' });
  }
  res.json(gameSession);
});

// 4. Move Route
app.post('/api/game/move', (req, res) => {
  const { player, direction } = req.body; // direction: 'up', 'down', 'left', 'right'

  if (!gameSession || gameSession.winner) {
    return res.status(400).json({ error: 'No active game or game is over' });
  }

  if (gameSession.turn !== player) {
    return res.status(400).json({ error: 'Not your turn' });
  }

  const currentPlayer = gameSession.players[player];
  const opponentKey = player === 'p1' ? 'p2' : 'p1';
  const opponent = gameSession.players[opponentKey];

  let { r, c } = currentPlayer.pos;

  // Calculate new target position
  if (direction === 'up') r -= 1;
  else if (direction === 'down') r += 1;
  else if (direction === 'left') c -= 1;
  else if (direction === 'right') c += 1;

  // Validation: Board Boundaries
  if (r < 0 || r >= GRID_SIZE || c < 0 || c >= GRID_SIZE) {
    return res.status(400).json({ error: 'Move out of bounds' });
  }

  // Validation: Obstacles
  if (isObstacle(r, c)) {
    return res.status(400).json({ error: 'Cannot move through obstacles' });
  }

  // Execute Move
  currentPlayer.pos = { r, c };

  // Check Win Condition: Reached Opponent Base directly
  if (r === opponent.base.r && c === opponent.base.c) {
    gameSession.winner = currentPlayer.name;
    gameSession.statusMessage = `🏆 ${currentPlayer.name} reached the opponent's base and WON!`;
    return res.json(gameSession);
  }

  // Switch Turn
  gameSession.turn = opponentKey;
  gameSession.statusMessage = `${currentPlayer.name} moved ${direction}. It is now ${opponent.name}'s turn.`;

  res.json(gameSession);
});

// 5. Attack Route
app.post('/api/game/attack', (req, res) => {
  const { player } = req.body;

  if (!gameSession || gameSession.winner) {
    return res.status(400).json({ error: 'No active game or game is over' });
  }

  if (gameSession.turn !== player) {
    return res.status(400).json({ error: 'Not your turn' });
  }

  const currentPlayer = gameSession.players[player];
  const opponentKey = player === 'p1' ? 'p2' : 'p1';
  const opponent = gameSession.players[opponentKey];

  // Check if adjacent to opponent's base
  const dr = Math.abs(currentPlayer.pos.r - opponent.base.r);
  const dc = Math.abs(currentPlayer.pos.c - opponent.base.c);

  if ((dr === 1 && dc === 0) || (dr === 0 && dc === 1)) {
    opponent.hp -= 50;

    if (opponent.hp <= 0) {
      opponent.hp = 0;
      gameSession.winner = currentPlayer.name;
      gameSession.statusMessage = `💥 ${currentPlayer.name} destroyed ${opponent.name}'s base and WON!`;
    } else {
      gameSession.turn = opponentKey;
      gameSession.statusMessage = `💥 ${currentPlayer.name} attacked ${opponent.name}'s base! Base HP: ${opponent.hp}%. ${opponent.name}'s turn.`;
    }
  } else {
    return res.status(400).json({ error: 'You must be adjacent to the opponent base to attack!' });
  }

  res.json(gameSession);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Game Server running on http://localhost:${PORT}`));