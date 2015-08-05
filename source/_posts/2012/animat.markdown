author: 阿安
comments: true
date: 2012-09-27 04:34:24+00:00
layout: post
slug: animat
title: 封装一个animat动画方法
wordpress_id: 568
categories:
- JavaScript
tags:
- animat
---

jquery中的animat方法相信大家都经常用到，它的主要功能是以渐变的方式来改变属性值可以为数字的元素属性,通过设置时间来控制动画的速度。下面分享一个自己写的动画方法，起功能也类似于jquery中的animat，欢迎大家指点：<!-- more -->

    

     /*
     *	参数详解
     * 	ele：执行动画的元素
     *	sty：样式属性（数值型属性），比如{"width":"100px","height":"500px"}
     *	time：时间（毫秒）
     */
     window.animat = function(ele,sty,time){
    	for(i in sty){
    		(function(i){
    			//先获取元素实际属性值
    			if(ele.style[i]&&ele.style;[i]!='auto'){
    				ele.style[i] = ele.style[i] ;
    			}else if (ele.currentStyle){
    				ele.style[i] = ele.currentStyle[i];
    			}else if(window.getComputedStyle){
    				ele.style[i] = window.getComputedStyle(ele,null).getPropertyValue(i);
    			}else{
    				ele.style[i] = '0';
    			}
    			//每100毫秒变化的透明度  or 每移动1px需要的毫秒数
    			var speed;
    			if(i=='opacity'){
    				speed = (parseFloat(sty[i]) - parseFloat(ele.style[i]))/time*10;
    			}else{
    				speed = time/(parseFloat(sty[i]) - parseFloat(ele.style[i]));
    			}
    			//改变属性，并通过setTimeout递归执行
    			(function(){
    				if(i=='opacity'){
    				   if(parseFloat(sty[i]).toFixed(2)!=parseFloat(ele.style[i]).toFixed(2)){
    					ele.style[i] =parseFloat(ele.style[i]) + speed;
    				   }else{
    					return;
    				   }
    				   setTimeout(arguments.callee,10);
    				}else{
    				   var a = speed>=0?1:-1;
    				   if(parseInt(sty[i])!=parseInt(ele.style[i])){
    					ele.style[i] =parseInt(ele.style[i]) + a + 'px';
    				   }else{
    					return;
    				   }
    				   setTimeout(arguments.callee,Math.abs(speed));
    				}
    			})();
    		})(i)
    	}
    }


