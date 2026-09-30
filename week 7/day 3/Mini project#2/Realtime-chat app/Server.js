const express = require('express');
const http = require('http');
const path = require('path');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve static assets from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Store connected users: { socketId: { username, room } }
const users = {};

// Helper to get all users in a specific room
function getRoomUsers(room) {
  return Object.values(users).filter((user) => user.room === room);
}

io.on('connection', (socket) => {
  // 1. User joins a room
  socket.on('joinRoom', ({ username, room }) => {
    socket.join(room);
    users[socket.id] = { username, room };

    // Welcome current user
    socket.emit('message', {
      user: 'System',
      text: `Welcome to the ${room} room, ${username}!`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Broadcast to others in the room
    socket.to(room).emit('message', {
      user: 'System',
      text: `${username} has joined the chat.`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    // Update active users list for the room
    io.to(room).emit('roomUsers', {
      room,
      users: getRoomUsers(room)
    });
  });

  // 2. Listen for chat messages
  socket.on('chatMessage', (msg) => {
    const user = users[socket.id];
    if (user) {
      io.to(user.room).emit('message', {
        user: user.username,
        text: msg,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }
  });

  // 3. User disconnects / leaves room
  socket.on('disconnect', () => {
    const user = users[socket.id];
    if (user) {
      const { username, room } = user;
      delete users[socket.id];

      io.to(room).emit('message', {
        user: 'System',
        text: `${username} has left the chat.`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });

      // Update active users list
      io.to(room).emit('roomUsers', {
        room,
        users: getRoomUsers(room)
      });
    }
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));