import _extends from "@babel/runtime/helpers/esm/extends";
import { nextTick } from "vue";
import {
  inBrowser,
  CustomEvent,
  remove as _remove,
  some,
  find,
  _,
  throttle,
  supportWebp,
  getDPR,
  scrollParent,
  getBestSelectionFromSrcset,
  isObject,
  hasIntersectionObserver,
  modeType,
  ImageCache,
} from "./util";
import ReactiveListener from "./listener";
var DEFAULT_URL =
  "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
var DEFAULT_EVENTS = [
  "scroll",
  "wheel",
  "mousewheel",
  "resize",
  "animationend",
  "transitionend",
  "touchmove",
];
var DEFAULT_OBSERVER_OPTIONS = {
  rootMargin: "0px",
  threshold: 0,
};
export default function () {
  return /*#__PURE__*/ (function () {
    function Lazy(_ref) {
      var preLoad = _ref.preLoad,
        error = _ref.error,
        throttleWait = _ref.throttleWait,
        preLoadTop = _ref.preLoadTop,
        dispatchEvent = _ref.dispatchEvent,
        loading = _ref.loading,
        attempt = _ref.attempt,
        _ref$silent = _ref.silent,
        silent = _ref$silent === void 0 ? true : _ref$silent,
        scale = _ref.scale,
        listenEvents = _ref.listenEvents,
        filter = _ref.filter,
        adapter = _ref.adapter,
        observer = _ref.observer,
        observerOptions = _ref.observerOptions;
      this.version = "__VUE_LAZYLOAD_VERSION__";
      this.mode = modeType.event;
      this.ListenerQueue = [];
      this.TargetIndex = 0;
      this.TargetQueue = [];
      this.options = {
        silent: silent,
        dispatchEvent: !!dispatchEvent,
        throttleWait: throttleWait || 200,
        preLoad: preLoad || 1.3,
        preLoadTop: preLoadTop || 0,
        error: error || DEFAULT_URL,
        loading: loading || DEFAULT_URL,
        attempt: attempt || 3,
        scale: scale || getDPR(scale),
        ListenEvents: listenEvents || DEFAULT_EVENTS,
        hasbind: false,
        supportWebp: supportWebp(),
        filter: filter || {},
        adapter: adapter || {},
        observer: !!observer,
        observerOptions: observerOptions || DEFAULT_OBSERVER_OPTIONS,
      };

      this._initEvent();

      this._imageCache = new ImageCache({
        max: 200,
      });
      this.lazyLoadHandler = throttle(
        this._lazyLoadHandler.bind(this),
        this.options.throttleWait
      );
      this.setMode(this.options.observer ? modeType.observer : modeType.event);
    }
    /**
     * update config
     * @param  {Object} config params
     * @return
     */

    var _proto = Lazy.prototype;

    _proto.config = function config(options) {
      if (options === void 0) {
        options = {};
      }

      this.options = _extends({}, this.options, {
        options: options,
      });
    };
    /**
     * output listener's load performance
     * @return {Array}
     */

    _proto.performance = function performance() {
      return this.ListenerQueue.map(function (item) {
        return item.performance();
      });
    };
    /*
     * add lazy component to queue
     * @param  {Vue} vm lazy component instance
     * @return
     */

    _proto.addLazyBox = function addLazyBox(vm) {
      this.ListenerQueue.push(vm);

      if (inBrowser) {
        this._addListenerTarget(window);

        this._observer && this._observer.observe(vm.el);

        if (vm.$el && vm.$el.parentNode) {
          this._addListenerTarget(vm.$el.parentNode);
        }
      }
    };
    /*
     * add image listener to queue
     * @param  {DOM} el
     * @param  {object} binding vue directive binding
     * @param  {vnode} vnode vue directive vnode
     * @return
     */

    _proto.add = function add(el, binding, vnode) {
      var _this = this; //lazyCls
      // 判断当前元素是否在监听队列中，如果在就执行update方法
      // 并在下次dom更新循环结束之后延迟回调懒加载方法lazyLoadHandler
      if (
        some(this.ListenerQueue, function (item) {
          return item.el === el;
        })
      ) {
        this.update(el, binding); //  同 vue-directive 的updated钩子
        return nextTick(this.lazyLoadHandler);
      }
      // 新的dom
      var value = this._valueFormatter(binding.value); //格式化绑定参数
      var src = value.src; // 拿到 v-lazy="src"中的 src
      nextTick(function () {
        src = getBestSelectionFromSrcset(el, _this.options.scale) || src; // 如果标签上有data-srcset 属性 做对应的处理
        _this._observer && _this._observer.observe(el); //核心 监听DOM
        var container = Object.keys(binding.modifiers)[0]; // 修饰符
        var $parent;

        if (container) {
          $parent = vnode.context.$refs[container]; // if there is container passed in, try ref first, then fallback to getElementById to support the original usage

          $parent = $parent
            ? $parent.$el || $parent
            : document.getElementById(container);
        }

        if (!$parent) {
          $parent = scrollParent(el); // 查找此元素的距离最近的具有滚动属性的父元素
        }

        var newListener = new ReactiveListener({
          bindType: binding.arg,
          $parent: $parent,
          el: el,
          src: src,
          loading: value.loading,
          error: value.error,
          cors: value.cors,
          elRenderer: _this._elRenderer.bind(_this),
          options: _this.options,
          imageCache: _this._imageCache,
        });

        _this.ListenerQueue.push(newListener);

        if (inBrowser) {
          _this._addListenerTarget(window); //添加到观察目标队列 里面会做一些判断

          _this._addListenerTarget($parent);
        }

        _this.lazyLoadHandler(); // 核心啊

        nextTick(function () {
          return _this.lazyLoadHandler();
        });
      });
    };
    /**
     * update image src
     * @param  {DOM} el
     * @param  {object} vue directive binding
     * @return
     */

    _proto.update = function update(el, binding, vnode) {
      var _this2 = this;

      var value = this._valueFormatter(binding.value);

      var src = value.src;
      src = getBestSelectionFromSrcset(el, this.options.scale) || src;
      var exist = find(this.ListenerQueue, function (item) {
        return item.el === el;
      });

      if (!exist) {
        this.add(el, binding, vnode);
      } else {
        exist.update({
          src: src,
          error: value.error,
          loading: value.loading,
        });
      }

      if (this._observer) {
        this._observer.unobserve(el);

        this._observer.observe(el);
      }

      this.lazyLoadHandler();
      nextTick(function () {
        return _this2.lazyLoadHandler();
      });
    };
    /**
     * remove listener form list
     * @param  {DOM} el
     * @return
     */

    _proto.remove = function remove(el) {
      if (!el) return;
      this._observer && this._observer.unobserve(el);
      var existItem = find(this.ListenerQueue, function (item) {
        return item.el === el;
      });

      if (existItem) {
        this._removeListenerTarget(existItem.$parent);

        this._removeListenerTarget(window);

        _remove(this.ListenerQueue, existItem);

        existItem.$destroy();
      }
    };
    /*
     * remove lazy components form list
     * @param  {Vue} vm Vue instance
     * @return
     */

    _proto.removeComponent = function removeComponent(vm) {
      if (!vm) return;

      _remove(this.ListenerQueue, vm);

      this._observer && this._observer.unobserve(vm.el);

      if (vm.$parent && vm.$el.parentNode) {
        this._removeListenerTarget(vm.$el.parentNode);
      }

      this._removeListenerTarget(window);
    };

    _proto.setMode = function setMode(mode) {
      var _this3 = this;

      if (!hasIntersectionObserver && mode === modeType.observer) {
        mode = modeType.event;
      }

      this.mode = mode; // event or observer

      if (mode === modeType.event) {
        if (this._observer) {
          this.ListenerQueue.forEach(function (listener) {
            _this3._observer.unobserve(listener.el);
          });
          this._observer = null;
        }

        this.TargetQueue.forEach(function (target) {
          _this3._initListen(target.el, true);
        });
      } else {
        this.TargetQueue.forEach(function (target) {
          _this3._initListen(target.el, false);
        });

        this._initIntersectionObserver();
      }
    };
    /*
     *** Private functions ***
     */

    /*
     * add listener target
     * @param  {DOM} el listener target
     * @return
     */

    _proto._addListenerTarget = function _addListenerTarget(el) {
      if (!el) return;
      var target = find(this.TargetQueue, function (target) {
        return target.el === el;
      });

      if (!target) {
        target = {
          el: el,
          id: ++this.TargetIndex,
          childrenCount: 1,
          listened: true,
        };
        this.mode === modeType.event && this._initListen(target.el, true);
        this.TargetQueue.push(target);
      } else {
        target.childrenCount++;
      }

      return this.TargetIndex;
    };
    /*
     * remove listener target or reduce target childrenCount
     * @param  {DOM} el or window
     * @return
     */

    _proto._removeListenerTarget = function _removeListenerTarget(el) {
      var _this4 = this;

      this.TargetQueue.forEach(function (target, index) {
        if (target.el === el) {
          target.childrenCount--;

          if (!target.childrenCount) {
            _this4._initListen(target.el, false);

            _this4.TargetQueue.splice(index, 1);

            target = null;
          }
        }
      });
    };
    /*
     * add or remove eventlistener
     * @param  {DOM} el DOM or Window
     * @param  {boolean} start flag
     * @return
     */

    _proto._initListen = function _initListen(el, start) {
      var _this5 = this;

      this.options.ListenEvents.forEach(function (evt) {
        return _[start ? "on" : "off"](el, evt, _this5.lazyLoadHandler);
      });
    };

    _proto._initEvent = function _initEvent() {
      var _this6 = this; //lazyCls

      this.Event = {
        listeners: {
          loading: [],
          loaded: [],
          error: [],
        },
      };

      this.$on = function (event, func) {
        if (!_this6.Event.listeners[event]) _this6.Event.listeners[event] = [];

        _this6.Event.listeners[event].push(func);
      };

      this.$once = function (event, func) {
        var on = function on() {
          _this6.$off(event, on);

          for (
            var _len = arguments.length, args = new Array(_len), _key = 0;
            _key < _len;
            _key++
          ) {
            args[_key] = arguments[_key];
          }

          func.apply(_this6, args);
        };

        _this6.$on(event, on);
      };

      this.$off = function (event, func) {
        if (!func) {
          if (!_this6.Event.listeners[event]) return;
          _this6.Event.listeners[event].length = 0;
          return;
        }

        _remove(_this6.Event.listeners[event], func);
      };

      this.$emit = function (event, context, inCache) {
        if (!_this6.Event.listeners[event]) return;
        _this6.Event.listeners[event].forEach(function (func) {
          return func(context, inCache);
        });
      };
    };
    /**
     * 在视口中查找节点并触发加载
     * find nodes which in viewport and trigger load
     * @return
     */

    // 到这一步我们将lazy指令绑定的所有dom元素封装成一个个ReactiveListener监听对象，
    // 并将其存放在ListenerQueue队列中，
    // 当前元素显示的是loading状态的占位图，
    // dom渲染完毕后将会执行懒加载处理函数_lazyLoadHandler。再来看一下该函数代码：

    _proto._lazyLoadHandler = function _lazyLoadHandler() {
      var _this7 = this;

      var freeList = [];
      this.ListenerQueue.forEach(function (listener) {
        if (!listener.el || !listener.el.parentNode) {
          freeList.push(listener);
        }

        var catIn = listener.checkInView();
        if (!catIn) return;
        listener.load();
      });
      freeList.forEach(function (item) {
        _remove(_this7.ListenerQueue, item);

        item.$destroy();
      });
    };
    /**
     * init IntersectionObserver
     * set mode to observer
     * @return
     */

    _proto._initIntersectionObserver = function _initIntersectionObserver() {
      var _this8 = this;

      if (!hasIntersectionObserver) {
        return;
      }

      this._observer = new IntersectionObserver(
        this._observerHandler.bind(this),
        this.options.observerOptions
      );

      if (this.ListenerQueue.length) {
        this.ListenerQueue.forEach(function (listener) {
          _this8._observer.observe(listener.el);
        });
      }
    };
    /**
     * init IntersectionObserver
     * @return
     */

    _proto._observerHandler = function _observerHandler(entries) {
      var _this9 = this;

      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          _this9.ListenerQueue.forEach(function (listener) {
            if (listener.el === entry.target) {
              if (listener.state.loaded)
                return _this9._observer.unobserve(listener.el);
              listener.load();
            }
          });
        }
      });
    };
    /**
     * set element attribute with image'url and state
     * @param  {object} lazyload listener object
     * @param  {string} state will be rendered
     * @param  {bool} inCache  is rendered from cache
     * @return
     */

    _proto._elRenderer = function _elRenderer(listener, state, cache) {
      // listener=>ReactiveListener的实例
      if (!listener.el) return;

      var el = listener.el,
        bindType = listener.bindType;
      var src;

      switch (state) {
        case "loading":
          src = listener.loading;
          break;

        case "error":
          src = listener.error;
          break;

        default:
          src = listener.src;
          break;
      }

      if (bindType) {
        //盲猜background-image 属性
        el.style[bindType] = 'url("' + src + '")';
      } else if (el.getAttribute("src") !== src) {
        el.setAttribute("src", src);
      }

      el.setAttribute("lazy", state); // 设置状态
      this.$emit(state, listener, cache); // 盲猜发布订阅 通知队列状态变更
      // 适配器相关
      this.options.adapter[state] &&
        this.options.adapter[state](listener, this.options);

      // 自定义事件？？？
      if (this.options.dispatchEvent) {
        var event = new CustomEvent(state, {
          detail: listener,
        });
        el.dispatchEvent(event);
      }
    };
    /**
     * generate loading loaded error image url
     * @param {string} image's src
     * @return {object} image's loading, loaded, error url
     */

    _proto._valueFormatter = function _valueFormatter(value) {
      var src = value;
      var _this$options = this.options,
        loading = _this$options.loading,
        error = _this$options.error; // value is object

      if (isObject(value)) {
        if (!value.src && !this.options.silent)
          console.error("Vue Lazyload warning: miss src with " + value);
        src = value.src;
        loading = value.loading || this.options.loading;
        error = value.error || this.options.error;
      }

      return {
        src: src,
        loading: loading,
        error: error,
      };
    };

    return Lazy;
  })();
}
