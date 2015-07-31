---
author: 阿安
comments: true
date: 2012-04-25 03:33:35+00:00
layout: post
slug: onbeforeunload-onunload-return
title: 获取页面离开onbeforeunload与onunload事件的返回值
wordpress_id: 209
categories:
- JavaScript
tags:
- JavaScript
- onbeforeunload
- onunload
- 事件
---

在各种项目开发的过程中，页面离开事件onbeforeunload是我们经常要用到的，可以避免用户操作失误，给用户一个选择的机会，就比如我们常常用到的编辑器中。如果用户选择了离开，那么onunload或者onbeforeunload事件自然会触发；但若用户选择了取消，又该如何检测呢？

我们假定一个页面离开取消事件，叫做onunloadcancel。显然，这个事件应触发在用户按下对话框的取消按钮之后。但关闭提示对话框的触发流程并不是那么简单。我们先来回顾下这个过程：

    
    {% highlight javascript %}
    window.onbeforeunload = function(){
        return "真的离开?";
    }
    {% endhighlight %}


当用户准备离开页面（比如按下关闭按钮，或者刷新页面等等），onbeforeunload事件触发。我们的脚本无法在这个事件里决定是否阻止页面的关闭，唯一能做到的只有返回一个字符串，这个字符串仅作为说明文字出现在关闭选择对话框里，用户可以选择关闭，或者不关闭。但究竟选择哪个，我们无从得知。

然而仔细分析下这个问题，其实不然。 如果用户真选择了关闭页面，那么之后所有的运行代码都byebye了；而继续留在页面的话，就当什么都没发生过，除了onbeforeunload事件。所以，我们在onbeforeunload事件里做点小花招，在此注册个几毫秒之后启动的定时器，如果页面真关闭了，那么这个定时器当然是作废了；那么页面还在，几毫秒的延时对于这个本来就是异步的界面交互事件也没有什么误差。<!-- more -->


    
    {% highlight javascript %}
    window.onbeforeunload = function(){
        setTimeout(onunloadcancel, 10);
        return "真的离开?";
    }
    window.onunloadcancel = function(){
        alert("取消离开");
    }
    {% endhighlight %}



我们使用setTimeout，延时10ms执行onunloadcancel。如果页面真关闭了，定时器当然都销毁；反之继续。但在测试中，发现FireFox有个两个BUG：
1) 有时按下关闭按钮，也会执行onunloadcancel，并且有个对话框一闪而过。如果换成while(1);浏览器会一直卡死，这说明onunloadcancel确实是执行了，只是销毁了界面，但并没有暂停脚本的运行。
2) 如果是通过刷新页面的方式离开，仅执行一次onbeforeunload，但点击X按钮关闭页面，会执行两次onbeforeunload。因此我们还需在完善下，以便兼容FF。

    
    {% highlight javascript %}
    var _t;
    window.onbeforeunload = function(){
        setTimeout(function(){_t = setTimeout(onunloadcancel, 0)}, 0);
        return "真的离开?";
    }
    window.onunloadcancel = function(){
        clearTimeout(_t);
        alert("取消离开");
    }
    {% endhighlight %}




这里使用了一种我也说不出原因的办法，应该算是hack，解决了FF下的bug。
