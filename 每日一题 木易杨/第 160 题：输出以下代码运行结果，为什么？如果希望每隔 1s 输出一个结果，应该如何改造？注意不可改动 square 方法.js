// 第 160 题：输出以下代码运行结果，为什么？
// 如果希望每隔 1s 输出一个结果，应该如何改造？注意不可改动 square 方法

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

// while 循环
async function test1() {
  while (list.length) {
    const num = list.shift();
    const res = await square(num);
    console.log(res);
  }
}
// 传统的for
async function test2() {
  for (const item of list) {
    const res = await square(item);
    console.log(res);
  }
}

// promise 队列
async function test3() {
  let p = Promise.resolve();
  for (let i = 0; i < list.length; i += 1) {
    p = p.then(() => square(list[i])).then((res) => console.log(res));
  }
}

test3();
