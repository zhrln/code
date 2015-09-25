/**
 * Created by yanjing on 9/23/15.
 */
var _U = require('../base/util');
var config = require('../../config');

function PeoplePool(){
    var id = _U.serializer();
    var max = config.peoplePoolMax;
    var peoplePool = [];

    function add(people){
        if(!peoplePool[people.id]){
            peoplePool[people.id] = people;
        }
        return peoplePool[people.id];
    }

    function del(id){
        delete peoplePool[id];
    }

    function getPeopleById(id){
        return peoplePool[id];
    }

    function getPeoples(){
        return peoplePool;
    }

    return {
        add: add,
        del: del,
        getPeopleById: getPeopleById,
        getPeoples: getPeoples
    }
}

module.exports = PeoplePool;