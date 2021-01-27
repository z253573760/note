import { createApp, inject } from "vue";
import Photo from "./photo.js";
export { useDrag } from "./use";
import { Lazyload } from "@vant/lazyload";
const key = "cc-photo";
let instance;

function getInstance() {
  if (instance) {
    return instance;
  }
  const _instance = createApp(Photo).use(Lazyload);
  const root = document.createElement("div");
  document.body.appendChild(root);
  instance = _instance.mount(root);
  return instance;
}

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

photo.install = function (app) {
  const instance = getInstance();
  app.config.globalProperties.$photo = instance;
  app.provide(key, instance);
};

export default photo;
