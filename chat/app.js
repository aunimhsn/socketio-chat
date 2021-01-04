const express = require('express');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = 8080;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('User connected');

    socket.on('chat-message', (msg) => {
        console.log('message: ' + msg);

        // Emitting from the server to the client to update UI
        socket.emit('chat-message', msg);
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});
  
http.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});
