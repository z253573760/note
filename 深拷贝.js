function deepClone(target, map = new WeakMap()) {
  //处理正则
  if (target instanceof RegExp) {
    return new RegExp(target);
  }
  // 处理Date
  if (target instanceof Date) {
    return new Date(target);
  }
  // 处理构造函数生成的string
  if (target instanceof String) {
    return new String(target);
  }
  // 处理构造函数生成的Number
  if (target instanceof Number) {
    return new Number(target);
  }
  // 处理构造函数生成的Boolean
  if (target instanceof Boolean) {
    return new Boolean(target);
  }
  //数组处理
  if (Array.isArray(target)) {
    return cloneArray(target, map);
  }
  // 一般Object处理
  if (target !== null && typeof target === "object") {
    return cloneObject(target, map);
  }
  if (typeof target === "function") {
    return cloneFunc(target);
  }
  //基本类型处理 String,Number 之类
  return target;
}

// 拷贝数组
function cloneArray(target, map) {
  const cloneTarget = [];
  for (const item of target) {
    const res = deepClone(item, map);
    cloneTarget.push(res);
  }
  return cloneTarget;
}

// 拷贝对象
function cloneObject(target, map) {
  // 处理循环引用
  const isCopy = map.get(target);
  if (isCopy) {
    return isCopy;
  }
  const cloneTarget = {};
  map.set(target, cloneTarget);
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      const res = deepClone(target[key], map);
      cloneTarget[key] = res;
    }
  }
  return cloneTarget;
}

// 拷贝函数
function cloneFunc(target) {
  return target;
}

const target = [
  {
    a: "a",
    f() {
      console.log("f");
    },
  },
];
target[0].target = target;

const res = deepClone(target);
res[0].a = "1";
console.log(res === target);

res[0].c = 1;
res[0].target = "target";
// console.log("克隆前 target:", target);
console.log("克隆后 res:", res);
