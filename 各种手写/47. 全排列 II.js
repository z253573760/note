// 47. 全排列 II
// 给定一个可包含重复数字的序列，返回所有不重复的全排列。

// 示例:

// 输入: [1,1,2]
// 输出:
// [
//   [1,1,2],
//   [1,2,1],
//   [2,1,1]
// ]
var permuteUnique = function (nums) {
  const res = [];
  const used = {};
  nums = nums.sort((a, b) => a - b);
  console.log(nums);
  function dfs(list = []) {
    if (list.length === nums.length) {
      res.push([...list]);
      return;
    }
    for (let i = 0; i < nums.length; i += 1) {
      if (!used[i - 1] && i > 0 && nums[i] === nums[i - 1]) {
        continue;
      }
      if (used[i]) continue;
      list.push(nums[i]);
      used[i] = true;
      dfs(list);
      list.pop();
      used[i] = false;
    }
  }
  dfs();
  return res;
};

const res = permuteUnique([1, 1, 2]);
console.log(res);
