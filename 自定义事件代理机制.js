/**
 * 事件处理  接受一个队列 按顺序执行队列中的事件
 *  
 */
class HandlerEventQueue {
  constructor(queue, name, time = 2000) {
    this.time = time
    this.name = name || "未命名事件"
    this.queue = queue || []
    this.isGoing = false
    this.cache = []
    this.args = []
  }
  async start(...args) {
    this.args = [...args]
    this.cache = [...this.queue]
    this.isGoing = true
    while (this.isGoing && this.cache.length) {
      await new Promise((r) => setTimeout(r, this.time))
      const cb = this.cache.shift()
      await cb(...args)
    }
    this.isGoing = false
  }
  suspend() {
    this.isGoing = false
  }
  async continue () {
    this.isGoing = true
    while (this.isGoing && this.cache.length) {
      await new Promise((r) => setTimeout(r, this.time))
      const cb = this.cache.shift()
      await cb(...this.args)
    }
    this.isGoing = false
  }
  stop() {
    this.isGoing = false
    this.cache = []
  }
  static watch(target, key, cb) {
    let value = target[key]

    Object.defineProperty(target, key, {
      get() {
        return value
      },
      set(newVal) {
        if (newVal === value) return
        value = newVal
        cb(target, newVal)
      }
    })
  }
}

const steps = Array.from({
  length: 20
}, (v, k) => () => console.log(k));

// 报数 打印1-20
const countOff = new HandlerEventQueue(steps)
HandlerEventQueue.watch(countOff, "isGoing", (target, newVal) => {
  console.log("当前事件对象的状态改变了:", newVal)
  console.log(`当前队列还剩下${target.cache.length}件`)
})

async function main() {
  countOff.start()
  await new Promise((r) => setTimeout(r, 2000))
  countOff.suspend()
  await new Promise((r) => setTimeout(r, 2000))
  countOff.continue()
  // await new Promise((r) => setTimeout(r, 2000))
  // countOff.suspend()
  // await new Promise((r) => setTimeout(r, 4000))

  // countOff.continue()
  // await new Promise((r) => setTimeout(r, 2000))
  // countOff.suspend()
  // await new Promise((r) => setTimeout(r, 5000))
  // countOff.continue()
  // await new Promise((r) => setTimeout(r, 2000))
  // countOff.suspend()
  // await new Promise((r) => setTimeout(r, 6000))
  // countOff.continue()
}
main()