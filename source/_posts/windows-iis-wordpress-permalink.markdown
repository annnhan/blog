author: 阿安
comments: true
date: 2012-04-29 13:05:13+00:00
layout: post
slug: windows-iis-wordpress-permalink
title: Windows/IIS主机上如何让wordpress使用漂亮的固定链接
wordpress_id: 242
categories:
- 发现
tags:
- IIS
- Rewrite
- Windows
- WordPress
- 固定链接
- 虚拟主机
---

国外的空间到期了，而且之前用的延迟也比较高，所以就换了一家国内的主机，但是却是IIS的，自己太粗心了没看清楚！于是，以前的固定链接发现无法使用了。不过还好，IDC提供了rewrite功能，我们可以通过下面的办法来解决问题。  
  
<!-- more -->
我们都知道WordPress程序很强大,对搜索引擎优化很友好,但是有一点可能有些人还不是很清楚,对于WordPress这样一款开源程序来 说,它本身就是在Linux/Apache平台中开发,先天上与其结合得比较紧密,因此,如果可能的话,选择Linux/Apache平台应该是第一选择。尽管WordPress可以在Windows/iis平台中安装使用，但存大许多不足，其实中致命的一点便是IIS本身不支持Mod_Rewrite功能，而这将会给博客的维护、管理、SEO优化带来很多麻烦。  
  

由于IIS不支持Mod_Rewrite,因此,Wordpress便无法实现标准的、简洁的Permalinks,而只能采取在Url中包含“index.php“的替代方案(如SEO探索的权益之计中所探讨的那样);所以无法实现真正的伪静态功能。虽然网上有利用404.php页面来实现的方法，但终归没有这种自然的好。今天阿安就给大家分享一下，首先你的主机要装Rewrite组件，现在国内很多WINDOWS主机都有装这个了，如果没有可以联系主机空间商。然后在httpd.ini中加入如下代码：

    
    
    [ISAPI_Rewrite]
    # 3600 = 1 hour
    CacheClockRate 3600
    RepeatLimit 32
    #解决中文tag无法访问的问题
    RewriteRule /tag/[^/]+)/([^/]+)/?([0-9]+)?/ /index.php?tag=$1&paged;=$3 [L]
    # Protect httpd.ini and httpd.parse.errors files
    # from accessing through HTTP
    # Rules to ensure that normal content gets through
    RewriteRule /sitemap.xml /sitemap.xml [L]
    RewriteRule /favicon.ico /favicon.ico [L]
    # For file-based wordpress content (i.e. theme), admin, etc.
    RewriteRule /wp-(.*) /wp-$1 [L]
    # For normal wordpress content, via index.php
    RewriteRule ^/$ /index.php [L]
    RewriteRule /(.*) /index.php/$1 [L]
    


但是修改之后中文tag又不能访问了，别担心，接着看下一步。修改wp-include中的classes-wp.php，之前版本可能是classes.php。

    
    
    原代码：
    $pathinfo = $_SERVER['PATH_INFO'];
    替换为：
    $pathinfo = mb_convert_encoding($_SERVER['PATH_INFO'], "UTF-8", "GBK");
    
    原代码：
    $req_uri = $_SERVER['REQUEST_URI'];
    替换为：
    $req_uri = mb_convert_encoding($_SERVER['REQUEST_URI'], "UTF-8", "GBK");
    


修改后，保存下，然后将保存后的文件上传并覆盖原文件即可，这里需要注意文件保存格式。
然后在固定链接中设置为自己想要的就可以了。
  
  

附：常用WordPress固定链接格式：
**1**）/%postname%/
**2**）/%year%/%monthnum%/%postname%/
**3**）/post/%post_id%.html
**4**）/%year%/%monthnum%/%day%/%postname%/
**5**）/%year%/%monthnum%/%day%/%postname%.html
  
  

