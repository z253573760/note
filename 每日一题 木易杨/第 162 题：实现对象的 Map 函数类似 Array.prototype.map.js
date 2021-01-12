// 第 162 题：实现对象的 Map 函数类似 Array.prototype.map #431
// 实现一个 map 函数
// const targetData = {
//   a: 2,
//   b: 3,
//   c: 4,
//   d: 5
// };

Object.prototype.$map = function (fn) {
  if (typeof fn !== "function") {
    throw new TypeError(`${fn} is not a function !`);
  }

  const res = {};
  for (const key in this) {
    if (this.hasOwnProperty(key)) {
      res[key] = fn.call(this, this[key], key, this);
    }
  }
  return res;
};

const obj = { a: "1", b: "2" };
const n = obj.$map((item, key, self) => {
  console.log({ item, key, self });
  return item + 1;
});
console.log(obj, n); //{ a: '1', b: '2' } { a: '11', b: '21' }
const c = new String("123").$map((item) => item + 1);
console.log("c", c); //{ '0': '11', '1': '21', '2': '31' }

const b = new Boolean("123").$map((item) => item + 1);
console.log("b", b); //{}
