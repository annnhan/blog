author: 阿安
comments: true
date: 2013-09-07 04:11:00+00:00
layout: post
slug: git-use
title: git 使用笔记
wordpress_id: 979
categories:
- 工具/资源
---

公司的项目从svn迁移到git了， 只是一份简易的使用指南和笔记，不是很高深。





**下载与安装** 
OSX版：https://code.google.com/p/git-osx-installer/downloads/list?can=3 
LINUX版：http://git-scm.com/book/en/Getting-Started-Installing-Git 
WINDOWS版：https://code.google.com/p/msysgit/downloads/list?can=3





**创建新仓库** 
创建新文件夹，打开，然后执行




    
    git init





**克隆仓库** 
克隆本地仓库




    
    git clone /path/to/repository
    





克隆远程仓库




    
    git clone username@host:/path/to/repository
    





**工作流** 
本地仓库由 git 维护的三棵“树”组成。第一个是`工作目录`，它持有实际文件；第二个是`缓存区（Index）`，它像个缓存区域，临时保存改动；最后是`HEAD`，指向最近一次提交后的结果。 
![trees](/wp-content/uploads/2013/09/trees.png)





**添加与提交** 
把计划要改动的文件添加到缓存区，这样git就会跟踪改动




    
    git add filename
    





使用如下命令提交改动




    
    git commit -m "提交的信息"
    





现在，改动已经提交到了HEAD，但是还没有到达远程仓库。





**推送至远程仓库** 
把本地仓库的改动推送至远程仓库




    
    git push origin <branch>
    





如果还没有克隆现有仓库，并欲将的仓库连接到某个远程服务器，可以使用如下命令添加：




    
    git remote add origin <server>
    





如此就能够将改动推送到所添加的服务器上去了。





**分支** 
分支是用来将特性开发绝缘开来的。在创建仓库的时候，master是“默认的”。在其他分支上进行开发，完成后再将它们合并到主分支上。 
![enter image description here](/wp-content/uploads/2013/09/branches.png)
创建一个叫做“feature_x”的分支，并切换过去：




    
    git checkout -b feature_x
    





切换回主分支：




    
    git checkout master
    





再把新建的分支删掉：




    
    git branch -d feature_x
    





除非将分支推送到远端仓库，不然该分支就是不为他人所见的：




    
    git push origin <branch>
    





**更新与合并** 
要更新本地仓库至最新改动，执行：




    
    git pull
    





要合并其他分支到当前分支（例如 master），执行：




    
    git merge <branch>
    





两种情况下，git都会尝试去自动合并改动。不幸的是，自动合并并非次次都能成功，并可能导致 冲突（conflicts）。 这时候就需要修改这些文件来人肉合并这些冲突（conflicts）了。改完之后，需要执行如下命令以将它们标记为合并成功：




    
    git add <filename>
    





在合并改动之前，也可以使用如下命令查看diff信息：




    
    
    git diff <source_branch> <target_branch>
    





**标签** 
在软件发布时创建标签，是被推荐的。这是个旧有概念，在SVN中也有。可以执行如下命令以创建一个叫做 1.0.0 的标签：




    
    git tag 1.0.0 1b2e1d63ff
    





1b2e1d63ff为想要标记的提交ID的前10位字符，当然也可以是少几位，只要它是唯一的。使用如下命令获取提交ID：




    
    git log
    





**替换本地改动** 
假如做错事了，可以使用如下命令替换掉本地改动：




    
    git checkout -- <filename>
    





此命令会使用HEAD中的最新内容替换掉工作目录中的文件。已添加到缓存区的改动，以及新文件，都不受影响。 假如你想要丢弃所有的本地改动与提交，可以到服务器上获取最新的版本并将本地主分支指向到它：




    
    
    git fetch origin
    git reset --hard origin/master
    





**有用的贴士** 
内建的图形化 git：




    
    gitk
    





彩色的 git 输出：




    
    git config color.ui true
    





显示历史记录时，只显示一行注释信息：




    
    git config format.pretty oneline
    





交互地添加文件至缓存区：




    
    git add -i
    





推荐图书： Pro Git: http://www.ppurl.com/?s=Pro+Git





转自：http://rogerdudler.github.io/git-guide/index.html



