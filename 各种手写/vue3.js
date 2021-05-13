function isObject(target) {
  return typeof target === "object" && target !== null;
}

function reactive(data) {
  if (!isObject(data)) return data;
  return new Proxy(data, {
    set(target, key, val, receiver) {
      const oldVal = target[key];
      const res = Reflect.set(target, key, val, receiver);
      if (res !== oldVal) {
        trigger(target, key);
      }
      return res;
    },
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      track(data, key);
      return reactive(res);
    },
    deleteProperty(target, key) {
      const ret = Reflect.deleteProperty(target, key);
      return ret;
    },
  });
}

const effectStack = [];
let queue = new Set();
function effect(cb) {
  const effect = () => {
    try {
      effectStack.push(effect);
      return cb();
    } finally {
      effectStack.pop();
    }
  };
  effect();
  return effect;
}

const targetMap = new WeakMap();

function track(target, key) {
  const effectFn = effectStack[effectStack.length - 1];
  if (!effectFn) return;
  let depMap = targetMap.get(target);
  if (!depMap) {
    depMap = new Map();
    targetMap.set(target, depMap);
  }
  let deps = depMap.get(key);
  if (!deps) {
    deps = new Set();
    depMap.set(key, deps);
  }
  if (!deps.has(effectFn)) {
    deps.add(effectFn);
  }
}

function trigger(target, key) {
  const depMap = targetMap.get(target);
  if (!depMap) return;
  const deps = depMap.get(key);
  if (!deps) return;
  const list = Array.from(deps);
  list.forEach((cb) => {
    queue.add(cb);
  });
  fulshQueue();
}
function fulshQueue() {
  setTimeout(() => {
    Array.from(queue).forEach((cb) => cb());
    queue = [];
  });
}

const vm = reactive({
  list: [1, 2, 3, 4],
});
effect(() => {
  console.log("111111", vm.list);
});

vm.list.push(5, 6, 7, 8);
vm.list.push(5, 6, 7, 8);

// tcp 三次握手
// 客户端构建SYN包 发送给服务器
// 服务器接收到SYN包后 生成ACK包 发送给客户端
// 客户端接收到 ACK包后 完成连接

//TCP 四次挥手

// 客户端发送FIN包 告诉客户端数据已经传输完成 进入半关闭状态 只接收不发送了
// 服务端接收到FIN包 之后 进入关闭等待状态不再接收 客户端的数据 给客户端发送一个ACK
// 客户端接收到服务器的确认后 进入 半关闭状态2
// 服务端接发送数据完成后 再发送一个FIN 报文
