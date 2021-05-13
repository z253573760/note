function deepClone(target, map = new WeakMap()) {
  if (typeof target !== "object") {
    return target;
  }
  if (map.get(target)) {
    return map.get(target);
  }
  if (Array.isArray(target)) {
    return cloneArray(target, map);
  }
  return CloneObject(target, map);
}

function cloneArray(target, map) {
  const res = [];
  map.set(target, res);
  for (const item of target) {
    res.push(deepClone(item, map));
  }
  return res;
}

function CloneObject(target, map) {
  const res = {};
  map.set(target, res);
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      const value = deepClone(target[key], map);
      res[key] = value;
    }
  }
  return res;
}
const a = {
  1: 2,
  b: "c",
  d: {
    s: "S",
  },
  g: { c: [1, 2, 3] },
};
a.d.s = a;
a.g.c[0] = a;

const res = deepClone(a);
console.log(res);
