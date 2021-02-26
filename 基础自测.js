// const list = [0, 4, 3, 9, 0, 2, 1];

// //冒泡
// function bubberSort(list) {
//   for (let i = 0; i < list.length - 1; i += 1) {
//     for (let j = i + 1; j < list.length; j += 1) {
//       if (list[i] > list[j]) {
//         [list[i], list[j]] = [list[j], list[i]];
//       }
//     }
//   }
//   console.log(list);
// }
// bubberSort([...list]);
// //快排
// function quickSort(list) {
//   if (list.length <= 1) return list;
//   const [midd, ...other] = list;
//   const left = [];
//   const right = [];
//   for (const item of other) {
//     if (item < midd) {
//       left.push(item);
//     } else {
//       right.push(item);
//     }
//   }
//   return [...quickSort(left), midd, ...quickSort(right)];
// }
// const res = quickSort([...list]);

// console.log(res);

// // 继承
// function People(name) {
//   this.type = "people";
//   this.name = name;
// }
// People.prototype.say = function () {
//   console.log("say", this);
// };
// function Man(name) {
//   People.call(this, name);
//   this.sex = "man";
// }
// Man.prototype = People.prototype;
// Man.prototype.constrouct = Man;

// const m = new Man("123");
// m.say();
// console.log(m);

// //手写new
// function $new(ctor, ...args) {
//   const obj = Object.create({
//     constrouct: ctor,
//     ...ctor.prototype,
//   });
//   const res = ctor.call(obj, ...args);
//   return res !== null ? res : obj;
// }

// //防抖
// function debounce(fn, immediate, wait = 3000, dealy = 500) {
//   let timer;
//   let immediated = false;
//   let lastTime = new Date().getTime();
//   const handler = (...args) => {
//     if (immediate && !immediated) {
//       fn(...args);
//       immediated = true;
//       return;
//     }
//     const now = new Date().getTime();
//     if (dealy && now - lastTime >= dealy) {
//       fn(...args);
//       lastTime = now;
//     }
//     clearTimeout(timer);
//     timer = setTimeout(() => {
//       fn(...args);
//     }, wait);
//   };
//   handler.cancel = () => {
//     clearTimeout(timer);
//   };
//   return handler;
// }
// const f = debounce(() => console.log(1), true);

// for (let i = 0; i < 99; i += 1) {
//   f();
// }

// //手写bind

// Function.prototype.$call = function (target, ...args) {
//   let obj = {
//     ...target,
//     $fn: this,
//   };
//   const res = obj.$fn(...args);
//   obj = null;
//   return res;
// };

// (function (params) {
//   console.log(this.name + ":" + params);
// }.$call({ name: "call" }, "text"));

// // 手写apply
// Function.prototype.$apply = function (target, list) {
//   let obj = {
//     ...target,
//     $fn: this,
//   };
//   const res = obj.$fn(...list);
//   obj = null;
//   return res;
// };
// (function (params) {
//   console.log(this.name + ":" + params);
// }.$apply({ name: "call" }, ["text"]));

// // 手写bind
// Function.prototype.$bind = function (target, ...args) {
//   let obj = {
//     ...target,
//     $fn: this,
//   };
//   return (...args2) => {
//     args.push(...args2);
//     const res = obj.$fn(...args);
//     obj = null;
//     return res;
//   };
// };
// function f2(...args) {
//   console.log(this.name + ":" + args.toString());
// }
// const f3 = f2.$bind({ name: "bind" }, 1, 2);
// f3(3, 4);

// //柯里化

// function currying(fn) {
//   const list = [];
//   const handler = (...args) => {
//     list.push(...args);
//     console.log(list);
//     if (list.length < fn.length) {
//       return handler;
//     } else {
//       return fn(...list);
//     }
//   };
//   return handler;
// }
// function add(a, b, c) {
//   console.log("this", this);
//   return a + b + c;
// }

// const c1 = currying(add);
// console.log(c1(1)(2)(3));

// // 偏函数
// function partial(fn, ...args) {
//   const handler = (...args2) => {
//     args.push(...args2);
//     if (args.length >= fn.length) {
//       return fn(...args);
//     } else {
//       return handler;
//     }
//   };
//   return handler;
// }

// const c2 = partial(add, 1);
// console.log(c2(2)(3));

// 手写promise

class $Promise {
  constructor(fn) {
    this.status = "p";
    this.result = undefined;
    this.cb1 = [];
    this.cb2 = [];
    const reslove = (v) => {
      setTimeout(() => {
        if (this.status === "p") {
          this.status = "f";
          this.value = v;
          this.cb1.forEach((cb) => cb(v));
        }
      }, 0);
    };
    const reject = (v) => {
      setTimeout(() => {
        if (this.status === "p") {
          this.status = "r";
          this.value = v;
          this.cb2.forEach((cb) => cb(v));
        }
      }, 0);
    };
    try {
      fn(reslove, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFulfilled = (v) => v, onRejected = (v) => v) {
    const p = new $Promise((reslove, reject) => {
      if (this.status === "p") {
        this.cb1.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value);
              handlerPromise(p, x, reslove, reject);
            } catch (err) {
              reject(err);
            }
          }, 0);
        });
        this.cb2.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.value);
              handlerPromise(p, x, reslove, reject);
            } catch (err) {
              reject(err);
            }
          }, 0);
        });
      }
      if (this.status === "f") {
        this.cb1.push(() => {
          const x = onFulfilled(this.value);
          handlerPromise(p, x, reslove, reject);
        });
      }
      if (this.status === "r") {
        this.cb2.push(() => {
          const x = onRejected(this.value);
          handlerPromise(p, x, reslove, reject);
        });
      }
    });
    return p;
  }
  catch(fn) {
    return this.then(undefined, fn);
  }
}

$Promise.reslove = function (value) {
  return new $Promise((r) => {
    r(value);
  });
};
$Promise.reject = function (value) {
  return new $Promise((_, r) => {
    r(value);
  });
};
function handlerPromise(p, x, reslove, reject) {
  if (p === x) {
    throw TypeError("p===x");
  }
  if (!(x instanceof $Promise)) {
    reslove(x);
    return;
  }
  console.log("p", p);
  if (x.status === "p") {
    x.then((y) => {
      handlerPromise(x, y, reslove, reject);
    }, reslove);
  }
  if (x.status === "f") {
    reslove(x.result);
  }
  if (x.status === "r") {
    reject(x.result);
  }
}
// const p = new $Promise((reslove) => {
//   reslove("promise3333");
//   setTimeout(() => {
//     reslove("promise3333");
//   }, 3000);
// })
//   .then((x) => {
//     console.log(1, x);
//     return x + "11";
//   }, console.log)
//   .then((x) => {
//     console.log(2, x);
//     // return x + "11";
//     throw x + "22";
//   }, console.log)
//   .catch((err) => {
//     console.log("err", err);
//   });
$Promise.reslove(3).then(console.log);
$Promise.reject(4).then(console.log, console.log);
