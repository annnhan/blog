---
title: smarty 模板模板中的 assigin 函数
author: 阿安
comments: true
layout: post
slug: smarty
categories: [php]
tags : [smarty, assigin]
date: 2015-06-21 22:23:00+00:00
---


使用Smarty内置函数{assign}，在模板运行时为模板变量赋值，也可以为数组元素赋值，和在赋值时使用一些表达式。{$var=…}是{assign}函数的简写版。该函数有三个属性(var、value和scope)和一个选项标签(nocache)，其中var和value是必须使用的属性，分别用来设置要分配值的变量名和分配的值。而scope是可选属性，用来指定分配的变量范围，可以指定parent、root和global三个值，用来设定变量的有效范围。{assign}函数使用如下所示：

{% highlight php %}

{assign var="name" value="brophp"}  {*为变量$name赋值上brophp的值*}
{assign "name" "brophp"}            {*这是assign函数属性的简写*}
{$name="brophp"}                    {*这是assign函数的简写，也是为变量$name赋值上brophp的值*}

{% endhighlight %}

在模板中声明的变量和从PHP中分配给模板中给模板的变量具有相同的使用方式。上例是在模板中声明一个$name变量三中书写方式：第一种是Smarty模板中标准函数的方式;第二种是省略属性名称简写的方式;第三种也是一种简写方法，更像是PHP变量的声明。除了上面简单声明一个变量以外，还可以为变量赋一些相对复杂的值，如使用数组和表达式，如下所示：

{% highlight php %}

{*定义数组*}
{assign var=foo value=[1,2,3]}          {*为变量$foo赋上一个索引数组值*}
{assign var=foo value=['y'=>'yellow']}  {*为变量$foo赋上一个关联数组值*}
{assign var=foo value=[1,[9,8],3]}      {*可以使用嵌套声明多维数组*}
{assign var=foo value=$x+$y}            {*可以在属性中使用变量*}
{assign var="foo" value="'$foo+$bar'"}  {*可以在属性值的字符串中使用变量及表达式*}

{*短变量分配*}
{$foo=$bar+2}                       {*短变量分配值的方式*}
{$foo = strlen($bar)}               {*PHP函数在变量值中使用*}
{$foo = myfunct(($x+$y)*3)}         {*作为函数参数*}
{$foo.bar=1}                        {*数组元素赋值*}
{$foo.bar.baz=1}                    {*多维数组元素的赋值*}
{$foo[]=1}                          {*为数组添加新元素*}
{$foo[$x+3]}                        {*变量作为数组索引*}
{$foo={counter}+3}                  {*在标签里嵌套标签*}
{$foo="this is message{counter}"}   {*在引号里使用标签*}

{% endhighlight %}

<!-- more -->

在载入模板中可见被载入模板(即为include进来)的分配变量。在声明变量时可以通过添加scope属性，并通过三个值来为调用的模板指定变量范围。

{% highlight php %}

{*bar只能在载入模板中可见*}
{assign var="bar" value="value"}

{*用了scope=parent，可以在自己和加载它的模板中可见*}
{assign var="foo" value="something" scope=parent}

{*全局变量在所有模板中可见*}
{assign var="foo" value="bar" scope="global"}

{*你可以在当前树形结构的‘根’中赋值一个变量。该变量可以在所有使用该树形结构的模板中可见。*}
{assign var="foo" value="bar" scope="root"}

{% endhighlight %}

除了使用内置函数{assign}和{$var=…}声明变量以外，还可以使用$Smarty的内置{append}函数，在模板执行期间建立或追加模板变量数组。如下所示：

{% highlight php %}

{append var='name' value='Tom'}                 {*类似于$name[]='Tom'*}
{append var='name' value='Bob' index='first'}   {*类似于$name.first='Bob'*}
{append var='name' value='Meyer' index='last' scope='parent'}

{% endhighlight %}

内置函数{append}有两个必选属性，使用属性var指定一个数组变量名称，使用value属性向数组中添加值。也可以通过index属性指定索引下标，也和{assign}函数一样，可以使用scope属性设置变量作用域范围。


转自<a href="http://php.ncong.com/smarty/shengming_bianliang.html" target="_blank">http://php.ncong.com/smarty/shengming_bianliang.html</a>