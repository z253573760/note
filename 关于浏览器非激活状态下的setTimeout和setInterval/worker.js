export function hackTimerWorker() {
  const fakeIdToId = {};
  function $setInterval(fakeIdToId, fakeId, time) {
    fakeIdToId[fakeId] = setInterval(() => {
      postMessage({ fakeId });
    }, time);
  }

  function $clearInterval(fakeIdToId, fakeId) {
    if (hasKey(fakeIdToId, fakeId)) {
      clearInterval(fakeIdToId[fakeId]);
      delete fakeIdToId[fakeId];
    }
  }

  function $setTimeout(fakeIdToId, fakeId, time) {
    fakeIdToId[fakeId] = setTimeout(function () {
      postMessage({ fakeId });
      if (hasKey(fakeIdToId, fakeId)) {
        delete fakeIdToId[fakeId];
      }
    }, time);
  }

  function $clearTimeout(fakeIdToId, fakeId) {
    if (hasKey(fakeIdToId, fakeId)) {
      clearTimeout(fakeIdToId[fakeId]);
      delete fakeIdToId[fakeId];
    }
  }
  function hasKey(target, key) {
    return Object.prototype.hasOwnProperty.call(target, key);
  }
  onmessage = function (event) {
    const data = event.data;
    const name = data.name;
    const fakeId = data.fakeId;
    const time = data?.time || 0;
    const dict = {
      [setInterval.name]: $setInterval,
      [clearInterval.name]: $clearInterval,
      [setTimeout.name]: $setTimeout,
      [clearTimeout.name]: $clearTimeout,
    };
    const fn = dict[name];
    fn && fn(fakeIdToId, fakeId, time);
  };
}
