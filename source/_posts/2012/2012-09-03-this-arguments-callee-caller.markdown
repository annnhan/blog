---
author: 阿安
comments: true
date: 2012-09-03 09:42:04+00:00
layout: post
slug: this-arguments-callee-caller
title: 函数内部对象属性以及相关属性详解：arguments.callee、this、caller
wordpress_id: 502
categories:
- JavaScript
tags:
- arguments
- callee
- caller
- JavaScript
- this
- 函数对象
---

**在javascript函数内部，有两个特殊的对象：arguments和this。其中，arguments是一个类数组对象，它包含了传入函数中的所有参数。虽然arguments对象主要用于保存函数参数，但它还有一个名叫callee的属性，该属性是一个指针，指向拥有这个arguments对象的函数。**请看下面这个非常经典的阶乘函数。

    
    {% highlight javascript %}
    function factorail(n){
        if(n<=1){
            return 1;
        }else{
            return n*factorail(n-1);
        }
    }
    {% endhighlight %}


<!-- more -->
定义阶乘一般要用到递归算法，如上代码所示，如果函数有名字，而且名字不改变得情况下，这样定义没有问题。但是，这个函数的运行与函数名factorail紧紧耦合在一起了，为了消除这种紧密耦合的现象，可以向下面这样使用arguments.callee。

    
    {% highlight javascript %}
    function factorail(n){
        if(n<=1){
            return 1;
        }else{
            return n*arguments.callee(n-1);
        }
    }
    {% endhighlight %}



在这个重写后的factorail()函数的函数体内，木有在引用函数名factorail，而是通过arguments.callee指向其本身。这样，无论引用函数时候使用什么函数名，都可以完成递归调用。例如：

    
    {% highlight javascript %}
    var trueFactorail = factorail;
    factorail = function(){return 0}
    alert(trueFactorail(5)); //120
    alert(factorail(5)); //0
    {% endhighlight %}



在此，变量trueFactorail现获得了factorail的值，实际上是在以一个位置保存了该函数的指针，然后，我们再将一个返回0的函数赋值给变量factorail。如果像原来的fancrorail()那样不使用arguments.callee，调用truefactorail就会返回0，可是在接触了函数内部代码与函数名的耦合状态以后，trueFactorail仍然能完成正常计算阶乘；至于factorail(),它现在只是一个返回0的函数。


**函数内部另一个特殊的对象是this，其引用的是函数据以执行的环境对象——或者也可以说是this值（当网页在全局作用域中调用函数时，this对象引用的就是window）。**来看下面的例子。

    
    {% highlight javascript %}
    window.color = "red";
    var o = {color:"blue"};
    function sayColor(){
       alert(this.color);
    }
    sayColor();//red
    o.sayColor = sayColor;
    o.sayColor();//blue
    {% endhighlight %}



上面这个函数dayColor()是在全局作用域中定义的，它引用了this对象，由于在调用函数之前，this的值并不确定，因此，this可能会在代码执行过程中引用不同的对象。当在全局作用域中调用sayColor()，时，this引用的是全局对象window；换句话说，this.color求值会转换成window.color求值，于是就返回了"red"。而当吧函数sayColor()赋值给对象o，并调用o.sayColor()时，this引用的是对象o，因此对this.color求值会转换成o.color求值，结果就返回了"blue"。


**ECMAScript5还规范化了另一个函数对象的属性：**caller**。除了Opera早期的版本不支持，其他浏览器都支持这个ECMAScript3没有定义的属性。caller属性中保存了调用当前函数的函数的引用，如果是在全局作用域中调用当前函数，它的值为null。**例如：

    
    {% highlight javascript %}
    function outer(){
        inner();
    }
    function inner(){
        alert(inner.caller);
    }
    outer();
    {% endhighlight %}



以上代码会导致警告框显示outer()函数的源代码。因为outer()调用了inner()，所以inner.caller就指向outer()。为了实现更松散的耦合，也通过arguments.callee来访问相同的信息。

    
    {% highlight javascript %}
    function outer(){
        inner();
    }
    function inner(){
        alert(arguments.callee.caller);
    }
    outer();
    {% endhighlight %}



IE、Firefox、Chrome、Safari的所有版本以及Opera9.6都支持caller属性。



_参考资料：《Javascript高级程序设计》第三版_



