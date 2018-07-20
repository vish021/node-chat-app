var socket = io();//initiating request to keep conn open

socket.on('connect', function() {
    console.log('Connected to server');
});

socket.on('disconnect', function() {
    console.log('disconnected from server');
});

socket.on('newMessage', function(newMessage) {
    console.log('new message recieved', newMessage);
});
