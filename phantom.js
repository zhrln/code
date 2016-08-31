var page = require('webpage').create();
var system = require('system');
page.onResourceRequested = function(request) {
    if(/^http/.test(request.url)){
        console.log('Request: ', request.url);
    }
};
if (system.args.length === 1) {
    console.log('Usage: phantom.js <some URL>');
    phantom.exit();
}
page.open(system.args[1], function (status) {
    page.render('pic.png');
    phantom.exit();
});
