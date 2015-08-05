author: 阿安
comments: true
date: 2013-02-04 05:03:09+00:00
layout: post
slug: jquery1_9-removed-api
title: jQuery1.9中被删除的API
wordpress_id: 726
categories:
- JavaScript
tags:
- JavaScript
- JQuery
---

jQuery1.9删除了一些在1.8中已经过时的api,想要把那些不够安全的、缺乏效率的、用处不大的，以及带有误导的特性统统去掉。如果你想升级你的jquery版本，但又使用了如下被删除的api的话，可以引入[Migrate](http://code.jquery.com/jquery-migrate-1.1.0.js)迁移插件，被删除的api可以在Migrate插件中修复。

**.toggle(function, function, ... )**
toggle()方法可实现点击一个元素来执行指定函数。此方法被删除以减少混乱和提高潜在的模块化程度。

**jQuery.browser()**
jQuery.browser()通过UA信息来检测浏览器。此方法在1.3版本中已不赞成使用，并在1.9版本中被删除，jquery团队更建议通过特性检测来时您的代码兼容浏览器。

**.live()**
live()方法可以为未来生成的元素添加事件，此方法在1.7版本中已不赞成使用，并在1.9版本中被删除，您可以使用on()方法来代替。

**.die()**
die()方法可以移除live()添加的事件，此方法在1.7版本中已不赞成使用，并在1.9版本中被删除，您可以使用off()方法来代替。

**.sub()**
sub()方法可以可创建一个新的jQuery副本，不影响原有的jQuery对像，但用例的数量已经不足以证明它存在的价值。
