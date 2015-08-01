author: 阿安
comments: true
date: 2011-09-26 03:33:06+00:00
layout: post
slug: css3-new-knowledge-student
title: CSS3新属性基础学习
wordpress_id: 118
categories:
- HTML5/CSS3
---

嗯，这里是是CSS3一些新的属性基本知识：文字阴影，盒阴影，边界半径。这些CSS3属性常用来加强布局和实现良好的效果：

RGBA
前三个值是RGB颜色值和最后一个值是水平的透明度（0 =透明，1 =不透明）。
[![](/wp-content/uploads/2011/09/rgba.gif)](/wp-content/uploads/2011/09/rgba.gif)
  

RBGA可应用于任何与颜色相关的属性如字体颜色，边框颜色，背景颜色，阴影的颜色，等
[![](/wp-content/uploads/2011/09/rgba2.gif)](/wp-content/uploads/2011/09/rgba2.gif)
  
<!-- more -->
文本阴影
文字阴影的结构是按照以下顺序：X -偏移，Y -偏移，模糊，和颜色;
[![](/wp-content/uploads/2011/09/text-shadow.gif)](/wp-content/uploads/2011/09/text-shadow.gif)
  

设置为负值，X -偏移阴影转移到左侧。设置为负值偏移Y -转移阴影顶端。不要忘记你可以使用阴影的颜色RGBA值。
[![](/wp-content/uploads/2011/09/text-shadow-example2.gif)](/wp-content/uploads/2011/09/text-shadow-example2.gif)
  

您还可以指定文字阴影的列表（以逗号分隔）。下面的示例使用两个文本阴影声明一个字母的按效果（1px的顶部和底部1px的）。

text-shadow: 0 1px 0 #fff, 0 -1px 0 #000;
[![](/wp-content/uploads/2011/09/text-shadow-example3.gif)](/wp-content/uploads/2011/09/text-shadow-example3.gif)
  

边界半径
边界半径的简写，是类似的Padding和Margin属性（如边界半径： 20像素 ）。在浏览器的顺序来渲染边界半径，添加“WebKit的“在WebKit浏览器的属性名称的字体和 “- MOZ “火狐。
[![](/wp-content/uploads/2011/09/border-radius.gif)](/wp-content/uploads/2011/09/border-radius.gif)
  

您可以指定一个不同的值的每个角落。注意Firefox和Webkit的角落有不同的属性名称。
[![](/wp-content/uploads/2011/09/border-radius-corners.gif)](/wp-content/uploads/2011/09/border-radius-corners.gif)
  

盒阴影
框阴影的结构是相同的文字阴影财产：X -偏移，Y偏移，模糊和颜色 。
[![](/wp-content/uploads/2011/09/box-shadow.gif)](/wp-content/uploads/2011/09/box-shadow.gif)
  

同样，你可以申请一个以上的框阴影。下面的例子是三箱阴影声明。

-moz-box-shadow: -2px -2px 0 #fff, 2px 2px 0 #bb9595, 2px 4px 15px rgba(0, 0, 0, .3);
[![](/wp-content/uploads/2011/09/box-shadow2.gif)](/wp-content/uploads/2011/09/box-shadow2.gif)
