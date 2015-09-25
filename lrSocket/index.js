var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var ioRouter = require('./bin/app/router');

app.use("/", express.static(__dirname + '/src'));

app.get('/service', function(req, res){
    res.send('<p>lr-service</p>');
});

ioRouter(io);

http.listen(3000, '0.0.0.0', function(){
    console.log('listening on 0.0.0.0:3000');
});