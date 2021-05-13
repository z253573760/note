Function.prototype.$call = function (ctx, ...args) {
  const obj = Object.create(ctx);
  obj.fn = this;
  const res = obj.fn(...args);
  delete obj.fn;
  return res;
};

Function.prototype.$bind = function (ctx, ...oldArgs) {
  const obj = Object.create(ctx);
  obj.fn = this;
  return (...args) => {
    oldArgs.push(...args);
    return obj.fn(...oldArgs);
  };
};

// function Father(name) {
//   this.type = "Father";
//   this.name = name;
// }
// function Son(name) {
//   Father.call(this, name);
//   this.type = "son";
// }
// Father.prototype.sayName = function () {
//   console.log("say", this.name);
// };
// Son.prototype.sayAge = function () {
//   console.log("age", 3221);
// };
// Son.prototype = Object.create({
//   ...Father.prototype,
//   ...Son.prototype,
//   constructor: Son,
// });

// const son = new Son("123");

// son.sayName();
// son.sayAge();
