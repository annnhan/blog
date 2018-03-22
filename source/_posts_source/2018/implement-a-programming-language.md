title: 如何使用 JavaScript 实现一门编程语言(1) —— 前言
author: 阿安
comments: true
layout: post
slug: implement-a-programming-language
categories: [javascript]
tags : [parse, programming, language, javascript, AST, compile, 编译原理]
date: 2018-03-16
---

这是一系列关于 [如何实现编程语言](/tag/编译原理) 的教程。如果你曾经写过一个解释器或编译器，那么这里可能没有什么新东西。但是，如果您使用正则表达式来“解析” 任何看起来像编程语言的东西，那么请至少阅读解析部分。让我们写出更少的错误代码！

目标受众是普通的 JavaScript / NodeJS 程序员。

我们要学什么？

- 什么是解析器，以及如何编写解析器。
- 如何编写解释器。
- 为什么它们很重要。
- 编写一个编译器。
- 如何将代码转换为延续传递样式。
- 一些基本的优化技术。
- 我们的语言使用普通的 J avaScript 带来了新的例子。

在两者之间，我会争论为什么 Lisp 是一种优秀的编程语言。 但是，我们将要使用的语言不是 Lisp。它有一个更丰富的语法（每个人都知道的经典中缀符号），除宏之外，它的功能与 Scheme相当。
可悲的是，宏是 Lisp 的最终堡垒，其他语言无法克服（除非它们被称为 Lisp 方言）。

### 首先，让我们想想我们的要实现的编程语言应该是什么样子。

我们应该想清楚自己想要实现的目标。把语法的严格描述放在一起是一个好主意，但是我会在本教程中使语法更加简单，下面的示例就是我们要实现 "λ" 语言：

    # this is a comment

    println("Hello World!");

    println(2 + 3 * 4);

    # functions are introduced with `lambda` or `λ`
    fib = lambda (n) if n < 2 then n else fib(n - 1) + fib(n - 2);

    println(fib(15));

    print-range = λ(a, b)             # `λ` is synonym to `lambda`
                    if a <= b then {  # `then` here is optional as you can see below
                      print(a);
                      if a + 1 <= b {
                        print(", ");
                        print-range(a + 1, b);
                      } else println("");        # newline
                    };
    print-range(1, 5);

_请注意，标识符名称可以包含负号字符（print-range）。这是个人品味的问题：我总是在操作符旁边放置空格，我不喜欢太多的 camelCaseNames，而且我觉得短划线比下划线更好。编写自己的语言的好处是，你可以随心所欲地做到这一点。:)_

输出是：

    Hello World!
    14
    610
    1, 2, 3, 4, 5

<!-- more -->

该语言看起来有点像 JavaScript，但它不同。首先，没有声明，只有表达式。表达式返回一个值，可以用来代替任何其他表达式。分号需要在“序列”中分隔表达式。花括号{和}创建这样一个序列，它本身就是一个表达式。它的值是最后一个表达式返回的值。以下是一个有效的程序：

    a = {
      fib(10);  # has no side-effects, but it's computed anyway
      fib(15)   # the last semicolon can be missing
    };
    print(a); # prints 610

函数被引入其中一个关键字 lambda 或 λ（它们是同义词）。在关键字之后，必须有一个（可能为空的）用逗号分隔的变量名列表（可能为空），就像在 JavaScript 中一样 —— 这些是参数名称。函数体是一个单一的表达式，但它可以是一个包裹在{ ... }中的序列。
没有 return 语句 - 在函数返回最后一个表达式给出的返回值。

没有 var。要引入新变量，可以使用 JSer 称之为 “立即执行函数” 的方式。就像在 JavaScript 中一样，使用 a lambda，声明变量作为参数。变量具有函数作用域范围，函数是闭包。

甚至 if 本身就是一种表达。在 JavaScript 中，您可以使用三元运算符获得该效果：

    a = foo() ? bar() : baz();           // JavaScript
    a = if foo() then bar() else baz();  # λanguage

当分支以一个花括号开始时， then 关键字是可选，你可以在 print-range 上面看到，否则它是必需的。
当替代分支存在时，else 关键字是必须的。再次，then 的 else 的分支主题为一个单一的表达式，但也可以花括号 "{}" 包含多个通过 ";" 分隔的表达式。
当 else 分支不存在并且 if 条件结果为 false，if 表达式的结果是 false。因此，false 是一个关键词，它表示我们的语言中唯一的 falsy 值：

    if foo() then print("OK");

当 foo() 的结果不是 false 是，这点程序将会打印 "OK"。还有一个用于表示"真"的关键字 true，不是所非 false（当使用 JavaScript中 === 运算符的时候）的值都被理解成 true （其中包括数字 0 和空字符串 ""）。

还要注意，使用括号包裹 if 条件没有意义。不过，虽然它们是多余的，你添加它们也没有错误。

整个程序被解析，就好像它被嵌入大括号中一样，因此，除了最后一个表达式，您需要在每个表达式后面放置一个分号。

好了，这是就我们的小 λ 语言。它不一定是很完善的的。它的语法看起来很可爱，但也有陷阱。它有很多缺失的功能，如对象或数组; 我们并不关注这些缺失，因为对我们的旅程并不重要。只要你掌握了这个教程的所有内容，你可以轻松实现这些缺失的功能。

**在下一节中， [我们将为这个语言编写一个解析器](/implement-a-programming-language-2) 。**

_相关文章_

- [如何使用 JavaScript 实现一门编程语言(1)——前言](/implement-a-programming-language)
- [如何使用 JavaScript 实现一门编程语言(2)——编写一个解析器](/implement-a-programming-language-2)
- [如何使用 JavaScript 实现一门编程语言(3)——Input stream](/implement-a-programming-language-3)
- [如何使用 JavaScript 实现一门编程语言(4)——Token stream](/implement-a-programming-language-4)
- [如何使用 JavaScript 实现一门编程语言(5)——AST](/implement-a-programming-language-5)


_原文链接：[http://lisperator.net/pltut/dream](http://lisperator.net/pltut/dream)_