// 字节：输出以下代码运行结果，为什么？如果希望每隔 1s 输出一个结果，应该如何改造？注意不可改动 square 方法
const list = [1, 2, 3];
const square = (num) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(num * num);
    }, 1000);
  });
};

function test() {
  list.forEach(async (x) => {
    const res = await square(x);
    console.log(res);
  });
}
test();

function test2() {
  let p = Promise.resolve();
  for (const item of list) {
    p = p.then(() => square(item).then(console.log));
  }
}
test2();

async function test3() {
  for (const item of list) {
    const res = await square(item);
    console.log(res);
  }
}
test3();

function test4() {
  class Schedule {
    constructor() {
      this.list = [];
      this.status = "waiting";
    }
    add(fn) {
      this.list.push(fn);
      if (this.status === "waiting") {
        this.run();
      }
    }
    async run() {
      this.status = "running";
      while (this.list.length) {
        const task = this.list.shift();
        await task();
      }
      this.status = "waiting";
    }
  }
  const schedule = new Schedule();
  for (const item of list) {
    schedule.add(() => square(item).then(console.log));
  }
}
test4();
