const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const redis = require('redis');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const redisClient = redis.createClient();

const PORT = process.env.PORT || 3000;

// Store rooms and users
const rooms = {};

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', ({ roomId, username }) => {
    socket.join(roomId);
    if (!rooms[roomId]) {
      rooms[roomId] = [];
    }
    rooms[roomId].push({ socketId: socket.id, username });

    io.to(roomId).emit('message', { user: 'system', text: `${username} has joined the room.` });
  });

  socket.on('sendMessage', ({ roomId, username, message }) => {
    io.to(roomId).emit('message', { user: username, text: message });
  });

  socket.on('disconnect', () => {
    for (const roomId in rooms) {
      const userIndex = rooms[roomId].findIndex(user => user.socketId === socket.id);
      if (userIndex !== -1) {
        const username = rooms[roomId][userIndex].username;
        rooms[roomId].splice(userIndex, 1);
        io.to(roomId).emit('message', { user: 'system', text: `${username} has disconnected.` });
        break;
      }
    }
    console.log('Client disconnected');
  });
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
