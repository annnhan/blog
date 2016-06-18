author: 阿安
comments: true
date: 2013-03-26 09:29:24+00:00
layout: post
slug: jquery-viewport
title: jQuery.viewport插件实现不同场景的数据异步加载
wordpress_id: 757
categories:
- javascript
---

viewport是我同事[@吕哥](http://www.jsbug.com/)写的实现不同场景的图片异步加载的jq插件。想象一下，当服务器返回列表的数据项（或图片）非常多，而其数据项不用在页面回应时全部加载给浏览器，可以按需加载。那么通过将列表 viewport化，你就可以设置并知道知道哪些数据项被显示出来的时机，完成数据异步加载的操作。

viewport非常适合应用于海量图片的查看器（神马轮播图，相册之类的），或者瀑布流的布局当中，此插件可以被绑定到 window 对象或任意以 block 方式显示的对象上，如：$(window).viewport() 或 $("#container").viewport()。

两个demo:
[http://www.jsbug.com/lab/samples/viewport/index.html#sample1](http://www.jsbug.com/tools/wall/)
[http://www.jsbug.com/tools/wall/](http://www.jsbug.com/tools/wall/)

**参数说明**




  1. id：可选，字符串类型。每个容器都可以执行 viewport 方法多次，也就是说，任何容器都可以被视口化多次，且同一容器的各视口间互不影响。


  2. targets：可选，在“视口”中查找的目标元素。


  3. includeHiddens：可选，当提供 targets 时才有效。用来控制是否查找视口内的隐藏目标元素，默认为 true。


  4. threshold：可选，当提供 targets 时才有效。通过此值你可以增大或减小视口检测的阈值范围。


  5. delay：可选，此参数用来控制 onViewChange 的触发频率，默认为 500 毫秒。


  6. onViewChange：可选，用户定义的回调事件，当“视口”被滚动或缩放后触发。


  7. thresholdBorderReaching：可选，此参数主要用来影响 onViewChange 回调中的 detail 参数，默认为 0。



更详细的用法以及demo详见：[http://www.jsbug.com/lab/samples/viewport/index.html](http://www.jsbug.com/lab/samples/viewport/index.html)
