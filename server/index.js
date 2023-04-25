const express = require('express');
const app = express();
const PORT = 4000;

const http = require('http').Server(app);
const cors = require('cors');

let users = [];

const socketIO = require('socket.io')(http, {
  cors: {
    origin: 'http://127.0.0.1:5173'
  }
})

socketIO.on('connection', (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);

  socket.on('message', (data) => {
    socketIO.emit('messageResponse', data);
  });

  socket.on('newUser', (data) => {
    users.push(data);
    console.log(users, 'users server')
    socketIO.emit('newUserResponse', users);
  });

  socket.on('typing', (data) => {
    socket.broadcast.emit('typingResponse', data);
  });

  socket.on('disconnect', () => {
    console.log('🔥: A user disconnected');
    users = users.filter((user) => user.socketId !== socket.id);

    socketIO.emit('newUserResponse', users);
    socket.disconnect();
  });
});

app.use(cors());

app.get('api', (req, res) => {
  res.json({
      message: 'Hello'
  })
});

http.listen(PORT, () => {
   console.log('Server listening')
});