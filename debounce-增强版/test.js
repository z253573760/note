const debounce = require("./index.js");

//开始简单的测试
let count = 1;
const fn = debounce(
  (a) =>
    new Promise((r, j) =>
      setTimeout(() => {
        r(a + count);
      }, 3000)
    ),
  2000,
  5000
);

const suceessHandler = (res) => {
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

setInterval(() => {
  count += 1;
  fn(count).then(suceessHandler, errorHadnler);
}, 100);
setTimeout(() => {
  fn.cancel("取消防抖了！！！");
}, 10000);
