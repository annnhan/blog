author: 阿安
comments: true
date: 2011-09-27 10:57:33+00:00
layout: post
slug: css-sprites-useful-technology-or-potentia-trouble
title: 'CSS Sprites: 有用的技术, 还是潜在的麻烦?'
wordpress_id: 134
categories:
- CSS
---

啊，无处不在的CSS Sprites——为数不多的网页设计技术，几乎瞬间，被评为最佳实践的CSS类之一。

今天大多数Web开发人员都掌握了这种技术，并有过无数的教程上写的文章。几乎在每一个教程，都提出设计者和开发者应该使用CSS Sprites，为了尽量减少HTTP请求，并节省了宝贵的流量。这项技术迄今已被许多网站采取，包括现在使用大型Sprites的亚马逊。

在这篇文章中，我将讨论的一些使用CSS sprites的优点和缺点，特别是对重点使用的“巨无霸型”的Sprites，为什么这些使用的Sprites在很多情况下是在浪费时间。
<!-- more -->
**浏览器缓存的全部图像**

Sprites方法的支持者表示其所给予的好处之一是图像的载入时间（或在使用大型Sprites的情况下，唯一的图像）。它认为，一个单一的GIF图像，包括所有必要的图像状态将显著低于相当于全部切片图像文件的大小。这是肯定的。一个单一的GIF图像只有一个颜色与它关联的表，而每个切片的GIF都有自己的颜色表，增加了流量。同样，一个单一的JPEG或PNG精灵可能会在相同的图像切片，分成多个图像文件大小保存。但是否真的有这样一个明显的好处？

默认情况下，基于图像的浏览器缓存中的所有图像——图像是否是Sprites或没有。所以，虽然它是千真万确的节省流量的Sprites技术，这仅发生在初始页面加载时，缓存将延伸到二级页面，使用相同的图像URL。

事实上，这种技术最早是在2003-2004年期间，上网速度相对较慢的情况下使用的，今天平均上网速度高于当时，则有可能是没有理由使用大型Sprites方法。但是要清楚，前面已经说过，我不是说Sprites不应该使用;我说他们不应该被滥用，以达到有限的利益。

**拼合图片花费的时间将增加**

想想如何创建一个简单的三态图像按钮：不同的状态需要放在另一个旁边，形成一个单一的图像。在你的Photoshop（或其他软件）中，当你要修改其中一种状态时，需要改动整张图片。

如果任何一个图像所需的任何更改，整个图像需要重新编辑和重新保存。对此有些开发人员可能觉得不是个问题。也许他们从源文件修改单独的按钮状态，使其更容易访问它们。但这个复杂的事情，绝不会比作为一个单独的图像切片和导出的简单。

为了节省几k的流量和几个服务器请求(还只发生在第一次加载页面时)，sprite技术是否真的值得？

**编码和维护花费的时间会增加**

经过图像切片和导出，麻烦还没有结束。虽然一旦你习惯这个过程，按钮的Sprites到你的CSS代码都很简单能实现，但是其他种类的Sprites并不那么简单。

一个按钮，有一个设置宽度通常是一个ul元素。如果该按钮的小Sprites，为每个按钮分开，很简单：UL的宽度和高度将列表项和锚定的宽度和高度相同，每个对齐相应的Sprites的位置很容易计算的基础上的高度和/或每个按钮的宽度。

但一个大型的Sprites，像亚马逊使用的，或由Google所使用的呢？想想这样一个文件，在CSS中的背景图片的位置的变化？有关初始创建的CSS代码是什么？远非一个简单的按钮，其状态很容易地计算出的位置，大型的Sprites往往需要不断的测试和重新调整图像状态。
[![](/wp-content/uploads/2011/09/google-sprite.jpg)](/wp-content/uploads/2011/09/google-sprite.jpg)
这是真的，亚马逊Sprites节省大约30个或更多的HTTP请求，这是绝对是一个显著的性能改进。但时，权衡开发和维护成本，并缓存和上网速度问题因素的好处，决定使用大型Sprites可能不那么令人信服。

**Sprites真的不需要“维护”？**

当然，有些人可能觉得Sprites不会导致他们的大难题 。在许多情况下，创建一个Sprites和代码后，它的很少触及再次，是不会影响任何正在进行的网站维护。如果你觉得Sprites维护不会对你的造成问题，那么最好的选择可能是使用大型的Sprites方法。

**不是所有图片都是背景**
另一个不提倡滥用 CSS sprite 的理由是这会导致开发人员错误地使用背景图片。有经验的开发人员会在项目中考虑可访问性问题，他们明白并不是每个图片都是背景。背景图片应该留给按钮以及用来装饰元素，而用来传达重要信息的图像应该内联在XHTML 中。
[![](/wp-content/uploads/2011/09/bg-content.jpg)](/wp-content/uploads/2011/09/bg-content.jpg)
_亚马逊正确使用了图像作为内联元素，内容和背景作为装饰。_

**Sprites使用不当会影响访问性**

由于把重点放在使用CSS sprites上，一些开始开发有意减少HTTP请求可能会错误地认为，所有的切片图像应作为背景——甚至图像，传达重要信息。结果将较少访问的网站 ，并会限制在HTML中的标题和alt属性的潜在好处。

因此，CSS Sprites没有错，不会造成可访问性问题（事实上，当正确使用，它们提高可访问性），但是，没有明确确定的弊端和正确使用，可能会阻碍Sprites推广进展和工作效率。

**HTTP请求数？**

许多人会说，提高网站的性能，最重要的是尽量减少HTTP请求。一项研究表明，一个空浏览器缓存占网站访问者的40-60％ 。这足以表明，大型的Sprites，应在所有情况下使用？有可能。特别是当你考虑到用户的第一次访问一个网站是多么的重要 。
[![](/wp-content/uploads/2011/09/firebug-http.jpg)](/wp-content/uploads/2011/09/firebug-http.jpg)
_YSlow的Firefox的分析性能上发出的HTTP请求数_

虽然这是事实，旧的浏览器从版本3.0和Internet Explorer 8默认情况下，一般只允许两个并发HTTP连接，Firefox 允许6个并发HTTP连接 。这意味着6％，同时连接服务器。因此，使用大型Sprites的好处，而有可能是一个不仅仅是按钮状态使用CSS精灵，在未来，随着互联网连接速度的增加和更新版本的浏览器性能改进的好处，这几乎成了摆设。


**Sprites生成器又怎么样呢？**
另一种说法是对于大型Sprites，可以使用一些Sprites生成器创建。详细的讨论和审查这些工具是远远超出了本文的范围，所以这里我会避免这种情况。但是从我对这些工具的研究，他们所提供的帮助是有限的，维护Sprites，将仍然需要大量的工作，这也是需要和收益权衡的。
[![](/wp-content/uploads/2011/09/spriteme.jpg)](/wp-content/uploads/2011/09/spriteme.jpg)
一些工具，比如Steve Souders的工具SpriteMe，提供CSS代码选项。SpriteMe可以将现有网站的背景图片，转换成一个单一的sprite图像（我一直在提到的一个“巨无霸”Sprites），您可以下载和必要的CSS代码插入到您的网页。虽然这个工具将协助生成Sprites，它似乎并没有在Sprites维修领域提供很大帮助。Souders的工具，一个是重新设计或重新调整的网站似乎无用，而且似乎只提供现有的设计。

**重点应放在多个性能问题**

如前所述，在网站的性能方面，HTTP请求的数量是一个重要的考虑因素。但也有其他的方法来降低这个数字，包括结合脚本和样式表，并使用远程库文件。

除了HTTP请求，开发人员可以专注于提高网站性能的其他因素。这些措施可能包括gzip压缩，外部脚本的妥善安置，优化CSS语法，压缩大型javascript文件，Ajax性能改善，避免javascript语法，等等已知会导致性能的问题 。
[![](/wp-content/uploads/2011/09/yslow-multiple.jpg)](/wp-content/uploads/2011/09/yslow-multiple.jpg)
_YSlow会提示HTTP请求以外的许多领域，可以提高网站性能_

如果开发商拿时间来考虑网站性能的所有因素，正确权衡的利弊，可能有很好的理由，以避免过度使用CSS精灵，把精力放在物有所值的领域。

**结论**

请不要误解，我在这里说什么。许多顶级博客和开发商追捧多年使用Sprites的好处，并在近年来采取了这些建议进一步推广使用大型Sprites——这些意见都应该认真对待 。然而，不是每个人都在有使网站的维护任务简单和简化流程的政策和制度的公司工作。我们中的许多人对我们自己的工作，或继承其他人创建的项目，都是独立完成。在这种情况下，大型Sprites可能会造成更多的麻烦。

你觉得呢？我们是否应该重新考虑巨型Sprites在CSS的发展中的作用呢？做有利于节约HTTP请求的统计数据，必须保证所有的背景图片使用Sprites？或者Sprites技术在CSS的发展过程，已经从一个有用的，直观的和富有成效的技术发展到一个耗时的滋扰？


原文地址：
http://coding.smashingmagazine.com/2010/03/26/css-sprites-useful-technique-or-potential-nuisance/
