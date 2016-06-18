author: 阿安
comments: true
date: 2014-03-08 04:26:07+00:00
layout: post
slug: review-css-3d
title: 重温CSS 3D
wordpress_id: 1110
categories:
- CSS
tags:
- css3
---

最近开始折腾一些CSS3的东西，发现以前走马观花看过的CSS 3D相关的属性几乎忘记的差不多了，今天就来通过一个小立方体的效果来温习下：


首先，我们来实现HTML布局，用一个div#arana作为“展台元素”，存放整个立方体容器div#box，div#box里面有6个子节点div.face，代表这个立方体的6个面。




    

    <div id="arena">
        <div id="box">
            <div class="face">1</div>
            <div class="face">2</div>
            <div class="face">3</div>
            <div class="face">4</div>
            <div class="face">5</div>
            <div class="face">6</div>
        </div>
    </div>







最外层的div#arena的作用类似于一个“展台”，我们可以想象，在“展台”上，我们需要拜访一台摄像机，来拍摄这个立方体。那么，这个摄像机，我们称之为“视点”，视点和立方体的距离，就是div#arana的-webkit-perspective属性值， 它和我们在画画的时候“透视点”的概念有点像，只不过，“透视点”在屏幕的后方，而“视点”在屏幕的前方。在立方体旋转，偏移的时候，我们还需要知道一个“基点”，3D变换的元素， 都会基于这个点来变化，“基点”通过-webkit-perspective-origin属性来定义，的默认值是50% 50%，分别代表“基点”距离元素本身左边和顶部的距离。





    #arena {
        -webkit-perspective: 400;
        -webkit-perspective-origin: 50% 50%;
    }







第二个容器div#box实际上就是我们的立方体，通过-webkit--transition属性，定义了立方体在变化时候的过度动画效果。-webkit-transform-style属性用于定义3d元素的透视效果，它有2个值：其两个参数，flat|preserve-3d. 前者flat为默认值，表示平面的；后者preserve-3d表示3D透视。这个属性应该用在作为立方体的容器元素上，而不是它里面的6个作为6个面的子元素。





    #box {
        position: relative;
        margin: 100px auto;
        height: 200px;
        width: 200px;
        -webkit-transition: -webkit-transform 2s linear;
        -webkit-transform-style: preserve-3d;
    }







定义6个“面”元素共同的普通css属性，注意，这里通过position: absolute使6面的“基点”位置保持一致。





    .face {
        color: #FFF;
        font-size: 30px;
        font-weight: bold;
        position: absolute;
        background: rgba(50, 50, 50, 0.7);
        width: 160px;
        height: 160px;
        padding: 20px;
        border: 1px solid #333;
    }







通过-webkit-transform属性分别设置六个面的偏移和旋转位置，使其刚好围成一个立方体。-webkit-transform属性有多种方法（函数），rotateX()、rotateY()、rotateZ()分别用于设置元素基于XYZ轴的旋转角度。translateX()、translateY()、translateZ()则分别用于设置元素偏离XYZ轴的距离。





    .face:nth-child(1) {-webkit-transform: translateZ(100px);}
    .face:nth-child(2) {-webkit-transform: rotateY(90deg) translateZ(100px);}
    .face:nth-child(3) {-webkit-transform: rotateY(180deg) translateZ(100px);}
    .face:nth-child(4) {-webkit-transform: rotateY(270deg) translateZ(100px);}
    .face:nth-child(5) {-webkit-transform: rotateX(90deg) translateZ(100px);}
    .face:nth-child(6) {-webkit-transform: rotateX(270deg) translateZ(100px);}







最后，我们通过js绑定keyup事件，来改变div#box的-webkit-transform值来达到旋转的目的。





    var xAngle = 0, yAngle = 0;
    document.addEventListener('keydown', function(e){
        switch (e.keyCode) {
            case 65: // left
                yAngle -= 90;
                break;
            case 87: // up
                xAngle += 90;
                break;
            case 68: // right
                yAngle += 90;
                break;
            case 83: // down
                xAngle -= 90;
                break;
        };
        var box = document.getElementById('box');
        box.style.webkitTransform = "rotateX("+xAngle+"deg) rotateY("+yAngle+"deg)";
    }, false);





