var toast = function (a, b) {
    var c = document.getElementById("toast");
    if (c) {
        c.innerText = a;
        c.style.display = "block";
        if (c.timeoutid) {
            clearTimeout(c.timeoutid)
        }
        if (b) {
            c.timeoutid = setTimeout(function () {
                c.style.display = "none"
            }, b)
        }
    }
};
var simpleLocation = function (a) {
    var b = {'href': a};
    var c = a.split('://');
    b._protocol = c.shift();
    b.protocol = b._protocol + ':';
    c = c.join('://').split('/');
    b.host = c.shift();
    b.hostname = b.host.split(':')[0];
    b.port = b.host.split(':')[1] || '';
    c = c.join('/').split('?');
    b._pathname = c.shift();
    b.pathname = '/' + b._pathname;
    c = c.join('?').split('#');
    b._search = c.shift().replace(/<|>|%3C|%3E/gi, '');
    b.search = b._search ? ('?' + b._search) : '';
    b._hash = c.join('#');
    b.hash = b._hash ? ('#' + b._hash) : '';
    return b
};
var buildIntent = function (a) {
    var b = simpleLocation(a);
    var c = {
        alipays: "com.eg.android.AlipayGphone",
        tbmovie: "com.taobao.movie.android",
        taobaowebview: "com.taobao.taobao",
        taobao: "com.taobao.taobao",
        tmall: "com.tmall.wireless",
        yulebao: "com.taobao.android.taotv.yulebao"
    };
    var d = 'Intent;scheme=' + b._protocol + ';package=' + c[b._protocol] + ';end', intent_Protocol = 'intent', intentUri = intent_Protocol + '://' + b.host + b.pathname + b.search + '#' + d;
    return intentUri
};
var openIframeIntent = function (a) {
    var b = document.getElementById('iframeGo');
    if (!b) {
        b = document.createElement('iframe');
        b.id = 'iframeGo';
        b.name = 'iframeGo';
        b.style.display = 'none';
        document.body.appendChild(b)
    }
    b.src = a
};
var clickOpenIntent = function (a, b) {
    var c = document.getElementById('openAppLinkWithClick'), evt;
    if (!c) {
        c = document.createElement('a');
        c.id = 'openAppLinkWithClick';
        c.innerHTML = 'clickOpenIntent';
        if (!window.debug) {
            c.style.display = 'none'
        }
        document.body.appendChild(c)
    }
    if (b) {
        c.target = 'iframeGo'
    } else {
        c.target = '_blank'
    }
    c.href = a;
    if (window.CustomEvent) {
        evt = new window.CustomEvent('click', {canBubble: false, cancelable: false})
    } else {
        evt = document.createEvent('HTMLEvents');
        evt.initEvent('click', false, false)
    }
    c.dispatchEvent(evt)
};
var clearRafFn, rafFn = function () {
    var j;
    var k = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
    var l = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.cancelRequestAnimationFrame || window.webkitCancelRequestAnimationFrame;
    clearRafFn = function () {
        if (l) {
            l(j)
        }
        clearTimeout(j)
    };
    return function (c, d, e, f) {
        var g = null;
        var h = false;
        var i = function (a) {
            if (g === null) {
                g = a
            }
            var b = a - g;
            h = h || d && d();
            if (!h) {
                if (b < e) {
                    if (l) {
                        l(j)
                    }
                    j = k(i)
                } else {
                    c && c()
                }
            }
        };
        clearRafFn();
        if (k && f) {
            j = k(i)
        } else {
            j = setTimeout(function () {
                if (!d || !d()) {
                    c && c()
                }
            }, e)
        }
    }
}();
function renderQRCode() {
    function getqrcodejs(a) {
        var b = document.createElement("script");
        var c = false;
        b.async = true;
        b.onload = b.onreadystatechange = function () {
            if (!c) {
                c = true;
                a && a()
            }
        };
        b.src = "//g.alicdn.com/mtb/lib-qrcode/1.0.0/qrcode.js";
        document.body.appendChild(b)
    }

    getqrcodejs(function () {
        var a = new lib.QRCode(-1, lib.QRErrorCorrectLevel.H);
        var b = 247;
        a.addData(location.href);
        a.make();
        var c = document.createElement("table");
        c.setAttribute("border", 1);
        c.setAttribute("cellpadding", 0);
        c.setAttribute("cellspacing", 0);
        var d = a.getModuleCount();
        var e = Math.floor(b / d);
        b = e * d;
        c.style.width = b + "px";
        c.style.height = b + "px";
        var f = "<thead><tr>" + Array(d + 1).join("<th></th>") + "</tr></thead>";
        var g = "";
        var h, lastBgcolor, colSpan;
        for (var i = 0; i < d; i++) {
            g += "<tr>";
            colSpan = 0;
            lastBgcolor = null;
            for (var j = 0; j < d; j++) {
                h = a.isDark(i, j) ? "#000" : "#FFF";
                if (!lastBgcolor || h === lastBgcolor) {
                    lastBgcolor = h;
                    colSpan++
                } else {
                    g += '<td colspan="' + colSpan + '" style="background-color:' + lastBgcolor + ";width:" + e + "px;height:" + e + 'px"></td>';
                    colSpan = 1;
                    lastBgcolor = h
                }
            }
            g += '<td colspan="' + colSpan + '" style="background-color:' + lastBgcolor + ";width:" + e + "px;height:" + e + 'px"></td>';
            g += "</tr>"
        }
        c.innerHTML = f + "<tbody>" + g + "</tbody>";
        var k = document.createElement('section');
        var l = '<div id="qrcode" class="box"><p>亲，请用移动设备扫描二维码访问</p></div>';
        k.innerHTML = l;
        document.body.appendChild(k);
        document.getElementById("qrcode").appendChild(c);
        document.getElementById("banner") && (document.getElementById("banner").style.display = 'none')
    })
}
function getUrlParam(f) {
    var c = location.href;
    var e = (c).replace(/[#\?].*/, "").replace(/[^\/]+$/, function (i, h, g) {
            return (/[^\/]$/).test(i) ? "" : i
        }).replace(/\/+$/, "") + "/";
    var d = c.replace(e, "");
    var a = new RegExp("(^|&?)" + f + "=([^&|#]*)(&|#|$)");
    var b = d.substr(1).match(a);
    if (b !== null) {
        return decodeURIComponent(b[2]).replace(/<|>|%3C|%3E/gi, '')
    }
    return null
}
var jumpScheme = function (c) {
    if (!window.debug && !navigator.userAgent.match(/iPhone|iPad|iPod|Android/i) && !document.getElementById('goLaunch')) {
        renderQRCode();
        return false
    }
    toast("正在打开客户端...", 3000);
    setTimeout(function () {
        toast("如打开失败，未安装请点击下载", 1500)
    }, 3500);
    if (navigator.userAgent.match(/WindVane/i) && navigator.userAgent.match(/TB/) && c.indexOf('taobao:') === 0) {
        if (navigator.userAgent.match(/android/i)) {
            c = 'taobaowebview://m.taobao.com/?weburl=' + c
        }
        location.replace(c.replace('taobao:', 'http:'));
        return true
    }
    var d = buildIntent(c);
    var e = function () {
        var a = ('hidden' in document) ? 'hidden' : ('webkitHidden' in document) ? 'webkitHidden' : null;
        if (!a)return false;
        return document[a]
    }, doneHidden = window.doneHidden || e(), setHidden = function () {
        doneHidden = true
    }, checkHidden = function () {
        return doneHidden || (doneHidden = e())
    };
    window.onpagehide = window.onblur = setHidden;
    document.addEventListener(('hidden' in document) ? 'visibilitychange' : 'webkitvisibilitychange', setHidden, false);
    var f = function (a) {
        if (!window.debug)return;
        window.console.log(a);
        var b = document.getElementById('goLaunch') || document.getElementById('openAppLinkWithClick') || {};
        b.innerHTML += a
    };
    if (!window.debug && sessionStorage.getItem('J_jumpSchemeStatus')) {
        sessionStorage.removeItem('J_jumpSchemeStatus');
        return false
    }
    if (!checkHidden()) {
        setTimeout(function () {
            clearRafFn();
            f('<br />doneHidden: ' + doneHidden);
            if (!window.debug && doneHidden) {
                sessionStorage.setItem('J_jumpSchemeStatus', 'succeed');
                window.goldlog && goldlog.record('/dianying.300.2.200', '', '', 'H46985919');
                window.close()
            } else {
                sessionStorage.setItem('J_jumpSchemeStatus', 'failed')
            }
        }, 3000);
        rafFn(function () {
            f('<br /> Go ... 1 (scheme in iframe)');
            openIframeIntent(c);
            rafFn(function () {
                f('<br /> Go ... 2 (click scheme to frame)');
                clickOpenIntent(c, true);
                if (navigator.userAgent.match(/android/i)) {
                    rafFn(function () {
                        f('<br /> Go ... 3 (intent in iframe)');
                        openIframeIntent(d);
                        rafFn(function () {
                            f('<br /> Go ... 4 (click intent to frame)');
                            clickOpenIntent(d, true);
                            rafFn(function () {
                                sessionStorage.setItem('J_jumpSchemeStatus', 'failed');
                                if (!navigator.userAgent.match(/chrome/i)) {
                                    f('<br /> Go ... 5 (click scheme in self)');
                                    clickOpenIntent(c)
                                } else {
                                    f('<br /> Go ... 5 (click intent in self)');
                                    clickOpenIntent(d)
                                }
                                rafFn(function () {
                                    if (sessionStorage.getItem('J_jumpSchemeStatus') !== 'failed') {
                                        sessionStorage.setItem('J_jumpSchemeStatus', 'failed');
                                        window.goldlog && goldlog.record('/dianying.300.2.404', '', '', 'H46985944')
                                    }
                                }, checkHidden, 500, true)
                            }, checkHidden, 500, true)
                        }, checkHidden, 500, true)
                    }, checkHidden, 500, true)
                }
            }, checkHidden, 500, true)
        }, checkHidden, 500, true)
    }
    return doneHidden
};
