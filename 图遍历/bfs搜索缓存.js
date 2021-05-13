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
    console.log(item.id);
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
    const firstSearchRes = map[id];
    if (firstSearchRes) return res;
    bfs(
      list,
      (item, index, list, res) => {
        map[item.id] = item;
        log.index = index;
        log.list = list;
        log.res = res;
        return item.id == id;
      },
      log.index,
      log.res
    );
    const secondSearchRes = map[id];
    if (secondSearchRes) return secondSearchRes;
    console.warn("没找到");
  };
}
const foo = createSearch(list);
console.log("res1", foo(1));
console.log("res2", foo("1-1"));
