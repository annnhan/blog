title: 如何使用 JavaScript 实现一门编程语言(4) —— Token stream
author: 阿安
comments: true
layout: post
slug: implement-a-programming-language-3
categories: [javascript]
tags : [parse, programming, language, javascript, AST, compile, 编译原理]
date: 2018-03-24
---

tokenizer(标记器, 也称为“词法分析器”), 对 [字符输入流](/implement-a-programming-language-3) 进行操作，并返回具有相同接口的流对象，但由 peek()/next() 返回的值一个个token。token是具有两个属性的对象：type和value。以下是我们所支持的token的一些示例：

    {  type：“ punc ”，value：“ （”  }            // 标点符号：parens，逗号，分号等等
    {  type：“ num ”，value：5  }               // numbers
    {  type：“ str ”，value：“ Hello World ！“  }  // 字符串
    {  type：” kw “，value：”lambda “  }         // keywords
    {  type： ” var “， value： ” a “  }             // 标识符
    {  type： ” op “， value： ” ！= “  }             // 运算符

空白符和注释将被跳过，没有令牌返回。

为了编写tokenizer，我们需要更仔细地认识我们的语言的语法。有个办法是，根据当前字符（由input.peek()返回的）来决定读取哪种类型的token：

1. 首先，跳过空格。
2. 如果然后返回。input.eof()null
3. 如果它是一个井号（#），则跳过注释（在行结束后重试）。
4. 如果它是一个引号，那么阅读一个字符串。
5. 如果它是一个数字，那么我们继续阅读一个数字。
6. 如果它是“字母”，则读取标识符或关键字token。
7. 如果它是标点符号之一，则返回标点符号token。
8. 如果它是运算符，则返回运算符token。
9. 如果以上都不是，那就抛出错误了。input.croak()

“read_next”函数作为tokenizer的核心部分 ，它实现了上面的内容：

    function read_next() {
        read_while(is_whitespace);
        if (input.eof()) return null;
        var ch = input.peek();
        if (ch == "#") {
            skip_comment();
            return read_next();
        }
        if (ch == '"') return read_string();
        if (is_digit(ch)) return read_number();
        if (is_id_start(ch)) return read_ident();
        if (is_punc(ch)) return {
            type  : "punc",
            value : input.next()
        };
        if (is_op_char(ch)) return {
            type  : "op",
            value : read_while(is_op_char)
        };
        input.croak("Can't handle character: " + ch);
    }

这是一个充当了调度员觉得的函数，它将next()调用以获取下一个token。请注意，它使用许多专注于特定token类型的函数，例如read_string()，read_number()等等。使用这些函数的代码而导致调度程序复杂化是没有意义的，即使我们从不在别处调用它们。

另外需要注意的是，我们并没有在一个步骤中消耗所有的输入流。解析器每次调用下一个token时，我们都会读取一个token。如果出现分析错误，我们甚至不会到达流的末尾。

字符只要它们被允许作为标识符（is_id）的一部分，read_ident()就会读取他们。标识符必须以字母、λ或_开头，并且可以包含更多这样的字符或数字，或者以下之一：？！ - <> =。因此，foo-bar不会被看作是三个token，而是作为一个单一的标识符（一个token）。这条规则的原因是我希望能够定义名为is-pair或者string>=的函数（对不起，这就是我的Lisper）。

此外，read_ident()函数将检查已知关键字列表中的标识符，如果它存在，它将返回一个"kw"令牌.

这里是我们语言的完整tokenizer：

    function TokenStream(input) {
        var current = null;
        var keywords = " if then else lambda λ true false ";
        return {
            next  : next,
            peek  : peek,
            eof   : eof,
            croak : input.croak
        };
        function is_keyword(x) {
            return keywords.indexOf(" " + x + " ") >= 0;
        }
        function is_digit(ch) {
            return /[0-9]/i.test(ch);
        }
        function is_id_start(ch) {
            return /[a-zλ_]/i.test(ch);
        }
        function is_id(ch) {
            return is_id_start(ch) || "?!-<>=0123456789".indexOf(ch) >= 0;
        }
        function is_op_char(ch) {
            return "+-*/%=&|<>!".indexOf(ch) >= 0;
        }
        function is_punc(ch) {
            return ",;(){}[]".indexOf(ch) >= 0;
        }
        function is_whitespace(ch) {
            return " \t\n".indexOf(ch) >= 0;
        }
        function read_while(predicate) {
            var str = "";
            while (!input.eof() && predicate(input.peek()))
                str += input.next();
            return str;
        }
        function read_number() {
            var has_dot = false;
            var number = read_while(function(ch){
                if (ch == ".") {
                    if (has_dot) return false;
                    has_dot = true;
                    return true;
                }
                return is_digit(ch);
            });
            return { type: "num", value: parseFloat(number) };
        }
        function read_ident() {
            var id = read_while(is_id);
            return {
                type  : is_keyword(id) ? "kw" : "var",
                value : id
            };
        }
        function read_escaped(end) {
            var escaped = false, str = "";
            input.next();
            while (!input.eof()) {
                var ch = input.next();
                if (escaped) {
                    str += ch;
                    escaped = false;
                } else if (ch == "\\") {
                    escaped = true;
                } else if (ch == end) {
                    break;
                } else {
                    str += ch;
                }
            }
            return str;
        }
        function read_string() {
            return { type: "str", value: read_escaped('"') };
        }
        function skip_comment() {
            read_while(function(ch){ return ch != "\n" });
            input.next();
        }
        function read_next() {
            read_while(is_whitespace);
            if (input.eof()) return null;
            var ch = input.peek();
            if (ch == "#") {
                skip_comment();
                return read_next();
            }
            if (ch == '"') return read_string();
            if (is_digit(ch)) return read_number();
            if (is_id_start(ch)) return read_ident();
            if (is_punc(ch)) return {
                type  : "punc",
                value : input.next()
            };
            if (is_op_char(ch)) return {
                type  : "op",
                value : read_while(is_op_char)
            };
            input.croak("Can't handle character: " + ch);
        }
        function peek() {
            return current || (current = read_next());
        }
        function next() {
            var tok = current;
            current = null;
            return tok || read_next();
        }
        function eof() {
            return peek() == null;
        }
    }


- 该next()函数并不总是调用read_next()，因为它可能在之前被peek过（在这种情况下，read_next（）已经被调用并且stream被提前）。因此我们需要一个current变量跟踪当前token。
- 我们只支持十进制数与通常的符号（没有1E5的东西，没有十六进制，没有八进制）。但是如果我们需要更多，这些更改只能在read_number（）中进行，并且很容易实现。
- 与JavaScript不同，唯一不能在字符串中引用的字符是引号字符本身和反斜杠。你需要反斜杠转义他们。而且，字符串可能包含换行符，制表符等。我们太长不会解析像\n，\t等的转义。

现在，我们有足够强大的工具来方便地编写解析器（parser）了，但我建议您首先看下 [AST](/implement-a-programming-language-5) 的描述。



_相关文章_

- [如何使用 JavaScript 实现一门编程语言(1)——前言](/implement-a-programming-language)
- [如何使用 JavaScript 实现一门编程语言(2)——编写一个解析器](/implement-a-programming-language-2)
- [如何使用 JavaScript 实现一门编程语言(3)——Input stream](/implement-a-programming-language-3)
- [如何使用 JavaScript 实现一门编程语言(4)——Token stream](/implement-a-programming-language-4)
- [如何使用 JavaScript 实现一门编程语言(5)——AST](/implement-a-programming-language-5)



_原文链接：[http://lisperator.net/pltut/dream](http://lisperator.net/pltut/dream)_