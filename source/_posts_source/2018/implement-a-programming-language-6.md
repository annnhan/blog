title: 如何使用 JavaScript 实现一门编程语言(6) —— Interpreter
author: 阿安
comments: true
layout: post
slug: implement-a-programming-language-6
categories: [javascript]
tags : [parse, programming, language, javascript, AST, compile, 编译原理]
date: 2018-03-23 10:00:02
---

到目前为止，我们写了3个函数：InputStream，TokenStream 和 parse。为了从一段代码中获取AST，我们可以执行以下操作：

    var  ast = parse （TokenStream （InputStream （code ））） ;

获取AST后就可以编写Interpreter（解释器）了，这比写parser容易。我们只需走AST，以正常顺序执行表达式。

**执行环境**

正确执行表达式的关键是正确维护执行环境 - 一个拥有绑定变量的上下文。它将作为参数传递给我们的evaluate函数。每次我们进入"lambda"节点时，我们都必须用新变量（函数的参数）扩展环境，并用运行时传递的值对它们进行初始化。如果一个参数影响了外部作用域的变量，我们必须小心地在离开函数时恢复先前的值。

实现这个最简单的方法是使用JavaScript的原型继承。当我们输入一个函数时，我们将创建一个新的环境。这种方式当我们退出时，我们不需要做任何事情——外部env已经包含在对象本身。

<!-- more -->

以下是Environment对象的定义：

    function Environment(parent) {
        this.vars = Object.create(parent ? parent.vars : null);
        this.parent = parent;
    }
    Environment.prototype = {
        extend: function() {
            return new Environment(this);
        },
        lookup: function(name) {
            var scope = this;
            while (scope) {
                if (Object.prototype.hasOwnProperty.call(scope.vars, name))
                    return scope;
                scope = scope.parent;
            }
        },
        get: function(name) {
            if (name in this.vars)
                return this.vars[name];
            throw new Error("Undefined variable " + name);
        },
        set: function(name, value) {
            var scope = this.lookup(name);
            // let's not allow defining globals from a nested environment
            if (!scope && this.parent)
                throw new Error("Undefined variable " + name);
            return (scope || this).vars[name] = value;
        },
        def: function(name, value) {
            return this.vars[name] = value;
        }
    };

一个Environment对象有一个parent属性指向父作用域。在全局作用域下parent为null。它有一个vars属性保存绑定的变量。

有以下方法：

- extend() - 创建一个子作用域。
- lookup(name) - 查找具有给定名称的变量的作用域。
- get(name) - 获取变量的当前值。如果变量未定义，则会抛出错误。
- set(name, value) - 设置变量的值。这需要查找变量定义的实际作用域。如果找不到并且我们不在全局范围内，则抛出错误。
- def(name, value) - 这会在当前范围内创建（或覆盖）一个变量。

**evaluate函数**

有了执行环境，我们就可以回到我们的主要问题（编写Interpreter）中来，这个evaluate函数包含了一个大switch循环，按节点类型执行不同的逻辑，下面是每个节点的说明：

    function evaluate(exp, env) {
    switch (exp.type) {

常量节点，我们只返回它们的值：

    case "num":
        case "str":
        case "bool":
            return exp.value;

变量是从环境中提取的。请记住，"var" token，其value属性包含变量名称名称：

    case "var":
            return env.get(exp.value);

对于赋值，我们需要检查左侧是否是一个 "var" token（如果不是，则抛出一个错误;现在我们不支持赋值给其他任何东西）。然后我们使用env.set设置值。
请注意，该值需要首先通过evaluate递归调用来计算。

    case "assign":
            if (exp.left.type != "var")
                throw new Error("Cannot assign to " + JSON.stringify(exp.left));
            return env.set(exp.left.value, evaluate(exp.right, env));

一个"binary"节点需要用到两个操作数。我们稍后会写这个apply_op函数，这很简单。同样，我们需要递归调用evaluator来计算left和right操作数

    case "binary":
            return apply_op(exp.operator,
                            evaluate(exp.left, env),
                            evaluate(exp.right, env));

一个"lambda"节点实际上会产生一个JavaScript闭包，所以它就像普通函数一样可以从JavaScript中调用。我写了一个make_lambda函数，将在后面定义它：

    case "lambda":
            return make_lambda(env, exp);

评估if节点很简单：首先评估if条件。如果不成立，则评估then分支并返回其值。最后如果存在else分支，就评估，否则返回false.

    case "if":
            var cond = evaluate(exp.cond, env);
            if (cond !== false) return evaluate(exp.then, env);
            return exp.else ? evaluate(exp.else, env) : false;

"prog"节点是一系列表达式。我们只是按顺序评估它们并返回最后一个的值。对于一个空序列，返回值默认为false。

    case "prog":
            var val = false;
            exp.prog.forEach(function(exp){ val = evaluate(exp, env) });
            return val;

对于一个"call"节点，我们需要调用evaluate计算func函数。首先我们评估一下，它应该返回一个正常的JS函数，然后我们评估并应用该函数。

    case "call":
            var func = evaluate(exp.func, env);
            return func.apply(null, exp.args.map(function(arg){
                return evaluate(arg, env);
            }));

我们的程序不应该到下面这一步，但是为了防止在解析器中添加新的节点类型，并且忘记更新评估程序，让我们抛出一个明确的错误。

    default:
            throw new Error("I don't know how to evaluate " + exp.type);
        }
    }

这是evaluate函数的核心，你可以看到它非常简单。我们仍然需要编写两个函数，让我们从最简单的apply_op函数开始：

    function apply_op(op, a, b) {
        function num(x) {
            if (typeof x != "number")
                throw new Error("Expected number but got " + x);
            return x;
        }
        function div(x) {
            if (num(x) == 0)
                throw new Error("Divide by zero");
            return x;
        }
        switch (op) {
          case "+"  : return num(a) + num(b);
          case "-"  : return num(a) - num(b);
          case "*"  : return num(a) * num(b);
          case "/"  : return num(a) / div(b);
          case "%"  : return num(a) % div(b);
          case "&&" : return a !== false && b;
          case "||" : return a !== false ? a : b;
          case "<"  : return num(a) < num(b);
          case ">"  : return num(a) > num(b);
          case "<=" : return num(a) <= num(b);
          case ">=" : return num(a) >= num(b);
          case "==" : return a === b;
          case "!=" : return a !== b;
        }
        throw new Error("Can't apply operator " + op);
    }

它接收运算符和其中需要运算的2个数，然后执行并返回而已。与JavaScript不同，我们只要求运算符的操作数为数字，并且使用num和div函数来检查。对于字符串我们会定义其他的东西。

而make_lambda有点微妙：

    function make_lambda(env, exp) {
        function lambda() {
            var names = exp.vars;
            var scope = env.extend();
            for (var i = 0; i < names.length; ++i)
                scope.def(names[i], i < arguments.length ? arguments[i] : false);
            return evaluate(exp.body, scope);
        }
        return lambda;
    }

正如你所看到的，它返回一个简单的JavaScript函数，包含环境和表达式进行评估。
重点是，创建这个闭包时什么都不会发生，但是当它被调用时，它会创建时的环境所使用的参数/值（如果传递的值少于函数的参数列表，缺少的部分默认为false）。 最后evaluate其函数体。

**原始功能**

如你所见，我们的语言没有提供任何方式与外界进行交流。
在一些代码示例中，我使用了一些print和println函数，但它们没有在任何地方定义。
这些必须被定义为原始函数（也就是说，我们将用JavaScript编写它们并将它们插入到全局环境中）。

现在把它放在一起，这里有一个测试程序：

    // some test code here
    var code = "sum = lambda(x, y) x + y; print(sum(2, 3));";

    // remember, parse takes a TokenStream which takes an InputStream
    var ast = parse(TokenStream(InputStream(code)));

    // create the global environment
    var globalEnv = new Environment();

    // define the "print" primitive function
    globalEnv.def("print", function(txt){
      console.log(txt);
    });

    // run the evaluator
    evaluate(ast, globalEnv); // will print 5

您可以 [下载](/assets/download/lambda-eval1.js) 我们迄今为止编写的代码。它可以在NodeJS中运行——，例如：

    echo 'sum = lambda(x, y) x + y; println(sum(2, 3));' | node lambda-eval1.js


_相关文章_

- [如何使用 JavaScript 实现一门编程语言(1)——前言](/implement-a-programming-language)
- [如何使用 JavaScript 实现一门编程语言(2)——编写一个解析器](/implement-a-programming-language-2)
- [如何使用 JavaScript 实现一门编程语言(3)——Input stream](/implement-a-programming-language-3)
- [如何使用 JavaScript 实现一门编程语言(4)——Token stream](/implement-a-programming-language-4)
- [如何使用 JavaScript 实现一门编程语言(5)——AST](/implement-a-programming-language-5)
- [如何使用 JavaScript 实现一门编程语言(6)——Interpreter](/implement-a-programming-language-6)



_原文链接：[http://lisperator.net/pltut/dream](http://lisperator.net/pltut/dream)_