---
title: 如何绕过chrome的弹窗拦截机制
author: 阿安
comments: true
layout: post
slug: open-window-in-chrome
categories: [javascript]
tags : [chrome, window, javascript]
date: 2014-07-04 20:38:00+00:00
---

在chrome的安全机制里面，非用户触发的window.open方法，是会被拦截的。举个例子：

{% highlight javascript %}
    var btn = $('#btn');
    btn.click(function () {

        //不会被拦截
        window.open('http://cssha.com')
    });
{% endhighlight %}
上面的代码中，window.open是用户触发的时候，是不会被拦截的，可以正常打开新窗口。再看下面这个：

{% highlight javascript %}
    var btn = $('#btn');
    btn.click(function () {

        $.ajax({
            url: 'ooxx',
            success: function (url) {

                //会被拦截
                window.open(url);
            }
        })
    });
{% endhighlight %}
上面的代码中，用户没有直接出发window.open，而是发出一个ajax请求，window.open方法被放在了ajax的回调函数里，这样的情况是会被拦截的。


那么，当用户点击按钮，发出ajax请求，如何在ajax请求完成后再打开新窗口，又不被拦截呢？ 接着往下看：

{% highlight javascript %}
    var btn = $('#btn');
    btn.click(function () {

        //打开一个不被拦截的新窗口
        var newWindow = window.open();

        $.ajax({
            url: 'ooxx',
            success: function (url) {

                //修改新窗口的url
                newWindow.location.href = url;
            }
        })
    });
{% endhighlight %}
上面的代码中，用户安点击按钮的时候，先打开一个空白页，再发ajax请求，在ajax回调里面修改新窗口的.location.href，这样就不会被拦截啦啦啦啦~~~