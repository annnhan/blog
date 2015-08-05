author: 阿安
comments: true
date: 2012-11-23 13:44:39+00:00
layout: post
slug: absolute-img-ie-hack
title: IE坑：position:absolute的元素无法处于img元素上方
wordpress_id: 646
categories:
- HTML5/CSS3
tags:
- absolute
- hack
- ie
- img
---

上周在做一个焦点图小时候遇到一个IE bug。当一个绝对定位元素在没有background，没有内容，并和一个img元素重叠的情况下，不管z-index如何设置，都会位于img下方。 此bug出现于IE中，其他浏览器均正常显示。经过反复折腾以后，发现只要设置background或者添加内容就可以。但是如果你是需要一个透明的div浮在img上面，解决方案是设置background为一张不存在的图片。比如：{background:url(about:blank);}
