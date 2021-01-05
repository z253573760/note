const __v__is__cancel = Symbol("__v__is__cancel");
function debounce(fn, delay = 3000) {
  if (typeof fn != "function" && !(fn instanceof Promise)) {
    throw TypeError("[debounce-err] : 必须是一个函数或者Promise");
  }
  if (typeof delay !== "number") {
    throw TypeError("[debounce-err] : 必须是一个有效的number对象");
  }
  debounce.isCancel = (target) => !!target[__v__is__cancel];
  let resolveHandler;
  let timer;
  const handler = (...args) => {
    clearTimeout(timer);
    return new Promise((reslove, reject) => {
      resolveHandler = reslove;
      timer = setTimeout(async () => {
        try {
          const res = await fn(...args);
          reslove(res);
        } catch (err) {
          reject(err);
        }
      }, delay);
    });
  };
  handler.cancel = (message = "我被取消了") => {
    clearTimeout(timer);
    timer = null;
    const data = Object.create({ [__v__is__cancel]: true });
    data.message = message;
    resolveHandler(data);
  };
  return handler;
}
//开始简单的测试

let count = 1;
const fn = debounce(
  (a) =>
    new Promise((r, j) =>
      setTimeout(() => {
        r(a + count);
      }, 5000)
    )
);
console.log("debounce", debounce.isCancel);

const suceessHandler = (res) => {
  console.log("debounce1", debounce.isCancel(res));
  if (debounce.isCancel(res)) {
    console.log("我是被手动取消的", res);
  } else {
    console.log("完整执行", res);
  }
};
const errorHadnler = (err) => console.log("err", err);
fn("a").then(suceessHandler, errorHadnler);
fn("b").then(suceessHandler, errorHadnler);
fn("c").then(suceessHandler, errorHadnler);
fn("d").then(suceessHandler, errorHadnler);
setTimeout(() => {
  fn.cancel("取消防抖了！！！");
}, 2000);
