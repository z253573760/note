import handler from "/handler"

/**
 * RUNTIME ERROR
 */
window.onerror = function (message, url, lineno, columnNo, error) {
  const lowCashMessage = message.toLowerCase()
  if (lowCashMessage.indexOf('script error') > -1) {
    return
  }
  const detail = {
    url: url,
    filename: filename,
    columnNo: columnNo,
    lineno: lineno,
    stack: error.stack,
    message: message
  }
  handler(detail)
}

/**
 * 资源加载异常
 */
window.addEventListener('error', event => {
  if (event.target instanceof HTMLElement) {
    const target = parseDom(event.target, ['src']);
    const detail = {
      target: target,
      path: parseXPath(target),
    }
    handler(detail)
  }
}, true)



/**
 * Promise reject
 */
window.addEventListener("unhandledrejection", event => {
  throw event.reason
});

/**
 * 监听用户行为(点击)
 */
window.addEventListener('click', (event) => {

  handler()
}, true)



/**
 * 页面路由变化
 */
window.addEventListener('hashchange', event => {
  const {
    oldURL,
    newURL
  } = event;
  const oldURLObj = url.parseUrl(oldURL);
  const newURLObj = url.parseUrl(newURL);
  const from = oldURLObj.hash && url.parseHash(oldURLObj.hash);
  const to = newURLObj.hash && url.parseHash(newURLObj.hash);
  if (!from && !to) return;
  handler()
})




/**
 * 监听页面离开
 */
window.addEventListener('beforeunload', (event) => {
  //记录埋点
})