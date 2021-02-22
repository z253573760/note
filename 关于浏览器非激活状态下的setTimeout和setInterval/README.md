### 关于浏览器非激活状态

- setTimeout 和 setInterval 是把回调函数添加到事件循环中执行，
- 如果当前页面变成非激活状态（休眠） 会停止工作或者以很慢的速度工作。

- 解决思路：
- 这边解决的思路也很简单 使用 HTML5 新特性 worker,
- 把定时任务交给 worker 线程执行，
- 在浏览器线程 维护一个 id 和 callback 的 map 结构，
- 创建定时器的时候 创建对应的自增 id 通信给 worker 线程，
- 由 worker 线程完成 setInterval 和 setTimeout 再把 id 通信给浏览器线程，
- 浏览器线程接收到 id 后执行 map 结构中对应的 callback

```js
import workerTime from "workerTime";
const timer = workerTime.setTimeout(() => console.log(1), 1000);
workerTime.cleanTimeout(timer);

const timer2 = workerTime.setInterval(() => console.log(1), 1000);
workerTime.cleanInterval(timer2);
```
