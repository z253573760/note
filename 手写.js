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
