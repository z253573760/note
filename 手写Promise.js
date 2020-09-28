const STATUS_PENDING = 'pending'
const STATUS_FULFILLED = 'fulfilled'
const STATUS_REJECTED = 'rejected'


class Promise {
  constructor(fn) {
    this.status = STATUS_PENDING
    this.value = undefined
    this.reason = undefined
    this.cb1 = []
    this.cb2 = []
    const reslove = res => {
      if (this.status === STATUS_PENDING) {
        this.value = res
        this.status = STATUS_FULFILLED
        this.cb1.forEach(cb => cb())
      }
    }
    const rejected = reason => {
      if (this.status === STATUS_PENDING) {
        this.reason = reason
        this.status = STATUS_REJECTED
        this.cb2.forEach(cb => cb())
      }
    }
    try {
      fn(reslove, rejected)
    } catch (err) {
      rejected(err)
    }
  }
  finally(fn) {
    return this.then((res) => {
      fn()
      return this
    }, err => {
      fn()
      return this
    })

  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === "function" ? onFulfilled : v => v
    onRejected = typeof onRejected === "function" ? onRejected : v => v
    const p = new Promise((reslove, reject) => {
      if (this.status === STATUS_PENDING) {
        this.cb1.push(() => {
          setTimeout(() => {
            const x = onFulfilled(this.value)
            reslovePromise(p, x, reslove, reject)
          }, 0);
        })
        this.cb2.push(() => {
          setTimeout(() => {
            const x = onRejected(this.reason)
            reslovePromise(p, x, reslove, reject)
          }, 0);
        })
      }
      if (this.status === STATUS_FULFILLED) {
        setTimeout(() => {
          const x = onFulfilled(this.value)
          reslovePromise(p, x, reslove, reject)
        }, 0);
      }
      if (this.status === STATUS_REJECTED) {
        setTimeout(() => {
          const x = onRejected(this.reason)
          reslovePromise(p, x, reslove, reject)
        }, 0);
      }
    })
    return p
  }

  catch (fn) {
    return this.then(null, fn)
  }
  static reject(err) {
    return new Promise((_, reject) => reject(err))
  }
  static reslove(res) {
    return new Promise((r) => r(res))
  }
  static all(list) {
    if (!Array.isArray(list)) {
      return Promise.reject(new TypeError('类型错误'))
    }
    return new Promise((reslove, reject) => {
      const result = []
      let index = 0
      for (let i = 0; i < list.length; i += 1) {
        const item = list[i]
        if (!(item instanceof Promise)) {
          result[i] = item
          index += 1
          if (index === list.length) {
            reslove(result)
          }
          continue
        }
        item.then(res => {
          result[i] = res
          index += 1
          if (index === list.length) {
            reslove(result)
          }
        }, err => {
          reject(err)
        })
      }
    })
  }
  static allSettled(list) {
    if (!Array.isArray(list)) {
      return Promise.reject(new TypeError('类型错误'))
    }
    const result = []
    let index = 0
    return new Promise((reslove, reject) => {
      for (let i = 0; i < list.length; i += 1) {
        let item = list[i]
        if (!(item instanceof Promise)) {
          item = new Promise((reslove) => reslove(item))
        }
        item.then(() => {
          result[i] = {
            status: item.status,
            value: item.value
          }
          index += 1
          if (index === list.length) {
            reslove(result)
          }
        }, () => {
          result[i] = {
            status: item.status,
            reason: item.reason
          }
          index += 1
          if (index === list.length) {
            reslove(result)
          }
        })
      }
    })
  }
}


function reslovePromise(p, x, reslove, reject) {
  if (p === x) {
    reject(new TypeError("循环引用"))
    return
  }
  if (!(x instanceof Promise)) {
    reslove(x)
    return
  }
  if (x.status === STATUS_PENDING) {
    x.then(y => {
        reslovePromise(x, y, reslove, reject)
      },
      y => {
        reject(y)
      }
    )
    return
  }
  if (x.status === STATUS_FULFILLED) {
    reslove(x.value)
    return
  }
  if (x.status === STATUS_REJECTED) {
    reject(x.reason)
    return
  }
}


function demo1() {
  const p3 = new Promise((reslove) => {
    setTimeout(() => {
      reslove(3)
    }, 5000);
  })
  const p = new Promise((reslove) => {
      setTimeout(() => {
        reslove(1)
      }, 5000);
    })
    .finally(res => {
      console.log("finally", res)
    })
    .then(res => {
      console.log('res', res)
      return "321"
    }).then(res => {
      console.log('res2', res)
      return new Promise(reslove => {
        setTimeout(() => {
          reslove(2)
        }, 5000);
      })
    }).then(res => {
      console.log('res3', res)
      return p3
    }).then(res => {
      console.log('res4', res)
      return new Promise((reslove, reject) => {
        setTimeout(() => {
          reject("err1")
        }, 5000);
      })
    })
    .then(res => {
      console.log('res5', res)
    }, err => {
      console.log('reject-err', err)
      return new Promise((reslove, reject) => {
        setTimeout(() => {
          reject("err2")
        }, 5000);
      })
    }).then(res => {
      console.log("res6", res)
    }, err => {
      console.log('reject-err2', err)
      return new Promise((reslove, reject) => {
        setTimeout(() => {
          reject("err3")
        }, 5000);
      })
    }).finally((res) => {
      console.log("end-finally", res)
    }, err => {
      console.log("err-fin", err)
    })
    .catch(err => {
      console.log("catch-err", err)
    }).then(res => {
      console.log("end", res)
    })
}

function demo2() {
  const p = (time) => new Promise((r, j) => setTimeout(() => {
    j(time)
  }, time * 1000))

  Promise.allSettled([1, 2, 3, p(4), p(5), 6]).then(res => {
    console.log("res", res)
  }, err => {
    console.log("reject", err)
  }).catch(err => {
    console.log("err", err)
  })

}
demo1()