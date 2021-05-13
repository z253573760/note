function debouce(fn, dealy = 3000, immediate = false, throt = 1000) {
  let timer;
  let called = false;
  let prev = new Date().getTime();
  const handler = function (...args) {
    if (!timer && !called && immediate) {
      called = true;
      fn.call(this, ...args);
      return;
    }
    clearTimeout(timer);
    const now = new Date().getTime();
    if (now > prev + throt) {
      fn.call(this, ...args);
      prev = now;
    }
    timer = setTimeout(() => {
      fn.call(this, ...args);
      prev = cur;
      called = false;
      timer = null;
    }, dealy);
  };
  handler.cancel = () => {
    clearTimeout(timer);
  };
  return handler;
}

const fn = () => console.log(123);

const bar = debouce(fn, 1000, true);
window.addEventListener("click", bar);
