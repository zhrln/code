/**
 * Created by yanjing on 7/15/15.
 */
(function(){
    var base = '/asset/base';
    require.config({
        paths: {
            'zepto': base + '/script/zepto',
            'connect': base + '/script/connect',
            'socketio': '/socket.io/socket.io'
        }
    });
}());
