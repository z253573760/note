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
function pailie(list) {
  const result = [];
  function dfs(data, res = []) {
    if (!data) {
      result.push([...res]);
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
const res = pailie(data);
console.log("res", res);
