'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const effectStack = [];
const targetMap = new WeakMap();
const queue = new Set();
let uid = 0;
function effect(fn, options = {}) {
  const effect = () => {
    fn();
  };
  effect.id = uid += 1;
  effect.deps = [];
  effect.options = options;
  if (!options.lazy) {
    try {
      effectStack.push(effect);
      effect();
    } finally {
      effectStack.pop();
    }
  }
  return effect;
}

function track(target, key) {
  const effect = effectStack[effectStack.length - 1];
  if (!effect) return;
  let depMap = targetMap.get(target);
  if (!depMap) {
    // depMap = new Map();
    targetMap.set(target, (depMap = new Map()));
  }
  let deps = depMap.get(key);
  if (!deps) {
    depMap.set(key, (deps = new Set()));
  }
  if (!deps.has(effect)) {
    deps.add(effect);
    effect.deps.push(key);
  }
}

function trigger(target, key, type = "change") {
  const depMap = targetMap.get(target);
  if (!depMap) return;
  const deps = depMap.get(key);
  if (!deps) return;
  const run = (deps) => deps && deps.forEach((cb) => fulshQueue(cb));

  if (Array.isArray(target) && key === "length") {
    //如果更改的是数组
    const depsOfLength = depMap.get("length");
    console.log("数组的长度更新了", depsOfLength);
    //  depsOfLength && run(depsOfLength);
  }
  run(deps);
}

function fulshQueue(fn) {
  if (queue.has(fn)) return;
  queue.add(fn);
  nextTick(() => {
    queue.forEach((cb) => cb());
    queue.clear();
  });
}

function nextTick(fn) {
  setTimeout(() => {
    fn();
  }, 0);
}

function isObject(target = null) {
  return target !== null && typeof target === "object";
}

function isSymbol(target) {
  return typeof target === "symbol";
}

function hasOwn(target, key) {
  return target.hasOwnProperty(key);
}

function isInteger(target) {
  return target === `${parseInt(target)}`;
}

function isArrayAddIndex(target, key) {
  return Array.isArray(target) && isInteger(key)
    ? Number(key) < target.length
    : hasOwn(target, key);
}

const proxyMap = new WeakMap();

const baseHandler = {
  set(...args) {
    const [target, key, value] = args;
    let oldVal = target[key];
    console.log("set", { target, key, value });
    const r = Reflect.set(...args);
    if (oldVal === value) {
      return r;
    }
    if (isArrayAddIndex(target, key)) {
      console.log("数组新增索引", { target, key, value });
      trigger(target, key, "add");
    }

    if (!hasOwn(target, key)) {
      console.log("新增属性", { target, key, value });
      trigger(target, key, "add");
    } else {
      console.log("更改属性", { target, key, value });
      trigger(target, key);
    }

    return r;
  },
  get(...args) {
    const [target, key] = args;
    track(target, key);
    const r = Reflect.get(...args);

    if (isSymbol(key)) {
      return r;
    }
    if (isObject(r)) {
      return reactive(r);
    }
    return r;
  },
};

function createReactiveObj(target) {
  const r = proxyMap.get(target);
  if (r) {
    return r;
  }
  const res = new Proxy(target, baseHandler);
  proxyMap.set(target, res);
  return res;
}

function reactive(target) {
  if (!isObject) {
    return target;
  }
  return createReactiveObj(target);
}

function ensureRender() {
  console.log("a");
}

function createApp() {
  ensureRender();
}

exports.createApp = createApp;
exports.effect = effect;
exports.reactive = reactive;
