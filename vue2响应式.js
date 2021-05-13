function isObject(target) {
  return typeof target === "object" && target !== null;
}

function defineReactvie(target, key, val) {
  observe(val);
  let value = val;
  Object.defineProperty(target, key, {
    set(newVal) {
      if (value === newVal) return;
      //dep通知
      observe(newVal);
      console.log("Dep通知");
      value = newVal;
    },
    get() {
      //收集依赖
      console.log("收集依赖");
      return value;
    },
  });
}

function observe(target) {
  if (Array.isArray(target)) {
    observeArray(target);
    return;
  }
  if (!isObject(target)) return;
  Object.keys(target).forEach((key) => {
    defineReactvie(target, key, target[key]);
  });
}

function observeArray(target) {
  const oldProto = Array.prototype;
  const arrayProto = Object.create(oldProto);
  const methods = [
    "push",
    "pop",
    "shift",
    "unshift",
    "splice",
    "reverse",
    "sort",
  ];
  methods.forEach((method) => {
    arrayProto[method] = (...args) => {
      const res = oldProto[method].call(target, ...args);
      console.log("数组DEP通知");
      return res;
    };
  });
  target.__proto__ = arrayProto;
}
const vm = {
  a: "A",
  B: {
    c: "c",
  },
  list: [1, 2, 3, 45, 8],
};

observe(vm);

vm.a = "!23";
vm.B.c = "cccc";
vm.list.push("new");
console.log(vm);
