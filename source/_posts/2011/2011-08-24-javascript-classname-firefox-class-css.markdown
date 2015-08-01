author: 阿安
comments: true
date: 2011-08-24 09:00:38+00:00
layout: post
slug: javascript-classname-firefox-class-css
title: JavaScript修改className在firefox中无法加载新class的样式问题
wordpress_id: 59
categories:
- HTML5/CSS3
- JavaScript
tags:
- className
- JavaScript
---

在制作外语版的文章页的项目过程中，我们常常会遇到这样一个需求：每一篇文章的首个字母加粗并大写。这点在CSS中用:first-letter伪类即可实现。但是由于使用的是cms系统，内容部分代码后台动态生成，我们只知道包含内容的一个DIV的ID,假设这个DIV的ID为conBox,我采取了通过JS获取此div#conBox下面第一个p元素，并修改其class为first,为p.first:first-letter伪类添加样式.<!-- more -->

代码如下：

    
    
    
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type"></meta>
    <title>show</title>
    <link href="css/style.css" type="text/css" rel="stylesheet"></link>
    </head>
    
    <body>
    
    <div id="conBox">
                    <p>Face aux milliers de voyous qui dévastent chaque nuit depuis s</p>
                    <p>Barbra Streisand est née à Brooklyn le 24 avril 1942. Rêvant très tô</p>
                    <p>Barbra Streisand décroche ensuite le rôle principal dans la comédi</p>
                    <p>La chanteuse entame également une cars de séduction dans les années 90, pui</p>
    </div>
    
    <script type="text/javascript">
    	var p = document.getElementById("conBox").getElementsByTagName("p");
    	for (var i=0;i<p.length;i++){
    		p[0].className = "first";
    		}
    </script>
    
    </body>
    
    </html>
    


其中css/style.css的内容为：

    
    
    #conBox{ margin:10px;  line-height:200%;}
    p.first:first-letter {text-transform:uppercase; color:#F35F8F; font-size:30px; font-weight:bold;}
    


  

需要注意的是，当样式写在单独的css文件中并在在html的部分引入，或者直接把样式写入html页内。这样可兼容firefox chrome ie6 7 8.
