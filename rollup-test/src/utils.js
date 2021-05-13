export function isObject(target = null) {
  return target !== null && typeof target === "object";
}

export function isSymbol(target) {
  return typeof target === "symbol";
}

export function hasOwn(target, key) {
  return target.hasOwnProperty(key);
}

export function isInteger(target) {
  return target === `${parseInt(target)}`;
}

export function isArrayAddIndex(target, key) {
  return Array.isArray(target) && isInteger(key)
    ? Number(key) < target.length
    : hasOwn(target, key);
}
