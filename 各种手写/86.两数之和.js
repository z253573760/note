function sum(list, target) {
  const map = {};
  for (let i = 0; i < list.length; i += 1) {
    const item = list[i];
    if (map[item] !== undefined) {
      return [map[item], i];
    } else {
      const diff = target - item;
      map[diff] = i;
    }
  }
  return [-1, -1];
}
const res = sum([2, 7, 11, 15], 9);

const bar = () => {
  //
};

// @bar
// class PromiseCache {
//   constructor() {
//     //
//   }

// }

// const bar = new PromiseCache();

// console.log(bar);
function promiseCache(fn, dealy = 3000) {
  const cache = {};
  return function (...args) {
    console.log("cache", cache);
    const key = fn.name + JSON.stringify(args);
    if (cache[key]) {
      console.log("找到缓存", cache[key]);
      return cache[key];
    }
    const p = fn(...args).finally(() => {
      setTimeout(() => {
        cache[key] = null;
      }, dealy);
    });
    cache[fn.name + JSON.stringify(args)] = p;
    return p;
  };
}
const createPromise = (x) =>
  new Promise((r) => {
    setTimeout(() => {
      r(x);
    }, x * 1000);
  });

const foo = promiseCache(createPromise);
const res1 = foo(1).then(console.log);
const res2 = foo(1).then(console.log);
const res3 = foo(1).then(console.log);
