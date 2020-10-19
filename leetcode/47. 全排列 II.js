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
  const result = []
  const used = {}
  nums = nums.sort((a, b) => a - b)

  function dfs(res) {
    if (res.length === nums.length) {
      result.push([...res])
      return
    }
    for (let i = 0; i < nums.length; i += 1) {
      const item = nums[i]
      if (nums[i - 1] == nums[i] && i - 1 >= 0 && !used[i - 1]) { // 避免产生重复的排列
        continue;
      }
      if (used[i]) continue
      used[i] = true
      res.push(item)
      dfs(res)
      res.pop()
      used[i] = false
    }
  }
  dfs([])
  return result
};

const res = permuteUnique([2, 1, 2])
console.log(res)