// create app
const app = require('express')();

// create server and plug the app into it
const server = require('http').Server(app);

// for socket.io dependencies
const io = require('socket.io')(server);

// set port to listen on
const port = 8000;

// make server listen on set port
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// serve static index.html file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html')
})

// logic on connection event in socket
io.on('connection', (socket) => {
  console.log('user connected');
  // listen for 'message' event
  socket.on('message', (msg) => {
    console.log(`message: ${msg}`);
    io.emit('message', msg);
  })
})