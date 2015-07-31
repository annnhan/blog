---
author: 阿安
comments: true
date: 2012-09-29 10:44:42+00:00
layout: post
slug: aptana3-chinese-zencoding-svn-jquery
title: Aptana Studio 3常用配置：汉化，zen-coding，SVN，jquery提示。
wordpress_id: 577
categories:
- 发现与分享
- 工具/资源
tags:
- aptana
- JQuery
- svn
- zen-coding
---

最近老是换机器，每次安装Aptana时候都要网上找插件地址或者安装方法，于是记录一下，以便以后偷懒。

**1、汉化**
打开http://www.eclipse.org/babel/downloads.php，复制Babel Language Pack Update Site for Helios下面的地址，如下图中的http://download.eclipse.org/technology/babel/update-site/R0.10.0/helios。
[![](/wp-content/uploads/2012/09/chinese-aptana-300x155.jpg)](/wp-content/uploads/2012/09/chinese-aptana.jpg)
然后Help > Install New Software，粘贴，一路Next。<!-- more -->

**2、添加zen-coding插件**
复制http://zen-coding.ru/eclipse/updates/ 或者 http://media.chikuyonok.ru/eclipse/updates/；
然后Help > Install New Software，粘贴，一路Next。。

**3、添加svn插件**
在help菜单里点击“Install New Software”；
点击Add按钮，在Add Site窗口，name输入：SVN ，location输入：http://subclipse.tigris.org/update_1.4.x，点击ok按钮；
选择Subclipse选项下的：
Subclipse – Required、
Subversion Client Adapter – Required、
Subversion Native Library、
Adapter (JavaHL) – Strongly Recommended
还有Subclipse SVNKit选项和Option选项,一路Next。

**4、添加jquery提示**
aptana 3 相比之前的aptana 2，在代码提示的选择上有一点改变。以前是直接到插件中心下载，然后再到editor里面打对勾的，现在应该找不到了（确切的说是换地方也换名称了） aptana studio 3使用的是PortableGit的方式进行插件扩展，如果要装插件，则需要先安装aptana 3 的PortableGit。一般安装完aptana 3 首次打开时也会提示你安装的。 如果不打算安装PortableGit，也可以直接下载。 
下面是PortableGit下安装jquery代码提示插件的方法：依次点击 Commands > Bundle Development > Install Bundle > jQuery。 这时会开始下载jquery插件包进行安装。
[![](/wp-content/uploads/2012/09/aptana-jquery1-300x186.png)](/wp-content/uploads/2012/09/aptana-jquery1.png)
然后选择 project——propretis，点击apply。
[![](/wp-content/uploads/2012/09/aptana-jquery2-300x208.gif)](/wp-content/uploads/2012/09/aptana-jquery2.gif)
