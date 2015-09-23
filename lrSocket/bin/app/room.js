/**
 * Created by yanjing on 9/23/15.
 */
var _U = require('../base/util');

var Room = function(){
    this.id = _U.serializer();
    this.people = [];
    return this;
};

var fn = Room.prototype;

fn._create = function(options){
    var opts = _U.extend({
        maxPeople: 15,
        name: 'room-' + this.id
    }, options);
    this.name = opts.name;
    this.maxPeople = opts.maxPeople;
};

fn._add = function(player){

};

fn._sub = function(){

};

module.exports = Room;