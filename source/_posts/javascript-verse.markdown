author: 阿安
comments: true
date: 2012-05-22 08:39:52+00:00
layout: post
slug: javascript-verse
title: javascript中那些漂亮的诗句。
wordpress_id: 406
categories:
- javascript
tags:
- javascript
- 诗句
---

这些javascript语句是不是令你意想不到呢？ 我们平时不常用，却是如此简洁优美，当然，在团队合作中请加上注释。

1. 取整同时转成数值型：

    

    '10.567890'|0
    //结果: 10
    '10.567890'^0
    //结果: 10
    -2.23456789|0
    //结果: -2
    ~~-2.23456789
    //结果: -2





2. 日期转数值：

    

    var d = +new Date();
    //结果: 1295698416792



<!-- more -->

3. 类数组对象转数组：

    

    var arr = [].slice.call(arguments);





4. 漂亮的随机码

    

    Math.random().toString(16).substring(2); //14位
    Math.random().toString(36).substring(2); //11位





5. 合并数组：

    

    var a = [1,2,3];
    var b = [4,5,6];
    Array.prototype.push.apply(a, b);
    uneval(a); //[1,2,3,4,5,6]





6. 用0补全位数：

    

    function prefixInteger(num, length) {
      return (num / Math.pow(10, length)).toFixed(length).substr(2);
    }





7. 交换值：

    

    a= [b, b=a][0];





8. 将一个数组插入另一个数组的指定位置：

    

    var a = [1,2,3,7,8,9];
    var b = [4,5,6];
    var insertIndex = 3;
    a.splice.apply(a, Array.concat(insertIndex, 0, b));
    // a: 1,2,3,4,5,6,7,8,9





9. 删除数组元素：

    

    var a = [1,2,3,4,5];
    a.splice(3,1);





10. 快速取数组最大和最小值

    

    Math.max.apply(Math, [1,2,3]); //3
    Math.min.apply(Math, [1,2,3]); //1





11. 条件判断：

    

    var a = b && 1;
    //相当于:
    if (b) {
      a = 1;
    }else {
      a = b;
    }

    var a = b || 1;
    //相当于
    if (b) {
      a = b;
    } else {
      a = 1;
    }





12. 判断IE:



    var ie = /*@cc_on !@*/false;


