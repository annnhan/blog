title: 新的 JavaScript Battery API
author: 阿安
comments: true
layout: post
slug: addjs
categories: [javascript]
tags : [AddJS, chorme]
date: 2015-02-24 20:43:00+00:00
---

JavaScript Battery 接口允许你通过 JavaScript 来获取电池的状态。

**navigator.getBattery()方法**

在新的标准里，电池的状态信息是通过navigator.getBattery()方法获取的。
navigator.getBattery()是一个异步方法，会返回一个es6标准的[promise](/ecmascript6-promise/)对象。
所以我们获取电池状态的回调方法，必须通过该promise对象的then方法来注册：


    navigator.getBattery().then(function(result) {
        console.log(result);
    });


**BatteryManager接口**

上个例子里的result是一个表示电池状态的对象， 它是由BatteryManager接口实现的，具有如下属性：

<!-- more -->


    {
        charging: false,                // 是否正在充电
        chargingTime: Infinity,         // 剩余多少秒充满电。
        dischargingTime: 8940,          // 剩余多少秒放完电
        level: 0.59,                    // 电量比（当前电量/电池容量）
        onchargingchange: null,         // chargingchange事件的回调函数
        onchargingtimechange: null,     // chargingtimechange事件的回调函数
        ondischargingtimechange: null,  // dischargingtimechange事件的回调函数
        onlevelchange: null             // levelchange事件的回调函数
    }



**事件**

当电池状态发生变化时，会相应地更新charging、chargingTime、dischargingTime、level等属性的值，并触发对应的事件：

- chargingchange事件： charging属性变化时触发
- chargingtimechange事件： chargingTime属性变化时触发
- dischargingtimechange事件： dischargingTime属性变化时触发
- levelchange事件： level属性变化时触发

可以直接挂载一个事件回调函数：


    navigator.getBattery().then(function(battery) {
        console.log(battery.level);
        // ... and any subsequent updates.
        battery.onlevelchange = function() {
            console.log(this.level);
        };
    });



也可以通过addEventListener()方法监听事件：


    navigator.getBattery().then(function(battery) {
        console.log(battery.level);
        battery.addEventListener('levelchange', function() {
            console.log(this.level);
        });
    });


**demo**


    <!DOCTYPE html>
    <html>
    <head>
    <title>Battery Status API Example</title>
    <script>
        window.onload = function () {
        function updateBatteryStatus(battery) {
            document.querySelector('#charging').textContent = battery.charging ? 'charging' : 'not charging';
            document.querySelector('#level').textContent = battery.level;
            document.querySelector('#dischargingTime').textContent = battery.dischargingTime / 60;
        }

        navigator.getBattery().then(function(battery) {
            // Update the battery status initially when the promise resolves ...
            updateBatteryStatus(battery);

            // .. and for any subsequent updates.
            battery.onchargingchange = function () {
                updateBatteryStatus(battery);
            };

            battery.onlevelchange = function () {
                updateBatteryStatus(battery);
            };

            battery.ondischargingtimechange = function () {
                updateBatteryStatus(battery);
            };
        });
        };
    </script>
    </head>
    <body>
        <div id="charging">(charging state unknown)</div>
        <div id="level">(battery level unknown)</div>
        <div id="dischargingTime">(discharging time unknown)</div>
    </body>
    </html>



**参考文章:**

http://www.w3.org/TR/battery-status/

https://developer.mozilla.org/en-US/docs/Web/API/Navigator/getBattery

https://developer.mozilla.org/en-US/docs/Web/API/BatteryManager













