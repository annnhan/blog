author: 阿安
comments: true
date: 2013-12-04 06:01:12+00:00
layout: post
slug: fiddler-stave
title: Stave——让Fiddler拥有路径映射功能。
wordpress_id: 1018
categories:
- 发现与分享
- 工具/资源
tags:
- fiddler
- stave
- 调试工具
---

Stave是一个基于Fiddler调试工具的插件，Fiddler在前端开发中应用得越来越广泛。其中的AutoResponder——用本地文件映射网络文件是大家最喜欢用的功能，这对调试线上代码、处理线上bug都十分有用。不过，AutoResponder只能针对单个文件做映射， 在文件数目较多的时候，使用起来不是很方便，以前，我只能在本地搭一个nginx做反向代理来实现，有了Stave， 就完全可以抛弃nginx了，Stave最大亮点在于能够实现针对路径映射， 这样在多文件调试的时候赶脚非常不错。
 [![Stave](/wp-content/uploads/2013/12/Stave.jpg)](/wp-content/uploads/2013/12/Stave.jpg)





下载地址： [https://code.google.com/p/stave/](https://code.google.com/p/stave/)



