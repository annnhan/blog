author: 阿安
comments: true
date: 2012-04-18 03:47:01+00:00
layout: post
slug: js-textrea-br
title: JS文本域换行符和HTML换行标签的相互替换
wordpress_id: 199
categories:
- JavaScript
tags:
- js
- 回车
- 换行
- 正则表达式
---

在项目中，我们经常要实现以下编辑器的所见所得效果，当然也要支持回车，在此做下记录，对正则表达式还不是很熟练。

将HTML换行标签替换为文本域换行符：
textereaContext = divHTML.replace(/(<br>)/g, "\r\n");








将文本域换行符替换为HTML换行标签：




divHTML =  textereaContext .replace(/\n|\r|(\r\n)|(\u0085)|(\u2028)|(\u2029)/g, "<br>");












