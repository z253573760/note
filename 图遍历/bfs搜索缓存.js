const list = [
  {
    id: 1,
    children: [
      {
        id: "1-1",
        children: [
          {
            id: "1-1-1",
          },
        ],
      },
      {
        id: "1-2",
        children: [
          {
            id: "1-2-1",
          },
        ],
      },
    ],
  },
  {
    id: 2,
  },
];

function bfs(list, cb, startIndex = 0, res = []) {
  for (let i = startIndex; i < list.length; i += 1) {
    const item = list[i];
    res.push(...(item.children || []));
    const result = cb(item, i, list, res);
    if (result) {
      return result;
    }
  }
  if (res.length) {
    return bfs(res, cb);
  }
  console.warn("没有命中目标");
}

function createSearch(list) {
  const map = {};
  const log = {
    list,
    index: 0,
    res: [],
  };
  return (id) => {
    // 第一次从缓存查找
    const firstSearchRes = map[id];
    if (firstSearchRes) return res;
    // 没找到目标 bfs 从上次记录的位置 开始继续查找
    bfs(
      log.list,
      (item, index, list, res) => {
        map[item.id] = item;
        Object.assign(log, { index, list, res });
        return item.id == id;
      },
      log.index,
      log.res
    );
    // 第二次从缓存查找
    const secondSearchRes = map[id];
    if (secondSearchRes) return secondSearchRes;
    console.warn("没找到");
  };
}
const foo = createSearch(list);
console.log("res1", foo(1));
console.log("res2", foo("1-1"));
