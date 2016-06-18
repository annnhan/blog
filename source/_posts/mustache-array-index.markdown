author: 阿安
comments: true
date: 2013-08-02 16:10:50+00:00
layout: post
slug: mustache-array-index
title: Mustache.js模板引擎无法获得数组内元素索引的解决办法
wordpress_id: 970
categories:
- CSS
---

公司某项目前端模板用的是Mustache.js！！！ 然后偶遇到个需求是需要渲染数组的时候输出其元素的索引值，比如以下数据：

    var data = 
    {
        title: 'Mustache.js模板引擎无法获得数组内元素索引的解决办法',
        authors: [
           { id: 20000, name: '阿安' },
           { id: 20001, name: '阿狗' }
        ]
    }
    
这样却没有办法输出数组authors里面的元素的索引，只能输出里面元素的属性值，由于短期内更换一个模板引擎对于项目来说不太现实，只能采取其他办法。那就是对authors数组进行处理，给里面的每个元素增加一个index属性，其值就是元素自身的索引。

    for(var i = 0, len = data.authors.length; i < len; i++){
        data.authors[i].index = i;
    }

最后再渲染的时候输出就可以了。