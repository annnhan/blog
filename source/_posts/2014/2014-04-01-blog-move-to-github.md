---
title: Blog迁移到Github
author: 阿安
comments: true
layout: post
slug: blog-move-to-github
categories: [服务器, 随笔]
tags : [github, jekyll]
date: 2014-04-01 20:38:00+00:00
---

由于Wordpress主机到期，而且wp的markdown插件非常坑爹，经常把本来些的好好的md格式转得乱七八糟。于是花了一天时间，把Blog搬到github来了。使用了[Jekyll Bootstrap](http://jekyllbootstrap.com)框架，下面是折腾过程中的一些体会：

- 文章迁移： wp后台把数据导出为xml文件，再用[exitwp](https://github.com/thomasf/exitwp)转成md。
- 评论迁移： Jekyll自带的disqus不太符合国情， 于是选择了国产的[多说](http://duoshuo.com/)。
- 代码高亮： 使用[Pygments](http://pygments.org/)。
- 文章摘要： Jekyll自带的显示摘要功能对HTML支持非常不好，我只好全文输出到一个script标签，再通过JS来截取并显示。
- 搜索文章： 尝试了google站内搜索，但是发现好多冗余的页面也被搜出来了，最后决定自己用JS来实现一个简单的，只针对文章标题进行匹配的搜索功能。

迁移到Jekyll以后， 终于可以愉快地用md写blog了。