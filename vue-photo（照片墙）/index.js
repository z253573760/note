import { createApp, inject } from "vue";
import Photo from "./photo.js";
export { useDrag } from "./use";
import { Lazyload } from "@vant/lazyload";
const key = "cc-photo";

//缓存
function cache(fn) {
  let instance;
  return (...args) => {
    if (instance) return instance;
    instance = fn(...args);
    return instance;
  };
}
//创建实例
function createInstance() {
  const instance = createApp(Photo).use(Lazyload, {
    loading: `data:image/png;base64,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`,
  });
  const root = document.createElement("div");
  document.body.appendChild(root);
  return instance.mount(root);
}

// 函数组合;
function compose(...funcs) {
  if (funcs.length === 0) {
    return (arg) => arg;
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)));
}

// 通过compose 得到 获取 photo 实例的函数
const getInstance = compose(cache, createInstance);

// 模仿vuex  通过 inject和 provide 挂到跟实例
export const usePhoto = () => {
  return inject(key);
};

export const showPhoto = (...args) => {
  const instance = getInstance();
  instance.showPhoto(...args);
};

function photo(params) {
  const instance = getInstance();
  if (typeof params === "string") {
    instance.showPhoto([params], 0);
  } else {
    instance.showPhoto(...Array.from(arguments));
  }
}

// 插件形式
photo.install = function (app) {
  const instance = getInstance();
  app.config.globalProperties.$photo = instance;
  app.provide(key, instance);
};

export default photo;
