import "./index.scss";
import { ref, watch, defineComponent } from "vue";
import { useDrag, useExponse, useStyle } from "./use";
function createBem(nameSpace) {
  return (name) => {
    return `${nameSpace}-${name}`;
  };
}

const name = "cc-photo";
const bem = createBem(name);

export default defineComponent({
  name,
  setup() {
    // 控制照片墙的显示隐藏
    const show = ref(false);
    const imgRef = ref(null);
    const dom = (e) => {
      imgRef.value = e;
    };
    // 拖拽
    const { initDragStyle } = useDrag(imgRef);
    // 控制  [前进 后退 翻转 放大 缩小 还原]
    const {
      styles,
      scaleAdd,
      scaleDel,
      rotateAdd,
      rotateDel,
      initStyles,
    } = useStyle();
    // 当前展示照片墙图片的数组
    const imgList = ref([]);
    //  当前展示照片墙图片的索引
    const imgIndex = ref(0);
    const showPhoto = (list = [], index = 0) => {
      imgList.value = list;
      imgIndex.value = index;
      show.value = true;
    };
    // 把showPhoto方法暴露的实例上
    useExponse({ showPhoto });
    watch(
      // 监听 照片墙的显示隐藏 还有照片墙当前展示照片的索引 把样式初始化
      () => [show.value, imgIndex.value],
      () => {
        initDragStyle();
        initStyles();
      }
    );
    const next = () => {
      if (imgIndex.value == imgList.value.length - 1) {
        return;
      }
      imgIndex.value += 1;
    };
    const prev = () => {
      if (imgIndex.value == 0) return;
      imgIndex.value -= 1;
    };
    // 照片墙的操作面板 [前进 后退 翻转 放大 缩小 还原]
    const actions = (
      <div className={bem("action")}>
        <div onClick={prev}>
          <svg
            t="1610614345587"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6274"
            width="40"
            height="40"
          >
            <path
              d="M316.416 474.9568c-10.93632 10.9312-21.08928 25.77408-17.96608 39.8336-2.33984 14.0544 8.59136 27.33056 17.96608 38.26688l339.73248 338.16576c17.1776 17.18272 45.29664 17.18272 62.47936 0 17.18272-17.1776 17.1776-45.29664 0-62.47424l-323.328-314.74176 323.328-315.52512c17.1776-17.1776 17.1776-45.29664 0-62.47424-17.18272-17.18272-45.30176-17.18272-62.47936 0L316.416 474.95168z"
              p-id="6275"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
        <div onClick={scaleAdd}>
          <svg
            t="1610593926489"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="2550"
            width="40"
            height="40"
          >
            <path
              d="M970.837333 919.850667l-205.696-205.653334A382.421333 382.421333 0 0 0 853.333333 469.333333a384 384 0 0 0-384-384 384 384 0 0 0-384 384 384 384 0 0 0 384 384 382.421333 382.421333 0 0 0 244.906667-88.192l205.653333 205.653334a36.053333 36.053333 0 0 0 50.986667 0 36.266667 36.266667 0 0 0-0.042667-50.944z m-380.117333-162.986667c-38.4 16.256-79.189333 24.448-121.386667 24.448a311.296 311.296 0 0 1-220.586666-91.392A311.296 311.296 0 0 1 157.312 469.333333 311.296 311.296 0 0 1 248.746667 248.746667 311.296 311.296 0 0 1 469.333333 157.354667a311.296 311.296 0 0 1 220.586667 91.392A311.296 311.296 0 0 1 781.354667 469.333333a311.296 311.296 0 0 1-91.392 220.586667 310.186667 310.186667 0 0 1-99.242667 66.901333z"
              fill="#ffffff"
              p-id="2551"
            ></path>
            <path
              d="M652.672 431.829333h-147.84V292.010667a35.968 35.968 0 1 0-71.978667 0v139.818666H292.010667a35.968 35.968 0 1 0 0 72.021334h140.8v140.8a35.968 35.968 0 1 0 72.021333 0v-140.8h147.84a35.968 35.968 0 1 0 0-72.021334z"
              fill="#ffffff"
              p-id="2552"
            ></path>
          </svg>
        </div>

        <div onClick={scaleDel}>
          <svg
            t="1610593988714"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3318"
            width="40"
            height="40"
          >
            <path
              d="M951.643 877.547l-210.337-210.335c50.487-64.946 80.56-146.547 80.56-235.199 0-211.793-171.681-383.472-383.563-383.472-211.792 0-383.471 171.679-383.471 383.472 0 211.862 171.679 383.538 383.471 383.538 88.661 0 170.271-30.075 235.218-80.56l210.337 210.339c9.34 9.339 21.614 14.055 33.89 14.055s24.551-4.716 33.892-14.055c18.77-18.77 18.77-49.101 0-67.781v0zM150.725 432.011c0-158.601 128.978-287.58 287.58-287.58 158.691 0 287.671 128.978 287.671 287.58 0 158.668-128.978 287.651-287.671 287.651-158.601 0-287.58-128.978-287.58-287.651v0z"
              p-id="3319"
              fill="#ffffff"
            ></path>
            <path
              d="M397.297 391.004h-100.16c-22.683 0-41.008 18.324-41.008 40.919 0 22.683 18.324 41.094 41.008 41.094h282.333c22.683 0 41.095-18.412 41.007-41.094 0-22.595-18.324-40.919-41.007-40.919v0h-182.173z"
              p-id="3320"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
        <div
          onClick={() => {
            initDragStyle();
            initStyles();
          }}
        >
          <svg
            t="1610689742249"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="3596"
            width="40"
            height="40"
          >
            <path
              d="M912 48h-800c-35.296 0-64 28.704-64 64v800c0 35.296 28.704 64 64 64h800c35.296 0 64-28.704 64-64v-800c0-35.296-28.704-64-64-64z m-800 864v-800h800l0.064 800H112z"
              p-id="3597"
              fill="#ffffff"
            ></path>
            <path
              d="M368.896 192a32 32 0 0 0-32 32v105.888H224a32 32 0 0 0 0 64h144.896a32 32 0 0 0 32-32V224a32 32 0 0 0-32-32zM784.864 329.888H672V224a32 32 0 1 0-64 0v137.888a32 32 0 0 0 32 32h144.864a32 32 0 1 0 0-64zM368.896 640H224a32 32 0 1 0 0 64h112.896v105.92a32 32 0 1 0 64 0V672a32 32 0 0 0-32-32zM784.864 640H640a32 32 0 0 0-32 32v137.92a32 32 0 1 0 64 0V704h112.864a32 32 0 1 0 0-64z"
              p-id="3598"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
        <div onClick={rotateAdd}>
          <svg
            t="1610594126415"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4868"
            width="40"
            height="40"
          >
            <path
              d="M924.8 337.6c-22.6-53.4-54.9-101.3-96-142.4s-89-73.4-142.4-96C631.1 75.9 572.5 64 512 64S392.9 75.9 337.6 99.2c-53.4 22.6-101.3 54.9-142.4 96-22.4 22.4-42.2 46.8-59.2 73.1V228c0-19.8-16.2-36-36-36s-36 16.2-36 36v288c0 19.8 16.2 36 36 36s36-16.2 36-36v-50.2c4.2-34.8 13.2-68.7 27-101.2 19.1-45.1 46.4-85.6 81.2-120.4C279 209.4 319.5 182 364.6 163c46.7-19.7 96.3-29.8 147.4-29.8 51.2 0 100.8 10 147.4 29.8 45.1 19.1 85.6 46.4 120.4 81.2C814.6 279 842 319.5 861 364.6c19.7 46.7 29.8 96.3 29.8 147.4 0 51.2-10 100.8-29.8 147.4-19.1 45.1-46.4 85.6-81.2 120.4C745 814.6 704.5 842 659.4 861c-46.7 19.7-96.3 29.8-147.4 29.8-64.6 0-128.4-16.5-184.4-47.8-54.4-30.4-100.9-74.1-134.6-126.6-10.3-16.1-31.7-20.8-47.8-10.4-16.1 10.3-20.8 31.7-10.4 47.8 39.8 62 94.8 113.7 159.1 149.6 66.2 37 141.7 56.6 218.1 56.6 60.5 0 119.1-11.9 174.4-35.2 53.4-22.6 101.3-54.9 142.4-96 41.1-41.1 73.4-89 96-142.4C948.1 631.1 960 572.5 960 512s-11.9-119.1-35.2-174.4z"
              p-id="4869"
              fill="#ffffff"
            ></path>
            <path
              d="M275.4 575.5c9.5-2.5 19.1 2.9 22.3 12.2 3.5 10.2 9.9 17.7 19.1 22.6 7.1 3.9 15.1 5.8 24 5.8 16.6 0 30.8-6.9 42.5-20.8 11.7-13.8 20-32.7 24.9-75.1-7.7 12.2-17.3 20.8-28.7 25.8-11.4 5-23.7 7.4-36.8 7.4-26.7 0-47.7-8.3-63.3-24.9-15.5-16.6-23.3-37.9-23.3-64.1 0-25.1 7.7-47.1 23-66.2 15.3-19 37.9-28.6 67.8-28.6 40.3 0 68.1 18.1 83.4 54.4 8.5 19.9 12.7 44.9 12.7 74.9 0 33.8-5.1 63.8-15.3 89.9-16.9 43.5-45.5 65.2-85.8 65.2-27 0-47.6-7.1-61.6-21.2-10-10.1-16.4-22-19.3-35.8-2-9.6 4-19.1 13.5-21.6l0.9 0.1z m103-74.4c9.4-7.5 14.1-20.6 14.1-39.3 0-16.8-4.2-29.3-12.7-37.5S360.6 412 347.5 412c-14 0-25.2 4.7-33.4 14.1-8.2 9.4-12.4 22-12.4 37.7 0 14.9 3.6 26.7 10.9 35.5 7.2 8.8 18.8 13.1 34.6 13.1 11.4 0 21.8-3.8 31.2-11.3zM646.6 414.4c12.4 22.8 18.5 54 18.5 93.7 0 37.6-5.6 68.7-16.8 93.3-16.2 35.3-42.8 52.9-79.6 52.9-33.2 0-57.9-14.4-74.2-43.3-13.5-24.1-20.3-56.4-20.3-97 0-31.4 4.1-58.4 12.2-80.9 15.2-42 42.7-63 82.5-63 35.9 0 61.8 14.8 77.7 44.3z m-40.2 173.3c9.4-13.9 14-39.9 14-78 0-27.4-3.4-50-10.1-67.7-6.8-17.7-19.9-26.6-39.4-26.6-17.9 0-31 8.4-39.3 25.2-8.3 16.8-12.4 41.6-12.4 74.3 0 24.6 2.6 44.4 7.9 59.4 8.1 22.8 22 34.3 41.6 34.3 15.7 0 28.3-7 37.7-20.9zM803.3 387.2c11.2 11.3 16.8 25 16.8 41.2 0 16.7-5.8 30.7-17.5 41.8C791 481.4 777.4 487 762 487c-17.1 0-31.2-5.8-42.1-17.4-10.9-11.6-16.4-25.1-16.4-40.6 0-16.5 5.8-30.4 17.3-41.7 11.5-11.3 25.3-17 41.2-17 16.3 0 30.1 5.7 41.3 16.9zM739.5 451c6.2 6.2 13.7 9.3 22.5 9.3 8.4 0 15.8-3.1 22.1-9.3 6.3-6.2 9.4-13.7 9.4-22.6 0-8.5-3.1-15.9-9.3-22.1-6.2-6.2-13.6-9.3-22.2-9.3s-16.1 3.1-22.4 9.3c-6.3 6.2-9.4 13.7-9.4 22.6-0.1 8.4 3 15.8 9.3 22.1z"
              p-id="4870"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
        <div onClick={rotateDel}>
          <svg
            t="1610594171626"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="5034"
            width="40"
            height="40"
          >
            <path d="M1464.3 279.7" p-id="5035" fill="#ffffff"></path>
            <path
              d="M512 960c-60.5 0-119.1-11.9-174.4-35.2-53.4-22.6-101.3-54.9-142.4-96s-73.4-89-96-142.4C75.9 631.1 64 572.5 64 512s11.9-119.1 35.2-174.4c22.6-53.4 54.9-101.3 96-142.4s89-73.4 142.4-96C392.9 75.9 451.5 64 512 64s119.1 11.9 174.4 35.2c53.4 22.6 101.3 54.9 142.4 96s73.4 89 96 142.4C948.1 392.9 960 451.5 960 512c0 19.1-15.5 34.6-34.6 34.6s-34.6-15.5-34.6-34.6c0-51.2-10-100.8-29.8-147.4-19.1-45.1-46.4-85.6-81.2-120.4C745 209.4 704.5 182 659.4 163c-46.7-19.7-96.3-29.8-147.4-29.8-51.2 0-100.8 10-147.4 29.8-45.1 19.1-85.6 46.4-120.4 81.2S182 319.5 163 364.6c-19.7 46.7-29.8 96.3-29.8 147.4 0 51.2 10 100.8 29.8 147.4 19.1 45.1 46.4 85.6 81.2 120.4C279 814.6 319.5 842 364.6 861c46.7 19.7 96.3 29.8 147.4 29.8 64.6 0 128.4-16.5 184.4-47.8 54.4-30.4 100.9-74.1 134.6-126.6 10.3-16.1 31.7-20.8 47.8-10.4 16.1 10.3 20.8 31.7 10.4 47.8-39.8 62-94.8 113.7-159.1 149.6-66.2 37-141.7 56.6-218.1 56.6z"
              p-id="5036"
              fill="#ffffff"
            ></path>
            <path
              d="M924 552c-19.8 0-36-16.2-36-36V228c0-19.8 16.2-36 36-36s36 16.2 36 36v288c0 19.8-16.2 36-36 36zM275.4 575.5c9.5-2.5 19.1 2.9 22.3 12.2 3.5 10.2 9.9 17.7 19.1 22.6 7.1 3.9 15.1 5.8 24 5.8 16.6 0 30.8-6.9 42.5-20.8 11.7-13.8 20-32.7 24.9-75.1-7.7 12.2-17.3 20.8-28.7 25.8-11.4 5-23.7 7.4-36.8 7.4-26.7 0-47.7-8.3-63.3-24.9-15.5-16.6-23.3-37.9-23.3-64.1 0-25.1 7.7-47.1 23-66.2 15.3-19 37.9-28.6 67.8-28.6 40.3 0 68.1 18.1 83.4 54.4 8.5 19.9 12.7 44.9 12.7 74.9 0 33.8-5.1 63.8-15.3 89.9-16.9 43.5-45.5 65.2-85.8 65.2-27 0-47.6-7.1-61.6-21.2-10-10.1-16.4-22-19.3-35.8-2-9.6 4-19.1 13.5-21.6l0.9 0.1z m103-74.4c9.4-7.5 14.1-20.6 14.1-39.3 0-16.8-4.2-29.3-12.7-37.5S360.6 412 347.5 412c-14 0-25.2 4.7-33.4 14.1-8.2 9.4-12.4 22-12.4 37.7 0 14.9 3.6 26.7 10.9 35.5 7.2 8.8 18.8 13.1 34.6 13.1 11.4 0 21.8-3.8 31.2-11.3zM646.6 414.4c12.4 22.8 18.5 54 18.5 93.7 0 37.6-5.6 68.7-16.8 93.3-16.2 35.3-42.8 52.9-79.6 52.9-33.2 0-57.9-14.4-74.2-43.3-13.5-24.1-20.3-56.4-20.3-97 0-31.4 4.1-58.4 12.2-80.9 15.2-42 42.7-63 82.5-63 35.9 0 61.8 14.8 77.7 44.3z m-40.2 173.3c9.4-13.9 14-39.9 14-78 0-27.4-3.4-50-10.1-67.7-6.8-17.7-19.9-26.6-39.4-26.6-17.9 0-31 8.4-39.3 25.2-8.3 16.8-12.4 41.6-12.4 74.3 0 24.6 2.6 44.4 7.9 59.4 8.1 22.8 22 34.3 41.6 34.3 15.7 0 28.3-7 37.7-20.9zM803.3 387.2c11.2 11.3 16.8 25 16.8 41.2 0 16.7-5.8 30.7-17.5 41.8C791 481.4 777.4 487 762 487c-17.1 0-31.2-5.8-42.1-17.4-10.9-11.6-16.4-25.1-16.4-40.6 0-16.5 5.8-30.4 17.3-41.7 11.5-11.3 25.3-17 41.2-17 16.3 0 30.1 5.7 41.3 16.9zM739.5 451c6.2 6.2 13.7 9.3 22.5 9.3 8.4 0 15.8-3.1 22.1-9.3 6.3-6.2 9.4-13.7 9.4-22.6 0-8.5-3.1-15.9-9.3-22.1-6.2-6.2-13.6-9.3-22.2-9.3s-16.1 3.1-22.4 9.3c-6.3 6.2-9.4 13.7-9.4 22.6-0.1 8.4 3 15.8 9.3 22.1z"
              p-id="5037"
              fill="#ffffff"
            ></path>
          </svg>
        </div>
        <div onClick={next}>
          <svg
            t="1610614427021"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="6835"
            width="40"
            height="40"
          >
            <path
              d="M333.1 126.5l-0.7 0.7c-12.3 12.3-12.3 32.4 0 44.7l339.9 339.9-340.1 340.1c-12.5 12.5-12.5 32.9 0 45.4s32.9 12.5 45.4 0L740 535s0.1-0.1 0.2-0.1l0.7-0.7c12.3-12.3 12.3-32.4 0-44.7l-363-363c-12.4-12.3-32.5-12.3-44.8 0z"
              fill="#ffffff"
              p-id="6836"
            ></path>
          </svg>
        </div>
      </div>
    );
    return () => (
      <div>
        <div
          className={bem(`wrap`)}
          style={{
            opacity: show.value ? 1 : 0,
            transform: show.value ? "scale(1)" : "scale(0)",
          }}
        >
          <div className={bem(`container`)}>
            <div
              className={bem("close-wrap")}
              onClick={() => (show.value = false)}
            >
              <div className={bem("close")}></div>
            </div>
            <div className={bem("content")} ref={dom}>
              <img
                v-lazy={imgList.value[imgIndex.value]}
                style={styles.value}
              />
            </div>
          </div>
          {actions}
        </div>
      </div>
    );
  },
});
