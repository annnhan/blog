author: 阿安
comments: true
date: 2011-09-08 02:08:44+00:00
layout: post
slug: ie6-max-width-max-height
title: 让IE6支持max-width, max-height属性
wordpress_id: 94
categories:
- HTML5/CSS3
---

max-width, min-width, max-height 和 min-heigh是CSS2的属性，它工作于IE7以及更高版本和或者Mozilla Firefox、Chrome等支持CSS2的浏览器，但不能与IE 6和更低版本IE浏览器兼容。

比较常用的解决方案是通过CSS表达式让IE6实现相同的效果。

例如：如果你有一个或多个图像，显示图像的高度和宽度应该有一些限制。即图像不应该有宽度超过500px（假设），高度不超过200px，那么图像的CSS应为如下：

    
    
    img.thumb{
    max-height:200px;
    max-width:500px;
    width:expression(document.body.clientWidth > 500? “500px”: “auto” );/*for ie6*/
    height:expression(document.body.clientHeight > 200? “200px”: “auto” );/*for ie6*/
    }
    


<!-- more -->
同样的方法你可以试试最小宽度和最小高度。
