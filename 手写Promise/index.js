const STATUS_PENDING = "pending";
const STATUS_FULFILLED = "fulfilled";
const STATUS_REJECTED = "rejected";

const status = Symbol("[[PromiseState]]");
const result = Symbol("[[PromiseResult]]");
function isFunction(fn) {
  return typeof fn === "function";
}
const map = new WeakMap();

function Promise(executor) {
  if (!(this instanceof Promise)) {
    throw Error("[promise-err] : must be new ");
  }
  if (!isFunction(executor)) {
    throw TypeError(
      `[promise-err] : Promise resolver ${executor} must be a function`
    );
  }

  this[status] = STATUS_PENDING;
  this[result] = undefined;
  map.set(this, {
    resloveCbs: [],
    rejectCbs: [],
  });
  const reslove = (res) => {
    if (this[status] !== STATUS_PENDING) return;
    this[status] = STATUS_FULFILLED;
    this[result] = res;
    map.get(this).resloveCbs.forEach((cb) => cb(res));
  };
  const reject = (reason) => {
    if (this[status] !== STATUS_PENDING) return;
    this[status] = STATUS_REJECTED;
    this[result] = reason;
    map.get(this).rejectCbs.forEach((cb) => cb(reason));
  };

  try {
    executor(reslove, reject);
  } catch (err) {
    reject(err);
  }
}
function reslovePromise(p, x, reslove, reject) {
  if (p === x) {
    reject(new TypeError("循环引用"));
    return;
  }
  if (!(x instanceof Promise)) {
    reslove(x);
    return;
  }
  if (x[status] === STATUS_PENDING) {
    x.then(
      (y) => {
        reslovePromise(x, y, reslove, reject);
      },
      (y) => {
        reject(y);
      }
    );
    return;
  }
  if (x[status] === STATUS_FULFILLED) {
    reslove(x[ressult]);
    return;
  }
  if (x[status] === STATUS_REJECTED) {
    reject(x[ressult]);
    return;
  }
}
Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : (val) => val;
  onRejected = typeof onRejected === "function" ? onRejected : (val) => val;
  const p = new Promise((reslove, reject) => {
    if (this[status] === STATUS_PENDING) {
      map.get(this).resloveCbs.push(() => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this[result]);
            reslovePromise(p, x, reslove, reject);
          } catch (err) {
            rejects(err);
          }
        }, 0);
      });
      map.get(this).rejectCbs.push(() => {
        setTimeout(() => {
          try {
            const x = onRejected(this[result]);
            reslovePromise(p, x, reslove, reject);
          } catch (err) {
            rejects(err);
          }
        }, 0);
      });
    } else if (this[status] === STATUS_FULFILLED) {
      map.get(this).resloveCbs.push(() => {
        setTimeout(() => {
          try {
            const x = onFulfilled(this[result]);
            reslovePromise(p, x, reslove, reject);
          } catch (err) {
            rejects(err);
          }
        }, 0);
      });
    } else if (this[status] === STATUS_REJECTED) {
      map.get(this).resloveCbs.push(() => {
        setTimeout(() => {
          try {
            const x = onRejected(this[result]);
            reslovePromise(p, x, reslove, reject);
          } catch (err) {
            reject(err);
          }
        }, 0);
      });
    }
  });
  return p;
};

Promise.prototype.catch = function (fn) {
  fn = typeof fn === "function" ? fn : (v) => v;
  return this.then(null, fn);
};

Promise.prototype.finally = function (fn) {
  fn = typeof fn === "function" ? fn : (v) => v;
  return this.then(
    (res) => Promise.reslove(fn()).then(() => res),
    (err) =>
      Promise.reslove(fn()).then(() => {
        throw err;
      })
  );
};

Promise.reslove = function (res) {
  return new Promise((r) => r(res));
};
Promise.reject = function (res) {
  return new Promise((_, reject) => reject(res));
};
Promise.all = function (list) {
  return new Promise((reslove, reject) => {
    if (!list[Symbol.iterator]) {
      reject(TypeError(`[promise-err] :${list} is not iterable `));
    }
    const result = [];
    let count = 0;
    for (let i = 0; i < list.length; i += 1) {
      const item = list[i];
      if (!(item instanceof Promise)) {
        result[i] = item;
        count += 1;
        if (count === list.length) {
          reslove(result);
        }
      } else {
        item.then(
          (res) => {
            result[i] = res;
            count += 1;
            if (count === list.length) {
              reslove(result);
            }
          },
          (err) => {
            reject(err);
          }
        );
      }
    }
  });
};
Promise.race = function (list) {
  return new Promise((reslove, reject) => {
    if (!list[Symbol.iterator]) {
      reject(TypeError(`[promise-err] :${list} is not iterable `));
    }
    for (const item of list) {
      if (!(item instanceof Promise)) {
        reslove(item);
      } else {
        item.then(
          (res) => {
            reslove(res);
          },
          (err) => {
            reject(err);
          }
        );
      }
    }
  });
};

Promise.allSelected = function (list) {
  return new Promise((reslove, reject) => {
    if (!list[Symbol.iterator]) {
      reject(TypeError(`[promise-err] :${list} is not iterable `));
    }
    const result = [];
    let count = 0;
    for (let i = 0; i < list.length; i += 1) {
      const item = list[i];
      if (!(item instanceof Promise)) {
        result[i] = {
          status: STATUS_FULFILLED,
          value: item,
        };
        count += 1;
        if (count === list.length) {
          reslove(result);
        }
      } else {
        item.then(
          (res) => {
            result[i] = {
              status: STATUS_FULFILLED,
              value: res,
            };
            count += 1;
            if (count === list.length) {
              reslove(result);
            }
          },
          (err) => {
            result[i] = {
              status: STATUS_REJECTED,
              value: err,
            };
            count += 1;
            if (count === list.length) {
              reslove(result);
            }
          }
        );
      }
    }
  });
};

Promise.any = function (list) {
  return new Promise((reslove, reject) => {
    if (!list[Symbol.iterator]) {
      reject(TypeError(`[promise-err] :${list} is not iterable `));
    }
    let count = 0;
    for (const item of list) {
      if (item instanceof Promise) {
        item.then(
          (res) => {
            reslove(res);
          },
          () => {
            count += 1;
            if (count === list.length) {
              reject(
                `[promise-err] : AggregateError: No Promise in Promise.any was resolved`
              );
            }
          }
        );
      } else {
        reslove(item);
      }
    }
  });
};

module.exports = Promise;
