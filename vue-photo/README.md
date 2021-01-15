# vue-photo

vue3 照片墙

### 功能说明

拖拽 旋转 放大 缩小 下一张 上一张

## 代码演示

### 基本用法

(自己下载引入项目文件)

#### 1 插件注册

```js
// main.js
import { createApp } from "vue";
import vuePhoto from "vue-photo";
import App from "./App.vue";
const app = createApp({
  ...App,
})
  .use(vuePhoto)
  .mounted("#app");
//子组件
export default {
  methods: {
    prevShowPhoto() {
      this.$photo.showPhoto("://xxx.jpg"); //单张
      this.$photo.showPhoto(["://xxx.jpg", "://xxx2.jpg"], 1); // 多张
    },
  },
};
```
