import myWorker from './worker';
import fetchErrorHandler from './fetch';
import runtimeErrorHandler from './runtime';
import { compose, cache, createWorker, assert } from './utils';
import Axios from 'axios';
const axios = Axios.create();
class JsError {
  constructor({ fetchError, runtimeError, httpOpts = {} }) {
    this.httpOpts = httpOpts;
    fetchErrorHandler(fetchError, this.next.bind(this), this.httpOpts);
    runtimeErrorHandler(runtimeError, this.next.bind(this));
  }
  next(data, type) {
    console.log('next-type', type, data);
    if (type === 'runtimeError') {
      const res = {
        filename: data.filename,
        lineno: data.lineno,
        colno: data.colno,
        message: data.message,
      };
      res.filename = data.filename;
      this.send(res, type);
    }
    if (type === 'fetchError') {
      this.send(data, type);
    }
  }
  send(data, type) {
    const { url, defaultData = {} } = this.httpOpts;
    if (!url) return;
    axios({
      url,
      method: 'post',
      data: {
        ...defaultData,
        type,
        remark: JSON.stringify(data),
        device: navigator.userAgent,
      },
    });
  }
}

export default JsError;
