
// go top
~function () {
    var goTop = doc.getElementById('goTop');
    bindEvent('click', goTop, function () {
        win.scrollTo(0, 0);
    });
    bindEvent('scroll', win, function () {
        var scrollTop = doc.documentElement.scrollTop || doc.body.scrollTop || 0
        if (scrollTop > 500) {
            goTop.style.display = 'block';
        }else{
            goTop.style.display = 'none';
        }

    });
}();

// _blank link
~function () {
    var a = doc.getElementsByClassName('content')[0].getElementsByTagName('a'),
        len = a.length,
        i = 0,
        href;
    while(i < len){
        href = a[i].getAttribute('href');
        if (href && href.charAt(0) != '/' && href.indexOf('cssha.com') < 0 && href.indexOf(':4000') < 0) {
            a[i].target = '_blank';
        }
        i++;
    }
}();

// search
~function () {
    var searchButton = doc.getElementById('searchButton');
    var searchInput = doc.getElementById('searchInput');
    function go () {
        var val = searchInput.value,
            origin = location.origin;
        val && (location.href = origin + '/search.html?' + val);
    }
    bindEvent('click', searchButton, go);
    bindEvent('keydown', searchInput, function (e) {
        e.keyCode == 13 && go();
    });
}();