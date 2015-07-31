---
author: 阿安
comments: true
date: 2012-12-04 09:45:20+00:00
layout: post
slug: css3-ime-mode
title: 通过ime-mode属性控制文本字段的输入法编辑器的状态
wordpress_id: 677
categories:
- HTML5/CSS3
tags:
- css3
- ime-mode
---

ime-mode是CSS3中最新添加的属性，更准确点说，是CSS Basic User Interface Module Level 3 (CSS3 UI)规范新添加的属性，该属性可以控制文本字段的输入法编辑器的状态。IE浏览器从IE5开始就支持该属性，FireFox浏览器从FireFox3.0开始也支持该ime-mode属性。不过chrome、opera、Safari浏览器还没有开始支持该属性。

名称: ime-mode
值: auto | normal | active | inactive | disabled | inherit
初始值: auto
应用元素: text fields（文本字段）
继承性: no

**下面是ime-mode各个值的说明：**
auto : 默认值，不影响当前输入法编辑器的状态
normal : 输入法编辑器的状态应该是normal，这个值可以用于用户样式表来覆盖页面的设置。IE浏览器不支持该属性
active : 输入法编辑器的状态初始时是激活的；输入将一直使用该输入法直到用户切换输入法。该属性在Linux下不支持
inactive : 输入法编辑器的状态初始时是非激活状态；除非用户激活输入法
disabled : 禁用输入法编辑器；该输入法编辑器也许不会被用户激活

    
    
    {% highlight html %}
    <html>
     <head>
      <title> New Document </title>
     <style type="text/css">
        input {ime-mode: disabled; }
     </style>
     </head>

     <body>

    <form action="" name="form1" method="post">
        <input type="text" name="textfield">
    </form>
     </body>
    </html>
    {% endhighlight %}



上面的例子在IE5+或者FireFox3+浏览器中运行，不允许输入中文。

这个属性虽然很强大，但是在最新版的chrome、opera、safari浏览器中都不支持该属性，所以在这些浏览器中还需要通过JavaScript来实现当用户输入中文时无法输入到文本框中。

