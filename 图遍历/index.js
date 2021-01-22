const tree = [
  {
    id: "1",
    name: "广东省",
    children: [
      {
        id: "12",
        name: "广州市",
        children: [
          {
            id: "121",
            name: "天河区",
          },
          {
            id: "122",
            name: "荔湾区",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "福建省",
    children: [
      {
        id: "13",
        name: "厦门市",
        children: [
          {
            id: "131",
            name: "思明区",
          },
          {
            id: "132",
            name: "湖里区",
          },
        ],
      },
    ],
  },
];

function dfs(tree, cb = () => {}, res = []) {
  if (!tree || !tree.length) {
    return;
  }
  for (const item of tree) {
    res.push(item);
    cb(item);
    dfs(item.children, cb, res);
    res.pop();
  }
}

// 广度遍历
function bfs(tree, cb = () => {}) {
  const result = [];
  for (const item of tree) {
    cb(item);
    item.children && result.push(...item.children);
  }
  result.length && bfs(result, cb);
}

dfs(tree, (item) => {
  console.log(item.name);
});
bfs(tree, (item) => {
  console.log(item.name);
});
