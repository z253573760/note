### 关于浏览器非激活状态

```js

setTimeout 和 setInterval 是把回调函数添加到事件循环中执行，
如果当前页面变成非激活状态（休眠） 会停止工作或者以很慢的速度工作。


解决思路：
这边解决的思路也很简单 使用HTML5新特性 worker 把定时任务交给worker线程执行，
在浏览器线程 维护一个 ID 和 callback 的 map 结构，
创建定时器的时候 创建对应的自增 ID 通信给worker线程 ，
由worker 线程完成 setInterval 和 setTimeout 再把 ID 通信给浏览器线程 ，
浏览器线程接收到 ID 后执行 map 结构中对应的callback


```

```js
import worker from "worker";
const timer = worker.setTimeout(() => console.log(1), 1000);
worker.cleanTimeout(timer);

const timer2 = worker.setInterval(() => console.log(1), 1000);
worker.cleanInterval(timer2);
```
