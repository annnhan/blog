author: 阿安
comments: true
date: 2012-08-24 08:51:08+00:00
layout: post
slug: js-iframe
title: js中的iframe操作
wordpress_id: 494
categories:
- javascript
tags:
- iframe
- javascript
---

在项目整合中相信用到最多的是iframe了，下面整理了相关常用操作，作为笔记！




### 1. 获得iframe的window对象


存在跨域访问限制。

chrome：iframeElement. contentWindow
firefox： iframeElement.contentWindow
ie6：iframeElement.contentWindow

文章[Iframes, onload, and document.domain](http://www.nczonline.net/blog/2009/09/15/iframes-onload-and-documentdomain/)中说“he iframe element object has a property called contentDocument that contains the iframe’s document object, so you can use the parentWindow property to retrieve the window object.”意思就是一些浏览器可以通过iframeElement.contentDocument.parentWindow获得iframe的window对象。但经过测试firefox、chrome的element.contentDocument对象没有parentWindow属性。

<!-- more -->


### 2. 获得iframe的document对象


存在跨域访问限制。

chrome：iframeElement.contentDocument
firefox：iframeElement.contentDocument
ie：element.contentWindow.document
备注：ie没有iframeElement.contentDocument属性。

    
    
    var getIframeDocument = function(element) {  
        return  element.contentDocument || element.contentWindow.document;  
    };  
    








### 3. iframe中获得父页面的window对象


存在跨域访问限制。

父页面：window.parent
顶层页面：window.top
适用于所有浏览器




### 4. 获得iframe在父页面中的html标签


存在跨域访问限制。

window.frameElement（类型：HTMLElement），适用于所有浏览器




### 5. iframe的onload事件


非ie浏览器都提供了onload事件。例如下面代码在ie中是不会有弹出框的。

    
    
    var ifr = document.createElement('iframe');  
    ifr.src = 'http://www.b.com/index.php';  
    ifr.onload = function() {  
        alert('loaded');  
    };  
    document.body.appendChild(ifr);   
    



但是ie却又似乎提供了onload事件，下面两种方法都会触发onload。

    
    
    方法一：  
    <iframe onload="alert('loaded');" src="http://www.b.com/index.php"></iframe>  
      
    方法二：  
    //只有ie才支持为createElement传递这样的参数  
    var ifr = document.createElement('<iframe onload="alert('loaded');" src="http://www.b.com/index.php"></iframe>');  
    document.body.appendChild(ifr);   
    



由于iframe元素包含于父级页面中，因此以上方法均不存在跨域问题。

实际上IE提供了onload事件，但必须使用attachEvent进行绑定。

    
    
    ar ifr = document.createElement('iframe');  
    ifr.src = 'http://b.a.com/b.php';  
    if (ifr.attachEvent) {  
        ifr.attachEvent('onload',  function(){ alert('loaded'); });  
    } else {  
        ifr.onload  = function() { alert('loaded'); };  
    }  
    document.body.appendChild(ifr);  
    






### 6. frames


window.frames可以取到页面中的帧(iframe、frame等)，需要注意的是取到的是window对象，而不是HTMLElement。

    
    
    var ifr1 = document.getElementById('ifr1');  
    var ifr1win = window.frames[0];  
    ifr1win.frameElement === ifr1;   // true  
    ifr1win === ifr1;    // false  
    






### 7. 定义document.domain


这个声明消除了域名的区别，我们可以像处理两个相同域名的网站一样处理这两个页面。

