export const effectStack = [];
let activeAcctive;
const targetMap = new WeakMap();
const queue = new Set();
let uid = 0;
export function effect(fn, options = {}) {
  const effect = () => {
    activeAcctive = effect;
    fn();
  };
  effect.id = uid += 1;
  effect.deps = [];
  effect.options = options;
  if (!options.lazy) {
    try {
      effectStack.push(effect);
      effect();
    } finally {
      effectStack.pop();
    }
  }
  return effect;
}

export function track(target, key) {
  const effect = effectStack[effectStack.length - 1];
  if (!effect) return;
  let depMap = targetMap.get(target);
  if (!depMap) {
    // depMap = new Map();
    targetMap.set(target, (depMap = new Map()));
  }
  let deps = depMap.get(key);
  if (!deps) {
    depMap.set(key, (deps = new Set()));
  }
  if (!deps.has(effect)) {
    deps.add(effect);
    effect.deps.push(key);
  }
}

export function trigger(target, key, type = "change") {
  const depMap = targetMap.get(target);
  if (!depMap) return;
  const deps = depMap.get(key);
  if (!deps) return;
  const run = (deps) => deps && deps.forEach((cb) => fulshQueue(cb));

  if (Array.isArray(target) && key === "length") {
    //如果更改的是数组
    const depsOfLength = depMap.get("length");
    console.log("数组的长度更新了", depsOfLength);
    //  depsOfLength && run(depsOfLength);
  }
  if (Array.isArray(target)) {
    //  if()
  }
  run(deps);
}

function fulshQueue(fn) {
  if (queue.has(fn)) return;
  queue.add(fn);
  nextTick(() => {
    queue.forEach((cb) => cb());
    queue.clear();
  });
}

function nextTick(fn) {
  setTimeout(() => {
    fn();
  }, 0);
}
