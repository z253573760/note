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
  const blob = new Blob(['(' + fn.toString() + ')()']);
  const url = window.URL.createObjectURL(blob);
  const worker = new Worker(url);
  return worker;
}

export function hasKey(target, key) {
  return Object.prototype.hasOwnProperty.call(target, key);
}

export function assert(condition, msg) {
  if (!condition) {
    throw new Error(`[js-error]:${msg}`);
  }
}

export function getOS() {
  // 获取当前操作系统
  let os;
  console.log('navigator.userAgent', navigator.userAgent);
  if (navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1) {
    os = 'Android';
  } else if (
    navigator.userAgent.indexOf('iPhone') > -1 ||
    navigator.userAgent.indexOf('iPad') > -1
  ) {
    os = 'iOS';
  } else if (navigator.userAgent.indexOf('Windows Phone') > -1) {
    os = 'WP';
  } else {
    os = 'Others';
  }
  return os;
}
