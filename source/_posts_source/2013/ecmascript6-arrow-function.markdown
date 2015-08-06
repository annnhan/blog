author: 阿安
comments: true
date: 2013-09-11 19:35:50+00:00
layout: post
slug: ecmascript6-arrow-function
title: 理解ECMAScript6中的箭头函数
wordpress_id: 991
categories:
- javascript
tags:
- ECMAScript6
- function
- javascript
- 函数
---

![enter image description here](/wp-content/uploads/2013/09/arrow-tv.jpg)





箭头函数是ECMAScript6中最有趣的部分之一。正如其名字所暗示的一样，它是一种用新的语法，一个“箭头”（=>）来定义的函数。然而，相对于传统的函数，箭头函数在一些重要的用途中会有一些不同的表现： 
1. **语法绑定this** ——箭头函数中的this的值，在函数定义的时候就绑定了，而不是根据函数执行时机来绑定； 
2. **不能new** ——箭头函数不能被当做构造函数来用，当通过new来调用时，会报错； 
3. **this不能被修改** ——在箭头函数的整个生命周期内，this始终保持同一个值，无法被修改； 
4. **没有arguments对象** ——在箭头函数内部，不能通过arguments来访问参数，你必须使用已命名的参数，或其他ES6功能。





存在这些差是有一些原因的：首先，this的绑定是javascript中一种常见的错误来源，在函数内部，很容易把this的指向弄混淆，从而导致意想不到的后果。其次，箭头函数通过限制this为一个固定值来执行，javascript引擎可以更容易地优化这些操作（而不是传统的函数，它可能被用来作为一个构造器或以其他地方）



<!-- more -->



### 语法





箭头函数的语法取决于你所要完成的功能，但结构大致为：【参数体 => 函数体】。 首先是箭头函数要接受的参数，紧接着是一个箭头=>，然后是函数体。参数体和函数体可以有多种形式，这个要根据使用情况而定。例如，下面的箭头函数接受一个参数，并将其返回。





    var reflect = value => value;

    // 相当于:
    var reflect = function(value) {
        return value;
    };







当箭头函数只有一个参数，可以直接放在参数体而无需任何其他语法。箭头右边的表达式求值并返回。即使有没有return语句，这个箭头函数也能将传递进来的第一个参数返回。





如果箭头函数需要多个参数，必须用圆括号将这些参数括起来，参数之间用逗号分隔。例如：





    var sum = (num1, num2) => num1 + num2;

    // 相当于:
    var sum = function(num1, num2) {
        return num1 + num2;
    };







sum（）函数只是简单地增加了两个参数，并返回结果。唯一的区别是，参数括在括号里用逗号分开（和传统函数一样一样的）。





当你想提供一个更传统的函数体，也许里面有多个表达式，那么你需要把函数体放在花括号中，并显式地定义一个返回值，如：





    var sum = (num1, num2) => { return num1 + num2; }

    // 相当于:
    var sum = function(num1, num2) {
        return num1 + num2;
    };







由于花括号用来表示箭头函数的函数体，当你想返回一个对象字面量时，就必须用圆括号把对象字面量包起来：





    var getTempItem = id => ({ id: id, name: "Temp" });

    // 相当于:
    var getTempItem = function(id) {

        return {
            id: id,
            name: "Temp"
        };
    };







圆括号把对象字面量包起来，表明括号里面的信息是一个对象，而不是函数体。





### 用法





javascript中最常见的错误来自于函数内部this的绑定问题，由于传统函数中this的值取决于函数执行时候的上下文，它可能会被绑定到你预想之外的对象上，导致错误的执行结果。请看下面的例子：





    var PageHandler = {

        id: "123456",

        init: function() {
            document.addEventListener("click", function(event) {
                this.doSomething(event.type);     // error
            }, false);
        },

        doSomething: function(type) {
            console.log("Handling " + type  + " for " + this.id);
        }
    };







在这段代码中，对象PageHandler用于处理页面上的交互。PageHandler的init()方法被调用时，又指派一个事件处理函数调用this.doSomething()方法。但是，此段代码并不work。因为事件处理函数中的this指向了全局对象，而不是PageHandler。如果你试图运行此代码，你会得到一个错误，因为全局对象上不存在doSomething方法。





你可以通过bind()方法，把PageHandler绑定到事件处理函数的this上，例如：





    var PageHandler = {

        id: "123456",

        init: function() {
            document.addEventListener("click", (function(event) {
                this.doSomething(event.type);
            }).bind(this), false);
        },

        doSomething: function(type) {
            console.log("Handling " + type  + " for " + this.id);
        }
    };







现在的代码如预期般运作，但可能看起来有点怪。通过调用函数的bind(this)，实际上创建了一个绑定PageHandler到当前this的新函数。当然，现在的代码是你所期望的那样，即使你必须创建一个额外的函数来完成工作。





由于箭头函数可以通过语法绑定来约束this的值，在箭头函数的上下文中，this的值将保持不变，不会根据函数的执行时机做任何更改，例如：





    var PageHandler = {

        id: "123456",

        init: function() {
            document.addEventListener("click",
                    event => this.doSomething(event.type), false);
        },

        doSomething: function(type) {
            console.log("Handling " + type  + " for " + this.id);
        }
    };







这里例子用一个箭头函数来作为事件监听函数，箭头函数中调用了this.doSomething()，其中this的值始终为init()里面的this的值，也就是PageHandler，不会转移到全局对象上。 所以这个版本的例子和使用bind()的例子运行结果是一样的。即使doSomething（）方法没有返回值，它仍是函数体唯一要的执行语句，所以也没有必要包上花括号。





箭头函数简洁的语法，也使他们成为其他函数的理想参数。例如，如果您想对数组进行排序，ES5中使用自定义的比较，通常这样写：





    var result = arr.sort(function(a, b) {
        return a - b;
    });







与此相比，更简洁的箭头函数版：





    var result = arr.sort((a, b) => a - b);







能接受回调函数的数组方法，例如sort(), map(), 和reduce()都可以受益鱼箭头函数，改变成更简洁的代码，从简单的语法实现复杂的流程。





### 您还需要知道





箭头函数虽然有别于传统函数，但都有一些共同的特点。例如： 
1. typeof运算符返回箭头函数为“function” 
2. 箭头函数仍然是Function的实例，这样的instanceof工作方式相同。 
3. call(), apply(), bind()方法在箭头函数上依然可用，虽然没有太大的价值。





**请记住，箭头函数最大的区别是不能用new来调用，否则，将会抛出一个错误**





### 结论





目前，箭头函数是ECMAScript6一个有趣的新功能，和一个和可爱凝固的功能。传递函数作为参数已经变得越来越流行，有一个简洁的语法，定义这些功能的方式，这是一个可喜的变化。词汇绑定为开发者解决了一个重大痛点，并为javascript引擎优化提高性能提供额外的奖励。如果你想尝试箭头函数，只要打开刚刚火起来的最新版Firefox，这是第一款实现箭头函数的浏览器。





_注：本文翻译自Nicholas C. Zakas的《Understanding ECMAScript 6 arrow functions》其中加入自己的理解并用非原文照搬，如有不对欢迎指正，转载译文请注明出处与译者。_ _原文地址：http://www.nczonline.net/blog/2013/09/10/understanding-ecmascript-6-arrow-functions_



