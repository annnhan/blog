author: 阿安
comments: true
date: 2012-10-27 15:57:58+00:00
layout: post
slug: ecmascript5-new-array-method
title: ECMAScript 5中新增的数组方法
wordpress_id: 587
categories:
- JavaScript
tags:
- ECMAScript
- every
- filter
- forEach
- JavaScript
- map
- reduce
- reduceRight
- some
---

ECMAScript 5中定义了9个新的数组方法，用于遍历、映射、过滤、检测、简化和搜索数组。

在开始介绍之前，很有必要对这几个新增的数组方法做一个概述。首先，大多数方法的第一个参数接收一个函数，并且对数组的每个元素（或者一些元素）调用一次该函数。如果是稀疏数组，对不存在的元素不调用传递的函数。在大多数情况下，调用提供的函数使用3个参数：数组元素、数组元素的索引值和数组本身。通常，知需要第一个参数，可忽略后面2个参数。大多数ECMAScript 5数组方法的第一个参数是一个函数，第二个参数是可选的。如果有第二个参数，则第一个参数（被调用的函数）会被看做是第二个参数的方法。也就是说，第一个参数（被调用的函数）的this关键字指向的是第二个参数。被调用的函数的返回值非常重要，但是不同的方法处理返回值的方式也不一样。ECMAScript 5中的数组方法都不会修改原始数组本身，但是，方法所传递的调用函数是可以改变原始数组本身的。<!-- more -->

**forEach()**
forEach()方法从头到尾遍历数组，为每个元素调用指定的函数。如上所述，调用的函数作为forEach()方法的第一个参数然后forEach()方法使用三个参数调用该函数：数组元素、数组元素的索引值和数组本身。如果你只关心数组元素的值，可编写只有一个参数的函数——额外的2个参数将被忽略：

    

    var arr = [1, 2, 3, 4, 5];

    //计算数组元素的和
    var sum = 0;
    arr.forEach(function(v){
        sum += v;
    });
    console.log(sum); //15

    //每个元素的值自加1
    arr.forEach(function(v, i, a){
        a[i] = v + 1;
    });
    console.log(arr); //[2, 3, 4, 5, 6]




注意，forEach()方法无法在所有元素都传递给调用函数之前终止，也就是说，它始终都会遍历完，没有类似与for循环中的break语句。如果要提前终止，必须把forEach()方法放在一个try块中，并却抛出一个异常。如果forEach()方法抛出foreach.break异常，循环会提前终止。

**map()**
map()方法将调用数组的每个元素传递给指定函数，并返回一个数组，它包含该函数的返回值。例如：

    

    var arr = [1, 2, 3, 4, 5];
    var b = arr.map(function(x){
        return x * x;
    });
    console.log(b) //[1, 4, 9, 16, 25]




传递给map()的函数的调用方式跟跟传递给forEach()的函数的调用方式一样。但是传递map()的函数应该有一个返回值。注意，map()安徽的是新数组，他不修改原始数组本身，如果袁术数组是稀疏数组，返回的数组也是稀疏数组：它具有相同的长度，相同的缺失元素。

**filter()**
filter()方法返回的数组元素是原始数组的一个子集。传递的函数是用来逻辑判断的：该函数返回true或者false。如果返回值为true或是能转化true的值，那么传递给判断函数的元素就是filter()返回的子集的成员，它将被添加到作为filter()方法的返回值的数组中，例如：

    

    var arr = [1, 2, 3, 4, 5];
    var b = arr.filter(function(x){
        return x > 3;
    });
    var c = arr.filter(function(x, i){
        return i % 2 == 0;
    });
    console.log(b) //[4, 5]
    console.log(c) //[1, 3, 5]




注意，filter()方法会跳过稀疏数组中的缺失元素，它返回的数组总是稠密的。我们可以利用这点来压缩稀疏数组中的空缺：

    

    var arr = [1, , , , 5];
    var b = arr.filter(function(){
        return true;
    });
    console.log(b) //[1, 5]




甚至，压缩空缺并删除undefined和null元素，可以这样使用：

    

    var arr = [1, , , , undefined, null, 5];
    var b = arr.filter(function(x){
        return x !== undefined && x !== null;
    });
    console.log(b) //[1, 5]





**every()和some()**
every()和some()是数组的逻辑判断，它们对数组元素运用指定函数进行判定，返回一个布尔值。
every()方法就像数学中的“针对所有”的量词∀：当且仅当数组中所有元素调用判定函数都返回true时，every()方法才返回true，否则，返回false。
some()方法就像数学中的“存在”的量词∃：当数组中至少有一个元素调用判定函数返回true时，some()方法就返回true,当且仅当数组中所有元素调用判定函数都返回false时，some()方法才返回false。

    

    var arr = [1, 2, 3, 4, 5];
    var b = arr.every(function(x){
        return x < 10;
    });
    var c = arr.every(function(x){
        return x % 2 == 0;
    });
    var d = arr.some(function(x){
        return x > 10;
    });
    var e = arr.some(function(x){
        return x % 2 == 0;
    });
    console.log(b) //true
    console.log(c) //false
    console.log(d) //false
    console.log(e) //true




注意，一旦every()和some()确定该返回什么值，他们就回通知遍历数组。some()在判定函数第一次返回true的时候就返回true;但是如果判定函数一直返回false，它就会遍历整个数组。every()相反，在判定函数第一次返回false的时候就返回false;但是如果判定函数一直返回true，它就会遍历整个数组。根据数学逻辑，空数组调用时候，some()返回false，every()返回true。

**reduce()和reduceRight()**
reduce()和reduceRight()方法使用知道的函数将数组进行组合，生成单个值。这在函数式编程当中是非常常见的操作，也可以称之为“注入”和“折叠”。例如：

    

    var arr = [1, 2, 3, 4, 5];
    var b = arr.reduce(function(x, y){ //数组求和
        return x + y;
    }, 0);
    var c = arr.reduce(function(x, y){ //数组求积
        return x * y;
    }, 1);
    var d = arr.reduce(function(x, y){ //求最大值
        return x > y ? x : y;
    });
    console.log(b) //15
    console.log(c) //120
    console.log(d) //5




reduce()需要2个参数，第一个是执行简化操作的函数，简化函数的任务就是定义一个方法将两个值化简成一个值，并返回简化后的值。第2个（可选）参数是传递给简化函数的一个初始值。reduce()所使用的函数的第一个参数是目前位置简化操作的累计结果，如果是第一次调用，那么第一个参数是一个初始值，它是就是传递给reduce()函数的第2个参数，如果没有指定其初始值，它将使用数组的第一个元素作为初始值。这意味着在上面的求和和求积的例子中，也可以省略第二个参数（初始值参数）。

reduceRight()的工作原理和reduce()一样，不同的是它按照数组元素的索引值从高到低（从左到右）处理数组。如果简化操作是从左到右，你可能想使用它，例如：

    

    var arr = [2, 3, 4];
    var b = arr.reduceRight(function(x, y){ //乘方操作，顺序为2^(3^4)
        return Math.pow(y, x);
    });





**indexOf()和lastIndexOf()**
类似于string类型的indexOf()和lastIndexOf()，搜索整个数组中具有给定值的元素，如果找到，返回第一个找到的元素的索引，如果没有找到，返回-1。indexOf()从头到尾搜索，lastIndexOf()则相反。

    

    var arr = ['a', 'b', 'c', 'd', 'e'];
    console.log(arr.indexOf('b')) //1
    console.log(arr.lastIndexOf('e')) //4






_参考资料——《Javascript权威指南》_
