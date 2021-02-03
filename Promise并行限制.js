// JS实现一个带并发限制的异步调度器Scheduler，保证同时运行的任务最多有两个。
// 完善下面代码的Scheduler类，使以下程序能够正常输出：
class Scheduler {
  constructor(maxCount = 2) {
    this.maxCount = maxCount;
    this.count = 0;
    this.cache = [];
  }
  add(promiseCreator) {
    this.cache.push(promiseCreator);
    this.run();
    return promiseCreator;
  }
  async run() {
    if (!this.cache.length) return;
    if (this.count >= this.maxCount) return;
    this.count += 1;
    const cb = this.cache.shift();
    cb().finally(() => {
      this.count--;
      this.run();
    });
  }
}

const timeout = (time) =>
  new Promise((resolve) => {
    setTimeout(resolve, time);
  });

const scheduler = new Scheduler();

const addTask = (time, order) => {
  scheduler.add(() => timeout(time).then(() => console.log(order)));
};

addTask(1000, "1");
addTask(500, "2");
addTask(300, "3");
addTask(400, "4");
// output: 2 3 1 4
