// LOW 
const eventBus = () => ({
  $on(event, fn) {
    if (!this[event]) {
      this[event] = []
    }
    this[event].push(fn)
  },
  $emit(event, ...args) {
    if (!this[event]) return
    const list = [...this[event]]
    list.forEach(cb => cb(...args));
  },
  // vm.$off( [event, callback] )
  // 用法：
  // 移除自定义事件监听器。
  // 如果没有提供参数，则移除所有的事件监听器；
  // 如果只提供了事件，则移除该事件所有的监听器；
  // 如果同时提供了事件与回调，则只移除这个回调的监听器。
  $off(event, fn) {
    if (!arguments.length) {
      //其实就是初始化 或者 循环清除掉当前的 event 的 key 
      //这边方便理解 懒得秀 就有lowB方式写
      Object.keys(this).forEach(item => {
        if (item === "$on") return
        if (item === "$off") return
        if (item === "$emit") return
        this[item] = []
      })
      return
    }
    if (!fn) {
      this[event] = []
      return
    }
    const cbs = this[event]
    const newCbs = []
    for (const cb of cbs) {
      if (cb !== fn) newCbs.push(cb)
    }
    this[event] = newCbs
  },
})


const vm = eventBus()

vm.$on("move", (name) => {
  console.log(name + '正在move')
})
const fn1 = (name) => {
  console.log(name + '正在move2')
}
vm.$on("move", fn1)
vm.$emit("move", "小明")
vm.$emit("move", "小红")
vm.$off("move", fn1)
vm.$emit("move", "小明")
vm.$emit("move", "小红")
vm.$emit("move", "小明")
vm.$emit("move", "小红")
vm.$emit("move", "小明")
vm.$emit("move", "小红")