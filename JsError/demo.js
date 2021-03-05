import JsError from "./index";

JsError({
  httpOpts: {
    url: "http://192.168.0.104/public/front_log",
    defaultData: { name: "项目名称" },
  },
  fetchError(res, next) {
    if (res?.response?.status >= 400) {
      next();
    } else if (res.error) {
      next();
    }
  },
  XhrError(res, next) {
    if (res.response.status >= 400) {
      next();
    } else if (res.error) {
      next();
    }
  },
  runtimeError(error, next) {
    const { message } = error;
    if (message) {
      next();
    }
  },
});
