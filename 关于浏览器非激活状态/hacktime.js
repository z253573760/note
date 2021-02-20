(function (workerScript) {
  if (!/MSIE 10/i.test(navigator.userAgent)) {
    try {
      var blob = new Blob([
        "\
var fakeIdToId = {};\
onmessage = function (event) {\
	var data = event.data,\
		name = data.name,\
		fakeId = data.fakeId,\
		time;\
	if(data.hasOwnProperty('time')) {\
		time = data.time;\
	}\
	switch (name) {\
		case 'setInterval':\
			fakeIdToId[fakeId] = setInterval(function () {\
				postMessage({fakeId: fakeId});\
			}, time);\
			break;\
		case 'clearInterval':\
			if (fakeIdToId.hasOwnProperty (fakeId)) {\
				clearInterval(fakeIdToId[fakeId]);\
				delete fakeIdToId[fakeId];\
			}\
			break;\
		case 'setTimeout':\
			fakeIdToId[fakeId] = setTimeout(function () {\
				postMessage({fakeId: fakeId});\
				if (fakeIdToId.hasOwnProperty (fakeId)) {\
					delete fakeIdToId[fakeId];\
				}\
			}, time);\
			break;\
		case 'clearTimeout':\
			if (fakeIdToId.hasOwnProperty (fakeId)) {\
				clearTimeout(fakeIdToId[fakeId]);\
				delete fakeIdToId[fakeId];\
			}\
			break;\
	}\
}\
",
      ]);
      // Obtain a blob URL reference to our worker 'file'.
      workerScript = window.URL.createObjectURL(blob);
    } catch (error) {
      /* Blob is not supported, use external script instead */
    }
  }
  var worker,
    fakeIdToCallback = {},
    lastFakeId = 0,
    maxFakeId = 0x7fffffff, // 2 ^ 31 - 1, 31 bit, positive values of signed 32 bit integer
    logPrefix = "HackTimer.js by turuslan: ";

  if (typeof Worker !== "undefined") {
    logPrefix;
    var getFakeId = function getFakeId() {
      do {
        if (lastFakeId == maxFakeId) {
          lastFakeId = 0;
        } else {
          lastFakeId++;
        }
      } while (
        Object.prototype.hasOwnProperty.call(fakeIdToCallback, lastFakeId)
        // fakeIdToCallback.hasOwnProperty(lastFakeId)
      );
      return lastFakeId;
    };
    try {
      worker = new Worker(workerScript);
      window.setInterval = function (callback, time /* , parameters */) {
        var fakeId = getFakeId();
        fakeIdToCallback[fakeId] = {
          callback: callback,
          parameters: Array.prototype.slice.call(arguments, 2),
        };
        worker.postMessage({
          name: "setInterval",
          fakeId: fakeId,
          time: time,
        });
        return fakeId;
      };
      window.clearInterval = function (fakeId) {
        if (
          Object.prototype.hasOwnProperty.call(fakeIdToCallback, fakeId)
          // fakeIdToCallback.hasOwnProperty(fakeId)
        ) {
          delete fakeIdToCallback[fakeId];
          worker.postMessage({
            name: "clearInterval",
            fakeId: fakeId,
          });
        }
      };
      window.setTimeout = function (callback, time /* , parameters */) {
        var fakeId = getFakeId();
        fakeIdToCallback[fakeId] = {
          callback: callback,
          parameters: Array.prototype.slice.call(arguments, 2),
          isTimeout: true,
        };
        worker.postMessage({
          name: "setTimeout",
          fakeId: fakeId,
          time: time,
        });
        return fakeId;
      };
      window.clearTimeout = function (fakeId) {
        if (Object.prototype.hasOwnProperty.call(fakeIdToCallback, fakeId)) {
          delete fakeIdToCallback[fakeId];
          worker.postMessage({
            name: "clearTimeout",
            fakeId: fakeId,
          });
        }
      };
      worker.onmessage = function (event) {
        event;
        var data = event.data,
          fakeId = data.fakeId,
          request,
          parameters,
          callback;
        if (Object.prototype.hasOwnProperty.call(fakeIdToCallback, fakeId)) {
          request = fakeIdToCallback[fakeId];
          callback = request.callback;
          parameters = request.parameters;
          if (
            Object.prototype.hasOwnProperty.call(request, "isTimeout") &&
            request.isTimeout
          ) {
            delete fakeIdToCallback[fakeId];
          }
        }
        if (typeof callback === "string") {
          try {
            callback = new Function(callback);
          } catch (error) {
            // console.log(
            //   logPrefix + 'Error parsing callback code string: ',
            //   error
            // )
          }
        }
        if (typeof callback === "function") {
          callback.apply(window, parameters);
        }
      };
      worker.onerror = function (event) {
        event;
        //   console.log(event)
      };
    } catch (error) {
      error;
      // console.log(logPrefix + 'Initialisation failed')
      // console.error(error)
    }
  } else {
    // console.log(
    //   logPrefix + 'Initialisation failed - HTML5 Web Worker is not supported'
    // )
  }
})("HackTimerWorker.js");
