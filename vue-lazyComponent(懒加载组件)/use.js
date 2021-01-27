import { onMounted, onUnmounted } from "vue";
function assert(condition, msg) {
  if (!condition) {
    throw new Error(`${msg}`);
  }
}
export function useIntersectionObserver(domRef, cb) {
  assert(
    typeof IntersectionObserver !== "undefined",
    `[useIntersectionObserver] IntersectionObserver undefined . Please install this polyfill: https://github.com/w3c/IntersectionObserver/tree/master/polyfill')`
  );
  let observer;
  onMounted(() => {
    observer = new IntersectionObserver(function (changes) {
      changes.forEach((change) => {
        if (change.isIntersecting) {
          cb();
          observer.unobserve(change.target);
        }
      }, config);
    });
    observer.observe(domRef.value);
  });
  onUnmounted(() => {
    observer.disconnect();
    observer = null;
  });
}
