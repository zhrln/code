/**
 * Created by yanjing on 9/23/15.
 */
var crypto = require('crypto');
var config = require('../../config');
/**
 * 全局对象检测
 * @param obj
 * @returns {boolean}
 */
exports.isGlobal = function(obj){
    var global = new Function('return this')();
    return obj == global;
};

/**
 * 随机数
 * @returns {number}
 */
exports.rnd = function(){
    return (((Math.random() * 9301 + 49297) % 233280) / 233280.0);
};

/**
 * 序列化
 * @param num
 * @returns {number}
 */
exports.serializer = function(num){
    var seed = num || this.rnd().toString().substring(2);
    var md5sum = crypto.createHash('md5');
    md5sum.update(seed);
    return md5sum.digest('hex');
};

/**
 * 取哈希
 * @param num
 * @returns {number}
 */
exports.hash = function(num){
    var seed = config.hashSeed;
    return this.serializer(num + seed);
};

/**
 * 对象合并
 * @param receiver
 * @param supplier
 * @returns {*}
 */
exports.extend = function(receiver, supplier){
    var args = [].slice.call(arguments),
        i = 1,
        key,
        ride = typeof args[args.length - 1] === "boolean" ? args.pop() : true; //如果最后参数是布尔，判定是否覆写同名属性
    if (args.length === 1){ //处理$.mix(hash)
        receiver = !this.isGlobal(this) ? this : {};
        i = 0;
    }
    while ((supplier = args[i++])) {
        for (key in supplier) { //对象合并
            if (Object.prototype.hasOwnProperty.call(supplier, key) && (ride || !(key in receiver))) {
                receiver[key] = supplier[key];
            }
        }
    }
    return receiver;
};