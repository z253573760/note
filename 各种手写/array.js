Array.prototype.$reduce = function (fn, initVal = undefined) {
  let res = initVal;
  let start = 0;
  if (arguments.length === 1) {
    start = 1;
    res = this[0];
  }
  for (let i = start; i < this.length; i += 1) {
    res = fn(res, this[i], i, this);
  }
  return res;
};
