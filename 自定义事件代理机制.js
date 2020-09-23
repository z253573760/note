// 需求描述：
// 在谷歌插件中利用BG主线程与服务端建立socket链接进行通信
// 对指定的标签页进行一系列的业务操作
// 并且监测业务操作的执行情况通信给服务端
// 方案:实现了一个任务队列 HandlerEventQueue
// 创建一个 warcher 作为观察者去 观察这个任务队列的各种属性的变化

/**
 * 事件处理  接受一个队列 按顺序执行队列中的事件
 * @param {Array [Function]} steps
 */
class HandlerEventQueue {
  constructor(queue = [], time = 500) {
    this.time = time; // 时间间隔
    this.queue = [...queue]; // 完整的任务队列
    this.isGoing = false; // 当前任务的执行状态  空闲 忙碌
    this.cache = [...this.queue]; // 剩余任务队列
  }
  /**
   * 在原来的任务队列中添加新的任务队列 并且执行
   * @param {Array Function} queue
   */
  add(queue) {
    this.queue.push(...queue);
    this.cache.push(...queue);
    if (this.isGoing) return;
    this.isGoing = true;
    this.continue();
  }
  async start() {
    if (this.isGoing) return;
    if (!this.cache.length) return;
    this.isGoing = true;
    while (this.isGoing && this.cache.length) {
      await new Promise((r) => setTimeout(r, this.time));
      const cb = this.cache.shift();
      await cb();
    }
    this.isGoing = false;
  }
  suspend() {
    this.isGoing = false;
  }
  async continue () {
    this.isGoing = true;
    while (this.isGoing && this.cache.length) {
      await new Promise((r) => setTimeout(r, this.time));
      const cb = this.cache.shift();
      await cb();
    }
    this.isGoing = false;
  }
  stop() {
    this.isGoing = false;
    this.queue = [];
    this.cache = [];
  }
  /**
   * 废弃 更换成vue3 proxy 的方式 去观察
   */
  static watch(target, key, cb) {
    let value = target[key];
    Object.defineProperty(target, key, {
      get() {
        return value;
      },
      set(newVal) {
        if (newVal === value) return;
        value = newVal;
        cb(target, newVal);
      },
    });
  }
}

function isObject(target) {
  return typeof target === "object" && target !== null;
}

/**
 * 响应式
 * @param {Object} target 被代理的对象
 * @param {Function} trigger 触发更新的钩子
 */
function reactive(target) {
  if (!isObject(target)) {
    return target;
  }
  return new Proxy(target, {
    get(target, propKey, receiver) {
      const res = Reflect.get(target, propKey, receiver);
      return reactive(res);
    },
    set(target, propKey, value, receiver) {
      let oldValue = target[propKey];
      if (value === oldValue)
        return Reflect.set(target, propKey, value, receiver);
      trigger(target, propKey, value, oldValue); // 当数据被更改 触发钩子
      return Reflect.set(target, propKey, value, receiver);
    },
  });
}

function trigger(target, propKey, value, oldVal) {
  const res = watchWeakMap.get(target);
  res && res[propKey] && res[propKey](value, oldVal, target, propKey);
}
const watchWeakMap = new WeakMap();

function watch(key, cb, target = eventQueue) {
  const list = key.split(".");
  if (list.length > 1) {
    const _key = list.shift();
    const _target = target[_key];
    watch(list.join("."), cb, _target);
    return;
  }
  const res = watchWeakMap.get(target);
  if (!res) {
    watchWeakMap.set(target, {
      [key]: cb,
    });
  } else {
    watchWeakMap.set(target, {
      ...res,
      [key]: cb,
    });
  }
}
// const ref = (obj) =>
//   reactive(obj);

// demo
// 打印1-20
const steps = Array.from({
    length: 20,
  },
  (_, k) => (a = "xxx") => console.log(this, k, a)
);

//创建一个任务队列
const eventQueue = new HandlerEventQueue(steps);
//给这个任务队列添加观察者
const countOff = reactive(eventQueue);

//观察任务队列的执行状态
watch("isGoing", (value, oldvalue) => {
  console.log("isGoing=>执行改变", value, value ? "忙碌" : "空闲");
});
//观察任务队列的任务长度
watch("cache.length", (value) => {
  console.log("cache.length  => 剩余任务数量", value);
});

async function main() {
  countOff.start();
  countOff.isGoing = true;
  countOff.isGoing = true;
  countOff.isGoing = true;
  countOff.isGoing = true;
  await new Promise((r) => setTimeout(r, 2000));
  countOff.suspend();
  await new Promise((r) => setTimeout(r, 2000));
  countOff.continue();
  countOff.add(steps.map((_) => _.bind(null, "cccc")));
}
main();