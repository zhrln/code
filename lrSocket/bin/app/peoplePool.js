/**
 * Created by yanjing on 9/23/15.
 */
var _U = require('../base/util');
var config = require('../../config');

var PeoplePool = function(options){
    var id = _U.serializer();

    Object.defineProperty(this, "id", {
        value: id,
        writable: false
    });
    Object.defineProperty(this, "max", {
        value: config.peoplePoolMax,
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