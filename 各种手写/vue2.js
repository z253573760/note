let uid = 0;
class Vue {
  constructor(opts) {
    this.opts = opts;
    this.data = opts.data();
    observe(this.data);
    this.render();
  }
  render() {
    const update = () => {
      console.log("我更新了", this.data.a.b.c, this.data.arr);
    };
    new Watcher(this, update);
  }
}

function observe(target) {
  if (typeof target !== "object") return;
  if (target.__ob__) return target.__ob__;
  return new Observer(target);
}
function observeArray(list) {
  const methods = ["push"];
  const oldProto = Object.create(Array.prototype);
  methods.forEach((method) => {
    oldProto[method] = function (...args) {
      let insert;
      if (method === "push") {
        insert = args;
      }
      const res = Array.prototype[method].call(this, ...args);
      observe(insert);
      list.__ob__.dep.notify();
      return res;
    };
  });
  list.__proto__ = oldProto;
  for (const item of list) {
    observe(item);
  }
}

function defineReactive(target, key) {
  let value = target[key];
  const dep = new Dep();
  const childObj = observe(value);
  Object.defineProperty(target, key, {
    get() {
      dep.depend();
      if (childObj) {
        childObj.dep.depend();
      }
      return value;
    },
    set(newVal) {
      dep.notify();
      value = newVal;
    },
  });
}
class Observer {
  constructor(data) {
    this.value = data;
    this.walk(data);
    this.dep = new Dep();
    Object.defineProperty(data, "__ob__", {
      writable: false,
      enumerable: false,
      value: this,
    });
  }
  walk(data) {
    if (Array.isArray(data)) {
      observeArray(data);
      return;
    }
    Object.keys(data).forEach((key) => {
      const value = data[key];
      if (Array.isArray(value)) {
        observeArray(value);
      }
      if (typeof value === "object") {
        observe(value);
      }
      defineReactive(data, key);
    });
  }
}
class Dep {
  constructor() {
    this.id = uid += 1;
    this.subs = [];
    this.subIds = new Set();
  }
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
  append(sub) {
    if (this.subIds.has(sub.id)) return;
    this.subIds.add(sub.id);
    this.subs.push(sub);
  }
  notify() {
    this.subs.forEach((watcher) => watcher.update());
  }
}
Dep.target = null;

class Watcher {
  constructor(vm, expfn) {
    this.id = uid += 1;
    this.vm = vm;
    this.expfn = expfn;
    this.deps = [];
    this.depIds = new Set();
    this.get();
  }
  get() {
    Dep.target = this;
    this.run();
    Dep.target = null;
  }
  addDep(dep) {
    if (this.depIds.has(dep.id)) return;
    this.deps.push(dep);
    this.depIds.add(dep.id);
    dep.append(this);
  }
  update() {
    fulshQueue(this);
  }
  run() {
    this.expfn();
  }
}
let queue = [];
let has = {};
function fulshQueue(watcher) {
  if (has[watcher.id]) return;
  has[watcher.id] = true;
  queue.push(watcher);
  setTimeout(() => {
    queue.forEach((watcher) => watcher.run());
    queue = [];
    has = {};
  }, 0);
}

// 测试

const vm = new Vue({
  data() {
    return {
      a: {
        b: {
          c: 123,
        },
      },
      d: "我是D",
      arr: [1, 2, 3, 4],
    };
  },
});

setTimeout(() => {
  vm.data.arr.push("99");
  vm.data.arr.push("99");
  vm.data.arr.push("99");
  vm.data.arr.push("99");
}, 3000);
