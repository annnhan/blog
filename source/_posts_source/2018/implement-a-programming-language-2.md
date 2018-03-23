title: 如何使用 JavaScript 实现一门编程语言(2) —— 编写一个解析器
author: 阿安
comments: true
layout: post
slug: implement-a-programming-language-2
categories: [javascript]
tags : [parse, programming, language, javascript, AST, compile, 编译原理]
date: 2018-03-22
---

编写语言解析器是一项适度复杂的任务。实质上，它必须将一段代码（我们所看到的一堆字符）转换为“抽象语法树”（AST）。
AST是程序在内存中一种结构化的表达方式，它是“抽象”的，因为它不关心源代码是由哪些字符组成的，而是忠实地表示它的语义。我写了一个单独的页面来描述我们的AST。

例如，对于以下程序文本：

    sum = lambda(a, b) {
      a + b;
    };
    print(sum(1, 2));

<!-- more -->

我们的解析器将生成以下AST，其实也就是一个JavaScript对象：

    {
      type: "prog",
      prog: [
        // first line:
        {
          type: "assign",
          operator: "=",
          left: { type: "var", value: "sum" },
          right: {
            type: "lambda",
            vars: [ "a", "b" ],
            body: {
              // the body should be a "prog", but because
              // it contains a single expression, our parser
              // reduces it to the expression itself.
              type: "binary",
              operator: "+",
              left: { type: "var", value: "a" },
              right: { type: "var", value: "b" }
            }
          }
        },
        // second line:
        {
          type: "call",
          func: { type: "var", value: "print" },
          args: [{
            type: "call",
            func: { type: "var", value: "sum" },
            args: [ { type: "num", value: 1 },
                    { type: "num", value: 2 } ]
          }]
        }
      ]
    }

编写解析器的主要困难在于不能正确地组织代码。解析器是一种更高级的处理字符串的方式。关于如何保持解析器复杂度的可管理性的，我有几点建议：

- 编写多个功能模块并将它们保持较少的逻辑。在每一项功能模块中中，做好一件事！
- 不要尝试使用正则表达式进行解析。他们并不能派上用场，虽然正则对词法分析器有所帮助，但我建议将它们限制在做非常简单的事情上。
- 不要试图猜测代码的意图。如果不确定如何解析某些内容，请抛出错误消息，并确保该消息包含错误的位置（行/列）。

为了简单起见，我将代码分为三部分，它们又分为许多小函数：[Input stream](/implement-a-programming-language-3)、[Token stream](/implement-a-programming-language-4)、[AST](/implement-a-programming-language-5)

_相关文章_

- [如何使用 JavaScript 实现一门编程语言(1)——前言](/implement-a-programming-language)
- [如何使用 JavaScript 实现一门编程语言(2)——编写一个解析器](/implement-a-programming-language-2)
- [如何使用 JavaScript 实现一门编程语言(3)——Input stream](/implement-a-programming-language-3)
- [如何使用 JavaScript 实现一门编程语言(4)——Token stream](/implement-a-programming-language-4)
- [如何使用 JavaScript 实现一门编程语言(5)——AST](/implement-a-programming-language-5)



_原文链接：[http://lisperator.net/pltut/dream](http://lisperator.net/pltut/dream)_