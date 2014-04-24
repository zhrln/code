//code from: https://github.com/EchoFUN/melodycoder/issues/5

var fs = require('fs');

function Transfer(req, resp){
    this.req = req;
    this.resp = resp;
}

Transfer.prototype._calStartPosition = function(Range){
    var startPos = 0;
    if(typeof Range != 'undefined'){
        var startPosMatch = /^bytes=([0-9]+)-$/.exec(Range);
        startPos = ~~startPosMatch[1];
    }
    return startPos;
};

Transfer.prototype._configHeader = function(Config){
    var startPos = Config.startPos, 
        fileSize = Config.fileSize,
        resp = this.resp;
    resp.setHeader('Content-Length', fileSize);
    resp.setHeader('Accept-Ranges', 'bytes'); 
    resp.setHeader('Content-Range', ['bytes ', startPos, '-', (fileSize - 1), '/', fileSize].join(""));
    resp.writeHead(206, 'Partial Content', {
        'Content-Type': 'application/octet-stream'
    });
};

Transfer.prototype._init = function(filePath, callback){
    var config = {},
        self = this;
    fs.stat(filePath, function(error, state){
        if(error){
            throw error;
        }
        if(state.isFile()){
            config.fileSize = state.size;
            var range = self.req.headers.range;
            config.startPos = self._calStartPosition(range);
            self.config = config;
            self._configHeader(config);
            callback();
        }else{
            self.resp.end('Not found!');
            return; 
        }
    });
};

Transfer.prototype.Download = function(filePath){
    var self = this;
    fs.exists(filePath, function(exist){
        if(exist){
            self._init(filePath, function(){
                var config = self.config,
                    resp = self.resp,
                    fReadStream = fs.createReadStream(filePath, {
                        'encoding': 'binary',
                        'bufferSize': 1024 * 1024,
                        'start': config.startPos,
                        'end': config.fileSize
                    });
                fReadStream.pipe(resp);
            });
        }else{
            self.resp.end('Not found!');
            return;
        }
    });
};

module.exports = Transfer;
