// 40. 组合总和 II
// 给定一个数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。

// candidates 中的每个数字在每个组合中只能使用一次。

// 说明：

// 所有数字（包括目标数）都是正整数。
// 解集不能包含重复的组合。
// 示例 1:

// 输入: candidates = [10,1,2,7,6,1,5], target = 8,
// 所求解集为:
// [
//   [1, 7],
//   [1, 2, 5],
//   [2, 6],
//   [1, 1, 6]
// ]
// 示例 2:

// 输入: candidates = [2,5,2,1,2], target = 5,
// 所求解集为:
// [
//   [1,2,2],
//   [5]
// ]
var combinationSum2 = function (candidates, target) {
  candidates = candidates.sort((a, b) => a - b);
  const result = [];
  function dfs(res = [], sum = 0, index = 0) {
    if (sum > target) return;
    if (sum === target) {
      result.push([...res]);
      return;
    }
    for (let i = index; i < candidates.length; i += 1) {
      const item = candidates[i];
      if (candidates[i - 1] == candidates[i] && i - 1 >= index) continue;
      res.push(item);
      sum += item;
      dfs(res, sum, i + 1);
      res.pop();
      sum -= item;
    }
  }
  dfs();

  return result;
};

const res = combinationSum2([10, 1, 2, 7, 6, 1, 5], 8);
console.log(res);
//  1
//  2 3 7 6
//
