let currentUser = null;
let gameState = null;

async function auth(type) {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  const res = await fetch(`/api/${type}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });

  const data = await res.json();
  document.getElementById('auth-status').innerText = data.message || data.error;

  if (res.ok && type === 'login') {
    currentUser = username;
    document.getElementById('auth-screen').classList.add('hidden');
    document.getElementById('setup-screen').classList.remove('hidden');
  }
}

async function startGame() {
  const p1 = document.getElementById('p1-name').value || 'Player1';
  const p2 = document.getElementById('p2-name').value || 'Player2';

  const res = await fetch('/api/game/start', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ player1: p1, player2: p2 })
  });

  gameState = await res.json();
  document.getElementById('setup-screen').classList.add('hidden');
  document.getElementById('game-screen').classList.remove('hidden');
  render();
}

async function fetchState() {
  const res = await fetch('/api/game/state');
  if (res.ok) {
    gameState = await res.json();
    render();
  }
}

async function makeMove(direction) {
  const activeKey = gameState.turn;
  const res = await fetch('/api/game/move', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ player: activeKey, direction })
  });

  const data = await res.json();
  if (res.ok) {
    gameState = data;
    render();
  } else {
    alert(data.error);
  }
}

async function attackBase() {
  const activeKey = gameState.turn;
  const res = await fetch('/api/game/attack', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ player: activeKey })
  });

  const data = await res.json();
  if (res.ok) {
    gameState = data;
    render();
  } else {
    alert(data.error);
  }
}

function render() {
  const board = document.getElementById('board');
  board.innerHTML = '';

  document.getElementById('status-msg').innerText = gameState.statusMessage;
  document.getElementById('current-turn').innerText = gameState.players[gameState.turn].name;

  for (let r = 0; r < gameState.gridSize; r++) {
    for (let c = 0; c < gameState.gridSize; c++) {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      // Check Obstacles
      if (gameState.obstacles.some((o) => o.r === r && o.c === c)) {
        cell.classList.add('obstacle');
        cell.innerText = '🪨';
      }

      // Check Bases
      if (r === gameState.players.p1.base.r && c === gameState.players.p1.base.c) {
        cell.classList.add('p1-base');
        cell.innerText = '🏰1';
      }
      if (r === gameState.players.p2.base.r && c === gameState.players.p2.base.c) {
        cell.classList.add('p2-base');
        cell.innerText = '🏰2';
      }

      // Check Player Positions
      if (r === gameState.players.p1.pos.r && c === gameState.players.p1.pos.c) {
        cell.innerText = '🧙‍♂️';
      }
      if (r === gameState.players.p2.pos.r && c === gameState.players.p2.pos.c) {
        cell.innerText = '🥷';
      }

      board.appendChild(cell);
    }
  }
}