### 关于浏览器非激活状态

setTimeout 和 setInterview 是把回调函数添加到事件循环中 执行 如果当前页面 变成非激活状态的话 可能队列中会有若干个事件等待执行 等到页面切换成激活状态时 一口气执行完 这种情况怎么处理

参考 https://github.com/turuslan/HackTimer 和 http://www.ruanyifeng.com/blog/2018/07/web-worker.html
