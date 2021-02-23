#### 从输入 url 到页面加载完成发生了什么？

- 判断输入的内容是否是一个有效的 URL，无效的 URL 自动跳转到对应的搜索页面

- 浏览器查找当前的 URL，是否存在强缓存。根据 HTTP 的首部字段
  Expires(绝对时间) 和 cache-control(max-age 相对时间 )
