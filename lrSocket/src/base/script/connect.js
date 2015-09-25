/**
 * Created by yanjing on 9/22/15.
 */
define(['zepto','socketio'], function($, IO){
    var CONNECTION_STATES = {
        'NONE': 0,
        'CONNECTING': 1,
        'OPEN': 2,
        'CLOSING': 3,
        'CLOSED': 4,
        'DESTROYED': 5
    };

    var Connect = function(options){
        this._connectionState = CONNECTION_STATES.NONE;
        this.socket = IO.connect(options.host);
        this.socket.on('test', function(a,b,c){
            console.log(a,b,c);
        });
    };
    var fn = Connect.prototype;

    fn.destroy = function(){
        this._connectionState = CONNECTION_STATES.DESTROYED;
        if (this.socket) {
            this.socket.destroy();
        }
    };

    return Connect;
});