---
author: 阿安
comments: true
date: 2012-08-29 02:37:16+00:00
layout: post
slug: js%e8%a7%a3%e5%b0%8f%e5%ad%a6%e5%a5%a5%e6%95%b0%e9%a2%98%ef%bc%9aabcdeaeeeeee
title: JS解小学奥数题：abcde*a=eeeeee
wordpress_id: 497
categories:
- JavaScript
tags:
- JavaScript
- 枚举法
---

就是abcde是个五位数，乘以a就等于eeeeee这个六位数，用JS求出a,b,c,d,e所代表的那个数字。
来个暴力解法法：

    
    {% highlight javascript %}
    for(var a=1;a<=9;a++){
    	for(var b=0;b<=9;b++){
    		for(var c=0;c<=9;c++){
    			for(var d=0;d<=9;d++){
    				for(var e=0;e<=9;e++){
    					var x = a*10000 + b*1000 + c*100 + d*10 + e;
    					var y = a;
    					var z = e*111111;
    					if(x*y==z){
    						console.log(x);
    						console.log(y);
    						console.log(z);
    					}
    				}
    			}
    		}
    	}
    }
    {% endhighlight %}




