/**
 * Created by yanjing on 9/22/15.
 */
define(['zepto', 'connect'], function($, Connect){
    var connect = new Connect({
        'host': 'ws://' + window.location.host
    });
    connect.socket.emit('login', {'name': 'room01'});
});