import { compose, cache, createWorker, hasKey } from "./utils";
import { hackTimerWorker } from "./worker";

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
      name: setInterval.name,
      fakeId: fakeId,
      time: time,
    });
    return fakeId;
  };
  worker.clearInterval = function (fakeId) {
    if (hasKey(fakeIdToCallback, fakeId)) {
      delete fakeIdToCallback[fakeId];
      worker.postMessage({
        name: clearInterval.name,
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
      name: setTimeout.name,
      fakeId: fakeId,
      time: time,
    });
    return fakeId;
  };
  worker.clearTimeout = function (fakeId) {
    if (hasKey(fakeIdToCallback, fakeId)) {
      delete fakeIdToCallback[fakeId];
      worker.postMessage({
        name: clearTimeout.name,
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
const getInstance = compose(cache, createInstance);
export default (function () {
  if (typeof Worker === "undefined") {
    throw Error(`HTML5 Web Worker is not supported`);
  }
  const instance = getInstance();
  return instance;
})();
