function clone(target, map = new WeakMap()) {
  //数组处理
  if (Array.isArray(target)) {
    return cloneArray(target, map)
  }
  // 一般Object处理
  if (target !== null && typeof target === "object") {
    return cloneObject(target, map)
  }
  if (typeof target === "function") {
    return cloneFunc(target)
  }
  //基本类型处理 String,Number 之类
  return target
}

// 拷贝数组
function cloneArray(target, map) {
  // 处理循环引用
  const res = map.get(target)
  if (res) {
    return res
  }
  const cloneTarget = []
  for (const item of target) {
    const res = clone(item, map)
    cloneTarget.push(res)
  }
  map.set(target, cloneTarget)
  return cloneTarget
}



// 拷贝对象
function cloneObject(target, map) {
  // 处理循环引用
  const res = map.get(target)
  if (res) {
    return res
  }
  const cloneTarget = {};
  for (const key in target) {
    cloneTarget[key] = target[key]
  }
  map.set(target, cloneTarget)
  return cloneTarget;
}


// 拷贝函数
function cloneFunc(target) {
  return target
}





const a = {
  fn() {
    console.log("this", this.b)
  },
  b: "b"
}

const res = clone(a)
res.b = "vvvv"




a.fn.call({
  c: "C"
})

res.fn.call({
  c: "C"
})






// const target = [{
//   a: "a",
//   f() {
//     console.log("f")
//   }
// }]
// target[0].target = target

// const res = clone(target)
// // res[0].a = "1"
// console.log(res === target)
// console.log('克隆后 res:', res)
// console.log('克隆前 target:', target)