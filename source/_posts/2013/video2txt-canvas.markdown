author: 阿安
comments: true
date: 2013-04-13 09:19:30+00:00
layout: post
slug: video2txt-canvas
title: 基于canvas将视频转化成字符动画
wordpress_id: 851
categories:
- HTML5/CSS3
tags:
- canvas
- video
---

![video2txt](/wp-content/uploads/2013/04/video2txt.jpg)
在上篇文章[http://www.cssha.com/img2txt-canvas](http://www.cssha.com/img2txt-canvas),主要介绍了如何将一张图片转成字符画的办法，经过同事[吕哥](http://www.jsbug.com)和[文韬](http://www.wentao.me)的提醒和修改。在此基础上，可以实现视频转字符动画的效果哦。原理都是通过getContext('2d')对象的drawImage方法引入视频或图像到canvas中，再进行转换，转换方法上篇已经介绍，不通的是视频的话要通过回调函数，不停回调转换函数，实现动画功能：

demo：
[http://www.cssha.com/img2txt/video2txt.html](http://www.cssha.com/img2txt/video2txt.html)
[http://www.jsbug.com/lab/samples/ascii-video/](http://www.jsbug.com/lab/samples/ascii-video/)
