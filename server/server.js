const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');

const express = require('express');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);

//configure http server to use socket.io
var io = socketIO(server);

app.use(express.static(publicPath));//for static 

//NOTE: when server goes down clients would keep polling server. But if browser is closed, socket server terminates connection
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('disconnect', () => {
        console.log('client disconnected');
    });
});

//we are now using http server as opposed to express server
server.listen(port, () => {
    console.log(`Server started at port ${port}`);
});