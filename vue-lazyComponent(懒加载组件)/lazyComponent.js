import "./index.scss";
import { ref, nextTick } from "vue";
import { useIntersectionObserver } from "./use";
export default {
  props: {
    // IntersectionObserver 构造器的第二个参数 {root,rootMargin,thresholds }
    // https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver
    config: {
      type: Object,
    },
  },
  emits: ["beforeLoaded", "afterLoaded"],
  setup(props, { slots, emit }) {
    const domRef = ref(null);
    const dom = (e) => {
      domRef.value = e;
    };
    const state = ref("loading");
    useIntersectionObserver(
      domRef,
      //这个回调会在 IntersectionObserver isIntersecting=== ture下执行  只执行一次 once
      () => {
        emit("beforeLoaded"); // 其实没必要的 可以再slot-default 的 钩子里定义
        state.value = "loaded";
        nextTick(() => emit("afterLoaded")); // 其实没必要的 可以再slot-default 的 钩子里定义
      },
      props.config
    );
    const renderLoading = () => {
      if (slots.loading) {
        return slots.loading();
      }
      return <div>loading...</div>;
    };
    return () => (
      <div ref={dom}>
        {state.value === `loading` && renderLoading()}
        {state.value === `loaded` && slots.default?.()}
      </div>
    );
  },
};
