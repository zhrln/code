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

    Object.defineProperty(this, "id", {
        value: id,
        writable: false
    });
    Object.defineProperty(this, "hash", {
        value: _U.hash(id),
        writable: false
    });
    this.name = opts.name;
    return this;
};

var fn = People.prototype;

module.exports = People;