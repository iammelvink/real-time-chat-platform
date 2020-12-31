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

// namespace (creates separation/groups for users)
const school = io.of('/school');

// logic on connection event in socket
school.on('connection', (socket) => {
  // listen to join event
  socket.on('join', (data) => {
    //join the room
    socket.join(data.room);
    // send message to members of that room
    school.in(data.room).emit('message', `New user joined the ${data.room} room!`);
  })
  // listen for 'message' event
  socket.on('message', (data) => {
    console.log(`message: ${data.msg}`);
    // emit message to members of that room
    school.in(data.room).emit('message', data.msg);
  });

  // listen to disconnect event
  socket.on('disconnect', () => {
    console.log('user disconnected');
    // emit everyone a user disconnected
    school.emit('message', 'user disconnected');
  })
})