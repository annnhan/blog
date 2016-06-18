title: 如何实现一个ECMAScript 6 的promise补丁
author: 阿安
comments: true
layout: post
slug: ECMAScript6-promise
categories: [javascript]
tags : [ecmascript, promise, javascript]
date: 2014-06-04 20:38:00+00:00
---

Promise最先是CommonJS工作组提出的一种规范之一，目的是为了解决js异步编程过程中，回调嵌套过深的问题。ECMAScript 6 规范化了Promise对象的语言接口，使其成了js的原生对象之一。

如果你还不了解ECMAScript 6 中的Promise对象，建议阅读<a href="http://es6.ruanyifeng.com/#docs/promise" target="_blank">http://es6.ruanyifeng.com/#docs/promise</a>。ECMAScript 6 中的Promise对象与一些常用的promise库（如jquery，when.js）中的实现略有不同，本文讨论的实现，以ECMAScript 6 为准。
下面，我们来一起学习，如何在不支持ES6的浏览器上简单实现Promise，如有不对的地方，还请多多指正。


#### 首先，我们来看看Promise构造函数。


    var Promise = function (fun) {
            var me = this,
                resolve = function (val) {
                    me.resolve(val);
                },
                reject = function (val) {
                    me.reject(val);
                }
            me._st = 'pending';
            me._rsq = null;
            me._rjq = null;
            (typeof fun === 'function') && fun(resolve, reject);
        },
        fn = Promise.prototype;


构造函数接受一个异步的回调函数，并调用，回调函数的2个参数，分别为异步操作成功和失败时候要调用的改变Promise实例状态的方法。
\_st用于存放当前实例的状态，初始值为"pending"，异步操作成功为"resolve"，失败为"reject"。\_rsq用于存放异步操作成功的回调，\_rjq用于存放异步操作失败的回调。
同时，把Promise.prototype挂在变量fn上，接下我们只要给fn添加方法就可以了。

<!-- more -->


#### .then和.catch方法



    fn.then = function (resolve, reject) {
        var pms = new Promise();
        this._rsq = function (val) {
            var ret = resolve ? resolve(val) : val;
            if (ret instanceof Promise) {
                ret.then(function (val) {
                    pms.resolve(val);
                });
            }
            else{
                pms.resolve(ret);
            }
        };
        this._rjq = function (val) {
            pms.reject(reject(val));
        };
        return pms;
    }
    fn.catch = function (reject) {
        return this.then(null, reject);
    }


.then方法接受2个参数，成功回调和失败回调。then方法内部new了一个新的Promise对象pms并返回，从而实现链式调用。
并且给实例的\_rsq和\_rjq分别挂了2个函数，是成功和失败的回调函数的调用，并把返回值传给pms的resolve和reject方法，这样我们就完成了参数的传递功能。
注意，成功回调函数可能也会返回一个promise对象，因此，我们要对此情况做而外处理，给它新挂一个then调用，用于触发pms的成功回掉。
而.catch方法只是.then(null, reject)的一个别名，内部调一下即可。


#### .resolve和.reject方法


    fn.resolve = function (val) {
        if (this._st === 'resolved' || this._st === 'pending') {
            this._st = 'resolved';
            this._rsq && this._rsq(val);
        }
    }

    fn.reject = function (val) {
        if (this._st === 'rejected' || this._st === 'pending') {
            this._st = 'rejected';
            this._rsq && this._rjq(val);
        }
    }


    .resolve方法接受一个参数，为上个回调函数的返回值，或者是上个异步操作函数的reslve函数的参数值。如果实例的状态为resolved或者pending的时候，才调用.\_rsq方法。
    .reject同理。


    #### Promise.all静态方法


    Promise.all = function (arr) {
        var pms = new Promise();
        var len = arr.length,
            i = 0,
            res = 0;
        while (i < len) {
            arr[i].then(
                function () {
                    if (++res === len) {
                        pms.resolve();
                    }
                },
                function (val) {
                    pms.reject(val);
                }
            );
            i++;
        }
        return pms;
    }


Promise.all接受一个有promise对象的数组，并内部new了一个promise对象pms返回。当数组中所有的对象状态都成功的时候，执行pms.resolve()，即返回的promise对象状态变成resloved，
若数组有一个失败，则pms.reject(val)。


#### Promise.resolve静态方法，这个好像没啥好讲的。


    Promise.resolve = function (obj) {
        var pms = new Promise();
        if (obj && typeof obj.then === 'function') {
            for (var i in pms) {
                obj[i] = pms[i];
            }
            return obj;
        }
        else {
            setTimeout(function () {
                pms.resolve(obj);
            });
            return pms;
        }
    }


完整的代码，我放在[https://github.com/hanan198501/promise](https://github.com/hanan198501/promise)了，大家可以上去看看，也欢迎关注我的github。






