/**
 * Created by yanjing on 7/15/15.
 */
(function(){
    var base = '/asset/base';
    require.config({
        deps: ['flexible'],
        paths: {
            // 本地
            'zepto': base + '/script/zepto',
            'connect': base + '/script/connect',
            'socketio': '/socket.io/socket.io',
            // 远端
            'flexible': '//g.tbcdn.cn/mtb/lib-flexible/0.3.2/flexible'
        },
        shim: {
            zepto: {
                exports: '$'
            }
        },
        urlArgs: 'v=1.0.0'
    });
}());
