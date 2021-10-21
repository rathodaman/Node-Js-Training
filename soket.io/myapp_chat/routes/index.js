var express = require('express');
var router = express.Router();

//const app = express();
const http = require('http');
// const server = http.createServer(app);
// const { Server } = require("socket.io");
// const io = new Server(server);


// app.get('/', (req, res) => {
//   res.send('<h1>Hello world</h1>');
// });

app.get('/', (req, res) => {
  res.render('index')  
  //res.sendFile(__dirname + '/home/webcodegenie/amanLearning/soket.io/myapp_chat/routes/index.hbs');
});


// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('disconnect', () => {
//       console.log('user disconnected');
//     });
// });

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
    });
});

io.emit('some event', { someProperty: 'some value', otherProperty: 'other value' }); 
// This will emit the event to all connected sockets

io.on('connection', (socket) => {
    socket.broadcast.emit('hi');
});

io.on('connection', (socket) => {
    socket.on('chat message', (msg) => {
      io.emit('chat message', msg);
    });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});


module.exports = router;
