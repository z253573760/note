// uni中的使用

/** 
 * 刷新token的请求
 */
async function refreshToken() {
  console.log("我去刷新token了 兄弟们等等我")
  const data = await request({
    url: '/auth',
    method: "post",
    data: {
      grant_type: "RefreshToken",
      refresh_token: uni.getStorageSync('refresh_token')
    }
  })
  const {
    access_token,
    refresh_token,
    expires_in
  } = data
  uni.setStorageSync('token', access_token);
  uni.setStorageSync('refresh_token', refresh_token)
  uni.setStorageSync('expires_in', `${expires_in}`) //
  uni.setStorageSync("time", `${new Date().getTime()+ expires_in}`) // 记录过期时间
  store.commit("user/SAVE", { // 替换掉当前的token
    key: "token",
    value: access_token
  })
  return data
}

/**
 * 一个对 uni.request 的简单封装
 * @param {string} method     请求的方式  get post put delete patch put
 * @param {string} url        请求的路径
 * @param {Object} data       请求的参数
 */
function request({
  method = "get",
  url,
  data = {}
}) {
  return new Promise((resolve, reject) => {
    const token = store.state.user.token;
    uni.request({
      url: BASE_URL + url,
      method: method.toUpperCase(),
      data,
      header: {
        Authorization: `Bearer ${token}`,
      },
      success(res) {
        if (res.statusCode === 401) {
          uni.reLaunch({
            url: "../login/login",
          });
        }
        if (res.statusCode > 299) {
          uni.showToast({
            title: res.data.message,
            icon: "none",
          });
          return reject(res.data);
        }
        resolve(res.data);
      },
      fail(err) {
        uni.showToast({
          title: "请求错误！",
          icon: "none",
        });
        reject(err);
      },
    });
  });
}

let lock = false // 全局锁
let refreshTokenPromise
/**
 * 主函数
 * @param {string} method     请求的方式  get post put delete patch put
 * @param {string} url        请求的路径
 * @param {Object} data       请求的参数
 */
export default async function handler({
  url,
  method = "get",
  data = {}
}) {
  const opts = {
    url,
    method,
    data
  }
  if (url === "/auth") { // 这边随意了 主要是针对不需要token的请求进行处理
    return request(opts)
  }
  // 开始正文
  // 先获取当前时间 和 过期时间 准备进行比较
  const lastTime = uni.getStorageSync("time") || 0
  const now = new Date().getTime()
  if (now > lastTime && lock === false) { //判断是否过期和是否有刷新token的动作  如果过期并且还没有开始刷新token 就开始进行刷新token的处理 
    lock = true //先上锁
    refreshTokenPromise = refreshToken() //开始刷新token 并且把刷新token的promise保存到全局
    await refreshTokenPromise //等待刷新token结束后 解锁
    lock = false
  }
  if (lock === true) { //发现有锁 说明当前的token 已经过期 并且去刷新token的异步操作还没结束
    refreshTokenPromise = refreshTokenPromise.then(() => request(opts)) //利用 promise 的队列机制 把请求添加的 全局对象的promise队列中
    return refreshTokenPromise
  }
  // token 没过期  正常请求
  return request(opts)
}
// 场景模拟
// A, B, C 三个异步请求 都需要刷新token 现在同时请求 
// 1. A进入handler函数 先上锁 并且把刷新token的promise存到全局
// 2. 与此同时B,C也跟着进来了发现 现在被锁住了 只能排在全局promise的队列后面,等待刷新token的promise结束
// 3. A由于在判断中 发现需要刷新token然后,一直在在等待刷新token的promise结束,等拿到最新的token后才继续执行
// 4. 刷新token的promise结束了,promise 队列中的B,C也跟着执行了