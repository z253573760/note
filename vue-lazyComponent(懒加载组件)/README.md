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
      //IntersectionObserverEntry
      //       {
      //   boundingClientRect: DOMRectReadOnly {x: 8, y: 380, width: 300, height: 300, top: 380, …}
      //   intersectionRatio: 0.023333333432674408
      //   intersectionRect: DOMRectReadOnly {x: 8, y: 380, width: 300, height: 7, top: 380, …}
      //   isIntersecting: true
      //   rootBounds: DOMRectReadOnly {x: 0, y: 0, width: 1903, height: 387, top: 0, …}
      //   target: img.lazy
      //   time: 440149.8099999735
      // }
      //       time：可见性发生变化的时间，是一个高精度时间戳，单位为毫秒，返回一个记录从 IntersectionObserver 的时间原点(time origin)到交叉被触发的时间的时间戳(DOMHighResTimeStamp).
      // target：被观察的目标元素，是一个 DOM 节点对象
      // rootBounds：根元素的矩形区域的信息，getBoundingClientRect() 方法的返回值，如果没有根元素（即直接相对于视口滚动），则返回 null
      // boundingClientRect：目标元素的矩形区域的信息
      // intersectionRect：目标元素与视口（或根元素）的交叉区域的信息
      // intersectionRatio：目标元素的可见比例，即 intersectionRect 占 boundingClientRect 的比例，完全可见时为 1，完全不可见时小于等于0
      // isIntersecting 是否交叉
      console.log("beforeLoaded");
    };
    const afterLoaded = (IntersectionObserverEntry) => {
      console.log("afterLoaded");
    };
    return {
      beforeLoaded,
      afterLoaded,
    };
  },
};
</script>
```
