### 关于浏览器非激活状态

```js
setTimeout 和 setInterval 是把回调函数添加到事件循环中执行
如果当前页面变成非激活状态（休眠） 会停止工作或者以很慢的速度工作
使用HTML5新特性 worker
```
