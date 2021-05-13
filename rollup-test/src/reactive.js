import { track, trigger } from "./effect";
import { isObject, isSymbol, hasOwn, isArrayAddIndex } from "./utils";

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

export function reactive(target) {
  if (!isObject) {
    return target;
  }
  return createReactiveObj(target);
}
