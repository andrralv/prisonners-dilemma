var express = require('express');
var router = express.Router();
var http = require('http');
var socketio = require('socket.io')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var server = http.createServer(router);
var io = socketio(server, {
  cors: {
    origin: '*', 
    methods: ['GET', 'POST'] 
  }
});

connectedUsers = {}

io.on('connection', function(socket) {
  console.log('A user connected', socket.id);
  connectedUsers[socket.id] = {}
  sendUserList();
  
  socket.on('name', (name) => {
    connectedUsers[socket.id].name = name;
    sendUserList();
  });

  socket.on('disconnect', function(){
    const user = connectedUsers[socket.id];
    delete connectedUsers[socket.id];
    io.emit('system', `${user.name} has left the chat`);
    sendUserList();
  });

  function sendUserList() {
    io.emit('user', `${JSON.stringify(Object.values(connectedUsers))}`);
  }
});

module.exports = { router, server };
