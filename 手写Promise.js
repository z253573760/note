// 1.Promise存在三个状态：pending（等待态）、fulfilled（成功态）、rejected（失败态）
const STATUS_PENDING = 'pending'
const STATUS_FULFILLED = 'fulfilled'
const STATUS_REJECTED = 'rejected'


class Promise {
  constructor(executor) {
    this.status = STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    // 成功存放的数组
    this.onResolvedCallbacks = [];
    // 失败存放法数组
    this.onRejectedCallbacks = [];
    const reslove = (value) => {
      if (this.status === STATUS_PENDING) {
        this.status = STATUS_FULFILLED
        this.value = value
        this.onResolvedCallbacks.forEach(cb => {
          cb(this.value)
        })
      }
    }
    const reject = (reason) => {
      if (this.status === STATUS_PENDING) {
        this.status = STATUS_REJECTED
        this.reason = reason
        this.onRejectedCallbacks.forEach(cb => this.value = cb(this.reason))
      }
    }
    try {
      executor(reslove, reject)
    } catch (err) {
      reject(err)
    }
  }
  then(onFulfilled, onRejected) {
    // 这边要开始实现链式调用了  *链式调用的几个核心
    // 1 then方法返回的必须是一个promise，这样才能保证链式调用。
    // 2 如果then内部的回调函数执行结果依然是一个promise那就把这个promise的结果resolve出去。
    // 3 任何一个promise必须是resolve之后才能走到它then方法，从而创建下一个的promise。
    // 4 什么时候走成功回调？then中返回一个普通值或者一个成功的promise
    // 5 什么时候走失败回调？返回一个失败的promise，或者抛出异常
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value
    onRejected = typeof onRejected === "function" ? onRejected : reason => reason
    const p2 = new Promise((reslove, reject) => {
      if (this.status === STATUS_FULFILLED) {
        setTimeout(() => { // setTimeout 是为了保证 P2已经执行完毕 在这里可以拿到P2的实例
          try {
            const x = onFulfilled(this.value)
            // x为2种情况我们需要处理,1种是promise对象,1种是普通值
            // 1.如果x是promise对象,我们需要等待promise的状态更改成 非STATUS_PENDING后再继续执行
            resolvePromise(p2, x, reslove, reject);
          } catch (err) {
            reject(err)
          }
        }, 0);
      }
      if (this.status === STATUS_REJECTED) {
        onRejected(this.reason)
      }
      if (this.status === STATUS_PENDING) {
        this.onResolvedCallbacks.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              resolvePromise(p2, x, reslove, reject);
            } catch (err) {
              reject(err)
            }
          }, 0);
        })
        this.onRejectedCallbacks.push(() => onRejected(this.reslove))
      }
    })

    return p2

  }
}
/**
 * 实现链式调用
 * @param {*} promise2  就是新生成的promise
 * @param {*} x         我们要处理的目标
 * @param {*} reslove   promise2的resolve, 执行之后promise2的状态就变为成功了，就可以在它的then方法的成功回调中拿到最终结果
 * @param {*} reject    promise2的reject, 执行之后promise2的状态就变为失败，在它的then方法的失败回调中拿到失败原因
 */
function resolvePromise(promise2, x, reslove, reject) {
  //循环引用 规避
  if (promise2 === x) {
    return reject(new TypeError("循环引用"))
  }

  if (x instanceof Promise) { // 如果x是一个promise
    if (x.state === STATUS_PENDING) { //
      x.then(y => {
        resolvePromise(promise2, y.reslove, reject)
      }, reason => {
        reject(reason)
      })
    } else {
      x.then(reslove, reject)
    }
    return
  }
  reslove(x)
}

const b = (x) => new Promise((reslove, reject) => {
  setTimeout(() => {
    reslove("拉拉啊了" + x)
  }, 3000);
})


b(1).then(res => {
  console.log('res1', res)
  return b(2)
}).then(res => {
  console.log('res2', res)
  return "返回一个普通值"
}).then((res) => {
  console.log('res3', res)
})
// .then(res => {
//   console.log('res2', res)
//   return b(3)
// })
// .then(res => {
//   console.log('res3', res)
//   return b(4)
// })