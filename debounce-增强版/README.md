# debounce

函数防抖增强版

### 功能说明

1.手动取消还没执行防抖函数

```js
const fn = debounce(() => {});
fn.cancel("取消还没执行的防抖函数");
```

2.在一段时间内没有执行函数 会自动执行一次

```js
debounce(() => {}, 3000, 20000); //如果在 20 秒内没有执行 会默认执行一次
```

## 代码演示

### 基本用法

#### 基础防抖

```js
const fn = debouce(console.log, 1000);
fn(1);
fn(2);
fn(3);
fn(4);
fn(5);
fn(6); // 1秒后打印6
```

#### 取消防抖

```js
const fn = debouce(console.log, 3000); // fn 执行后会返回一个promise
const suceessHandler = (res) => {
  //成功回调
  console.log("debounce1", debounce.isCancel(res));
  if (debounce.isCancel(res)) {
    //判断是否是被手动取消的
    console.log("我是被手动取消的", res);
  } else {
    console.log("完整执行", res);
  }
};

const errorHadnler = (err) => console.log("err", err); // 失败回调

fn("a").then(suceessHandler, errorHadnler); //
fn("b").then(suceessHandler, errorHadnler); // fn("a") 被清除
fn("c").then(suceessHandler, errorHadnler); // fn("b") 被清除
fn("d").then(suceessHandler, errorHadnler); // fn("c") 被清除
setTimeout(() => {
  fn.cancel("手动取消防抖！！！"); // fn("d") 被手动取消了
}, 2000);
// 最终打印 我是被手动取消的 { message: '取消防抖了！！！' }
```

#### 防抖又节流

```js
//获取body滚动条高度
function getScrollTop() {
  var scrollTop = 0;
  if (document.documentElement && document.documentElement.scrollTop) {
    scrollTop = document.documentElement.scrollTop;
  } else if (document.body) {
    scrollTop = document.body.scrollTop;
  }
  return scrollTop;
}
```

###### 同步情况

```js
const scrollHandlerSync = () => {
  const scrollTop = getScrollTop();
  console.log("scrollTop", scrollTop);
  return scrollTop;
};
const fnSync = debounce(scrollHandlerSync, 3000, 8000);
document.addEventListener("scroll", fnSync);
setTimeout(() => fnSync.cancel("取消"), 3000);
setTimeout(() => document.removeEventListener("scroll", fnSync), 5000);
```

###### 异步情况

```js
const scrollHandlerAsync = () => {
  new Promise((r) => setTimeout(r, 3000))
    .then(() => fn("滚动的"))
    .then((res) => console.log(res));
};
const fnAsync = debounce(scrollHandlerAsync, 3000, 8000);
document.addEventListener("scroll", fnAsync);
setTimeout(() => fnAsync.cancel("取消"), 3000);
setTimeout(() => document.removeEventListener("scroll", fnAsync), 1000);
```

### 参数

| 参数     | 说明           | 类型                  | 默认值     |
| -------- | -------------- | --------------------- | ---------- |
| fn       | 防抖的函数     | _Function \| Promise_ | -          |
| delay    | 延迟的时间(ms) | Number                | 300        |
| throttle | 节流的时间(ms) | Number                | 0 (不执行) |

### 返回值

| 参数             | 说明                       | 类型     |
| ---------------- | -------------------------- | -------- |
| return           | 默认返回包装过后的防抖函数 | Function |
| return.cancel    | 取消防抖的函数             | Function |
| debouce.icCancel | 判断是否是一个取消的结果   | Function |
