import handler from "/uitls/handler"

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
 * 监听用户行为(点击)
 */
window.addEventListener('click', (event) => {

  handler({})
}, true)