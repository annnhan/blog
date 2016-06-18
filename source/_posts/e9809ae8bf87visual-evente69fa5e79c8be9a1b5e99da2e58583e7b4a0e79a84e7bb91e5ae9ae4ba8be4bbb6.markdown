author: 阿安
comments: true
date: 2013-12-16 03:33:46+00:00
layout: post
slug: '%e9%80%9a%e8%bf%87visual-event%e6%9f%a5%e7%9c%8b%e9%a1%b5%e9%9d%a2%e5%85%83%e7%b4%a0%e7%9a%84%e7%bb%91%e5%ae%9a%e4%ba%8b%e4%bb%b6'
title: 通过Visual Event查看页面元素的绑定事件
wordpress_id: 1033
categories:
- javascript
tags:
- Event
- 事件
---

WEB标准提倡结构、表现和行为相 分离，现在越来越多采用这种表现和行为的方式，但它也为我们开发调试带来一些问题，网页载入一堆javascript，，我们很难搞清楚最后在哪些元素的哪个动作绑定了事件，尤其是javascript加载事件的方式五花八门，可以透过jQuery、element.click = function() { }、element.addEventListener()…，很难由单一处找出所有事件。而理不清事件来龙去脉，要追踪某个点击动作背后的行为就变得有些困难，直到我们遇到以下两种利器。





chrome开发者工具有查看HTML元素绑定事件的功能，如下图所示：
![chrome event view](/wp-content/uploads/2013/12/1.png)





但这种方式查看事件的方法还是有点困难，直到遇到它chrome的插件 [Chrome Web Store - Visual Event](https://www.google.com.hk/url?sa=t&rct=j&q=&esrc=s&source=web&cd=3&ved=0CD0QFjAC&url=https://chrome.google.com/webstore/detail/visual-event/pbmmieigblcbldgdokdjpioljjninaim&ei=VrWWUun0OYq9iAfkuIDYCA&usg=AFQjCNGK4984AckpmU9aFs0UWArMx-nymQ)
Visual Event的运作原理，在于其熟知主要javascript库(例如: jQuery、YUI、ExtJS)事件机制，可深入其中撷取事件，并将其标注在对象元素上。目前支持的JS库包括:





DOM 0 events
jQuery 1.2+
YUI 2
MooTools 1.2+
Prototype 1.6+
Glow





在启用Visual Event后，有绑定事件元素将被标上蓝色区块，滑鼠停留时会显示事件的细节。如下图所示：
![Visual Event](/wp-content/uploads/2013/12/2.png)



<!-- more -->



原文地址：http://www.cnblogs.com/xiaoyao2011/p/3447421.html



