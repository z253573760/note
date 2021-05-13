class Scheduler {
  constructor(max = 2) {
    this.max = max;
    this.count = 0;
    this.queue = [];
  }
  async push(promiseFn) {
    const obj = {
      fn: promiseFn,
    };
    const p = new Promise((reslove, reject) => {
      obj.reslove = reslove;
      obj.reject = reject;
    });
    this.queue.push(obj);
    this.run();
    return p;
  }
  run() {
    if (this.count >= this.max) return;
    const current = this.queue.shift();
    if (!current) return;
    this.count += 1;
    current
      .fn()
      .then(
        (res) => {
          current.reslove(res);
        },
        (err) => {
          current.reject(err);
        }
      )
      .finally(() => {
        this.count -= 1;
        this.run();
      });
  }
}

// const queue = new Scheduler();
// const createPromise = (x) =>
//   new Promise((reslove) => {
//     setTimeout(() => {
//       reslove(x);
//     }, x * 1000);
//   }).then((res) => {
//     //   console.log("res", res);
//     return res;
//   });

// queue
//   .push(() => createPromise(3))
//   .then((res) => {
//     console.log("push", res);
//   });
// const p2 = queue
//   .push(() => createPromise(10))
//   .then((res) => {
//     console.log("push", res);
//   });
// const p3 = queue
//   .push(() => createPromise(2))
//   .then((res) => {
//     console.log("push", res);
//   });
// const p4 = queue
//   .push(() => createPromise(4))
//   .then((res) => {
//     console.log("push", res);
//   });
// const p5 = queue
//   .push(() => createPromise(1))
//   .then((res) => {
//     console.log("push", res);
//   });

// start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout

const p = function () {
  return new Promise((reslove) => {
    const p1 = new Promise((reslove) => {
      setTimeout(() => {
        reslove(1);
      });
      reslove(2);
    });
    p1.then(console.log);
    console.log(3);
    reslove(4);
  });
};
p().then(console.log);
