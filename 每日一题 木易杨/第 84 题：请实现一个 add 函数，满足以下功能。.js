// 第 84 题：请实现一个 add 函数，满足以下功能。
//add(1); // 1
//const res = add(1)(2); // 3
// add(1)(2)(3); // 6
// add(1)(2, 3); // 6
// add(1, 2)(3); // 6
// add(1, 2, 3); // 6

function add() {
  let res = [...arguments].reduce((a, b) => a + b, 0);
  const fn = function () {
    res = [...arguments].reduce((a, b) => a + b, res);
    return fn;
  };
  fn.toString = fn.valueOf = () => res;
  return fn;
}
const a = add(1)(2)(3, 4);
console.log("res", a + 1);
