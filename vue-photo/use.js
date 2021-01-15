import { ref, onMounted, watch, onUnmounted } from "vue";

export function useDrag(element) {
  const isDrag = ref(false);
  let x = 0;
  let y = 0;
  let l = 0;
  let t = 0;
  let style = "";
  const move = async (e) => {
    e.preventDefault();
    if (isDrag.value) {
      let nx = e.clientX;
      let ny = e.clientY;
      let nl = nx - (x - l);
      let nt = ny - (y - t);
      element.value.style.left = nl + "px";
      element.value.style.top = nt + "px";
    }
  };
  const mouseup = (e) => {
    e.preventDefault();
    isDrag.value = false;
    document.addEventListener("mousemove", move);
  };
  const mousedown = (e) => {
    e.preventDefault();
    console.log("element.value.style", element.value.style);
    if (!style) {
      style = element.value.style || "";
    }
    isDrag.value = true;
    x = e.clientX;
    y = e.clientY;
    l = element.value.offsetLeft;
    t = element.value.offsetTop;
    document.addEventListener("mousemove", move);
  };
  watch(
    () => isDrag.value,
    (cur) => {
      if (cur) {
        element.value.style.position = "fixed";
      }
      element.value.style.cursor = cur ? "move" : "default";
    }
  );
  onMounted(() => {
    element.value.addEventListener("mouseup", mouseup);
    element.value.addEventListener("mousedown", mousedown);
  });
  onUnmounted(() => {
    element.value.removeEventListener("mouseup", mouseup);
    element.value.removeEventListener("mousedown", mousedown);
  });
  const initDragStyle = () => {
    element.value.style = style;
  };
  return {
    isDrag,
    initDragStyle,
  };
}
