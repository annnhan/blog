title: 无梯子如何正常访问使用了 googleapis 的网站
author: 阿安
comments: true
layout: post
slug: reres-googleapis
categories: [javascript]
tags : [ReRes, javascript, googleapis]
date: 2015-09-11 13:22:51
---

许多国外的网站都使用被墙掉的 googleapis.com 上的静态资源（如 font、js库 等），如果不爬墙，这些资源无法加载，导致网站无法正常访问。

其实，360提供了一个国内的 googleapis.com 镜像仓库（[libs.useso.com](http://libs.useso.com/)）。我想，当遇到 googleapis 的请求时，浏览器能自动跳转到360的镜像，就能正常访问了。

正好，我以前写过一个 chrome 插件 [ReRes](https://github.com/hanan198501/ReRes)，可以通过它来完成这项工作。

安装好 ReRes 后，添加一条规则：

    If URL match：^http\:\/\/(.+?)\.googleapis\.com/(.+?)$
    Response：http://$1.useso.com/$2
    
当浏览器中的请求匹配到 ^http\:\/\/(.+?)\.googleapis\.com/(.+?)$ 这个正则时，会自动跳转到 http://$1.useso.com/$2 这个 url ，其中 $1 和 $2 分别是正则中捕获到的两个分组。

如此，就可以正常访问使用了 googleapis 的网站。