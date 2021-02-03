# vue-photo

vue3 照片墙

### 功能说明

拖拽 旋转 放大 缩小 下一张 上一张

## 代码演示

[codesandbox](hhttps://codesandbox.io/s/optimistic-chebyshev-nqry9?file=/src/App.vue)

### 基本用法

(自己下载引入项目文件)

#### 1 插件注册 挂在全局 vue 实例

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

#### 2 模仿 useRoute

```js
// main.js
import { createApp } from "vue";
import { usePhoto } from "vue-photo";
import App from "./App.vue";
const app = createApp({
  ...App,
}).mounted("#app");
//子组件
export default {
  setup() {
    const photo = usePhoto();
    const prevShowPhoto = () => {
      photo.showPhoto("://xxx.jpg"); //单张
      photo.showPhoto(["://xxx.jpg", "://xxx2.jpg"], 1); // 多张
    };
    return {
      prevShowPhoto,
    };
  },
};
```

#### 3 直接调用

```js
// main.js
import { createApp } from "vue";
import Photo, { showPhoto } from "vue-photo";
import App from "./App.vue";
const app = createApp({
  ...App,
}).mounted("#app");
//子组件
export default {
  setup() {
    const prevShowPhoto = () => {
      showPhoto("://xxx.jpg"); //单张
    };
    const prevShowPhoto2 = () => {
      Photo(["://xxx.jpg", "://xxx2.jpg"], 1); // 多张
    };
    return {
      prevShowPhoto,
      prevShowPhoto2,
    };
  },
};
```

#### 拖拽 hooks

```js
import { ref } from "vue";
import { useDrag } from "vue-photo";
export default {
  setup() {
    const imgRef = ref(null);
    const dom = (e) => {
      imgRef.value = e;
    };
    const {
      initDragStyle, //重置拖拽样式的方法
      isDrag, // 是否拖拽
    } = useDrag(imgRef);
    return { dom };
  },
  render() {
    return <div ref={this.dom}>拖拽我</div>;
  },
};
```
