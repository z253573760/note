import { compose, cache, createWorker, hasKey } from "./utils";
import { hackTimerWorker } from "./worker";
import * as TYPE from "./TYPE";
function createInstance() {
  const worker = createWorker(hackTimerWorker);
  const fakeIdToCallback = {};
  let lastFakeId = 0;
  const maxFakeId = 0x7fffffff;
  function getFakeId() {
    do {
      if (lastFakeId == maxFakeId) {
        lastFakeId = 0;
      } else {
        lastFakeId += 1;
      }
    } while (hasKey(fakeIdToCallback, lastFakeId));
    return lastFakeId;
  }

  worker.setInterval = (callback, time /* , parameters */) => {
    var fakeId = getFakeId();
    fakeIdToCallback[fakeId] = {
      callback: callback,
      parameters: Array.prototype.slice.call(arguments, 2),
    };
    worker.postMessage({
      name: TYPE.SET_INTERVAL,
      fakeId: fakeId,
      time: time,
    });
    return fakeId;
  };
  worker.clearInterval = function (fakeId) {
    if (hasKey(fakeIdToCallback, fakeId)) {
      delete fakeIdToCallback[fakeId];
      worker.postMessage({
        name: TYPE.CLEAN_INTERVAL,
        fakeId: fakeId,
      });
    }
  };
  worker.setTimeout = function (callback, time /* , parameters */) {
    var fakeId = getFakeId();
    fakeIdToCallback[fakeId] = {
      callback: callback,
      parameters: Array.prototype.slice.call(arguments, 2),
      isTimeout: true,
    };
    worker.postMessage({
      name: TYPE.SET_TIMEOUT,
      fakeId: fakeId,
      time: time,
    });
    return fakeId;
  };
  worker.clearTimeout = function (fakeId) {
    if (hasKey(fakeIdToCallback, fakeId)) {
      delete fakeIdToCallback[fakeId];
      worker.postMessage({
        name: TYPE.CLEAN_TIMEOUT,
        fakeId: fakeId,
      });
    }
  };
  worker.onmessage = (event) => {
    const fakeId = event?.data?.fakeId;
    if (hasKey(fakeIdToCallback, fakeId)) {
      const request = fakeIdToCallback[fakeId];
      let callback = request.callback;
      const parameters = request.parameters;
      if (hasKey(request, "isTimeout") && request.isTimeout) {
        delete fakeIdToCallback[fakeId];
      }
      if (typeof callback === "string") {
        callback = new Function(callback);
      }
      if (typeof callback === "function") {
        callback.apply(window, parameters);
      }
    }
  };
  return worker;
}
const getInstace = compose(createInstance, cache);
export default (function () {
  if (typeof Worker === "undefined") {
    throw Error(`HTML5 Web Worker is not supported`);
  }
  const instance = getInstace();
  return instance;
})();
