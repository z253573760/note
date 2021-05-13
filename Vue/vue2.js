class Vue {
  constructor(opts) {
    this.opts = opts;
    this.data = opts.data();
    new Observer(this.data);
    this.render();
  }
  render() {
    const compUpdate = () => {
      console.log("我要更新了", this.data.a.b.c);
    };
    new Watcher(this.el || undefined, compUpdate);
  }
}

class Observer {
  constructor(data) {
    this.observe(data);
    this.dep = new Dep();
  }
  observeArr(array) {
    const oldProto = Array.prototype;
    const list = ["push"];
    list.forEach(function (method) {
      array[method] = function (...args) {
        let insert;
        const res = oldProto.call(array, ...args);
        if (method === "push") {
          insert = args;
        }
        if (insert) {
          this.observe(insert);
        }
        this.__ob__.dep.notify();
        return res;
      };
    });
    for (const item of array) {
      if (typeof item === "object") {
        this.observe(data);
      }
    }
  }
  observe(data) {
    if (typeof data !== "object") return;
    if (Array.isArray(data)) {
      this.observeArr(data);
      return;
    }
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (typeof value === "object") {
        this.observe(value);
      } else {
        Observer.defineReactive(data, key);
      }
    });
  }
  static defineReactive(target, key) {
    let value = target[key];
    const dep = new Dep();
    Object.defineProperty(target, key, {
      set(newVal) {
        if (value !== newVal) {
          dep.notify();
          value = newVal;
        }
      },
      get() {
        dep.depend();
        return value;
      },
    });
  }
}
let did = 0;
class Dep {
  constructor() {
    this.id = did += 1;
    this.subs = [];
  }
  notify() {
    this.subs.forEach((watcher) => watcher.update());
  }
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
  addSub(sub) {
    this.subs.push(sub);
  }
}
Dep.target = null;

let wid = 0;
class Watcher {
  constructor(vm, compUpdate) {
    this.id = wid += 1;
    this.compUpdate = compUpdate;
    this.deps = [];
    this.depIds = new Set();
    this.get();
  }
  get() {
    Dep.target = this;
    this.compUpdate();
    Dep.target = null;
  }
  addDep(dep) {
    if (this.depIds[dep.id]) return;
    this.depIds.add(dep.id);
    this.deps.push(dep);
    dep.addSub(this);
  }
  run() {
    this.get();
  }
  update() {
    flushQueue(this);
  }
}
let queue = [];
let has = {};
function flushQueue(watcher) {
  if (has[watcher.id]) return;
  has[watcher.id] = true;
  queue.push(watcher);
  nextTick(() => {
    queue.forEach((wathcer) => wathcer.run());
    has = {};
    queue = [];
  });
}

let cbs = [];
function nextTick(fn) {
  setTimeout(fn, 0);
}
const vm = new Vue({
  data() {
    return {
      a: {
        b: {
          c: 1,
        },
      },
    };
  },
});
let count = 0;
setInterval(() => {
  vm.data.a.b.c += 1;
  vm.data.a.b.c += 1;
  vm.data.a.b.c += 1;
  vm.data.a.b.c += 1;
  count += 1;
  console.log(count, vm.data.a.b.c);
}, 3000);
