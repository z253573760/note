const data = [
  {
    name: "a",
    children: [
      {
        name: "b",
        children: [
          { name: "e" },
          { name: "1", children: [{ name: "xxx" }] },
          { name: "2" },
          { name: "3" },
        ],
      },
      {
        name: "c",
        children: [
          {
            name: "f",
            children: [
              {
                name: "a2",
                children: [
                  { name: "b2", children: [{ name: "e2" }] },
                  { name: "c2", children: [{ name: "f2" }] },
                  { name: "d2", children: [{ name: "g2" }] },
                ],
              },
            ],
          },
        ],
      },
      { name: "d", children: [{ name: "g" }] },
    ],
  },
];

function pailie(list, cb = (v) => v) {
  const result = [];
  function dfs(data, res = []) {
    if (!data) {
      result.push(cb([...res]));
      return;
    }
    for (const item of data) {
      res.push(item.name);
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
const parse = (list) => ({ name: list.join("/") });

//测试
const res = pailie(data, parse);
//或者
const res2 = pailie(data).map(parse);
console.log(res);
console.log(res2);
console.log(JSON.stringify(res) === JSON.stringify(res2));
