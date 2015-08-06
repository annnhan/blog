author: 阿安
comments: true
date: 2012-04-07 16:41:27+00:00
layout: post
slug: javascript-methods-string
title: 一些javascript处理字符串的常用方法。
wordpress_id: 186
categories:
- javascript
tags:
- javascript
- 字符串
---

懒得每次都查找，在这里整理一下。

**split() 方法**
**功能**：使用一个指定的分隔符把一个字符串分割存储到数组
例子：
str=”jpg|bmp|gif|ico|png”;
arr=str.split(”|”);
//arr是一个包含字符值”jpg”、”bmp”、”gif”、”ico”和”png”的数组

**join() 方法**
**功能**：使用您选择的分隔符将一个数组合并为一个字符串
例子：
var myList=[”jpg”,”bmp”,”gif”,”ico”,”png”]
var portableList=myList.join(”|”);
//结果是jpg|bmp|gif|ico|png

**substring() **方法****
**功能**：字符串截取，比如想从”MinidxSearchEngine”中得到”Minidx”就要用到substring(0,6)



**indexOf()**
**功能**：返回字符串中匹配子串的第一个字符的下标
var myString=”javascript”;
var w=myString.indexOf(”v”);   //2
var x=myString.indexOf(”S”);    //4
var y=myString.indexOf(”Script”);    // 4
var z=myString.indexOf(”key”);    // -1(不存在)


