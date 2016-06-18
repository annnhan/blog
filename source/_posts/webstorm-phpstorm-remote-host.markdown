author: 阿安
comments: true
date: 2012-11-25 07:56:40+00:00
layout: post
slug: webstorm-phpstorm-remote-host
title: 使用WebStorm/Phpstorm实现remote host远程开发
wordpress_id: 650
categories:
- 工具
tags:
- host
- phpstorm
- remote
- WebStorm
---

如果你的开发环境是在远程主机上，webstorm可以提供通过ftp/ftps/sftp等方式实现远程同步开发。这样我们可以就抛弃ftp、winscp等工具，通过webstorm编辑远程文件以及部署，本文基于WebStorm5.04编写， Intellij IDEA或者PHPStorm使用方法基本相同，可参考之。并且还要感谢因特里基友群群主大猫的帮助。

1、首先我们来创建一个基于远程主机的project，点击file>new project from existing sources，打开了创建project的对话框，我们选择第四项，例如我们的远程主机通过ftp/sftp/ftps等方式传输文件，点击next。

![](/wp-content/uploads/webstorm/1.jpg)<!-- more -->

2、设置project name与本地路径，deployment option这项选择custom，设置完毕next。

![](/wp-content/uploads/webstorm/2.jpg)

3、设置deployment option，注意Upload changed files automatically to default server，此项可以设置本地文件上传到远程主机的时机，我选择on explicit save action(ctrl+s)，这样就可以通过快捷键ctrl+s来上传文件，然后next。

![](/wp-content/uploads/webstorm/3.jpg)

4、配置远程主机，就不解释啦~ 配置好了next。

![](/wp-content/uploads/webstorm/4.jpg)

5、指定远程主机的根目录，我们点击project root即可，然后next。

![](/wp-content/uploads/webstorm/5.jpg)

6、配置访问路径，完了finish。

![](/wp-content/uploads/webstorm/6.jpg)

7、到此，我们的远程project就算创建完毕了，webstorm会从远程主机下载文件到本地路径，如下图，左边栏为本地project文件，右边栏remote host为远程主机的文件，看看是不是一一对应起来了？ 这样我们在本地修改一个文件，再按ctrl+s就可以自动上传到远程主机了。

![](/wp-content/uploads/webstorm/7.jpg)

通过tool>deployment，我们可以对进行更多远程部署相关的操作和设置。

![](/wp-content/uploads/webstorm/8.jpg)

结合Live edit，可以实现远程无刷新编辑调试。

![](/wp-content/uploads/webstorm/9.jpg)


下面是一个官方的演示视频链接，演示了如何在webstorm上进行远程开发，以及更详细的功能展现：[http://www.jetbrains.com/webstorm/demos/ftp_sync.html](http://www.jetbrains.com/webstorm/demos/ftp_sync.html)

本文源地址为：[/webstorm-phpstorm-remote-host](/webstorm-phpstorm-remote-host) # 转载请注明出处。
