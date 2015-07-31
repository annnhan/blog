---
author: 阿安
comments: true
date: 2013-01-22 11:48:59+00:00
layout: post
slug: onhashchange-improve-anchor-links
title: 通过onhashchange优化“锚链接”
wordpress_id: 702
categories:
- JavaScript
tags:
- focus
- JavaScript
- Link
- onhashchange
---

锚链接是大家再熟悉不过的了，它允许用户通过一个链接跳转到当前页面的指定内容。一般创建一个锚链接的方法就像下面这样，用户点击a标签，浏览器将跳转的id为content的div来显示其内容。。

    
    {% highlight html %}
    <a href="#content">跳到id为content的标签</a>



    <div id="content">

    </div>
    {% endhighlight %}




**存在的问题：**
当用户没有鼠标，而是使用tab键+回车键的方式触发锚链接时，页面焦点仍然停留在a标签，并没有相应转到<div id="content">上。这种情况带来的问题是：如果用户继续按tab键，焦点会转移到a标签的下一个可获取焦点的元素，这可能是挨着a标签的另一个链接，反正不是<div id="content">的下一个可获取焦点的元素。而屏幕可视区域就有可能回滚回其他地方。按照常理，用户更希望按下tab键，焦点应该跳转到<div id="content">的下一个可获取焦点的元素。
<!-- more -->
**解决思路**
如果用户触发锚链接时候，焦点也跟着跳转到相应的目标元素，那么问题就可以解决了。在锚链接被触发时候， location.hash会储存a标签的href；这其实也就是目标元素的id，因此我们可以在onhashchange事件被触发的时候，获取相应元素，然后调用focus()方法，使其获取焦点。但是，如果获取到的是个span、div、p等非表单元素，focus()方法却不能起作用。解决的办法是在调用focus()之前，设置其tabIndex属性成一个整数，这样非表单元素也能获得焦点了。

    
    {% highlight javascript %}
    var fixedJumpLink = function () {
                var el, hash = location.hash.substr(1);
                if (hash == '') {
                    return;
                }
                el = document.getElementById(hash);
                if (!/^(a|input|button|select|textarea)$/i.test(el.tagName)) {//判断元素tagName
                    el.tabIndex = -1;
                }
                el.focus();
            }
    window.onhashchange = fixedJumpLink;
    {% endhighlight %}




**兼容浏览器**
在版本低于IE8的浏览器中，onhashchange事件是不被支持的，我的办法是定时检查location.hash，如果location.hash发生变化，则调用fixedJumpLink函数，已达到兼容低版本IE浏览器的目的。

    
    {% highlight javascript %}
    var fixedJumpLink = function () {
        var el, hash = location.hash.substr(1);
        if (hash == '') {
            return;
        }
        el = document.getElementById(hash);
        if (!/^(a|input|button|select|textarea)$/i.test(el.tagName)) {
            el.tabIndex = -1;
        }
        el.focus();
    }

    //浏览器版本是否低于IE8
    var lessThenIE8 = function () {
        var UA = navigator.userAgent,
            isIE = UA.indexOf('MSIE') > -1,
            v = isIE ? /\d+/.exec(UA.split(';')[1]) : 'no ie';
        return v < 8;
    }();

    if (lessThenIE8) {
        var oldHash = location.hash.substr(1);
        (function () {
            var newHash = location.hash.substr(1);
            if (oldHash != newHash) {
                oldHash = newHash;
                fixedJumpLink();
            }
            setTimeout(arguments.callee, 0);
        })();
    } else {
        window.onhashchange = fixedJumpLink;
    }
    {% endhighlight %}




demo:
[/wp-content/uploads/2013/01/fixedhotlink.html](/wp-content/uploads/2013/01/fixedhotlink.html)



参考文章：
http://www.nczonline.net/blog/2013/01/15/fixing-skip-to-content-links/
http://msdn.microsoft.com/en-us/library/ms534654%28VS.85%29.aspx
