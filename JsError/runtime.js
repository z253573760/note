export default (runtimeError = () => {}, next) => {
  window.addEventListener(
    'error',
    (error) => {
      runtimeError(error, () => next(error, runtimeError.name));
    },
    true,
  );
};
