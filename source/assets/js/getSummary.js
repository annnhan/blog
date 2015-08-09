
~function () {
    var doc = document,
        posts = doc.getElementsByClassName('js-post-content'),
        len = posts.length,
        i = 0,
        scr,
        htm,
        arr,
        smy;
    for (; i < len; i++) {
        scr = posts[i].getElementsByTagName('script')[0];
        htm = scr.innerHTML;
        arr = htm.split('<!-- more -->');
        smy = arr[0]
        posts[i].innerHTML= smy;
        if (!arr[1]) {
            posts[i].nextElementSibling.getElementsByTagName('a')[0].style.display = 'none';
        }
    }
    doc.getElementById('js-loading').style.display = 'none';
    doc.getElementById('js-main').style.display = '';
}();