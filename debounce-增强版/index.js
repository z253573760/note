const __v__is__cancel = Symbol("__v__is__cancel");
async function runner({ fn, reslove, reject, isCancel, cancelData }, ...args) {
  try {
    if (isCancel) {
      reslove(cancelData);
    } else {
      const res = await fn(...args);
      reslove(res);
    }
  } catch (err) {
    reject(err);
  }
}
module.exports = function debounce(fn, delay = 300, throttle = 0) {
  if (typeof fn != "function" && !(fn instanceof Promise)) {
    throw TypeError("[debounce-err] : 必须是一个函数或者Promise");
  }
  if (typeof delay !== "number") {
    throw TypeError("[debounce-err] : 必须是一个有效的number对象");
  }
  if (typeof throttle !== "number") {
    throw TypeError("[debounce-err] : 必须是一个有效的number对象");
  }
  // 判断是否是一个取消的结果
  debounce.isCancel = (target) => !!target[__v__is__cancel];
  let resolveHandler; // 获取promise的控制权
  let prevTime = 0; // 上次执行的时间戳
  let timer; // 定时器句柄
  let isCancel; // 是否取消执行
  const cancelData = Object.create({ [__v__is__cancel]: true });
  const handler = (...args) => {
    // if (isCancel) return Promise.resolve(cancelData);
    return new Promise((reslove, reject) => {
      clearTimeout(timer);
      resolveHandler = reslove; // 保存promise的控制权
      const otps = {
        fn,
        reslove,
        reject,
        isCancel,
        cancelData,
      };
      const curTime = new Date().getTime();
      if (throttle && curTime - prevTime > throttle) {
        //节流
        prevTime = curTime;
        runner(otps, ...args);
      } else {
        //防抖
        timer = setTimeout(() => runner(otps, ...args), delay);
      }
    });
  };
  handler.cancel = (message = "我被取消了") => {
    clearTimeout(timer);
    timer = null;
    cancelData.message = message;
    isCancel = true;
    if (resolveHandler) {
      resolveHandler(cancelData);
    }
  };
  return handler;
};
