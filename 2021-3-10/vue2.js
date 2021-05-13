class Vue {
  constructor(opts) {
    this.$opts = opts;
    this.data = opts.data();
    observe(this.data);
    this.render();
  }
  render() {
    const updateComponent = () => {
      console.log("我要更新视图了", JSON.stringify(this.data));
    };
    new Watcher({}, updateComponent);
  }
}

function isObject(target) {
  return target !== null && typeof target === "object";
}

function observe(target) {
  if (!isObject(target)) return;
  if (target.__ob__) return;
  return new Observer(target);
}
let uid = 0;
class Observer {
  constructor(data) {
    this.id = uid += 1;
    this.dep = new Dep();
    if (!isObject(data)) {
      throw TypeError("data must be object");
    }
    if (Array.isArray(data)) {
      observeArray(data);
    } else {
      this.walk(data);
    }
    Object.defineProperty(data, "__ob__", {
      value: this,
      enumerable: false,
    });
  }
  walk(data) {
    Object.keys(data).forEach((key) => {
      defineReactive(data, key);
    });
  }
}

function defineReactive(target, key) {
  let value = target[key];
  const childObj = observe(value);
  const dep = new Dep();
  Object.defineProperty(target, key, {
    set(newVal) {
      value = newVal;
      dep.notify();
    },
    get() {
      dep.depend();
      if (childObj) {
        childObj.dep.depend();
      }
      return value;
    },
  });
}

class Dep {
  constructor() {
    this.id = uid += 1;
    this.subs = [];
    this.has = {};
  }
  notify() {
    this.subs.forEach((watcher) => watcher.update());
  }
  depend() {
    if (Dep.target) {
      Dep.target.addDep(this);
    }
  }
  append(watcher) {
    if (this.has[watcher.id]) return;
    this.has[watcher.id] = true;
    this.subs.push(watcher);
  }
}

Dep.target = null;
class Watcher {
  constructor(vm, expOrFn) {
    this.id = uid += 1;
    this.deps = [];
    this.has = {};
    this.expOrFn = expOrFn;
    this.get();
  }
  get() {
    Dep.target = this;
    this.run();
    Dep.target = false;
  }
  addDep(dep) {
    if (this.has[dep.id]) return;
    this.has[dep.id] = true;
    this.deps.push(dep);
    dep.append(this);
  }
  update() {
    fulshQueue(this);
  }

  run() {
    this.expOrFn();
  }
}

const vm = new Vue({
  data() {
    return {
      a: 1,
      b: {
        c: 3,
      },
    };
  },
});
let has = {};
let queue = [];
function fulshQueue(watcher) {
  if (has[watcher.id]) return;
  queue.push(watcher);
  has[watcher.id] = true;
  setTimeout(() => {
    console.log(queue.length);
    queue.forEach((w) => w.run());
    has = {};
    queue = [];
  });
}

vm.data.a = 2;
vm.data.b.c = 2;
vm.data.a = 2;
vm.data.b.c = 2;
vm.data.a = 2;
vm.data.b.c = 2;
