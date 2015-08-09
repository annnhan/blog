author: 阿安
comments: true
date: 2014-03-12 10:02:08+00:00
layout: post
slug: popup-mask-ie6-bug
title: popup组件中mask层的IE6 bug和兼容办法
wordpress_id: 1125
categories:
- CSS
tags:
- css
- iframe
---

我们在写一个popup组件时候，通常会加上一个元素作为mask层，用于遮盖住popup元素以外的页面内容。 而IE6下有个著名的bug就是select元素无法被遮盖，通常的做法，在IE6我们会在mask和和popup里面添加一个iframe来解决，一般的，iframe的css会是这样：




    

    #iframe {
        display: block;
        width: 100%;
        height: 100%;
        _filter: Alpha(opacity=0);
        position: absolute;
        top: 0px;
        left: 0px;
        z-index: -1;
    }







如果popup组件需要一个功能是：点击mask的时候，隐藏popup。 所以，我们会给mask加上click事件来完成这件事。但是，这个办法在IE6下却行不通，不管吧click添加在mask元素，还是添加到mask的iframe里面的document对象，都无法出发click事件。





由于mask只有一个iframe，而iframe里面又没有然后内容，在IE下其实我们点击mask的时候是相当于点击了mask的iframe的window里。解决的办法是在mask里面再添加一个可以被“点击”到的元素，这个元素撑满mask。这样鼠标点击这个元素时候，事件自然会冒泡的mask上，保证了在IE6下mask的click也能正常被触发。




    

    <div id="mask">
        <div style="height: 100%"></div>
        <iframe id="iframe"></iframe>
    </div>





