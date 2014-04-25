var http = require('http'),
    cluster = require('cluster'),
    url = require('url'),
    Transfer = require('./Transfer'),
    numCPUs = require('os').cpus().length,
    basePath = '/home/pi/webroot';

if(cluster.isMaster){
    console.log("Master start ...");
    for(var i = 0; i < numCPUs; i++){
        cluster.fork();
    }
    cluster.on('listening', function(worker, address){
        console.log(["Listening: Worker ", worker.process.pid, ", Address: ", address.address, ":", address.port].join(""));
    });
    cluster.on('exit', function(worker, code, signal){
        console.log(["worker ", worker.process.pid, "died"].join(""));
    });
}else{
    http.createServer(function(req, resp) {
        var transfer = new Transfer(req, resp),
            pathName = url.parse(req.url).pathname;

        transfer.Download(basePath + pathName);
    }).listen('8000');
}
