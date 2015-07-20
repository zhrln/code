;(function(){
    var wrapElm = outerBox();

    function makeQRCode(elm, param){
        new QRCode(elm, {
            text: param.text || 'Green QRCode Generator',
            width: param.width || 128,
            height: param.height || 128,
            correctLevel : param.correctLevel || QRCode.CorrectLevel.H
        });
    }

    function outerBox(){
        var __outerBox = document.createElement("div"),
            __timestm = new Date().getTime();
        __outerBox.id = "green-qrcode-outer-box-" + __timestm;
        __outerBox.className = "green-qrcode-outer-box";
        return __outerBox;
    }

    function getCurrentTab(callback){
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            var current = tabs[0];
            callback && callback(current);
        });
    }

    function init(){
        document.addEventListener('DOMContentLoaded', function(){
            document.body.appendChild(wrapElm);
            getCurrentTab(function(tab){
                makeQRCode(wrapElm, {
                    text: tab.url,
                    width: 256,
                    height: 256
                });
            });
        });
    }
    init();

}());