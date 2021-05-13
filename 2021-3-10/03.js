class Promise {
  constructor(fn) {
    this.value = undefined;
    this.status = "pending";
    this.cb1 = [];
    this.cb2 = [];
    const reslove = (v) => {
      if (this.status === "pending") {
        setTimeout(() => {
          this.status = "onFuilled";
          this.value = v;
          this.cb1.forEach((cb) => cb());
        });
      }
    };
    const reject = (v) => {
      if (this.status === "pending") {
        setTimeout(() => {
          this.status = "onRejected";
          this.value = v;
          this.cb2.forEach((cb) => cb());
        });
      }
    };
    try {
      fn(reslove, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFuilled = (v) => v, onRejected = (v) => v) {
    const p = new Promise((reslove, reject) => {
      if (this.status === "pending") {
        this.cb1.push(() => {
          const x = onFuilled(this.value);
          handlerPromise(p, x, reslove, reject);
        });
        this.cb2.push(() => {
          const x = onRejected(this.value);
          handlerPromise(p, x, reslove, reject);
        });
      }
      if (this.status === "onFuilled") {
        this.cb1.push(() => {
          const x = onFuilled(this.value);
          handlerPromise(p, x, reslove, reject);
        });
      }
      if (this.status === "onRejected") {
        this.cb1.push(() => {
          const x = onRejected(this.value);
          handlerPromise(p, x, reslove, reject);
        });
      }
    });
    return p;
  }
  catch(fn) {
    return this.then(undefined, fn);
  }
  fianlly(fn) {
    return this.then(
      (r) => {
        return Promise.resolve(fn()).then(() => r);
      },
      (err) => {
        return Promise.resolve(fn()).then(() => {
          throw err;
        });
      }
    );
  }
}
function handlerPromise(p, x, reslove, reject) {
  if (p === x) {
    throw new TypeError("循环引用");
  }
  let called;
  if (isObject(x) || typeof x === "function") {
    if (x.then) {
      x.then(
        (y) => {
          if (called) return;
          called = true;
          handlerPromise(p, y, reslove, reject);
        },
        (y) => {
          if (called) return;
          called = true;
          reject(y);
        }
      );
    } else {
      if (called) return;
      called = true;
      reslove(x);
    }
  } else {
    if (called) return;
    called = true;
    reslove(x);
  }
}

function isObject(target) {
  return target !== null && typeof target === "object";
}

const createPromise = (x) =>
  new Promise((reslove) => {
    setTimeout(() => {
      reslove(x);
    }, x * 1000);
  });
createPromise(1)
  .then((x) => {
    console.log(x);
    return createPromise(x + 1);
  })
  .then((x) => {
    console.log(x);
    return x + 1;
  })
  .then((x) => {
    console.log(x);
    return createPromise(x + 1);
  })
  .then((x) => {
    console.log(x);
    return createPromise(x + 1);
  });
