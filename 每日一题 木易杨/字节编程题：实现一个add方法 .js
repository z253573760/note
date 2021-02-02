// 例如：

// add(1)(2,3)(4).value()
// 输出： 10

function add(...args) {
  const _add = (..._args) => {
    args.push(..._args);
    return _add;
  };
  _add.value = () => args.reduce((a, b) => a + b, 0);
  return _add;
}

const res = add(1)(2, 3)(4).value(); //10
console.log(res);
