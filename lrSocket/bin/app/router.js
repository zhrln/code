/**
 * Created by yanjing on 9/25/15.
 */
var People = require('./people');
var Room = require('./room');
var PeoplePool = require('./peoplePool');
var peoplePool = new PeoplePool;

module.exports = function(io){

    io.on('connection', function(socket){
        // 新连接-消息
        var people = new People();
        peoplePool[people.id] = people;

        // 访客连接-消息
        socket.on('createRoom', function(params){
            var room = new Room();
            room._create(params);
            console.log('房间:',room);
            console.log('玩家池:',peoplePool);
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
};