function getRequest(...args) {
  const res = {
    url: args[0],
    ...args[1],
  };
  delete res.errorHandler;
  return res;
}

const STATUS = [401, 429];

export default (fetchError = () => {}, next, httpOpts) => {
  const oldFetch = window.fetch;
  if (!oldFetch) return;
  window.fetch = (...args) => {
    const request = getRequest(...args);
    return oldFetch(...args)
      .then((res) => {
        const handler = async (res) => {
          try {
            const data = await res.clone.call(res).json();
            const body = {
              response: { data, status: res.status },
              request,
              error: null,
            };
            Promise.resolve().then(() => fetchError(body, () => next(body, fetchError.name)));
          } catch (err) {}
        };
        if (request.url !== httpOpts?.url && res?.status > 400 && !STATUS.includes(res?.status)) {
          handler(res, next);
        }
        return res;
      })
      .catch((err) => {
        console.log('catch-err', err);
        const body = {
          response: null,
          request,
          error: err,
        };

        setTimeout(() => {
          fetchError(body, () => next(body, fetchError.name));
        }, 0);
        return Promise.reject(err);
      });
  };
};
