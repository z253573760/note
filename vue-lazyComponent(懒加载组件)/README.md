# vue3 LazyComponent simple

vue3 懒加载组件

### 功能说明

当组件出现在视口区域时 渲染默认插槽 不支持 SSR

### 注意事项

使用环境必须支持 IntersectionObserverAPI 若不支持自行引入 polyfill
https://github.com/w3c/IntersectionObserver/tree/master/polyfill

## 代码演示

### 场景

一些组件初始化要占用很多资源 或者 时间较常

### 基本用法

(自己下载引入项目文件) 代码写了注释自己看

```vue
<template>
  <LazyComponent
    style="min-height:200px"
    @beforeLoaded="beforeLoaded"
    @afterLoaded="afterLoaded"
  >
    // 如果不传loading占位符的话 请给LazyComponent的样式加一个高度占位
    <template v-slot:default>
      <YourComponent remark="需要被懒加载的组件" />
    </template>
    <template v-slot:loading>
      <YourComponent remark="没被懒加载的时候的骨架屏" />
      // 如果不传loading占位符的话 请给LazyComponent的样式加一个高度占位
    </template>
  </LazyComponent>
</template>
<script>
import LazyComponent from "@/components/LazyComponent";
export default {
  components: { LazyComponent },
  setup() {
    const beforeLoaded = (IntersectionObserverEntry) => {
      console.log("beforeLoaded");
    };
    const afterLoaded = (IntersectionObserverEntry) => {
      console.log("afterLoaded");
    };

    // beforeLoaded=> YourComponentd:onMounetd => afterLoaded
    return {
      beforeLoaded,
      afterLoaded,
    };
  },
};
</script>
```
