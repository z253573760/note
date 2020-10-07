// 第 159 题：实现 Promise.retry，成功后 resolve 结果，失败后重试，尝试超过一定次数才真正的 reject

Promise.retry = function (fn, max = 3) {
  let p = new Promise(fn);
  while (max) {
    p = p.catch(() => {
      console.log("失败");
      return new Promise(fn);
    });
    max -= 1;
  }
  return p;
};

// 测试  执行一个递增的i;i>1时会成功
let i = 0;
Promise.retry((resolve, reject) => {
  setTimeout(() => {
    if (i > 1) resolve("我成功了");
    i += 1;
    reject();
  }, 1000);
}).then(
  (res) => {
    console.log("res", res);
  },
  (err) => {
    console.log("err", err);
  }
);
