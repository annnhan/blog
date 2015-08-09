var win = window,
    doc = document;

// bind event
function bindEvent (type, el, cb) {
    if (el.addEventListener) {
        el.addEventListener(type, cb, false);
    }else{
        el.attachEvent('on' + type, cb);
    }
}

// ajax
function ajax(opt) {
    _opt = {
        url: '',
        type: 'get',
        ok: ''
    }
    var xhr = new XMLHttpRequest();
}

// jsonp
function jsonp(api) {
    var el = doc.createElement('script');
    el.src = api;
    doc.body.appendChild(el);
}

~function () {
    if (win.top != win) {
        try {
            win.top.location.href = win.location.href;
        }
        catch (e){
            location.href = 'about:blank';
        }
    }
}();
