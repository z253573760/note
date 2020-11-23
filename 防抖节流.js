// #### 函数节流 过滤重复滚动事件
// 函数节流不管事件触发有多频繁，都会保证在规定时间内一定会执行一次真正的事件处理函数
function throttle(func, delay = 60) {
  let lock = false;
  return (...args) => {
    if (lock) return;
    func(...args);
    lock = true;
    setTimeout(() => (lock = false), delay);
  };
}

// #### 函数防抖 过滤重复验证事件
// 函数防抖是在最后一次事件后才触发一次函数

function debounce(func, delay = 300, I = null) {
  return (...args) => {
    clearTimeout(I);
    I = setTimeout(func.bind(null, ...args), delay);
    // I = setTimeout((...args) => func(...args), delay)
  };
}

// #### 既要防抖又要节流
// 对事件进行防抖处理 但是如果在设定时间间隔内没触发的话 则先触发一次
// 其实就是在防抖的机制上加一个判断 判断上次fn执行的时间 如果距离上次执行fn的时间超过设置的时间间隔 就执行fn
// 场景考虑 消息发布订阅的时候 触发发布太频繁考虑到会频繁更改DOM结构 需要做一次节流  但是又担心不能把最终的结果显示到视图上
function debounceAndThrottle(fn, delay = 60, diff = 500) {
  let prev = new Date().getTime();
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    const cur = new Date().getTime();
    if (cur - prev > diff) {
      prev = cur;
      return fn(...args);
    }
    timer = setTimeout(() => {
      prev = cur;
      fn(...args);
    }, delay);
  };
}
