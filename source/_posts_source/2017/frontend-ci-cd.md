title: 前端开发如何让持续集成/持续部署(CI/CD)跑起来
author: 阿安
comments: true
layout: post
slug:  frontend-ci-cd
categories: [javascript]
tags : [CD, CD, gitlab, jenkins]
date: 2017-05-03
---

近几年，伴随着前端技术日新月异的发展，前端开发中前后端分离，工程化，自动化等现代化的开发模式越来普及，前端项目也引入了编译，构建，单元测试等现代软件工程化的标准环节。这样大提高了前端的开发效率和业务交付能力。但是，在代码集成，项目部署阶段，我们还需要引入 [CI](https://en.wikipedia.org/wiki/Continuous_integration) / [CD](https://en.wikipedia.org/wiki/Continuous_delivery) 等现代化的软件开发实践，来减少风险，重复过程，节省我们的时间。

我们废话少说，这里不再对 持续集成/持续部署(CI/CD) 的概念做过多赘述，本文主要分享一下如何基于 [gitlab](https://about.gitlab.com/) 、 [jenkins](https://jenkins.io/) 让 CI/CD 跑起来。

其中：
- gitlab 用于代码版本管理，并通过其提供的 webhook 功能，触发 jenkins job 的运行。
- jenkins 用来执行项目中 单元测试，编译打包相关 npm 命令，并发送反馈邮件，执行远程部署脚本。
- nodejs 用于提供单元测试，编译打包功能的 npm 命令

在我们的前端项目里（如： [https://github.com/hanan198501/vue-spa-template](https://github.com/hanan198501/vue-spa-template) ），一般使用 karma 来运行单元测试，使用 webpack 来进行打包构建， 使用 npm script 来执行这些任务，其中我们的 package.json 的 scripts 字段就有如下：

    "dev": "node build/dev-server.js",
    "build": "node build/build.js", //打包构建
    "build-server": "node build/build-server.js",
    "unit": "karma start test/unit/karma.conf.js --single-run", // 运行单元测试

### 如果没有 CI/CD， 我们的前端从开发到提测工作流程可能如下：

1. 本地机器上写代码
2. 在命令行输入 npm run unit，查看单元测试结果
3. 提交代码，push 到 git 远程仓库
4. 登录测试服务器，拉取代码，执行 npm run build，构建项目
5. 如果测试服务器是基于 pm2 的 proxy server，还需要重启 server

这个流程中，每一个步骤都要重复人工操作，很大增加了时间成本，不能保证操作的准确性。对于 unit 或者 build 的结果，没有一个自动的反馈机制，需要人工 check 运行结果，最后部署也是人工登录服务器执行脚本，非常繁琐。

### 引入 CI/CD 以后，整个流程变成：

1. 本地机器上写代码
2. 提交代码，push 到 git 远程仓库
3. git hook 触发 jenkins 的构建 job （自动）
4. jenkins job 中拉取项目代码，运行 npm run unit 和 npm run build，如果失败，发送邮件通知相关人。（自动）
5. jenkins job 中执行测试服务器的部署脚本 （自动）

在 CI/CD 流程中，只有步骤1和步骤2需要人工操作，其他步骤都是自动运行，是一个非常标准化的流程，减少了人工操作的风险，省去了重复性工作，增强了项目的可见性。接下来我们将通过配置 jenkins 和 gitlab webhook 来实现这个流程。

<!-- more -->

### 配置项目的 jenkins job

首先，在 jenkins 中需要安装 [Gitlab Hook Plugin](https://wiki.jenkins-ci.org/display/JENKINS/Gitlab+Hook+Plugin) 这个插件，以支持 gitlab 的 webhook 功能。

1. 在 jenkins 左边栏点击 "新建"， 输入 job 名称，选择 "构建一个自由风格的软件项目" 一项。点击 "OK"
![](/assets/img/ci-cd-creact-job.png)

2. 进入 job 配置页面，点击 "General" 选项，配置名称和描述
![](/assets/img/ci-cd-job-general.png)

3. 点击 "源码管理" 选项，配置项目的 git 仓库地址的需要构建的分支信息
![](/assets/img/ci-cd-job-code.png)

4. 点击 "构建触发器" 选项，配置 job 构建时机，勾选 "Poll SCM"，"日程表" 留空。即可通过 gitlab webhook 来触发 job 构建
![](/assets/img/ci-cd-job-trigger.png)

5. 点击 "构建" 选项，再点击 "增加构建步骤"， 选择 "Execute shell"，配置构建命令。 如下，这里配置了 `cnpm install`、`npm run unit`、`npm run build`, 分别做安装依赖、单元测试、编译打包三件事。
![](/assets/img/ci-cd-job-build.png)

6. 点击 "构建后操作" 选项，添加两个构建后操作步骤：
    - "E-mail Notification"，配置构建失败的邮件通知人；
    - "Send build artifacts over ssh", 执行预先写好的远程服务器的部署脚本
![](/assets/img/ci-cd-job-after.png)

7. 点击最下方的 "保存"，job 创建完毕。

### 配置 gitlab webhook

进入项目的 gitlab 页面 >> Settings >> Integrations , 添加一条 webhook: URL 中输入"http://你的jenkins服务器host/gitlab/build_now"， Trigger 勾选Push events，点击 "Add webhook"。
![](/assets/img/ci-cd-gitlab-webhook.png)

这样，当有代码 push 到git 仓库时，gitlab 会想 jenkins 服务器发送提交 post 请求，触发之前创建好的 jenkins job 运行, 代码从开发到部署测试，是一个持续的过程，同时对整个过程错误提供了反馈机制。

从此，前端开发再也不用关心代码 push 以后的事情，写代码更加专注和自信了！！**
