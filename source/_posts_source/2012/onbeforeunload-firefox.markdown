author: 阿安
comments: true
date: 2012-04-25 07:45:37+00:00
layout: post
slug: onbeforeunload-firefox
title: onbeforeunload 在Firefox中的兼容问题
wordpress_id: 224
categories:
- javascript
tags:
- confirm
- javascript
- onbeforeunload
---

  

最近项目中用到了onbeforeunload，遇到了平时一些比较少见的怪异情况，比如在上一篇文章有提到过的获取返回值问题：[/archives/209](/archives/209),然后马上又发现在firefox11中又存在着兼容问题：

    

    $(window).bind('beforeunload',function(){
        return '您的内容尚未保存，确定要离开本页吗？';
    });




我用了JQuery,原生javascript也大同小异。问题来了，在Firefox中却没有显示以上的字符，只是显示默认的提示信息：
![](/wp-content/uploads/2012/04/firefoxOnbeforeunload.gif)<!-- more -->

因此，我们还需要加上对firefox的判断，并利用confirm来实现我们要的显示的信息。

    

    $(window).bind('beforeunload',function(){
      if ( /Firefox[\/\s](\d+)/.test(navigator.userAgent) && new Number(RegExp.$1) >= 4) {
          if(confirm('您的内容尚未保存，确定要离开本页吗？')){
              history.go();
          } else{
              window.setTimeout(function() { window.stop(); }, 1);
          }
      } else{
          return '您的内容尚未保存，确定要离开本页吗？';
      }
    });




这样forefox与其他浏览器（ie chrome）上显示的信息就一致了。
