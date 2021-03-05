export function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

export function cache(fn) {
  let instance;
  return (...args) => {
    if (instance) return instance;
    instance = fn(...args);
    return instance;
  };
}

export function createWorker(fn) {
  const blob = new Blob(["(" + fn.toString() + ")()"]);
  const url = window.URL.createObjectURL(blob);
  const worker = new Worker(url);
  return worker;
}

export function hasKey(target, key) {
  return Object.prototype.hasOwnProperty.call(target, key);
}

export function assert(condition, msg) {
  if (!condition) {
    throw new Error(`${msg}`);
  }
}
