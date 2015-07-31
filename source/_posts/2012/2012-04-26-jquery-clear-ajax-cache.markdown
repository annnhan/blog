---
author: 阿安
comments: true
date: 2012-04-26 09:38:23+00:00
layout: post
slug: jquery-clear-ajax-cache
title: 你清楚jquery是如何清除ajax缓存的吗？
wordpress_id: 235
categories:
- JavaScript
tags:
- ajax
- JavaScript
- JQuery
- 缓存，IE
---

大家都知道万恶的IE在ajax中往往只读取第一次ajax请求时候的数据，其余时候都是从cache提取数据，（太懒了T_T）。原生的JS清除ajax缓存的方法多,但是终觉有点繁琐，如果是用jquery的同学，就设置一个参数就OK了,那就是cache: false，比如：

    
    {% highlight javascript %}
    $.ajax({
    	url: "mms-draft!getMmsDraftList",
    	cache: false,
    	dataType : "json",
    	data:{
    		 //some parameters
    	},
    	success: function(data) {
    		//do something
    	}
    });
    {% endhighlight %}




**另外附上原生js方法：**
　　1、在服务端加 header("Cache-Control: no-cache, must-revalidate");(如php中)
　　2、在ajax发送请求前加上 anyAjaxObj.setRequestHeader("If-Modified-Since","0");
　　3、在ajax发送请求前加上 anyAjaxObj.setRequestHeader("Cache-Control","no-cache");
　　4、在 Ajax 的 URL 参数后加上 "?fresh=" + Math.random(); //当然这里参数 fresh 可以任意取了
　　5、第五种方法和第四种类似，在 URL 参数后加上 "?timestamp=" + new Date().getTime();
　　6、用POST替代GET：不推荐
