/**
 * Created by zhangrui on 8/9/15.
 */
var net = require('net');

//通过端口创建客户端
var client = net.connect({
    host: '127.0.0.1',
    port: '49494'
}, function() {
    console.log('已连接到服务器');
    client.write('2lala.cn!');
});

//data事件监听。收到数据后，断开连接
client.on('data', function(data) {
    console.log(data.toString());
    client.end();
});

//end事件监听，断开连接时会被触发
client.on('end', function() {
    console.log('已与服务器断开连接');
});