// 第 56 题：要求设计 LazyMan 类，实现以下功能。
// LazyMan("Tony");
// Hi I am Tony
// LazyMan("Tony").sleep(10).eat("lunch");
// // Hi I am Tony
// // 等待了10秒...
// // I am eating lunch

// LazyMan("Tony").eat("lunch").sleep(10).eat("dinner");
// // Hi I am Tony
// // I am eating lunch
// // 等待了10秒...
// // I am eating diner

// LazyMan("Tony")
//   .eat("lunch")
//   .eat("dinner")
//   //.sleepFirst(5)
//   .sleep(10)
//   .eat("junk food");
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food

// start

function LazyMan(name) {
  if (!(this instanceof LazyMan)) {
    return new LazyMan(name);
  }
  console.log(`Hi I am ${name}`);
  this.name = name;
  this.queue = [];
  this.isGoing = false;
  setTimeout(() => this.run(), 0);
}

LazyMan.prototype.eat = function (food) {
  const fn = () => console.log(`I am eating ${food}`);
  this.queue.push(fn);
  return this;
};
LazyMan.prototype.run = async function () {
  if (this.isGoing) return;
  this.isGoing = true;
  while (this.queue.length) {
    const cb = this.queue.shift();
    await cb();
  }
  this.isGoing = false;
  return this;
};
LazyMan.prototype.sleep = function (time) {
  const fn = () => new Promise((r) => setTimeout(r, time * 1000));
  this.queue.push(fn);
  return this;
};
LazyMan.prototype.sleepFirst = function (time) {
  const fn = () => new Promise((r) => setTimeout(r, time * 1000));
  this.queue.unshift(fn);
  return this;
};
LazyMan("Tony");
// Hi I am Tony
LazyMan("Tony").sleep(10).eat("lunch");
// Hi I am Tony
// 等待了10秒...
// I am eating lunch

LazyMan("Tony").eat("lunch").sleep(10).eat("dinner");
// Hi I am Tony
// I am eating lunch
// 等待了10秒...
// I am eating diner

LazyMan("Tony")
  .eat("lunch")
  .eat("dinner")
  .sleepFirst(5)
  .sleep(10)
  .eat("junk food");
// Hi I am Tony
// 等待了5秒...
// I am eating lunch
// I am eating dinner
// 等待了10秒...
// I am eating junk food
