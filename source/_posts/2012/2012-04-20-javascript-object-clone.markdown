author: 阿安
comments: true
date: 2012-04-20 10:07:14+00:00
layout: post
slug: javascript-object-clone
title: javascript对象的复制方法
wordpress_id: 204
categories:
- JavaScript
tags:
- JavaScript
- js
- 克隆
- 复制
- 对象
- 拷贝
---

对于基本数据类型，我们常用的复制方法是通过一个‘=’号来赋值实现，我们也叫传递，但是这个方法对于对象却不行，把一个JS对象通过等号传递给一个变量时候，并没有生成一个新的JS对象，而是与之原来的对象相关联，我们在对这个变量进行操作的同时，也改变了原来的JS对象。但是通常我们想要的知识这个对象的一个拷贝，一次我们可以自定义一个对象克隆方法：

    
    
    function clone(myObj){
      if(typeof(myObj) != 'object') return myObj;
      if(myObj == null) return myObj;
      
      var myNewObj = new Object();
      
      for(var i in myObj)
         myNewObj[i] = clone(myObj[i]);
      
      return myNewObj;
    }
    



