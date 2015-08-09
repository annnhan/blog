author: 阿安
comments: true
date: 2012-05-23 08:11:45+00:00
layout: post
slug: ie6-iframe-crash
title: 嵌入iframe的页面在IE6下滚动时候出现花屏
wordpress_id: 422
categories:
- CSS
tags:
- IE6
- iframe
- 花屏
---

和电信合作的一个项目，我们的页面做好了之后，嵌入到对方的iframe里面。这个时候，原本正常的网页，在滚动条滚动的时候出现了花屏的问题。

![](/wp-content/uploads/2012/05/ie6-crash-300x266.png)

一步步排查下来，发现是body设置了背景图所导致。解决办法有下面几种：

1、在body中加个div,变成:

    
    
    <body><div id="main"></div></body>
    


在div#main里设置背景。

    
    
    #main{margin:0px;background:url(../images/bg.jpg) repeat-x;}
    





2、给body背景加了个默认背景颜色。

    
    
    body{margin:0px;background:url(../images/bg.jpg) repeat-x #fff;}
    





3、给body样式添加_zoom:1.0001

    
    
    body{margin:0px;background:url(../images/bg.jpg) repeat-x; _zoom:1.0001;}
    
