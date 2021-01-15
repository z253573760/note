import { createApp, inject } from "vue";
import Photo from "./photo.js";
export { useDrag } from "./use";
const key = "cc-photo";
let instance;

function getInstance() {
  const instance = createApp(Photo);
  const root = document.createElement("div");
  document.body.appendChild(root);
  return instance.mount(root);
}

export const usePhoto = () => {
  return inject(key);
};
export const showPhoto = (...args) => {
  if (!instance) {
    instance = getInstance();
  }

  instance.showPhoto(...args);
};

function photo(params) {
  if (!instance) {
    instance = getInstance();
  }
  if (typeof params === "string") {
    instance.showPhoto([params], 0);
  } else {
    instance.showPhoto(...Array.from(arguments));
  }
}

photo.install = function(app) {
  instance = getInstance();
  app.config.globalProperties.$photo = instance;
  app.provide(key, instance);
};

export default photo;
