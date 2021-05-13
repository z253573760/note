async function main() {
  const usersCache = new Map();
  const userPromisesCache = new Map();
  const getUserById = async (userId) => {
    if (!userPromisesCache.has(userId)) {
      const userPromise = await new Promise((reslove, reject) => {
        setTimeout(() => {
          reslove({ userId });
        }, 30);
      });
      userPromisesCache.set(userId, userPromise);
    }
    return userPromisesCache.get(userId);
  };
  await Promise.all([getUserById("user1"), getUserById("user1")]);
}

// main();
const fn = () => {
  console.log("fn");
};
const map = new Map();
map.set(fn, fn);

map.get(fn)();
map.set([], []);
console.log(map);
console.log(map.get([]));
const wmap = new WeakMap();
wmap.set(fn, fn);
wmap.get(fn)();
