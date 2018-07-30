const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const socketIO = require('socket.io');
const express = require('express');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validations');
const {Users} = require('./utils/users');

const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);

//configure http server to use socket.io
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));//for static 

//NOTE: when server goes down clients would keep polling server. But if browser is closed, socket server terminates connection
io.on('connection', (socket) => {
    console.log('New user connected');

    socket.on('join', (params, callback) => {
        if(!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room name are required.');
        }

        socket.join(params.room);
        users.removeUser(socket.id);// to make sure remove user if already exists
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));//emit to all the users in current room updated user list
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));//current user
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin',`${params.name} has joined!`));//broadcast to all users in the current room
        callback();
    });

    //NOTE: socket emits to single socket connection, io emits to every single connected user
    socket.on('createMessage', (message, callback) => {
        var user = users.getUser(socket.id);

        if(user && isRealString(message.text)) {
            //io.emit emits to every single user connected inside a room
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        }
        
        callback();
    });

    socket.on('createLocationMessage', (coords) => {
        var user = users.getUser(socket.id);

        if(user && coords) {
            io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
        }  
    });
    
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if(user) {
            //emit every single person cnnected to chat room
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} user has left`));
        }
        console.log('client disconnected');
    });
});

//we are now using http server as opposed to express server
server.listen(port, () => {
    console.log(`Server started at port ${port}`);
});