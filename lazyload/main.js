/**
 * Created by yanjing on 4/27/16.
 */

(function(){

    var placeHolder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6NUI0QjkzQjRGQzBCMTFFNDlDQjBBNTkxOEEyOTM1MDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6NUI0QjkzQjNGQzBCMTFFNDlDQjBBNTkxOEEyOTM1MDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NENCQTFDMjlGQkNFMTFFNDlDQjBBNTkxOEEyOTM1MDYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NENCQTFDMkFGQkNFMTFFNDlDQjBBNTkxOEEyOTM1MDYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6kSYYaAAACSklEQVR42qyWS0hUYRTHr9PQzoWViwhBzcQCiV5oIb3QnQQGFT4C20wLqW3UXnQpJNgMRlT2xEURSPTYhTXhA60WlQWBQURFVAup8fE78L9wudzPa3UP/Oab+e7M+X/fOd93zhRls1lvGSuCBmiEWlin+S/wEh7Bk0wms+B04BBIQSecg41QgLfwUc83wCZIwwfohUGEClGOwlYOT+GiVtoKa2ELNAl7XwLHJDAA+VwuVxMnsBPGoBqOQD3chB8RC/kFt1n1PsYWKINRRPa4BCpgBH7CDhj2VmiI3GHYpR2PILI5LLAKriumFoL3EX5OKA8uEQvVQZiDa4ikggLHFY4umHH4sLBVxexkluE0bIPDQYGz8AxueP9vw1pkxheo1+ouJODc0524ZeEiTKUmsB8W4Z6XnN1VXhtNYKuS+i1BgXH4bAJpXf9Pf/Hj3uAHwmCnpo/QfA+GifkpC31aeVhYgeN38AfOhObnFN7x0Lz5nreXrzpWcTYowkl1fX89vLLVv9AtXpNUAghPsYrhtAk8UMabE0zyIfl8bALP4TWcUv1PwrqUs9GU7kC3KmlHAuE5yrAbesjPol8qhlQqzit2/+q8yu8NcDlYi2wX7fAb7scVNYfzSoaHdjShze9u4Za5XQKrlZMhicf17Tbol/MmnE+6OtqEGoc19Cs6AJ1qj2Er0a7zWsgba1RB5/5tC5s1jr36sTX9S9rFjOpLQU2/QkfRmtBJ6+E4n/cirnOUWem4KurggP62lGrXk3pmdyhvp8UVvyUBBgBdpaddNUUfMQAAAABJRU5ErkJggg==';
    var ONE_PX = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAQMAAAAl21bKAAAAA1BMVEUAAACnej3aAAAAAXRSTlMAQObYZgAAAApJREFUCNdjYAAAAAIAAeIhvDMAAAAASUVORK5CYII=';
    var LAZYLOAD_CLASS_NAME = 'j-ng-lazyload';

    function noop(){}

    function isHidden(elem) {
        var computed = null;
        while ( elem && elem.nodeType === 1 ) {
            computed = window.getComputedStyle(elem);
            if ( computed.display === "none" || computed.visibility === "hidden" ){
                return true;
            }
            elem = elem.parentNode;
        }
        return false;
    }

    function isImageElement(elm){
        if(elm){
            return elm.tagName.toLowerCase() === 'img';
        }
        return false;
    }

    function _type(type){
        return ({}).toString.call(type).slice(8,-1).toLowerCase();
    }

    function isNormalNode(elm){
        return (elm && elm.nodeType && elm.nodeType == 1);
    }

    var Lazyload = function(opts){
        this._initOptions(opts);
        this._initStyle();
        this._initEvent();
        this._initElement();
        this._render();
    };

    var fn = Lazyload.prototype;

    fn._initOptions = function(opts){
        var options = opts || {};
        options.attrName = options.attrName || 'data-src';
        options.placeholder = options.placeholder || placeHolder;
        options.$wrap = options.$wrap || document;
        options.lazyClassName = options.lazyClassName || LAZYLOAD_CLASS_NAME;
        options.onLoad = options.onLoad || noop;
        options.onError = options.onError || noop;
        this.options = options;
        this.picsElementsArray = [];
        this.scrollTimer = 0;
    };

    fn._initStyle = function(){
        var _styleElm = document.querySelector('#' + LAZYLOAD_CLASS_NAME);
        if(_styleElm){return;}
        var lazyloadClass = this.options.lazyClassName;
        var styleTextArr = [
            '.' + lazyloadClass + '{',
                'background:center no-repeat;',
                'background-image:url(' + this.options.placeholder + ');',
                'background-size:auto;',
            '}'
        ].join('');
        var styleElm = document.createElement('style');
        var styleTextElm = document.createTextNode(styleTextArr);
        var headElm = document.getElementsByTagName('head')[0];
        styleElm.id = LAZYLOAD_CLASS_NAME;
        styleElm.appendChild(styleTextElm);
        headElm.appendChild(styleElm);
    };

    fn._initEvent = function(){
        window.addEventListener('scroll', this);
        window.addEventListener('resize', this);
    };

    fn._initElement = function(elm){
        var _this = this;
        var arr = [];

        function init(elm){
            if(isNormalNode(elm)){
                if (isImageElement(elm)){
                    elm.src = ONE_PX;
                }
                elm.classList.add(_this.options.lazyClassName);
            }
            return elm;
        }

        if(isNormalNode(elm)){
            arr.push(init(elm));
        }else if(_type(elm) == 'nodelist' || _type(elm) == 'array'){
            arr = [].slice.call(elm, 0);
        }else{
            arr = [].slice.call(_this.options.$wrap.querySelectorAll('[' + _this.options.attrName + ']:not([data-lazyload-state])'), 0);
        }

        if(arr.length){
            arr.forEach(function(n){
                _this.picsElementsArray.push(init(n));
            });
        }
    };

    fn.addItem = function(elm){
        this._initElement(elm);
        this._render();
    };

    fn.refresh = function(){
        this._initElement();
        this._render();
    };

    fn._loadImage = function(elm){
        var _this = this;
        var original = elm.getAttribute(_this.options.attrName);
        var _img = new Image;

        function _onload(){
            elm.classList.remove(_this.options.lazyClassName);
            if(isImageElement(elm)){
                elm.src = original;
            }else{
                elm.style.backgroundImage = "url(" + original + ")";
            }
            _this.options.onLoad(elm);
            _img = null;
        }

        function _onerror(){
            _this.options.onError(elm);
            _img = null;
        }

        _img.onload = _onload;
        _img.onError = _onerror;

        _img.src = original;

    };

    fn._render = function(){
        if(this.picsElementsArray.length == 0){return 0}
        var _this = this;
        var state = '';
        var clientHeight = document.documentElement.clientHeight;
        _this.picsElementsArray.forEach(function(n){
            state = n.getAttribute('data-lazyload-state');
            if(state && state == 'loaded'){
                return false;
            }else{
                var rect = n.getBoundingClientRect();
                var isItemInView = (rect.top >= 0 && rect.top <= clientHeight) || (rect.bottom > 0 && rect.bottom <= clientHeight);
                if(isItemInView && !isHidden(n)){
                    _this._loadImage(n);
                    n.setAttribute('data-lazyload-state', 'loaded');
                }
            }
        });
    };

    fn.scroll = function(){
        clearTimeout(this.scrollTimer);
        this.scrollTimer = setTimeout(function(){
            this._render();
        }.bind(this),100);
    };

    fn.resize = fn.scroll;

    fn.handleEvent = function (e) {
        if (typeof (this[e.type]) === 'function'){
            return this[e.type](e);
        }
    };

    window.Lazyload = Lazyload;

}());