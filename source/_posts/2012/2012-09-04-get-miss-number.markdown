---
author: 阿安
comments: true
date: 2012-09-04 15:47:58+00:00
layout: post
slug: get-miss-number
title: 一组数字，从1到n，从中减少了3个数，顺序打乱，放在n-3的数组里,找出丢失数字。
wordpress_id: 536
categories:
- JavaScript
---

曾经看到有这样一个JS题：
有一组数字，从1到n，从中减少了3个数，顺序也被打乱，放在一个n-3的数组里
请找出丢失的数字，最好能有程序，最好算法比较快
假设n=10000

下面我也来贴一个算法。

    
    {% highlight javascript %}
    function getArray (){ //创建随机丢失3个数字的数组，并打乱顺序。
    	var arr =[]
    	for(var i=1;i<=10000;i++){
    		arr.push(i);
    	}
    	var a = arr.splice(Math.floor(Math.random()*arr.length),1);
    	var b = arr.splice(Math.floor(Math.random()*arr.length),1);
    	var c = arr.splice(Math.floor(Math.random()*arr.length),1);
    	arr.sort(function(){
    		return 0.5 - Math.random();
    	});
    	console.log('丢失数字为: ' + a + ',' + b + ',' + c + '\n数组元素个数: ' + arr.length);
    	return arr;
    }
    function getMissMunber(arr){ //寻找丢失的数字。
    	var mis = [],
    		obj = {},
    		len = 10000;
    	for(var i=0; i<arr.length; i++){
    		obj[arr[i]] = true;
    	}
    	for(var i=1; i<=len; i++){
    		if(!obj[i]){
    			mis.push(i);
    		}
    	}
    	return mis;
    }
    var arr = getArray ();
    var mis = getMissMunber(arr);
    console.log('计算结果: ' + mis);
    {% endhighlight %}

