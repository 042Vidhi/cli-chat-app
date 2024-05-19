const readline = require('readline');
const io = require('socket.io-client');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Select an option: 1) Join a chat 2) Create a room: ', (option) => {
  if (option === '1') {
    joinChat();
  } else if (option === '2') {
    createRoom();
  } else {
    console.log('Invalid option');
    rl.close();
  }
});

function joinChat() {
  rl.question('Enter room ID: ', (roomId) => {
    rl.question('Enter your username: ', (username) => {
      const socket = io.connect('http://localhost:3000');
      socket.emit('joinRoom', { roomId, username });

      socket.on('message', (message) => {
        console.log(`${message.user}: ${message.text}`);
      });

      rl.on('line', (input) => {
        socket.emit('sendMessage', { roomId, username, message: input });
      });

      socket.on('disconnect', () => {
        console.log('Disconnected from server');
        process.exit(0); // Exit the process when disconnected
      });
    });
  });
}

function createRoom() {
  const roomId = Math.random().toString(36).substring(2, 15);
  console.log(`Your room ID is: ${roomId}`);
  rl.question('Enter your username: ', (username) => {
    const socket = io.connect('http://localhost:3000');
    socket.emit('joinRoom', { roomId, username });

    socket.on('message', (message) => {
      console.log(`${message.user}: ${message.text}`);
    });

    rl.on('line', (input) => {
      socket.emit('sendMessage', { roomId, username, message: input });
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
      process.exit(0); // Exit the process when disconnected
    });
  });
}
