// 给定一个 没有重复 数字的序列，返回其所有可能的全排列。

// 示例:

// 输入: [1,2,3]
// 输出:
// [
//   [1,2,3],
//   [1,3,2],
//   [2,1,3],
//   [2,3,1],
//   [3,1,2],
//   [3,2,1]
// ]

function bar(list) {
  const res = [];
  function dfs(arr = []) {
    if (arr.length === list.length) {
      res.push([...arr]);
      return;
    }
    for (const item of list) {
      if (arr.indexOf(item) === -1) {
        arr.push(item);
        dfs(arr);
        arr.pop();
      }
    }
  }
  dfs([]);
  return res;
}

const res = bar([1, 2, 3]);
console.log(res);
