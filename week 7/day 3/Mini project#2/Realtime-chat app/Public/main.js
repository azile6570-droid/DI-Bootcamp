const socket = io();

// DOM Elements
const joinContainer = document.getElementById('join-container');
const chatContainer = document.getElementById('chat-container');
const joinForm = document.getElementById('join-form');
const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('chat-messages');
const roomName = document.getElementById('room-name');
const usersList = document.getElementById('users-list');
const leaveBtn = document.getElementById('leave-btn');

let currentUser = '';

// Notification sound helper
function playNotificationSound() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5 note
  osc.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.15);
}

// Handle Room Join
joinForm.addEventListener('submit', (e) => {
  e.preventDefault();
  currentUser = document.getElementById('username').value.trim();
  const room = document.getElementById('room').value;

  if (currentUser) {
    socket.emit('joinRoom', { username: currentUser, room });
    roomName.innerText = room;

    joinContainer.classList.add('hidden');
    chatContainer.classList.remove('hidden');
  }
});

// Handle Sending Message
chatForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const msgInput = document.getElementById('msg');
  const msg = msgInput.value.trim();

  if (msg) {
    socket.emit('chatMessage', msg);
    msgInput.value = '';
    msgInput.focus();
  }
});

// Handle Incoming Message
socket.on('message', (data) => {
  outputMessage(data);

  // Play notification sound for messages from others
  if (data.user !== currentUser && data.user !== 'System') {
    playNotificationSound();
  }

  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

// Handle Active Users Update
socket.on('roomUsers', ({ users }) => {
  usersList.innerHTML = users.map((u) => `<li>🟢 ${u.username}</li>`).join('');
});

// Output Message to DOM
function outputMessage({ user, text, time }) {
  const div = document.createElement('div');
  div.classList.add('message');

  if (user === currentUser) {
    div.classList.add('my-message');
  }

  div.innerHTML = `
    <div class="meta">${user} <span>${time}</span></div>
    <div class="text">${text}</div>
  `;
  chatMessages.appendChild(div);
}

// Handle Leaving Chat Room
leaveBtn.addEventListener('click', () => {
  window.location.reload();
});