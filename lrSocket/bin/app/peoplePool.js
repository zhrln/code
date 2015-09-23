/**
 * Created by yanjing on 9/23/15.
 */
var _U = require('../base/util');

var PeoplePool = function(options){
    var id = _U.serializer();
    var opts = _U.extend({
        max: 100
    }, options);

    Object.defineProperty(this, "id", {
        value: id,
        writable: false
    });
    Object.defineProperty(this, "max", {
        value: opts.max,
        writable: false
    });
    return this;
};

var fn = PeoplePool.prototype;


fn.getPeopleById = function(hash, id){

};

fn.add = function(people){

};

fn.del = function(id){

};

module.exports = PeoplePool;