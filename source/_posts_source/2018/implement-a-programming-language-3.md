title: 如何使用 JavaScript 实现一门编程语言(3) —— Input stream
author: 阿安
comments: true
layout: post
slug: implement-a-programming-language-3
categories: [javascript]
tags : [parse, programming, language, javascript, AST, compile, 编译原理]
date: 2018-03-22 10:00:00
---

这是最简单的部分。我们将创建一个“流对象”，它提供了从字符串中读取字符的操作。其中4个方法：

- peek() - 返回下一个值，但不从流中移除它。
- next() - 返回下一个值，并将其从流中丢弃。
- eof() - 当且仅当流中没有更多值时才返回true。
- croak(msg) - throw new Error(msg)

之所以包括最后一个，是因为流可以很容易地跟踪当前位置（即行/列），这对于显示错误消息很重要。

您可以根据您的需求随意添加更多的方法在流对象中，但对于我的教程这些就足够了。

因为流对象主要用来处理字符，所以 next()/ peek() 方法返回的值也是字符（JS没有char类型，它们是包含一个单一字符的字符串）。

<!-- more -->

这里是这个对象的完整代码，我将称之为“InputStream”。它足够简单，理解起来很容易：

    function InputStream(input) {
        var pos = 0, line = 1, col = 0;
        return {
            next  : next,
            peek  : peek,
            eof   : eof,
            croak : croak,
        };
        function next() {
            var ch = input.charAt(pos++);
            if (ch == "\n") line++, col = 0; else col++;
            return ch;
        }
        function peek() {
            return input.charAt(pos);
        }
        function eof() {
            return peek() == "";
        }
        function croak(msg) {
            throw new Error(msg + " (" + line + ":" + col + ")");
        }
    }

请注意，它不是标准的通过类创建的对象（通过 new 关键字调用）。您只需要通过 `var stream = InputStream(string)` 即可得到流对象。

接下来，我们将在这个对象之上编写另一个抽象： [tokenizer](/implement-a-programming-language-4) 。

_相关文章_

- [如何使用 JavaScript 实现一门编程语言(1)——前言](/implement-a-programming-language)
- [如何使用 JavaScript 实现一门编程语言(2)——编写一个解析器](/implement-a-programming-language-2)
- [如何使用 JavaScript 实现一门编程语言(3)——Input stream](/implement-a-programming-language-3)
- [如何使用 JavaScript 实现一门编程语言(4)——Token stream](/implement-a-programming-language-4)
- [如何使用 JavaScript 实现一门编程语言(5)——AST](/implement-a-programming-language-5)



_原文链接：[http://lisperator.net/pltut/dream](http://lisperator.net/pltut/dream)_