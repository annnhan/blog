author: 阿安
comments: true
date: 2012-12-03 18:03:46+00:00
layout: post
slug: css-fontfamily-chinese
title: 避免css中文字体在浏览器中解析成乱码
wordpress_id: 671
categories:
- CSS
tags:
- chinese
- css
- font-family
---

许多童鞋在写CSS的时候，设置中文字体常常使用中文字符，例如font-family:"黑体"，这样我们在浏览器中看到的是什么样子的呢 ？

[![](/wp-content/uploads/2012/12/111.jpg)](/wp-content/uploads/2012/12/111.jpg)
如果不想自己写的界面在浏览器字体声明上有异常，建议在书写css样式规则的时候避免中文字符，使用Unicode编码集，对中文字符进行转码。常见的中文字符集转码如下表：







中文名
UNICODE







新细明体


\65B0\7EC6\660E\4F53






细明体


\7EC6\660E\4F53






标楷体


\6807\6977\4F53






黑体


\9ED1\4F53






宋体


\5B8B\4F53






新宋体


\65B0\5B8B\4F53






仿宋


\4EFF\5B8B






楷体


\6977\4F53






仿宋_GB2312


\4EFF\5B8B_GB2312






楷体_GB2312


\6977\4F53_GB2312






微软正黑体


\5FAE\x8F6F\6B63\9ED1\4F53






微软雅黑


\5FAE\8F6F\96C5\9ED1





如果你不知道某个中文字体的Unicode编码，可以使用通过JS如下方法进行转化：

    
    
    function toUnicode (str) {return escape(str).toLocaleLowerCase().replace(/%u/gi, '\\');}
    console.log(toUnicode ('微软雅黑')); // '\5fae\8f6f\96c5\9ed1'
    
