import "./index.scss";
import { ref } from "vue";
import { useIntersectionObserver } from "./use";
export default {
  setup(_, { slots }) {
    const domRef = ref(null);
    const dom = (e) => {
      domRef.value = e;
    };
    const state = ref("loading");
    useIntersectionObserver(domRef, () => {
      state.value = "loaded";
    });
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
