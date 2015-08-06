author: 阿安
comments: true
date: 2012-05-16 09:46:59+00:00
layout: post
slug: waterfall
title: jQuery模拟瀑布流布局。
wordpress_id: 397
categories:
- javascript
tags:
- JQuery
- 瀑布流布局
---

话说这个现在很流行，工作之余写了个简单的，原理是模拟ajax返回的json对象，再构造HTML，计算最小高度的ul列，将其写入，并在滚动条处于底部时触发。

    
    
    
    <html>
    <head>
        <meta charset="utf-8">
        <title>瀑布流</title>
        <style type="text/css">
            *{margin: 0; padding: 0; }
            body{text-align: center;}
            .content{margin: 0 auto ; text-align: center; width: 960px; overflow: hidden; }
            .content ul{float: left; width: 220px; margin: 5px; padding: 5px;}
            .content ul li{ border: 1px solid #8b4513; list-style: none; overflow: hidden; margin-top: 5px;}
        </style>
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
        <script type="text/javascript">
            var _load = 0;
            function getMmsPicList(){
                _load =1 ;
                var list = {"list":[
                    {"pic":"/wp-content/uploads/2012/05/1.jpg","txt":"瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达"},
                    {"pic":"/wp-content/uploads/2012/05/2.jpg","txt":"瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达"},
                    {"pic":"/wp-content/uploads/2012/05/3.jpg","txt":"瀑布流思密达瀑布流思密达"},
                    {"pic":"/wp-content/uploads/2012/05/4.jpg","txt":"瀑布流思密达瀑布流思密达瀑布流思密达"},
                    {"pic":"/wp-content/uploads/2012/05/5.jpg","txt":"瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达"},
                    {"pic":"/wp-content/uploads/2012/05/6.jpg","txt":"瀑布流思密达"},
                    {"pic":"/wp-content/uploads/2012/05/7.jpg","txt":"瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达"},
                    {"pic":"/wp-content/uploads/2012/05/8.jpg","txt":"8等哈克h发发s客户方卡斯"},
                    {"pic":"/wp-content/uploads/2012/05/9.jpg","txt":"瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达"}
                ]};
                for(i in list.list){
                    var pic = list.list[i].pic ;
                    var txt = list.list[i].txt ;
                    var oUl = $('.content ul') ;
                    oUl.sort(function(a,b){
                        return $(a).height()-$(b).height();
                    })
                    var HTMLstr2 =  '<li>'+
                            '<img src="'+pic+'" alt="">'+
                            '<p>'+txt+'</p>'+
                            '</li>' ;
                    $(oUl[0]).append(HTMLstr2);
                }
                _load = 0;
            }
            $(document).ready(function(){
                $(window).scroll(function(){
                    var top = $(window).scrollTop() ;
                    var winH = $(window).height() ;
                    var docH = $(document).height();
                    if(docH==(top+winH)){
                        if(_load==0){
                            getMmsPicList();
                        }
                    }
                });
            });
        </script>
    </head>
    <body>
    <div class="content">
        <ul class="list1">
            <li><img src="/wp-content/uploads/2012/05/1.jpg" alt=""><p>瀑布流思密达</p></li>
            <li><img src="/wp-content/uploads/2012/05/2.jpg" alt=""><p>瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达</p></li>
            <li><img src="/wp-content/uploads/2012/05/3.jpg" alt=""><p>瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达</p></li>
        </ul>
        <ul class="list2">
            <li><img src="/wp-content/uploads/2012/05/4.jpg" alt=""><p>瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达</p></li>
            <li><img src="/wp-content/uploads/2012/05/5.jpg" alt=""><p>瀑布流思密达</p></li>
            <li><img src="/wp-content/uploads/2012/05/6.jpg" alt=""><p>瀑布流思密达瀑布流思密达</p></li>
        </ul>
        <ul class="list3">
            <li><img src="/wp-content/uploads/2012/05/7.jpg" alt=""><p>瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达</p></li>
            <li><img src="/wp-content/uploads/2012/05/8.jpg" alt=""><p>瀑布流思密达瀑布流思密达</p></li>
            <li><img src="/wp-content/uploads/2012/05/9.jpg" alt=""><p>瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达</p></li>
        </ul>
        <ul class="list4">
            <li><img src="/wp-content/uploads/2012/05/1.jpg" alt=""><p>瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达</p></li>
            <li><img src="/wp-content/uploads/2012/05/5.jpg" alt=""><p>瀑布流思密达</p></li>
            <li><img src="/wp-content/uploads/2012/05/7.jpg" alt=""><p>瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达瀑布流思密达</p></li>
        </ul>
    </div>
    </body>
    </html>
    



预览DEMO：[/wp-content/uploads/2012/05/waterfall.html](/wp-content/uploads/2012/05/waterfall.html)
