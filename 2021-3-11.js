const str = "basasdsfsdfsaaaa";
function bar(str) {
  const map = {};
  let max = 0;
  let index = -1;
  for (let i = 0; i < str.length; i += 1) {
    const item = str[i];
    if (!map[item]) {
      map[item] = {
        index: i,
        count: 0,
      };
    }
    map[item].count += 1;
    const count = map[item].count;
    if (count > max) {
      max = count;
      index = map[item].index;
    }
  }
  return { map, index, max };
}

function foo() {
  const currentTime = new Date().getTime();
  const lastTime = new Date("2022-1-1").getTime();
  let diff = lastTime - currentTime;
  const d = 24 * 60 * 60 * 1000;
  const day = parseInt(diff / d);
  diff = diff % d;
  const hour = diff / 60 / 60 / 1000;
  diff = diff % (60 * 60 * 1000);
  const min = diff / 60 / 1000;
  diff = diff % (60 * 1000);
  const second = diff / 1000;
  const str = `${parseInt(day)}天${parseInt(hour)}小时${parseInt(
    min
  )}分${parseInt(second)}秒`;
  return str;
}

setInterval(() => {
  const res = foo();
  console.log(res);
}, 1000);

function Foo() {
  getName = function () {
    console.log(1);
  };
  return this;
}
Foo.getName = function () {
  console.log(2);
};
Foo.prototype.getName = function () {
  console.log(3);
};

var getName = function () {
  console.log(4);
};

function getName() {
  console.log(5);
}

Foo.getName();
getName();
Foo().getName();
getName();

new Foo().getName();
new Foo().getName();
