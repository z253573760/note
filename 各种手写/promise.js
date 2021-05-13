class $Promise {
  constructor(fn) {
    this.status = "pending";
    this.value = undefined;
    this.cb1 = [];
    this.cb2 = [];
    const reslove = (value) => {
      setTimeout(() => {
        if (this.status !== "pending") return;
        this.status = "onFuilled";
        this.value = value;
        this.cb1.forEach((cb) => cb());
      });
    };
    const reject = (value) => {
      setTimeout(() => {
        if (this.status !== "pending") return;
        this.status = "onRejected";
        this.value = value;
        this.cb2.forEach((cb) => cb());
      });
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
      if (this.status === "onFullied") {
        this.cb1.push(() => {
          const x = onFuilled(this.value);
          handlerPromise(p, x, reslove, reject);
        });
      }
      if (this.status === "onRejected") {
        this.cb2.push(() => {
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
  finally(fn) {
    return this.then(
      (v) => {
        return Promise.reslove(fn()).then(() => v);
      },
      (err) => {
        return Promise.reslove(fn()).then(() => {
          throw err;
        });
      }
    );
  }
  static reslove(v) {
    return new $Promise((reslove) => {
      return reslove(v);
    });
  }

  static reject(v) {
    return new $Promise((_, reject) => {
      return reject(v);
    });
  }
  static all(list) {
    const res = [];
    let index = 0;
    return new Promise((reslove, reject) => {
      for (let i = 0; i < list.length; i += 1) {
        const item = list[i];
        if (item instanceof $Promise) {
          item.then((x) => {
            index += 1;
            res[i] = x;
            if (index === list.length) {
              reslove(res);
            }
          }, reject);
        } else {
          index += 1;
          res[i] = x;
          if (index === list.length) {
            reslove(res);
          }
        }
      }
    });
  }
}

function handlerPromise(p, x, reslove, reject) {
  if (p === x) {
    throw new TypeError("循环引用");
  }
  if (!(x instanceof $Promise)) {
    reslove(x);
    return;
  }
  if (x.status === "pending") {
    x.then((y) => {
      handlerPromise(x, y, reslove, reject);
    }, reject);
  }
  if (x.status === "onFuilled") {
    reslove(x.value);
  }
  if (x.status === "onReject") {
    reject(x.value);
  }
}

function createPromise(v) {
  return new $Promise((reslove, reject) => {
    setTimeout(() => {
      reject(v);
    }, 300);
  });
}

const fn = (v) => {
  console.log(v);
  return createPromise(v + 1);
};
createPromise(1).then(fn, fn).then(fn, fn).then(fn, fn);
// const res = $Promise
//   .all([createPromise(1), createPromise(2), createPromise(3), 4, 5])
//   .then((res) => {
//     console.log("promise-all", res);
//   });
