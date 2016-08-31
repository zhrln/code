/*
 yanjing.zr@alibaba-inc.com
 一个简单的计时器 Pub/Sub
 2016/7/22
*/

var TimerBus = function(){

    var noop = function(){};

    var Publisher = function(){
        this._currentTime = 0;
        this.observers = [];
        this._interval = null;
        this._running = false;
    };

    Publisher.prototype.reg = function(observer){
        this.observers.push(observer);
        this.update();
    };

    Publisher.prototype.remove = function(index){
        this.observers.splice(index, 1);
    };

    Publisher.prototype.stop = function(){
        this.observers.length = 0;
        this._running = false;
        clearInterval(this._interval);
    };

    Publisher.prototype.update = function(){
        if(this._running)return;
        var _currentSecond = -1,
            _nowSecond,
            _now;
        this._running = true;
        this._interval = setInterval(function(){
            _now = new Date();
            _nowSecond = _now.getSeconds();
            this._currentTime = _now;
            if(_currentSecond != _nowSecond){
                _currentSecond = _nowSecond;
                this.publish();
            }
        }.bind(this), 100);
    }

    Publisher.prototype.publish = function(){
        if(this.observers.length == 0){
            this.stop();
            return false;
        }
        this.observers.forEach(function(n,i){
            var _rst = n.update(this._currentTime);
            if(!_rst){//如果已经onEnd了，就跑到这里
                this.remove(i);
            }
        }.bind(this));
    }

    var Subscriber = function(endTime, options){
        this._endTime = parseInt(endTime, 10);
        this._updateFn = options.onUpdate || noop;
        this._endFn = options.onEnd || noop;
    };

    Subscriber.prototype.update = function(date){
        var _leftTime = 0;
        if(this._endTime){
            _leftTime = this._endTime - date.getTime();
            if(_leftTime > 0){
                this._updateFn(formatTime(_leftTime), date);
            }else{
                this._endFn();
            }
        }else{
            this._updateFn();
        }
        return _leftTime > 0;
    };

    function formatTime(end){
        var leftsecond = parseInt(end / 1000);
        var _day = Math.floor(leftsecond / (60 * 60 * 24));
        var day = _day < 0 ? 0 : _day;
        var _hour = Math.floor((leftsecond - day * 24 * 60 * 60) / 3600);
        var hour = _hour < 0 ? 0 : _hour;
        var _minute = Math.floor((leftsecond - day * 24 * 60 * 60 - hour * 3600) / 60);
        var minute = _minute < 0 ? 0 : _minute;
        var _second = Math.floor(leftsecond - day * 24 * 60 * 60 - hour * 3600 - minute * 60)
        var second = _second < 0 ? 0 : _second;
        return {
            day: addZero(day),
            hour: addZero(hour),
            minute: addZero(minute),
            second: addZero(second),
            _day: day,
            _hour: hour,
            _minute: minute,
            _second: second
        };
    }

    function addZero(time){
        return (time < 10 && time >= 0 ? "0" : "") + time;
    }

    return {
        Publisher: Publisher,
        Subscriber: Subscriber
    }
};
