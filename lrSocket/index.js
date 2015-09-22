var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use("/", express.static(__dirname + '/src'));

app.get('/service', function(req, res){
    res.send('<p>lr-service</p>');
});

io.on('connection', function(socket){
    // 新连接-消息
    // console.log('a user connected');

    // 访客连接-消息
    socket.on('access', function(params){
        console.log(params);
    });

    //用户加入-消息
    socket.on('login', function(obj){
        // 将用户 xxx 信息存入本次 socket 会话
        socket.xxx = obj['xxx'];

        //广播加入消息
        io.emit('login', {});
    });

    //用户退出-消息
    socket.on('disconnect', function(){
        //广播退出消息
        io.emit('logout', {});
    });

    //用户发布-消息
    socket.on('message', function(){
        //广播消息
        io.emit('message', {});
    });

});

http.listen(3000, '0.0.0.0', function(){
    console.log('listening on 0.0.0.0:3000');
});