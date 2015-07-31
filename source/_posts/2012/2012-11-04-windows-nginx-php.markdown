---
author: 阿安
comments: true
date: 2012-11-04 13:17:46+00:00
layout: post
slug: windows-nginx-php
title: windows下配置nginx+php
wordpress_id: 614
categories:
- 服务器
tags:
- nginx
- php
- Windows
---

1、首先需要准备的应用程序包。

　　nginx：[nginx/Windows-1.0.4](http://nginx.org/download/nginx-1.0.4.zip)

　　php：[php-5.2.16-nts-Win32-VC6-x86.zip](http://windows.php.net/downloads/releases/archives/php-5.2.16-nts-Win32-VC6-x86.zip) （nginx下php是以FastCGI的方式运行，所以我们下载非线程安全也就是nts的php包）

　　（还会用到）RunHiddenConsole：[RunHiddenConsole.zip](http://redmine.lighttpd.net/attachments/660/RunHiddenConsole.zip)

2、安装与配置。

　1）php的安装与配置。

　　直接解压下载好的php包，到D盘wnmp目录（D:\wnmp），这里把解压出来的文件夹重命名成php5。进入文件夹修改php.ini-recommended文件为php.ini，并用Editplus或者Notepad++打开来。找到

    
    
    extension_dir = "./ext"
    


更改为

    
    
    extension_dir = "D:/wnmp/php5/ext"
    


往下看，再找到

    
    
    ;extension=php_mysql.dll
    ;extension=php_mysqli.dll
    


前面指定了php的ext路径后，只要把需要的扩展包前面所对应的“;”去掉，就可以了。这里打开php_mysql.dll和php_mysqli.dll，让php支持mysql。当然不要忘掉很重要的一步就是，把php5目录下的libmysql.dll文件复制到C:\Windows目录下，也可以在系统变量里面指定路径，当然这里我选择了更为方便的方法^_^。<!-- more -->

到这里，php已经可以支持mysql了。

接下来我们来配置php，让php能够与nginx结合。找到

    
    
    ;cgi.fix_pathinfo=1
    


去掉里面的分号

    
    
    cgi.fix_pathinfo=1
    


这一步非常重要，这里是php的CGI的设置。

2）nginx的安装与配置。

　　把下载好的nginx-1.0.4的包同样解压到D盘的wnmp目录下，并重命名为nginx。接下来，我们来配置nginx，让它能够和php协同工作。进入nginx的conf目录，打开nginx的配置文件nginx.conf，找到

    
    
    location / {
          root   html;　　　　　　#这里是站点的根目录
          index  index.html index.htm;
    }
    


将root  html;改为root   D:/wnmp/www;

再往下，找到

    
    
    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ \.php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}
    


先将前面的“#”去掉，同样将root  html;改为root   D:/wnmp/www;。再把标记为红色的/scripts改为“$document_root”，这里的“$document_root”就是指前面“root”所指的站点路径，这是改完后的：

    
    
    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    location ~ \.php$ {
          root           D:/wnmp/www;
          fastcgi_pass   127.0.0.1:9000;
          fastcgi_index  index.php;
          fastcgi_param  SCRIPT_FILENAME  $document_root$fastcgi_script_name;
          include        fastcgi_params;
    }
    


保存配置文件，就可以了。

nginx+php的环境就初步配置好了，来跑跑看。我们可以输入命令![](/wp-content/uploads/2012/11/cdm-nginx.jpg)来启动php，并手动启动nginx，当然也可以利用脚本来实现。

首先把下载好的RunHiddenConsole.zip包解压到nginx目录内，RunHiddenConsole.exe的作用是在执行完命令行脚本后可以自动关闭脚本，而从脚本中开启的进程不被关闭。然后来创建脚本，命名为“start_nginx.bat”，我们在Notepad++里来编辑它:

    
    
    @echo off
    REM Windows 下无效
    REM set PHP_FCGI_CHILDREN=5
    
    REM 每个进程处理的最大请求数，或设置为 Windows 环境变量
    set PHP_FCGI_MAX_REQUESTS=1000
     
    echo Starting PHP FastCGI...
    RunHiddenConsole D:/wnmp/php5/php-cgi.exe -b 127.0.0.1:9000 -c D:/wnmp/php5/php.ini
     
    echo Starting nginx...
    RunHiddenConsole D:/wnmp/nginx/nginx.exe -p D:/wnmp/nginx
    


再另外创建一个名为stop_nginx.bat的脚本用来关闭nginx:

    
    
    @echo off
    echo Stopping nginx...  
    taskkill /F /IM nginx.exe > nul
    echo Stopping PHP FastCGI...
    taskkill /F /IM php-cgi.exe > nul
    exit
    


做好后，是这样的:
![](/wp-content/uploads/2012/11/bat.jpg)

这样，我们的服务脚本也都创建完毕了。双击start_nginx.bat看看进程管理器是不是有两个nginx.exe的进程和一个php-cgi.exe的进程呢？
![](/wp-content/uploads/2012/11/jincheng.jpg)

这样nginx服务就启动了，而且php也以fastCGI的方式运行了。

到站点目录下，新建一个phpinfo.php的文件，在里面编辑

    
    
    
    



保存后，打开浏览器输入“http://localhost/phpinfo.php”，如果看到
![](/wp-content/uploads/2012/11/phpinfo.jpg)
就说明，nginx+php的环境已经配置好了，呵呵~


转自：http://www.cnblogs.com/huayangmeng/archive/2011/06/15/2081337.html
