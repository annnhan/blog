author: 阿安
comments: true
date: 2012-04-06 07:45:14+00:00
layout: post
slug: get-ajax-chinese-garbled
title: get方式在ajax中导致中文乱码问题的一些原因。
wordpress_id: 176
categories:
- javascript
tags:
- ajax
---

以前一直用get方式提交数据，对get和post方式并没有太深入研究，今天在一个项目中遇到了中文乱码问题如下：

[![](/wp-content/uploads/2012/04/ajax.gif)](/wp-content/uploads/2012/04/ajax.gif)
第一列是通过get方式提交的内容，提交到服务器后，取回来写入页面时是乱码，而第二列我换成post方式提交，问题解决。

后来在查了一下资料，对这两种方式的乱码问题有了进一步了解，原来对于get请求（或凡涉及到url传递参数的），被传递的参数都要先经encodeURIComponent方法处理.如果没有用encodeURIComponent处理的话,也会产生乱码。

<!-- more -->

**一般情况下，ajax提交产生乱码的原因主要有:**
1、xtmlhttp 返回的数据默认的字符编码是utf-8，如果客户端页面是gb2312或者其它编码数据就会产生乱码
2、post方法提交数据默认的字符编码是utf-8，如果服务器端是gb2312或其他编码数据就会产生乱码
解决办法有：
1、若客户端是gb2312编码，则在服务器指定输出流编码
2、服务器端和客户端都使用utf-8编码
gb2312:header('Content-Type:text/html;charset=GB2312');
utf8:header('Content-Type:text/html;charset=utf-8');
**注意**:如果你已经按上面的方法做了，还是返回乱码的话,检查你的方式是否为get,对于get请求（或凡涉及到url传递参数的），被传递的参数都要先经encodeURIComponent方法处理.如果没有用encodeURIComponent处理的话,也会产生乱码.
