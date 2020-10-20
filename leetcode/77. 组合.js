// 77. 组合
// 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。

// 示例:

// 输入: n = 4, k = 2
// 输出:
// [
//   [2,4],
//   [3,4],
//   [2,3],
//   [1,2],
//   [1,3],
//   [1,4],
// ]
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
//[1,2,3,4]
var combine = function (n, k) {
  const result = [];
  const midd = n / 2;
  function dfs(start = 0, res = []) {
    if (res.length === 0 && start > midd) return;
    if (res.length === k) {
      result.push([...res]);
      return;
    }
    for (let i = start; i < n; i += 1) {
      res.push(i + 1);
      dfs(i + 1, res);
      res.pop();
    }
  }
  dfs();
  console.log(result);
  return result;
};
combine(4, 2);
