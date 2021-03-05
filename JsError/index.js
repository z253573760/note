import { compose, cache, createWorker, hasKey } from './utils';

import JsError from './JsError';

function createInstance(...args) {
  return new JsError(...args);
}
const getInstance = compose(cache, createInstance);

export default (...args) => {
  if (typeof Worker === 'undefined') {
    throw Error(`HTML5 Web Worker is not supported`);
  }
  const instance = getInstance(...args);
  return instance;
};
// window.addEventListener('error', (error) => {
//   console.log('error-win', error);
// });
