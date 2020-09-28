let res
class Middleware {
  constructor(cb) {
    this.cache = []
    this.middlewares = []
    this.cb = cb
  }
  use(fn) {
    if (typeof fn === "function") {
      this.cache.push(fn)
    }
    return this
  }
  async next(params) {
    const $middlewares = this.middlewares
    if ($middlewares.length) {
      const ware = $middlewares.shift()
      return await ware.call(this, params, this.next.bind(this, params))
    }
    res = await this.cb(params)
    return res
  }
  execute = async (params) => {
    this.middlewares = this.cache.map(fn => fn);
    await this.next(params)
    const result = {
      ...res
    }
    res = null
    return result
  }
}

const middleware = new Middleware(async (params) => {
  console.log("我是洋葱最里层 下面没东西了", params)
  return {
    res: "我是结果"
  }
})
middleware.use(bar1).use(bar2).use(bar3)


async function bar1(otps, next) {
  console.log("bar1中间件", otps)
  // return {
  //   res: "中间件1 终止了"
  // }
  await next()
  console.log("bar1 中间件结束")
}

async function bar2(otps, next) {
  console.log("bar2中间件", otps)
  await next()
  console.log("bar2 中间件结束")
}

async function bar3(otps, next) {
  console.log("bar3中间件", otps)
  await next()
  console.log("bar3 中间件结束")
}

const demo = async () => {
  const data1 = await middleware.execute({
    url: "/ad"
  })
  console.log('data', data1)
}
demo()