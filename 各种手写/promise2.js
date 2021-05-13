class Promise {
  constructor(fn) {
    this.value = undefined;
    this.status = "pending";
    this.cb1 = [];
    this.cb2 = [];
    const reslove = (value) => {
      setTimeout(() => {
        if (this.status === "pending") {
          this.value = value;
          this.status = "onFullied";
          this.cb1.forEach((cb) => cb());
        }
      }, 0);
    };
    const reject = (value) => {
      setTimeout(() => {
        if (this.status === "pending") {
          this.value = value;
          this.status = "onRejected";
          this.cb2.forEach((cb) => cb());
        }
      }, 0);
    };
    try {
      fn(reslove, reject);
    } catch (err) {
      reject(err);
    }
  }
  then(onFullied = (v) => v, onRejected = (v) => v) {
    const p = new Promise((reslove, reject) => {
      if (this.status === "pending") {
        this.cb1.push(() => {
          setTimeout(() => {
            const x = onFullied(this.value);
            handlerPromise(p, x, reslove, reject);
          }, 0);
        });
        this.cb2.push(() => {
          setTimeout(() => {
            const x = onRejected(this.value);
            handlerPromise(p, x, reslove, reject);
          }, 0);
        });
      }
      if (this.status === "onFullied") {
        this.cb1.push(() => {
          setTimeout(() => {
            const x = onFullied(this.value);
            handlerPromise(p, x, reslove, reject);
          }, 0);
        });
      }
      if (this.status === "onRejected") {
        this.cb1.push(() => {
          setTimeout(() => {
            const x = onRejected(this.value);
            handlerPromise(p, x, reslove, reject);
          }, 0);
        });
      }
    });
    return p;
  }
  catch(fn) {
    return this.then(null, fn);
  }
  fianlly(fn) {
    return this.then(
      (x) => {
        return Promise.resolve(fn()).then(x);
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
    throw new TypeError("循环错误");
  }
  if (!(x instanceof Promise)) {
    reslove(x);
    return;
  }
  let called;
  if ((x !== null && typeof x === "object") || typeof x === "function") {
    try {
      const then = x.then;
      if (typeof then === "function") {
        then.call(
          x,
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
    } catch (err) {
      if (called) return;
      called = true;
      reject(err);
    }
  }
  // if (x.status === "pending") {
  //   x.then(
  //     (y) => {
  //       handlerPromise(x, y, reslove, reject);
  //     },
  //     (y) => {
  //       reject(y);
  //     }
  //   );
  // }
  // if (x.status === "onFullied") {
  //   reslove(x.value);
  // }
  // if (x.status === "onRejected") {
  //   reject(x.value);
  // }
}

const createPromise = (x) =>
  new Promise((reslove, reject) => {
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
console.log("start");

async function a() {
  console.log(1);
  await console.log(2);
  console.log(3);
}
a();
console.log(4);
