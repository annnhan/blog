---
author: 阿安
comments: true
date: 2014-02-24 07:54:53+00:00
layout: post
slug: create-start-program-in-ubuntu
title: ubuntu下创建启动器程序的方法。
wordpress_id: 1100
categories:
- 发现与分享
- 工具/资源
tags:
- pycharm
- ubuntu
---

python的开发工具pycharm每次打开都要在终端下执行sh文件，非常蛋疼，于是我想把它锁定到启动器。但是，在终端下打开的pycharm锁定到启动器以后，如果关闭了，下次点击启动器里的图标，还是无法打开。





Google了一下，原来需要创建一个启动器图标程序才行，ubuntu的启动器程序都是放在/usr/share/applications文件夹下的文件， 那我们就在这个文件夹下面创建一个pycharm.desktop，内容如下：




    
    [Desktop Entry]
    Version=1.0
    Type=Application
    Name=pycharm
    Icon=/usr/local/pycharm/pycharm-3.1.1/bin/pycharm.png
    Exec="/usr/local/pycharm/pycharm-3.1.1/bin/pycharm.sh" %f
    Comment=Develop with pleasure!
    Categories=Development;IDE;
    Terminal=false
    StartupWMClass=jetbrains-pycharm
    





然后双击打开，再锁定到启动器就好了。



