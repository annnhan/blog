author: 阿安
comments: true
date: 2012-05-02 10:50:05+00:00
layout: post
slug: webstorm-function-operating-guide
title: WebStorm功能特点以及使用指南
wordpress_id: 361
categories:
- 发现与分享
- 工具/资源
tags:
- WebStorm
- Webstorm使用指南
- Webstorm快捷键
- Webstorm配置
---

之前跟大家大家走马观花介绍了WebStorm的功能特点（[http://www.cssha.com/webstorm](http://www.cssha.com/webstorm)），那么，相对于其他的前端开发IDE，WebStorm的亮点在哪呢 ？在使用过程中又有哪些需要注意的地方呢 ？ 现在我们就来了解一下吧。<!-- more -->

**首先看看WebStorm合其他的IDE有什么特别之处。**
**1**) 自动保存，不需要你一次又一次地ctrl+s啦，所有的操作都直接存储，当然，万一键盘误操作也会被立即存储，不过我们可以通过本地版本控制解决这个问题。
**2**) 任何一个编辑器只要文件关闭了就没有历史记录了，但是webstorm有。就是说，只要webstorm不关闭，你的文件随时可以返回到之前的操作，webstorm关闭重启后这些历史记录就没有了。这样的坏处也是显然的，由此带来的内存消耗也必然比较大。
**3**) 任何一个编辑器，除了服务器svn之外，没有本地版本，但是webstorm提供一个本地文件修改历史记录。
**4**) 与时俱进的眼光。zencoding于2009年出现于it界，在这之后，鲜有工具直接集成到里边。webstorm 2.0之后就集成了。node.js,html5,git,cvs等 就不一一列举了。 
**5**)提供的插件也是比较齐全，安装非常方便。这样带来了另外的问题，以前的eclipse是安装第三方的，webstorm貌似不能安装第三方的插件。
**6**) 可以导出当前设置：File -> Export setting。 

**截下来是配置和使用： **
**1**） 主题，把下载好的主题包放在C:\Users\jikey(用户名)\.WebIde10\config\colors目录下，然后重启webstorm，settings --> colors & fonts -->scheme name中选择主题名。
如果出现特别长代码对齐白线，在Editor --> Appearance --> Show vertical indent guides 前面的勾去掉即可。
**2**） 添加VIM插件：
File -> Settings -> Plugins -> Browse repositories -> 搜索vim，对它单击右键Download and install，然后重启IDE就可以了。
**3**） 除了webstorm之外，此公司还提供另外一个针对phper的开发工具,phpStorm，主页上说明，phpstorm包括所有webstorm的功能。但是习惯于大括号去方法名在同一行显示，所以还得配置：
File -> Settings -> code style -> PHP -> Wrapping and Braces -> Braces placement ->
In method declaration : End of line. 
**4**） zencoding默认的快捷键是Tab，如果你需要修改zencoding快捷键的话：File -> Setting -> Live Templates 。
**5**） 在开发js时发现，需要ctrl + return 才能选提示候选项，又需要配置：File -> Setting -> Editor -> Code Completion -> Preselect the first suggestion:'Smart' 改为 Always
**6**） 注意的地方是：Webstorm的调试不支持中文路径中文文件名。

**下面是Webstorm的一些常用快捷键：**

    
    
    1. ctrl + shift + n: 打开工程中的文件，目的是打开当前工程下任意目录的文件。
    2. ctrl + j: 输出模板
    3. ctrl + b: 跳到变量申明处
    4. ctrl + alt + T: 围绕包裹代码(包括zencoding的Wrap with Abbreviation)
    5. ctrl + []: 匹配 {}[]
    6. ctrl + F12: 可以显示当前文件的结构 
    7. ctrl + x: 剪切(删除)行，不选中，直接剪切整个行，如果选中部分内容则剪切选中的内容
    8. alt + left/right:标签切换
    9. ctrl + r: 替换
    10. ctrl + shift + up: 行移动
    11. shift + alt + up: 块移动(if(){},while(){}语句块的移动)
    12. ctrl + d: 行复制
    13. ctrl + shift + ]/[: 选中块代码
    14. ctrl + / : 单行注释
    15. ctrl + shift + / : 块注释
    16. ctrl + shift + i : 显示当前CSS选择器或者JS函数的详细信息
    17. ctrl + '-/+': 可以折叠项目中的任何代码块，它不是选中折叠，而是自动识别折叠。
    18. ctrl + '.': 折叠选中的代码的代码。
    19. shift + esc: 当前激活的任意小窗口最小化，也可以是alt+数字键，数字在小窗口有显示。
    20. alt + '7': 显示当前的函数结构。
    21. 如果是*.html页面，则在文件名下的导航栏某DOM结构上右键，可以全选当前DOM结构。
    
