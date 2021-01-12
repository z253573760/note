Function.prototype.$call = function ($this, ...args) {
  if ($this === undefined || $this === null) {
    $this = window || {};
  }
  const fn = Symbol("$fn");
  const obj = Object.create($this);
  obj[fn] = this;
  try {
    return obj[fn](...args);
  } finally {
    delete obj[fn];
  }
};
Function.prototype.$apply = function ($this, args = []) {
  if ($this === undefined || $this === null) {
    $this = window || {};
  }
  if (!Array.isArray(args)) {
    throw new TypeError(`${args} must be a array !!!`);
  }
  const fn = Symbol("$fn");
  const obj = Object.create($this);
  obj[fn] = this;
  try {
    return args.length ? obj[fn](...args) : obj[fn]();
  } finally {
    delete obj[fn];
  }
};
Function.prototype.$bind = function ($this, ...args) {
  if ($this === undefined || $this === null) {
    $this = window || {};
  }
  const list = [];
  if (args.length) {
    list.push(...args);
  }
  const fn = Symbol("$fn");
  const obj = Object.create($this);
  obj[fn] = this;
  const self = this;
  return function f(...args) {
    if (args.length) {
      list.push(...args);
    }
    if (this instanceof f) {
      return new self(...list);
    }
    return obj[fn](...list);
  };
};

function $new(ctor, ...args) {
  if (typeof ctor !== "function") {
    throw TypeError(`${ctor} must be a function`);
  }
  const obj = Object.create({
    constructor: ctor,
    ...ctor.prototype,
  });
  const res = ctor.call(obj, ...args);
  return res !== null ? res : obj;
}

// bar.$call({ name: "!23" }, "call");
// bar.call({ name: "!23" }, "call");
// bar.$apply({ name: "!23" }, ["apply"]);
// bar.apply({ name: "!23" }, ["apply"]);
// bar.bind({ name: "!23" }, "bind")("bind2", "bind3");
// bar.bind({ name: "!23" })("bind2", "bind3");
// const Bar = bar.bind({ name: "!23" }, "bind");
// const Bar2 = bar.bind({ name: "!23" });
// const res = new Bar("bind2", "bind3");
// const res2 = new Bar2("bind2", "bind3");
// console.log({
//   res,
//   res2,
// });
// const Bar3 = bar.$bind({ name: "!23" }, "bind");
// const Bar4 = bar.$bind({ name: "!23" });
// const res3 = new Bar3("bind2", "bind3");
// const res4 = new Bar4("bind2", "bind3");
// const res5 = new Bar4();
// console.log({
//   res3,
//   res4,
//   res5,
// });
// function bar(...args) {
//   console.log(this.name, ...args);
// }

function Father(bar) {
  this.bar = bar;
  this.father = "father";
  this.key = "father";
}
function Son(bar) {
  Father.call(this, bar);
  this.bar = bar;
  this.son = "son";
  this.key = "son";
  Son.prototype.constructor = Son;
  Son.__proto__ = Father;
}
Son.prototype = Object.create(Father.prototype);

console.log(new Son(123) instanceof Son);
console.log(new Son(123) instanceof Father);

function $extends($super, $ctor) {
  return function (...args) {
    const obj2 = new $ctor(...args);
    obj2.__proto__.__proto__ = Object.create(new $super(...args));
    return obj2;
  };
}

function $instanceof(left, right) {
  if (left === null) return false;
  if (typeof left !== "object") return false;
  if (typeof right !== "function") {
    throw TypeError(`${right} must be a function`);
  }
  let res = left;
  while (res.__proto__) {
    if (res.__proto__.constructor === right) {
      return true;
    }
    res = res.__proto__;
  }
  return false;
}
$instanceof([], Object);
