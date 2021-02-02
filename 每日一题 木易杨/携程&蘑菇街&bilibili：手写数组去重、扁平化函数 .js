const arr = [
  [123, 123, 2, 4, [42, [1, 2], 5]],
  [[5, 8], 6, [54, [3, [9, [9]]]], 3],
  0,
  7,
];
function bar(list) {
  const res = []; //结果
  const map = {}; //去重的介质
  const flat = (list) => {
    for (const item of list) {
      if (Array.isArray(item)) {
        // 如果是数组 递归
        flat(item);
      } else {
        // 不是数组
        if (!map[item]) {
          //判断是否重复
          map[item] = 1;
          res.push(item); //没重复=>添加到结果中
        }
      }
    }
  };
  flat(list);
  return res;
}

bar(arr); //[123, 2,  4, 42, 1, 5, 8, 6, 54,  3, 9, 0 ,7]
