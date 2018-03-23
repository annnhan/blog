title: 如何使用 JavaScript 实现一门编程语言(5) —— AST
author: 阿安
comments: true
layout: post
slug: implement-a-programming-language-5
categories: [javascript]
tags : [parse, programming, language, javascript, AST, compile, 编译原理]
date: 2018-03-22 10:00:02
---

在计算机科学中，抽象语法树（Abstract Syntax Tree，AST），或简称语法树（Syntax tree），是源代码语法结构的一种抽象表示。它以树状的形式表现编程语言的语法结构，树上的每个节点都表示源代码中的一种结构。

之前我们讲过，parser将构建一个忠实地表示程序语义的数据结构。这里的AST节点则是一个普通的JavaScript对象，它具有一个type属性，用于指定它是什么类型的节点，还有一些附加信息，附加信息的值可能因 type 而异。

下面是我们语言所有 AST 节点列表：

<!-- more -->

    [
        /**
         * 数字(num)
         * 比如: 123.5
         */
        { type: "num", value: 123.5 },

        /**
         * 字符串(str)
         * 比如: "Hello World!"
         */
        { type: "str", value: "Hello World!" },

        /**
         * 布尔值(bool)
         * 比如: true、false
         */
        { type: "bool", value: true },
        { type: "bool", value: false },

        /**
         * 标识符(var)
         * 比如: x
         */
        { type: "var", value: "x" },

        /**
         * 函数表达式(lambda or λ)
         * 比如: lambda (x) 10 或者 λ (x) 10
         */
        {
            type: "lambda",
            vars: ["x"],
            body: { type: "num", value: 10 }
        },

        /**
         * 函数调用(call)
         * 比如：foo(a, 1)
         */
        {
            type: "call",
            func: { type: "var", value: "foo" },
            args: [
                { type: "var", value: "a" },
                { type: "num", "value": 1 }
            ]
        },

        /**
         * 条件语句（if）
         * 比如：if foo then bar else baz
         */
        {
            type: "if",
            cond: { type: "var", value: "foo" },
            then: { type: "var", value: "bar" },
            else: { type: "var", value: "baz" }
        },
        // 注：else分支是可选的
        // 比如：if foo then bar
        {
            type: "if",
            cond: { type: "var", value: "foo" },
            then: { type: "var", value: "bar" }
        },

        /**
         *  赋值表达式（assign）
         *  比如：a = 10
         */
        {
            type: "assign",
            operator: "=",
            left: { type: "var", value: "a" },
            right: { type: "num", value: 10 }
        },

        /**
         * 二元表达式（binary）
         * 比如：x + y * z
         */
        {
            type: "binary",
            operator: "+",
            left: { type: "var", value: "x" },
            right: {
                type: "binary",
                operator: "*",
                left: { type: "var", value: "y" },
                right: { type: "var", value: "z" }
            }
        },

        /**
         * 表达式序列（prog）
         * 比如：
         * {
        	  a = 5;
        	  b = a * 2;
        	  a + b;
        	}
         */
        {
            type: "prog",
            prog: [{
                type: "assign",
                operator: "=",
                left: { type: "var", value: "a" },
                right: { type: "num", value: 5 }
            },
            {
                type: "assign",
                operator: "=",
                left: { type: "var", value: "b" },
                right: {
                    type: "binary",
                    operator: "*",
                    left: { type: "var", value: "a" },
                    right: { type: "num", value: 2 }
                }
            },
            {
                type: "binary",
                operator: "+",
                left: { type: "var", value: "a" },
                right: { type: "var", value: "b" }
            }]
        }
    ]

_相关文章_

- [如何使用 JavaScript 实现一门编程语言(1)——前言](/implement-a-programming-language)
- [如何使用 JavaScript 实现一门编程语言(2)——编写一个解析器](/implement-a-programming-language-2)
- [如何使用 JavaScript 实现一门编程语言(3)——Input stream](/implement-a-programming-language-3)
- [如何使用 JavaScript 实现一门编程语言(4)——Token stream](/implement-a-programming-language-4)
- [如何使用 JavaScript 实现一门编程语言(5)——AST](/implement-a-programming-language-5)
- [如何使用 JavaScript 实现一门编程语言(6)——Interpreter](/implement-a-programming-language-6)



_原文链接：[http://lisperator.net/pltut/](http://lisperator.net/pltut/)_