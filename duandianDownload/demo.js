var http = require('http'),
    url = require('url'),
    Transfer = require('./Transfer'),
    basePath = '/home/pi/webroot';

var server = http.createServer(function(req, resp) {
    var transfer = new Transfer(req, resp),
        pathName = url.parse(req.url).pathname;

    transfer.Download(basePath + pathName);
});
server.listen('8000');
