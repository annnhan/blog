author: 阿安
comments: true
date: 2011-10-08 09:30:39+00:00
layout: post
slug: through-the-ie-private-filter-let-ie6-ie7-ie8-support-transparent-background
title: 通过IE私有滤镜让IE6 7 8支持背景透明，内容不透明效果。
wordpress_id: 149
categories:
- HTML5/CSS3
---

CSS3已经支持背景rgba的rgba透明度，这一方法可以避免元素内容也随背景一起变透明(详情请阅/css3-new-knowledge-student)。但是这一属性在低于IE9的版本中却不被支持，我们可以通过IE私有滤镜来实现背景透明效果。
rgba参数格式：(red,green.,blue,alpha),alpha值0-1。
ie滤镜参数#3363370b，前两位为16进制透明度，比如说值是上面用到的0.2，那么就是0.2×255＝51，再转换成16进制为33。
至于10进制转换16进制，请查阅js函数toString(16)

    
    
    <style type="text/css">
    body{ background:url(http://gg.blueidea.com/2011/phpchina/phpchina_ad.gif)}
    #d1{width:300px; margin:100px auto; padding:50px;background:rgba(99, 55, 11, 0.2)}
    p{background-color:#fff; color:#000}
    #d2{background-color:#fff; width:600px; margin:0 auto; padding:10px; line-height:30px}
    </style>
    
    <div id="d1">1、背景透明内容不透明<p>2、背景透明内容不透明</p></div>
    <div id="d2">
    没有什么好解释的，rgba参数(red,green.,blue,alpha),alpha值0-1<br></br>
    ie滤镜参数#3363370b，前两位为16进制透明度，<br></br>
    比如说值是上面用到的0.2，那么就是0.2×255＝51，再转换成16进制为33<br></br>
    至于10进制转换16进制，请查阅js函数toString(16)
    </div>
    



如果懒惰的童鞋，可以使用下面的自动生成工具：
[/wp-content/uploads/2012/09/background-color-opacity.html](/wp-content/uploads/2012/09/background-color-opacity.html)
