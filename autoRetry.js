function foo(param) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(JSON.parse(param)); //  执行到这里会报错
      } catch (err) {
        return reject(err);
      }
    }, 2000);
  });
}

function autoRetryofAsync(func, time) {
  let count = 0;
  const fn = async (...args) => {
    count += 1;
    try {
      return await func(...args);
    } catch (error) {
      console.log("[autoRetryofAsync]:进入ERROR" + count);
      if (count < time) {
        return await fn(...args);
      } else {
        throw error;
      }
    }
  };
  return fn;
}

function autoRetryOfPromise(func, time) {
  let count = 0;
  return (...args) =>
    new Promise((reslove, reject) => {
      func(...args).then(reslove, (err) => {
        console.log("[autoRetryOfPromise]: 进入ERROR" + count);
        if (count < time) {
          count += 1;
          return reslove(fn(...args));
        }
        return reject(err);
      });
    });
}

autoRetryofAsync(foo, 3).then(
  (res) => {
    console.log("res", res);
  },
  (err) => {
    console.log("err", err);
  }
);
autoRetryOfPromise(foo, 3).then(
  (res) => {
    console.log("res", res);
  },
  (err) => {
    console.log("err", err);
  }
);
