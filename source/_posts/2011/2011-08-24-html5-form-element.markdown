---
author: 阿安
comments: true
date: 2011-08-24 02:37:16+00:00
layout: post
slug: html5-form-element
title: HTML5中一些新的“form”元素属性
wordpress_id: 51
categories:
- HTML5/CSS3
tags:
- form
- html5
---

创建表单时，我们常常遇到的一个挑战是无法单独从它的父`表单`控制<FORM>元素，而诉诸一些奇怪的方法，形成控制与形式提交其数据。

如果你试图在HTML4或XHTML去去实现，你想从提交表单数据的其余部分一起孤立的控制数据，你必须实现一些花哨的JavaScript技巧，传递到提交的资料 - 其中有许多明显的缺陷。<!-- more -->


## 一个更好的办法


HTML5现在推出了一个新`的`形式，可让您对任何<FORM>页面上的元素相关联的属性孤立开进行控制。大家阅读这种技术的HTML5 规范，我们展示一下HTM5这里是如何做到这一点的呢 ：


    
    <a href="/wp-content/uploads/2011/08/2011-08-24_101639.jpg"><img src="/wp-content/uploads/2011/08/2011-08-24_101639.jpg" title="2011-08-24_101639" height="264" width="502" alt="" class="alignnone size-full wp-image-52"></img></a>



    
    注意两件事:



    
    textarea元素在form元素之外，是兄弟关系；



    
    textarea元素有一个form属性与form元素的ID相同，我希望把他们相关联。







## 它覆盖了默认行为


有了这个属性，你实际上可以覆盖默认的form所控制行为。例如，如果有两种形式在页面上，可以“stolen”形式＃2的形式控制，并使其＃1的形式提交。

即使控件嵌套里面的表单元素的＃2提交行为会发生。而作为一个结果，形式＃2将_不会_提交“stolen”的形式控制的数据。所以`form`属性将覆盖自然会发生。

这技术的工作原理与表单的提交按钮的方式相同 。您可以以外的形式提交按钮，和它关联使用的`形式`属性，它会以同样的方式工作。




## 浏览器支持吗？


我已经设置了其属性`方法` “获取” 的形式，这将导致在查询字符串发送到相同的页面提交的值。如果您使用的浏览器支持该功能，那么你应该会看到三个值追加到URL。如果您使用的是nonsupporting浏览器，然后你会看到只有两个值。``

我找不到太多的来源，讨论此功能的浏览器支持，但根据WHATWG的规范，浏览器支持如下：

Opera 9.5+

Safari 5.1+ (according to Elliot)

Firefox 4+

Chrome 10+

在笔者各人看来，要使用此功能，就必须有一个与IE浏览器的数字低的观众，或其他功能检测，然后通过JavaScript支持得到相同的结果 。我没有看到一个具体polyfill HTML5的Polyfills页，但它可能是HTML5的形式实现polyfills方法之一，我只是不费心去研究这些。工作将是一个有趣的事情，因为这是一个非常有用的功能 。


