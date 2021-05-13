// 第三题：请按照用例实现代码 #3

class Events {
  constructor() {
    this.dict = {};
    this.args = {};
    this.hasOnce = new WeakMap();
  }
  on(type, fn, ...args) {
    if (!this.dict[type]) {
      this.dict[type] = [];
    }
    this.dict[type].push(fn);
    if (!this.args[type]) {
      this.args[type] = new WeakMap();
    }
    if (!this.args[type].get(fn)) {
      this.args[type].set(fn, []);
    }
    this.args[type].get(fn).push(...args);
  }
  off(type, fn) {
    const res = this.dict[type];
    // const index = res.indexOf(fn);
    // res.splice(index, 1);
    // this.dict[type] = res;
    const list = res.filter((item) => item !== fn);
    this.dict[type] = list;
  }
  emit(type, ...args) {
    for (const fn of this.dict[type]) {
      const list = this.args[type].get(fn);
      fn(...[...list, ...args]);
      if (fn.isOnce) {
        fn.isOnce = false;
        this.off(type, fn);
      }
    }
  }
  once(type, fn) {
    fn.isOnce = true;
    this.on(type, fn);
  }
  fire(type, ...args) {
    this.emit(type, ...args);
  }
}
const fn1 = (...args) => console.log("I want sleep1", ...args);
const fn2 = (...args) => console.log("I want sleep2", ...args);
const fn3 = (...args) => console.log("I want sleep2", ...args);
const event = new Events();
event.on("sleep", fn1, 1, 2, 3);
event.on("sleep", fn2, 1, 2, 3);
event.fire("sleep", 4, 5, 6);
// I want sleep1 1 2 3 4 5 6
// I want sleep2 1 2 3 4 5 6
event.off("sleep", fn1);
event.once("sleep", fn3);
event.fire("sleep");
// I want sleep2 1 2 3
// I want sleep
event.fire("sleep");
// I want sleep2 1 2 3
