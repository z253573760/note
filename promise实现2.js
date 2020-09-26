const STATUS_PENDING = 'pending'
const STATUS_FULFILLED = 'fulfilled'
const STATUS_REJECTED = 'rejected'


function Promise(fn) {
  this.value = void 0
  this.reason = void 0
  this.status = STATUS_PENDING
  this.cbs1 = []
  this.cbs2 = []
  const reslove = res => {
    if (this.status === STATUS_PENDING) {
      this.value = res
      this.status = STATUS_FULFILLED
      this.cbs1.forEach(cb => cb(this.value))
    }
  }
  const reject = res => {
    this.reason = res
    this.status = STATUS_REJECTED
    this.cbs1.forEach(cb => cb(this.reason))
  }
  try {
    fn(reslove, reject)
  } catch (err) {
    reject(err)
  }
}

Promise.prototype.then = function (onFulfilled, onRejected) {
  onFulfilled = typeof onFulfilled === "function" ? onFulfilled : value => value
  onRejected = typeof onRejected === "function" ? onRejected : reason => reason
  const p = new Promise((reslove, reject) => {
    if (this.status === STATUS_PENDING) {
      this.cbs1.push(
        () => {
          setTimeout(() => {
            const x = onFulfilled(this.value)
            reslovePromise(p, x, reslove, reject)
          });
        }
      )
      if (this.status === STATUS_FULFILLED) {
        setTimeout(() => {
          const x = onFulfilled(this.value)
          reslovePromise(p, x, reslove, reject)
        });
      }
    }
  })
  return p
}

Promise.prototype.catch = function name(cb) {
  return this.then(null, cb)
}

Promise.all = function name(list) {
  return new Promise((reslove, reject) => {
    const arr = []
    let count = 0
    for (let i = 0; i < list.length; i += 1) {
      const item = list[i]
      item.then(res => {
        arr[i] = res
        count += 1
        if (count === list.length) {
          reslove(arr)
          return
        }
      }).catch(err => reject(err))
    }
  })
}

function reslovePromise(p, x, reslove, reject) {
  if (p === x) {
    reject(new TypeError("循环引用"))
    return
  }
  if (x instanceof Promise) {
    if (x.status === STATUS_PENDING) {
      x.then(y => {
        reslovePromise(p, y, reslove, reject)
      })
    } else if (x.status === STATUS_FULFILLED) {
      reslove(x.value);
    }
    return
  }
  reslove(x)
}

const p = (val) => new Promise((reslove, reject) => {
  setTimeout(() => {
    reslove(val)
  }, val * 1000);
})
// const p = new Promise((reslove) => {
//     setTimeout(() => {
//       reslove(1)
//     }, 5000);
//   }).then(res => {
//     console.log('res', res)
//     return "321"
//   }).then(res => {
//     console.log('res2', res)
//     return new Promise(reslove => {
//       setTimeout(() => {
//         reslove(2)
//       }, 5000);
//     })
//   }).then(res => {
//     console.log('res3', res)
//     return p3
//   }).then(res => {
//     console.log('res4', res)

//   })
//   .then(res => {
//     console.log('res5', res)

//   })
//   .then(res => {
//     console.log('res6', res)
//   })

const list = [
  p(1), p(2), p(3)
]
Promise.all(list).then(res => {
  console.log('res', res)
})