/**
 * 事件处理  接受一个队列 按顺序执行队列中的事件
 *
 */
class HandlerEventQueue {
  constructor(queue = [], name = "未命名事件", time = 500) {
    this.time = time;
    this.name = name;
    this.queue = [...queue];
    this.isGoing = false;
    this.cache = [...this.queue];
  }
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
  async continue() {
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

const steps = Array.from(
  {
    length: 20,
  },
  (v, k) => (a = "xxx") => console.log(this, k, a)
);

function isObject(target) {
  return typeof target === "object" && target !== null;
}

function reactive(target, track) {
  if (!isObject(target)) {
    return target;
  }
  return new Proxy(target, {
    get(target, propKey, receiver) {
      const res = Reflect.get(target, propKey, receiver);
      return reactive(res, track);
    },
    set(target, propKey, value, receiver) {
      track(target, propKey, value, receiver);
      return Reflect.set(target, propKey, value, receiver);
    },
  });
}

// 报数 打印1-20

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
const ref = (obj) =>
  reactive(obj, (target, propKey, value) => {
    const res = watchWeakMap.get(target);
    res && res[propKey] && res[propKey](value);
  });

const eventQueue = new HandlerEventQueue(steps);
const countOff = ref(eventQueue);

watch("isGoing", (value) => {
  console.log("isGoing=>执行改变", value, value ? "忙碌" : "空闲");
});
watch("cache.length", (value) => {
  console.log("cache.length  => 剩余任务数量", value);
});

async function main() {
  countOff.start();
  await new Promise((r) => setTimeout(r, 2000));
  countOff.suspend();
  await new Promise((r) => setTimeout(r, 2000));
  countOff.continue();
  countOff.add(steps.map((_) => _.bind(null, "cccc")));
}
main();
