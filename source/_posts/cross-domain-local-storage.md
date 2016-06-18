title: 基于 postMessage 和 localStorage 的跨域本地存储方案
author: 阿安
comments: true
layout: post
slug: cross-domain-local-storage
categories: [javascript]
tags : [cross, domain, local, postMessage, storage]
date: 2014-09-07 20:38:00+00:00
---

HTML5 的 postMessage 为解决跨域页面通信提供了一套可控的机制， 而 localStorage 则提供了易用简洁的本地存储方案？ 
这两者结合起来，能否实现跨域本地存储呢 ？

答案是可以的。假设有 a.com 和 b.com 两个页面。我们想通过 a 页面去修改 b 页面的本地数据。 我们需要做如下步奏：

- 在 a 页面创建一个 iframe ，嵌入 b 页面
- a 页面通过 postMessage 传递指定格式的消息给 b 页面
- b 页面解析 a 页面传递过来的消息内容，调用localStorage API 操作本地数据
- b 页面包装 localStorage 的操作结果，并通过 postMessage 传递给 a 页面
- a 页面解析 b 页面传递回来的消息内容，得到 localStorage 的操作结果

整个过程如下图：

<img style="mergin:5px;" src="/assets/img/cross-localstorage.png" alt="">

<!-- more -->

OK，清楚了整个过程，我们就可以封装出相应的组件：CSClient.js 和 csHub.js，来完成这个过程，下面我们来简单实现一下。

先来看CSClient.js，作用于 a 页面，用于创建跨域存储实例，它提供了 get、set、del 这三个方法来操作跨域的数据：


        function CSClient(url) {
            this.id = this._getId();
            this._init(url);
            this._origin = this._getOrigin(url);
            this._callbacks = {
                _get: {},
                _set: {},
                _del: {}
            }
            this._bindEvent();
        }

        CSClient.prototype._getId = function () {
            id = 0;
            return function () {
                return ++id;
            }
        }();

        CSClient.prototype._init = function (url) {
            var frame = document.createElement('iframe');
            frame.style.display = 'none';
            frame.src = url;
            document.body.appendChild(frame);
            this._hub = frame.contentWindow;
        }

        CSClient.prototype._getOrigin = function(url) {
            var uri, origin;
            uri = document.createElement('a');
            uri.href = url;
            origin = uri.protocol + '//' + uri.host;
            return origin;
        };

        CSClient.prototype._parseMessage = function (method, key, value) {
            return JSON.stringify({
                method: method,
                key: key,
                value: value
            });
        }


        CSClient.prototype._bindEvent = function () {
            var _this = this;
            window.addEventListener('message', function (event) {
                var data = JSON.parse(event.data);
                var error = data.error;
                var result = data.result  && JSON.parse(data.result) || null;
                try {
                    _this._callbacks['_' + data.method][data.key](error, result);
                }
                catch (e){
                    console.log(e);
                }
            }, false);
        }

        CSClient.prototype.get = function (key, callback) {
            this._hub.postMessage(this._parseMessage('get', key), this._origin);
            this._callbacks._get[key] = callback;
        }

        CSClient.prototype.set = function (key, value, callback) {
            this._hub.postMessage(this._parseMessage('set', key, value), this._origin);
            this._callbacks._set[key] = callback;
        }

        CSClient.prototype.del = function (key, callback) {
            this._hub.postMessage(this._parseMessage('del', key), this._origin);
            this._callbacks._del[key] = callback;
        }


使用方法如下：


        var key = document.querySelector('#key');
        var value = document.querySelector('#value');
        var btn = document.querySelectorAll('button');
        var storage = new CSClient('http://b.com');

        btn[0].onclick = function (e) {
            storage.get(key.value, function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log(result);
            })
        }

        btn[1].onclick = function (e) {
            storage.set(key.value, value.value, function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('set ok');
            })
        }

        btn[2].onclick = function (e) {
            storage.del(key.value, function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
                console.log('del ok');
            })
        }



接着看 csHub.js，作用于 b 页面，用于设置跨域存储的权限、接受 client 的消息、操作本地数据。只有拥有权限的 origin ，才能操作本页面的本地数据。


        var csHub = window.csHub = {
            init: function (origin) {
                this.originRule = origin;
            },

            get: function (key) {
                return JSON.stringify(window.localStorage.getItem(key));
            },

            set: function (key, value) {
                window.localStorage.setItem(key, JSON.stringify(value));
            },

            del: function (key) {
                window.localStorage.removeItem(key);
            }
        };

        window.addEventListener('message', function (event) {
            var message = JSON.parse(event.data), result, err = null;
            if (csHub.originRule.test(event.origin)) {
                try {
                    result = csHub[message.method](message.key, message.value);
                }
                catch (e) {
                    err = {
                        message: e.message,
                        stack: e.stack
                    };
                }
                window.parent.postMessage(JSON.stringify({
                    error: err,
                    method: message.method,
                    key: message.key,
                    result: result
                }), event.origin);
            }
        }, false);


使用方法如下：


        csHub.init(/a.com$/);


以上代码都比较简单， 主要为了演示如何实现跨域存储。如果你想在项目中使用此方案。推荐使用[https://github.com/zendesk/cross-storage](https://github.com/zendesk/cross-storage)这个库。
这个库实现了更灵活的权限机制，使用 ES6 的 promises 规范简化了操作接口， 并对浏览器的差异化做了处理，兼容到了 ie8+ 与其他现代浏览器。