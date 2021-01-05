# debounce

函数防抖增强版

### 功能说明

###

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

### 参数

| 参数  | 说明           | 类型                  | 默认值 |
| ----- | -------------- | --------------------- | ------ |
| fn    | 防抖的函数     | _Function \| Promise_ | -      |
| delay | 延迟的时间(ms) | Number                | 300    |

### 返回值

| 参数     | 说明                     | 类型     | 默认值 |
| -------- | ------------------------ | -------- | ------ |
| default  | 包装过后的防抖函数       | Function | -      |
| cancel   | 取消防抖的函数           | Function | -      |
| icCancel | 判断是否是一个取消的结果 | Function | -      |
