/**
 * Created by yanjing on 9/23/15.
 */
var _U = require('../base/util');

var PEOPLE_STATUS = {
    FREE: 0,
    IN_ROOM: 1,
    READY: 2
};

var People = function(options){
    var id = _U.serializer();
    var opts = _U.extend({
        name: 'people-' + id
    }, options);

    this.id = id;
    this.hash = _U.hash(id);
    this.name = opts.name;
    return this;
};

var fn = People.prototype;

fn.getName = function(){
    return this.name;
};

fn.getId = function(){
    return this.id;
};

fn.getPeopleById = function(hash, id){

};

module.exports = People;