// 原函数
function add(a, b, c) {
  return a + b + c;
}
add.prototype.name = "add";
// 柯里化
function addCurrying(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
// 调用原函数
add(1, 2, 3); // 6

// 调用柯里化函数
addCurrying(1)(2)(3); // 6

function currying(func) {
  const partial = (fn, ...args) => {
    return (...newArgs) => {
      args.push(...newArgs);
      if (args.length >= fn.length) {
        return fn.call(fn, ...args);
      } else {
        return partial(fn, ...args);
      }
    };
  };
  return partial(func);
}

const add2 = currying(add);
console.log(add2(1)(2)(3));
