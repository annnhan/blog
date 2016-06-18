title: 在 fis 项目中使用 react.js
author: 阿安
comments: true
layout: post
slug: domain-change
categories: [javascript]
tags : [fis, react, javascript]
date: 2015-8-23 15:24:00+00:00
---

fis 具有非常灵活的插件扩展机制，对于 react 的 jsx 也有现成的 parser 插件可用。
通过几条简单的配置，就可以在你的 fis 项目中使用 react 了。 但是在使用过程中，有一些小坑还是需要注意的，在此记录一下。

## 安装插件

    npm install fis-parser-react -g

注意，如果你使用的 react 版本是 0.13.x， 则要安装另一个版本的插件：

    npm install fis-parser-react-0.13.x -g

## 编译配置

编辑 fis-conf.js 文件， 加入以下内容：

    // 将 jsx 文件作为文本处理
    fis.config.set('project.fileType.text', 'jsx');

    // 后缀名为 jsx 的文件用 fis-parser-react 插件编译
    // 如果你使用的 react 版本是 0.13.x，将下面第二个参数换成 'react-0.13.x'
    fis.config.set('modules.parser.jsx', 'react');

    // 将 jsx 文件编译结果输出为 js 文件
    fis.config.set('roadmap.ext.jsx', 'js');

## 模块化配置

默认情况，fis 不会将 widget 目录下的 jsx 文件包裹成 cmd 模块， 而是直接输出编译后的 js 文件。
但是我们更希望遵循 fis 的目录规范，将 widget 目录下的 jsx 文件也输出为 module， 所以我们还需要配置一下 roadmap.path。
编辑 fis-conf.js 文件， 加入以下内容：

    fis.config.set('roadmap.path', [{
        reg: /^\/widget\/(.*)\.jsx$/i,
        useMap: true,
        useHash: true,
        isMod: true,
        release: '${statics}/${namespace}/widget/$1.js'
    }].concat(fis.config.get('roadmap.path', [])));

最后执行 fis release 就可以看到所有的 jsx 都可以被正确编译和引用到了~
