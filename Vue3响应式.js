function isObject(target) {
  return typeof target === "object" && target !== null
}
/* 建立响应式数据 */
function reactive(target) {
  if (!isObject(target)) return target
  return new Proxy(target, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver)
      track(target, key)
      return reactive(res)
    },
    set(target, key, val, receiver) {
      const oldVal = target[key]
      const res = Reflect.set(target, key, val, receiver)
      if (oldVal === val) return res
      trigger(target, key)
      return res
    },
    deleteProperty(target, key) {
      const ret = Reflect.deleteProperty(target, key)
      return ret
    },
  })
}
const effectStack = []
/* 声明响应函数cb(依赖响应式数据) */
function effect(cb) {
  const effect = function () {
    effectStack.push(effect)
    cb()
    effectStack.pop()
    return cb
  }
  effect()
}


const targetMap = new WeakMap()
/* 依赖收集：建立 数据&cb 映射关系 */
function track(target, key) {
  // console.log('依赖收集：建立 数据&cb 映射关系')
  const effectFn = effectStack[effectStack.length - 1]
  if (!effectFn) return
  let depsMap = targetMap.get(target)
  if (!depsMap) {
    depsMap = new Map()
    targetMap.set(target, depsMap)
  }
  let deps = depsMap.get(key)
  if (!deps) {
    deps = new Set()
    depsMap.set(key, deps)
  }
  deps.add(effectFn)
}
/* 触发更新：根据映射关系，执行cb */
function trigger(target, key) {
  //console.log('触发更新：根据映射关系，执行cb ')
  const depsMap = targetMap.get(target)
  if (depsMap) {
    const deps = depsMap.get(key)
    if (deps) {
      deps.forEach(effect => effect())
    }
  }
}
const obj = {
  a: "A",
  B: {
    c: "c"
  },
  list: [1, 2, 3, 45, 8]
}
const vm = reactive(obj)
effect(() => {
  vm.a
  vm.B
  console.log("我是副作用", effectStack)
})
effect(() => {
  vm.B
  console.log(effectStack)
  console.log("我是副作用2", effectStack)
})
vm.B = "3212312"
console.log(effectStack)