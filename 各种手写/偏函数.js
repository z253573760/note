function partial(fn, ...args) {
  const handler = (...args2) => {
    args.push(...args2);
    if (args.length >= fn.length) {
      return fn.call(fn);
    } else {
      return handler;
    }
  };
  return handler;
}
function add(a, b, c) {
  console.log("this", this);
  return a + b + c;
}
const c1 = currying(add, 1);
console.log(c1(2)(3));
