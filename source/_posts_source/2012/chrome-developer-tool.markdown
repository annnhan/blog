author: 阿安
comments: true
date: 2012-06-04 07:07:31+00:00
layout: post
slug: chrome-developer-tool
title: Chrome开发人员工具使用技巧
wordpress_id: 471
categories:
- 工具/资源
tags:
- chrome
- 开发人员工具
---

转自：[http://ued.taobao.com/blog/2012/06/03/debug-with-chrome-dev-tool/](http://ued.taobao.com/blog/2012/06/03/debug-with-chrome-dev-tool/)

这篇文章是根据目前 chrome 稳定版(19.0.1084.52 m)写的, 因为 google 也在不断完善chrome developer tool, 所以 chrome 版本不同可能稍有差别. 一些快捷键也是 windows 上的, mac 下的应该大同小异.

常规的断点相关的 breakpoint/conditional-breakpoint/call-stack/watch-expressions 等就不涉及了.


### **1. Beautify javascript**


js 文件在上线前一般都会压缩下, 压缩的 javascript 几乎没有可读性, 几乎无法设定断点. 在 Scripts 面板下面有个 Pretty print 按钮(这种符号 {}), 点击会将压缩 js 文件格式化缩进规整的文件, 这时候在设定断点可读性就大大提高了.

[![](http://ued.taobao.com/blog/wp-content/uploads/2012/06/script-pretty-before.jpg)](http://ued.taobao.com/blog/wp-content/uploads/2012/06/script-pretty-before.jpg)

[![](http://ued.taobao.com/blog/wp-content/uploads/2012/06/script-pretty-after.jpg)<!-- more -->](http://ued.taobao.com/blog/wp-content/uploads/2012/06/script-pretty-after.jpg)


### **2. 查看元素绑定了哪些事件**


在 Elements 面板, 选中一个元素, 然后在右侧的 Event Listeners 下面会按类型出这个元素相关的事件, 也就是在事件捕获和冒泡阶段会经过的这个节点的事件.

在 Event Listeners 右侧下拉按钮中可以选择 Selected Node Only 只列出这个节点上的事件

展开事件后会显示出这个事件是在哪个文件中绑定的, 点击文件名会直接跳到绑定事件处理函数所在行, 如果 js 是压缩了的, 可以先 Pretty print 下, 然后再查看绑定的事件.

[![](http://ued.taobao.com/blog/wp-content/uploads/2012/06/element-events.jpg)](http://ued.taobao.com/blog/wp-content/uploads/2012/06/element-events.jpg)


### **3. Ajax 时中断**


在 Scripts 面板右侧有个 XHR Breakpoints, 点右侧的 + 会添加一个 xhr 断点, 断点是根据 xhr 的 url 匹配中断的, 如果不写匹配规则会在所有 ajax, 这个匹配只是简单的字符串查找, 发送前中断, 在中断后再在 Call Stack 中查看时那个地方发起的 ajax 请求


### **4. 页面事件中断**


除了给设定常规断点外, 还可以在某一特定事件发生时中断(不针对元素) , 在 Scripts 面板右侧, 有个 Event Listener Breakpoints, 这里列出了支持的所有事件, 不仅 click, keyup 等事件, 还支持 Timer(在 setTimeout setInterval 处理函数开始执行时中断), onload, scroll 等事件.

[![](http://ued.taobao.com/blog/wp-content/uploads/2012/06/breakpoints.jpg)](http://ued.taobao.com/blog/wp-content/uploads/2012/06/breakpoints.jpg)


### **5. javascript 异常时中断**


Pretty print 左侧的按钮是开启 js 抛异常时中断的开关, 有两种模式：在所有异常处中断, 在未捕获的异常处中断. 在异常处中断后就可以查看为什么抛出异常了


### **6. DOM Level 3 Event 事件中断**


在 Elements 面板, 选中一个元素右键, 有两个选项：Break on subtree modifications, Break on attributes modifications, 这两个对应 DOM Level 3 Event 中的[DOMSubtreeModified](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMSubtreeModified) , [DOMSubtreeModified](http://www.w3.org/TR/DOM-Level-3-Events/#event-type-DOMAttrModified) 事件 在 Scripts 面板 DOM Breakpoints 处会列出所有 level3 的 event 中断

[![](http://ued.taobao.com/blog/wp-content/uploads/2012/06/dom-event-level3.jpg)](http://ued.taobao.com/blog/wp-content/uploads/2012/06/dom-event-level3.jpg)


### **7. 所有 js 文件中查找**


在 chrome developer tool 打开的情况下, 按 ctrl + shift + F, 在通过 js 钩子查找代码位置时很有用, 查找支持正则表达式

[![](http://ued.taobao.com/blog/wp-content/uploads/2012/06/multifile-find.jpg)](http://ued.taobao.com/blog/wp-content/uploads/2012/06/multifile-find.jpg)


### **8. command line api**





	
  * $(id_selector) 这个与页面是否有 jQuery 无关

	
  * $$(css_selector)

	
  * $0, $1, $2, $3, $4

	
    1. Elements 面板中最近选中的 5 个元素, 最后选择的是 $0

	
    2. 这个 5 个变量时先进先出的




	
  * copy(str) 复制 str 到剪切板, 在断点时复制变量时有用

	
  * monitorEvents(object[, types])/unmonitorEvents(object[, types])

	
    1. 当 object 上 types 事件发生时在 console 中输出 event 对象




	
  * 更多 console api 请 console.log(console) 或 [点击](http://getfirebug.com/wiki/index.php/Console_API#console.trace.28.29)

	
  * 更多 command line api [点击](http://getfirebug.com/wiki/index.php/Command_Line_API)


[![](http://ued.taobao.com/blog/wp-content/uploads/2012/06/monitorEvents.jpg)](http://ued.taobao.com/blog/wp-content/uploads/2012/06/monitorEvents.jpg)


### **9. 实时修改 js 代码生效**





	
  * 页面外部 js 文件在 Scripts 面板中可以直接修改, 改完后按 ctrl + S 保存, 会立即生效

	
  * 注意

	
    1. 经测试不支持 html 页面中 js 修改

	
    2. 经过 Pretty print 格式化的脚本不支持修改







### **10. console 中执行的代码可断点**


在 console 中输入代码的最后一行加上 //@ sourceURL=filename.js, 会在 Scripts 面板中有个叫 filename.js 的文件, 然后他就和外部 js 文件一样了

[![](http://ued.taobao.com/blog/wp-content/uploads/2012/06/eval.jpg)](http://ued.taobao.com/blog/wp-content/uploads/2012/06/eval.jpg)

    
    function hello() {
      alert('say hi');
    }
    //@ sourceURL=hello.js




#### 




#### 参考链接





	
  * [chrome developer tool doc](https://developers.google.com/chrome-developer-tools/docs/overview)

	
  * [Google I/O 2011: Chrome Dev Tools Reloaded](http://www.youtube.com/watch?v=N8SS-rUEZPg)


