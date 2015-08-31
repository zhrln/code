/**
 * Created by zhangrui on 8/9/15.
 */
var Q = require("q"),
    photoshop = require('./lib/photoshop');

var PHOTOSHOP_EVENT_PREFIX = "PHOTOSHOP-EVENT-";

function Connect(){
    if (!(this instanceof Connect)) {
        return new Connect();
    }
    this._photoshop = null;
    this._messageDeferreds = [];
}

Connect.prototype.start = function (options) {
    var self = this;

    options = options || {};
    self._options = options;
    self._config = options.config || {};

    function connectToPhotoshop() {
        var connectionDeferred = Q.defer();
        self._photoshop = photoshop.createClient(options);
        self._photoshop.once("connect", function () {
            connectionDeferred.resolve(self);
        });

        self._photoshop.on("close", function () {
            console.log("Photoshop connection closed");
            self.emit("close");
        });

        self._photoshop.on("error", function (err) {
            console.log("Photoshop error", err);
            // If the error does refers to a specific command we ran, reject the corresponding deferred
            if (err && self._messageDeferreds.hasOwnProperty(err.id)) {
                self._messageDeferreds[err.id].reject(err.body);
            }
            // TODO: Otherwise, gracefully shut down?
        });

        self._photoshop.on("communicationsError", function (err, rawMessage) {
            console.log("photoshop communications error: %j", {error: err, rawMessage: rawMessage});
        });

        self._photoshop.on("message", function (messageID, parsedValue) { // ,rawMessage)
            debugger;
            if (self._messageDeferreds[messageID]) {
                self._messageDeferreds[messageID].notify({type: "javascript", value: parsedValue});
            }
        });

        self._photoshop.on("info", function (info) {
            console.log("Photoshop info: %j", info);
        });

        self._photoshop.on("event", function (messageID, eventName, parsedValue) { // , rawMessage)
            debugger;
            self.emitPhotoshopEvent(eventName, parsedValue);
        });

        self._photoshop.on("pixmap", function (messageID, messageBody) { // , rawMessage)
            debugger;
            if (self._messageDeferreds[messageID]) {
                self._messageDeferreds[messageID].notify({type: "pixmap", value: messageBody});
            }
        });

        //return connectionDeferred.promise;
    }
};