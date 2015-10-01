title: 使用 javascript 配置 nginx
author: 阿安
comments: true
layout: post
slug: addjs
categories: [javascript]
tags : [javascript, nginx]
date: 2015-10-01 15:33:41
---

在上个月的 nginx.conf 2015 大会上， 官方宣布已经支持通过 javascript 代码来配置 nginx，并把这个实现称命名为——nginscript。使用 nginscript，可以很轻易得在 niginx 配置文件中通过 js 语法来实现自定义的服务器配置。

## 安装

    # 下载最新版本的 nginx 并解压
    curl -O http://nginx.org/download/nginx-1.9.5.tar.gz
    tar -xzvf nginx-1.9.5.tar.gz
    
    # 下载 nginscript 模块并解压
    curl -O http://hg.nginx.org/njs/archive/tip.tar.gz
    tar -xzvf tip.tar.gz
    
    # 编译并安装 nginx
    $ cd nginx-1.9.5
    $ ./configure --add-module=刚才解压的nginscript目录
    $ make
    $ make install
    
<!-- more -->    
    
## 在 nignx.conf 中使用 nginscript   

### 定义变量

使用 js_set 指令可以通过 javascript 代码来定义一个变量：
    
    js_set $msg "
       var m = 'Hello ';
       m += 'world!';
       m;
    ";
    
这些变量可以被其他的 nginx 指令使用：
    
    location /hello {
        add_header Content-Type text/plain;
        return 200 $msg;
    }
    
### 执行 javascript 代码片段
    
使用 js_run 指令可以执行指定的 javacript 代码：
    
    location /hello {
        js_run "
            var res;
            res = $r.response;
    
            res.contentType = 'text/plain';
            res.status = 200;
            res.sendHeader();
    
            res.send( 'Hello, world!' );
            res.finish();
        ";
    }
    
### 请求对象
    
在 javascript 代码中可以通过 $r 变量来获取到请求对象，请求方相关信息都会保存在这个变量上：
    
    js_set $summary "
        var a, s, h;

        s = 'Request summary\n\n';

        s += 'Method: ' + $r.method + '\n';
        s += 'HTTP version: ' + $r.httpVersion + '\n';
        s += 'Host: ' + $r.headers.host + '\n';
        s += 'Remote Address: ' + $r.remoteAddress + '\n';
        s += 'URI: ' + $r.uri + '\n';

        s += 'Headers:\n';
        for (h in $r.headers) {
            s += '  header \"' + h + '\" is \"' + $r.headers[h] + '\"\n';
        }

        s += 'Args:\n';
        for (a in $r.args) {
            s += '  arg \"' + a + '\" is \"' + $r.args[a] + '\"\n';
        }

        s;
    ";
    
### response 响应对象

在 javascript 代码中可以通过 $r.response 来获取到响应对象，用于设置响应内容：

    js_run "
        var res = $r.response;
    
        res.contentType = 'text/plain';
        res.status = 200;
        res.sendHeader();
    
        res.send( 'Hello, world!' );
        res.finish();
    ";
    
### nginscript 与 javascript 的区别
    
nginscript 不是完整的 javacript，它只是是实现了一个 ECMAScript 的一个子集， 为了追求效率， 许多 javascript 的内置对象在 nginscript 中并没有实现。我尝试使用了一下 Date、JSON 等对象，都还没有实现。

这便是几乎所有的 nginscript 知识，是不是很简单，虽然没有实现完整的 EMCAScript 规范，但是对于配置 nginx 来说，个人感觉也够用了。


    
    
    