//核心 compose 函数
function compose(middleware) {
  if (!Array.isArray(middleware))
    throw new TypeError("Middleware stack must be an array!");
  for (const fn of middleware) {
    if (typeof fn !== "function")
      throw new TypeError("Middleware must be composed of functions!");
  }

  //  传入对象 context 返回Promise
  return function (context, next) {
    // last called middleware #
    let index = -1;
    return dispatch(0);
    function dispatch(i) {
      if (i <= index)
        return Promise.reject(new Error("next() called multiple times"));
      index = i;
      let fn = middleware[i];
      if (i === middleware.length) {
        fn = next;
      }
      if (!fn) return Promise.resolve();
      try {
        return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
      } catch (err) {
        return Promise.reject(err);
      }
    }
  };
}

function createAOP(fn) {
  const middlewares = [];
  const res = (...args) => {
    return compose(middlewares)(args, () => fn(...args));
  };
  res.use = function name(cb) {
    middlewares.push(cb);
    return this;
  };
  return res;
}
const main = createAOP((a) => {
  console.log("我是main!~", a);
  return "结果" + a;
});

main.use(async (ctx, next) => {
  console.log("我是洋葱第1层---start", ctx);
  const res = await next();
  console.log("我是洋葱第1层---end", ctx);
  return res;
});

main.use(async (ctx, next) => {
  console.log("我是洋葱第2层---start", ctx);
  const res = await next();
  console.log("我是洋葱第2层---end", ctx);
  return res;
});

main.use(async (ctx, next) => {
  console.log("我是洋葱第3层---start", ctx);
  const res = await next();
  console.log("我是洋葱第3层---end", ctx);
  return res;
});
const a = main(123)
  .then((res) => {
    console.log("res", res);
  })
  .catch((err) => {
    console.log("err", err);
  });
