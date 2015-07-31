---
author: 阿安
comments: true
date: 2013-05-06 16:07:21+00:00
layout: post
slug: javascript-image-blending-algorithm
title: 图像混合（溶图）算法的javascript实现
wordpress_id: 891
categories:
- HTML5/CSS3
- JavaScript
- 工具/资源
tags:
- algorithm
- blending
- image
- JavaScript
---

![变暗](/wp-content/uploads/2013/05/变暗.jpg)





photoshop中的图层混合功能大家一定很熟悉。此功能可以根据指定模式，将2个图层进行混合，实现不同色彩风格的图像效果，也就是我们通常所说的溶图。 实现图像混合的原理其实很简单，就是将两张图像的重叠，分别取相同位置的两个像素点上的RGB值，通过特定的公式计算出新的RGB值，这样，不公的公式，将产生不同的色彩效果。利用canvas提供的api，我们可以在支持canvas的浏览器上实现图像混合，例如，以下代码将实现上图“变暗”的效果：




    {% highlight javascript %}
    //传入2个canvas
    function blend (cv1, cv2) {
        var c2d1 = cv1.getContext('2d');
        var c2d2 = cv2.getContext('2d');
        var imgData1 = c2d1.getImageData(0, 0, cv1.width, cv1.height);
        var data1 = imgData1.data;
        var data2 = c2d2.getImageData(0, 0, cv2.width, cv2.height).data;

        //计算函数，传入2个RGB对象进行计算
        var darken = function (a, b) {
            var r = {};
            for (var i in a) {
                r[i] = a[i] < b[i] ? a[i] : b[i]; //变暗效果公式
            }
            return r;
        }

        //遍历像素点
        for (var i = 0, len = data1.length; i < len; i += 4) {

            //计算新的RGB
            var newRGB = darken(
                {r: data1[i], g: data1[i + 1], b: data1[i + 2]},
                {r: data2[i], g: data2[i + 1], b: data2[i + 2]}
            );

            //覆盖掉data1
            data1[i] = newRGB.r;
            data1[i + 1] = newRGB.g;
            data1[i + 2] = newRGB.b;
        }

        //将新的像素数据写入canvas
        c2d1.putImageData(imgData1, 0, 0);

        //返回生成的图像url
        return cv1.toDataURL('image/png');
    }
    {% endhighlight %}






假设a[i]代表第一个像素点的RGB值中的一个值，相对应于b[i]（代表另一个像素点的RGB值中的一个值），变暗效果的公式是a[i] < b[i] ? a[i] : b[i]，这个公式很简单，就是比较2个值得大小。



<!-- more -->



除此之外，还有其他效果的算法可以供我们使用：





**排除**




    
    a[i] + b[i] - 2 * a[i] * b[i] / 255
    





![排除](/wp-content/uploads/2013/05/排除.jpg)





**差值**




    
    Math.abs(a[i] - b[i])
    





![差值](/wp-content/uploads/2013/05/差值.jpg)





**实色混合**




    
    (b[i] < 128 ?
        (b[i] == 0 ? 2 * b[i] : Math.max(0, (255 - ((255 - a[i]) << 8 ) / (2 * b[i])))) 
    :
        ((2 * (b[i] - 128)) == 255 ? (2 * (b[i] - 128)) : Math.min(255, ((a[i] << 8 ) / (255 - (2 * (b[i] - 128)) )))))
        < 128 ? 
            0 : 255;
    





![实色混合](/wp-content/uploads/2013/05/实色混合.jpg)





**点光**




    
    Math.max(0, Math.max(2 * b[i] - 255, Math.min(b[i], 2 * a[i])))
    





![点光](/wp-content/uploads/2013/05/点光.jpg)





**线性光**




    
    Math.min(255, Math.max(0, (b[i] + 2 * a[i]) - 1))
    





![线性光](/wp-content/uploads/2013/05/线性光.jpg)





**亮光**




    
    b[i] < 128 ?
        (b[i] == 0 ? 2 * b[i] : Math.max(0, (255 - ((255 - a[i]) << 8 ) / (2 * b[i])))) 
    :
        ((2 * (b[i] - 128)) == 255 ? (2 * (b[i] - 128)) : Math.min(255, ((a[i] << 8 ) / (255 - (2 * (b[i] - 128)) ))))
    





![亮光](/wp-content/uploads/2013/05/亮光.jpg)





**强光**




    
    (a[i] < 128) ? (2 * a[i] * b[i] / 255) : (255 - 2 * (255 - a[i]) * (255 - b[i]) / 255)
    





![强光](/wp-content/uploads/2013/05/强光.jpg)





**柔光**




    
    b[i] < 128 ? 
        (2 * (( a[i] >> 1) + 64)) * (b[i] / 255) 
    : 
    (255 - ( 2 * (255 - ( (a[i] >> 1) + 64 ) ) * ( 255 - b[i] ) / 255 ))
    





![柔光](/wp-content/uploads/2013/05/柔光.jpg)





**叠加**




    
    (b[i] < 128) ? (2 * a[i] * b[i] / 255) : (255 - 2 * (255 - a[i]) * (255 - b[i]) / 255)
    





![叠加](/wp-content/uploads/2013/05/叠加.jpg)





**线性减淡**




    
    Math.min(255, (a[i] + b[i]))
    





![线性减淡](/wp-content/uploads/2013/05/线性减淡.jpg)





**颜色减淡**




    
    (b[i] == 255) ? b[i] : Math.min(255, ((a[i] << 8 ) / (255 - b[i])))
    





![颜色减淡](/wp-content/uploads/2013/05/颜色减淡.jpg)





**滤色**




    
    255 - (((255 - a[i]) * (255 - b[i])) >> 8)
    





![滤色](/wp-content/uploads/2013/05/滤色.jpg)





**变亮**




    
    (b[i] > a[i]) ? b[i] : a[i]
    





![变亮](/wp-content/uploads/2013/05/变亮.jpg)





**线性加深**




    
    (a[i] + b[i] < 255) ? 0 : (a[i] + b[i] - 255)
    





![线性加深](/wp-content/uploads/2013/05/线性加深.jpg)





**颜色加深**




    
    b[i] == 0 ? b[i] : Math.max(0, Math.max(0, (255 - ((255 - a[i]) << 8 ) / b[i])))
    





![颜色加深](/wp-content/uploads/2013/05/颜色加深.jpg)





**正片叠底**




    
    a[i] * b[i] / 255
    





![正片叠底](/wp-content/uploads/2013/05/正片叠底.jpg)





demo：[http://cssha.com/imageblend/](http://cssha.com/imageblend/)





参考文章：http://jswidget.com/blog/category/photoshop/



