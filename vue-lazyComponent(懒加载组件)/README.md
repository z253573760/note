# vue3 LazyComponent simple

vue3 懒加载组件

### 功能说明

当组件出现在视口区域时 渲染默认插槽

### 注意事项

使用环境必须支持 IntersectionObserverAPI 若不支持自行引入 polyfill
https://github.com/w3c/IntersectionObserver/tree/master/polyfill'

## 代码演示

### 基本用法

(自己下载引入项目文件)

```js
<LazyComponent style="min-height:200px">
  <template v-slot:default>
    <div>
      <YourComponent remark="需要被懒加载的组件" />
    </div>
  </template>
  <template v-slot:loading>
    <div>
      <YourComponent remark="没被懒加载的时候的占位符" />
      // 如果不传loading占位符的话 请给LazyComponent的样式加一个高度占位
    </div>
  </template>
</LazyComponent>
```
