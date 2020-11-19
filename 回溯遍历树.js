const data = [
  {
    name: "a",
    children: [
      {
        name: "b",
        children: [{ name: "e", children: [], code: "eee" }],
        code: "bbb",
      },
      {
        name: "c",
        children: [{ name: "f", children: [], code: "fff" }],
        code: "ccc",
      },
      {
        name: "d",
        children: [{ name: "g", children: [], code: "ggg" }],
        code: "ddd",
      },
    ],
    code: "aaa",
  },
  {
    name: "a2",
    children: [
      {
        name: "b2",
        children: [{ name: "e2", children: [], code: "e22" }],
        code: "b22",
      },
      {
        name: "c2",
        children: [{ name: "f2", children: [], code: "f22" }],
        code: "c22",
      },
      {
        name: "d2",
        children: [{ name: "g2", children: [], code: "g22" }],
        code: "d22",
      },
    ],
  },
];
function pailie(list, cb = (v) => v) {
  const result = [];
  function dfs(data, res = []) {
    if (!data || !data.length) {
      result.push(cb([...res]));
      return;
    }
    for (const item of data) {
      res.push(item);
      dfs(item.children, res);
      res.pop();
    }
  }
  dfs(list);
  return result;
}

/**
 * 格式化
 * @param {Array} list //[a,b,c,d]
 */
const parse = (list) => {
  return {
    ...list[list.length - 1],
    name: list.map((item) => item.name).join("/"),
  };
};

//测试
const res = pailie(data, parse);
//或者
const res2 = pailie(data).map(parse);
console.log(res);
console.log(res2);
console.log(JSON.stringify(res) === JSON.stringify(res2));
