author: 阿安
comments: true
date: 2012-04-30 12:07:55+00:00
layout: post
slug: webstorm
title: WebStorm：令人眼前一亮的一款前端开发IDE
wordpress_id: 294
categories:
- 工具
tags:
- IDE
- WebStorm
---

[![](/wp-content/uploads/2012/04/webstorm.jpg)](/wp-content/uploads/2012/04/webstorm.jpg)

从最初的dreamweaver,到Notpad++,再到aptana，每一款IDE总让我我感觉少了点什么东西。WebStorm却让我眼前一亮，虽然公司项目所用的开发环境是eclipse+aptana（主要是方便团队协作和工程调试），但是其他时间我都会学习使用WebStorm，现在4.0版本已经出来了，让我们来看看它都有哪些强大之处吧：
<!-- more -->


#### 浏览器支持细节提示


关键字，标签，变量，参数和功能的javascript代码完成是基于支持DOM的流行的浏览器（IE，火狐等）标准，可以显示在不同浏览器之下的支持细节。

[![](/wp-content/uploads/2012/04/JS_completion.png)](/wp-content/uploads/2012/04/JS_completion.png)




#### 智能的代码导航和搜索提示


[![](/wp-content/uploads/2012/04/JS_go_to_definition.png)
](/wp-content/uploads/2012/04/JS_go_to_definition.png)![](/wp-content/uploads/2012/04/JS_go_to_symbol.png)




#### ECMAScript的Harmony支持


WebStorm支持最新的ECMAScript版本，你可以尝试新的功能，每个javascript引擎的实现增加了别人所不具备的一些不错的功能，当您使用的目前选定的javascript版本不支持，WebStorm将通知您，并建议速战速决：

[![](/wp-content/uploads/2012/04/unsupportedJSLangLevelAfter.png)](/wp-content/uploads/2012/04/unsupportedJSLangLevelAfter.png)




#### 支持CoffeeScript


CoffeeScript是一种编程语言，编译javascript和增强其简洁性和可读性，同时还增加了一些复杂的功能，像阵列的理解和模式匹配。WebStorm提供您：



	
  * 代码导航和完成

	
  * 重命名重构

	
  * 语法高亮

	
  * 错误检查

	
  * 查找使用实例


[![](/wp-content/uploads/2012/04/coffeeScript_thumb.png)](/wp-content/uploads/2012/04/coffeeScript_thumb.png)




#### 支持Node.js


WebStorm允许你调试和验证您的服务器端javascript - Node.js的应用。

[![](/wp-content/uploads/2012/04/nodeJSDebugging_thumb.png)](/wp-content/uploads/2012/04/nodeJSDebugging_thumb.png)

编辑CommonJS的模块结构，并提出适当的自动完成选项：

[![](/wp-content/uploads/2012/04/nodeJSModuleAwareCompletion.png)](/wp-content/uploads/2012/04/nodeJSModuleAwareCompletion.png)




#### javascript的重构


为javascript提供的重构功能，让您可以轻松地修改代码结构，以及撤消修改。



	
  * 移动/复制

	
  * 安全删除

	
  * 提取到嵌入的脚本文件

	
  * 重命名

	
  * 提取变量/函数

	
  * 内联变量/函数





#### javascript单元测试


如果你是一个javascript开发人员，你可能知道，您的应用程序的质量和正确性是至关重要的。那么，一致性测试和回归测试正好是你的痛苦少一点。支持JsTestDriver插件。

[![](/wp-content/uploads/2012/04/tests-run-results_thumb.png)](/wp-content/uploads/2012/04/tests-run-results_thumb.png)

[![](/wp-content/uploads/2012/04/server-state-ready.png)](/wp-content/uploads/2012/04/server-state-ready.png)

WebStorm为单元测试提供了一个清晰的画面。从现在开始，JsTestDriver用户可以测量代码覆盖率。

在IDE线行使你的单元测试：

[![](/wp-content/uploads/2012/04/editor-covered-lines-2.png)](/wp-content/uploads/2012/04/editor-covered-lines-2.png)

你还可以看到文件和目录在项目视图的测试覆盖率统计：

[![](/wp-content/uploads/2012/04/project-view-coverage.png)](/wp-content/uploads/2012/04/project-view-coverage.png)




#### 代码检查和快速修复


为了确保更好的代码质量，WebStorm可以捕捉动态的javascript代码中的常见错误...

![](/wp-content/uploads/2012/04/JS_inspection.png)

...，并为他们提供了快速修复。

[![](/wp-content/uploads/2012/04/JS_inspection_quick-fix.png)](/wp-content/uploads/2012/04/JS_inspection_quick-fix.png)




#### 支持JSLint / JSHint


javascript代码质量工具集成在IDE中。

[![](/wp-content/uploads/2012/04/resultOfRunningJSLint.png)](/wp-content/uploads/2012/04/resultOfRunningJSLint.png)




#### 基于Mozilla Firefox的javascript调试器





	
  * HTML和javascript断点

	
  * 定制断点属性：暂停模式，条件，通过计数

	
  * 帧，变量和javascript调试器

	
  * javascript表达式的运行评价




[![](/wp-content/uploads/2012/04/JS_breakpoint.png)](/wp-content/uploads/2012/04/JS_breakpoint.png)










#### 批量代码分析


无需通过点击所有文件或部署到服务器。整个源代码树的启动代码分析，可以在一个单一的视图中看到所有的结果。

[![](/wp-content/uploads/2012/04/PHP-batch.png)](/wp-content/uploads/2012/04/PHP-batch.png)




#### 语言混合编辑


支持任何代码中的“外部”和“内部”的语言 - 享受以外的javascript代码块，或在javascript字符串文字编码的CSS，HTML，SQL等。

[![](/wp-content/uploads/2012/04/IDE_lang_mix.png)](/wp-content/uploads/2012/04/IDE_lang_mix.png)




#### 拼写检查


集成拼写检查验证在标签的文本，代码串，评论，以避免您的网页上的拼写错误和错别字。以确保代码的可读性更好，甚至变量名，CSS类和ID拼写检查。

[![](/wp-content/uploads/2012/04/Spelling.png)](/wp-content/uploads/2012/04/Spelling.png)




#### 智能重复代码检测


[![](/wp-content/uploads/2012/04/duplicates_thumb.png)](/wp-content/uploads/2012/04/duplicates_thumb.png)




#### 支持HTML5


[![](/wp-content/uploads/2012/04/canvas-attributes.png)](/wp-content/uploads/2012/04/canvas-attributes.png)

WebStorm也明白你的代码和每个元素的类型，并显示新的HTML5元素支持的方法：

[![](/wp-content/uploads/2012/04/canvas-javascript-api.png)](/wp-content/uploads/2012/04/canvas-javascript-api.png)

只需按Ctrl +空格，WebStorm会显示所有可能的自动完成选项。




#### 验证和快速修复


WebStorm可以修复检测下列问题，并给你更合理的建议建议：



	
  * 无效的CSS选择器的格式

	
  * 无效的CSS属性

	
  * 未使用的CSS类定义

	
  * 无效的本地锚和更多...

	
  * 缺少必需的属性

	
  * 无效的属性或非法值

	
  * 错误的引用文件中的链接

	
  * 重复的属性


[![](/wp-content/uploads/2012/04/HTML_inspection_quick-fix.png)](/wp-content/uploads/2012/04/HTML_inspection_quick-fix.png)

每当你看到一个灯泡，打ALT +回车，看看WebStorm有什么建议：

[![](/wp-content/uploads/2012/04/CSS_inspection_quick-fix_result.png)](/wp-content/uploads/2012/04/CSS_inspection_quick-fix_result.png)[![](/wp-content/uploads/2012/04/CSS_inspection_quick-fix.png)](/wp-content/uploads/2012/04/CSS_inspection_quick-fix.png)




#### 支持Zen Coding


WebStorm内置了zen coding，可以使你编写代码更有效率。输入div.feature> H4 + P， 按 Tab ，你会得到

[![](/wp-content/uploads/2012/04/zencoding1.jpg)](/wp-content/uploads/2012/04/zencoding1.jpg)




#### 显示内容


鼠标移到HTML中的CSS选择器，可以立即显示这个选择器的实际的样式；引用调用一个图像文件的时，你会看到图片预览。
[![](/wp-content/uploads/2012/04/CSS_show_content.png)](/wp-content/uploads/2012/04/CSS_show_content.png)




#### 应用样式


此命令将打开的标签应用到通过CSS样式的树视图里的样式。

[![](/wp-content/uploads/2012/04/CSS_show_applied_style.png)](/wp-content/uploads/2012/04/CSS_show_applied_style.png)




#### HTML5的样板和其他Web应用程序模板


当你创建一个新项目的时候，WebStorm提供一些知名的项目模板，根据自己的需要使用：

[![](/wp-content/uploads/2012/04/new-project-dialog.png)](/wp-content/uploads/2012/04/new-project-dialog.png)




#### FTP和远程文件同步化


你可以使用简单的配置和直观的用户界面，从远程主机的FTP，或安装网络驱动器打开文件。

可以使用自动同步功能保存本地编辑项目文件和部署到远程服务器。

在Web服务器的配置标记的目录排除，包括从转让和设置索引|目录。




#### 集成版本控制系统


WebStorm支持最流行的版本控制系统：



	
  * Subversion

	
  * Mercurial

	
  * Git

	
  * Perforce

	
  * CVS

	
  * TFS






至此，我们已经大概了解WebStorm提供的一些最令人兴奋的功能。但这些只是冰山的一角。如果想有更多体验，不放自己下载一试。

官方下载地址：




[http://www.jetbrains.com/webstorm/download/index.html](http://www.jetbrains.com/webstorm/download/index.html)


 







