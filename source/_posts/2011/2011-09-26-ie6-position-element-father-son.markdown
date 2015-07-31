---
author: 阿安
comments: true
date: 2011-09-26 02:59:20+00:00
layout: post
slug: ie6-position-element-father-son
title: IE6下position定位子元素溢出，父元素被撑开的解决思路。
wordpress_id: 104
categories:
- HTML5/CSS3
---

在一些被常规的页面布局当中，我们常常需要通过position定位HTML元素来实现我们想要的效果。但是在这个办法在IE6中常常会出现各种问题。例如，我们想让一个子元素溢出其父元素之外显示，而影响父元素本身和其他兄弟元素的样式，我们可以这样写：<!-- more -->

    
    
    
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type"></meta>
    <title>无标题文档</title>
    </head>
    <style type="text/css">
    body{ text-align:center;}
    .father{ width:300px; height:300px; background:#96F; margin:0 auto; _overflow:hidden; }
    .son{ width:400px; height:200px; background:#09F; position:relative; right:100px; top:0px;}
    </style>
    <body>
    <div class="father">
    	<div class="son">子元素</div>
        父元素
    </div>
    </body>
    </html>
    


运用position:relative，在IE7+,chrome,firfox中能很好的实现溢出效果，如下图：
[![](/wp-content/uploads/2011/09/1.jpg)](/wp-content/uploads/2011/09/1.jpg)

但是在IE6中，父元素却被子元素撑开了了，width值变成了400px; 在这个情况下，子元素right:100px属性作用使其向左移动100px,这点IE6和其他浏览器效果其实一样，由于被撑开，子元素右边出现了100PX和父元素之间的空隙。如下图：
[![](/wp-content/uploads/2011/09/2.jpg)](/wp-content/uploads/2011/09/2.jpg)

所以,我们给父元素添加一个overflow:hidden属性,防止在IE6被子元素撑开,但是,在IE7+,chrome,firfox中溢出部分被hidden掉了，IE6却没有。因此我们还得出一个结论：IE6下父元素的overflow:hidden对于具有position:relative属性的子元素无效，但是可以防止被子元素撑开。所以，可以这样写父元素的hack:

    
    
    .father{ width:300px; height:300px; background:#96F; margin:0 auto; _overflow:hidden; }
    


在verflow:hidden前加个只有IE6才能识别的下划线，就OK了。
