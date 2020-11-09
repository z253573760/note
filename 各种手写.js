Function.prototype.$call = function ($this, ...args) {
  if ($this === undefined) $this = null;
  const obj = Object.create($this);
  const $fn = "$fn";
  obj[$fn] = this;
  const res = obj[$fn](...args);
  delete obj[$fn];
  return res;
};
Function.prototype.$apply = function ($this, args) {
  if ($this === undefined) $this = null;
  const obj = Object.create($this);
  const $fn = "$fn";
  obj[$fn] = this;
  const res = obj[$fn](...args);
  delete obj[$fn];
  return res;
};
Function.prototype.$bind = function ($this, ...args) {
  if ($this === undefined) $this = null;
  const obj = Object.create($this);
  const $fn = "$fn";
  obj[$fn] = this;
  const res = function (...args2) {
    return obj[$fn](...args, ...args2);
  };
  return res;
};
const obj = {
  name: "cc",
};
function sayName(str) {
  console.log(str + this.name);
}
sayName.$call(obj, `我是`);
sayName.$apply(obj, [`我是`]);
sayName.$bind(obj, `我是`)();

function Student(name, age) {
  this.name = name;
  this.age = age;
}

function $new(fn, ...args) {
  const obj = Object.create({ constructor: fn, ...fn.prototype });
  const res = fn.call(obj, ...args);
  return res !== null ? res : obj;
}

const res = $new(Student, "cc", 18);

Array.prototype.$map = function (fn) {
  const list = new Array(this.length);
  for (let i = 0; i < this.length; i += 1) {
    list[i] = fn(this[i], i, this);
  }
  return list;
};

Array.prototype.$forEach = function (fn) {
  for (let i = 0; i < this.length; i += 1) {
    fn(this[i], i, this);
  }
};

Array.prototype.$reduce = function name(fn, initVal) {
  for (let i = 0; i < this.length; i += 1) {
    initVal = fn(initVal, this[i], i, this);
  }
  return initVal;
};

Array.prototype.$reduceRight = function name(fn, initVal) {
  for (let i = this.length; i >= 0; i -= 1) {
    initVal = fn(initVal, this[i], i, this);
  }
  return initVal;
};

const a = [1, 2, 3, 4].reduce(function (prev, cur) {
  prev[cur] = true;
  return prev;
}, {});
console.log(a);
