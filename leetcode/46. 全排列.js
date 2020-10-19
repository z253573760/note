// 46. 全排列
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

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/permutations
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出
var permute = function (nums) {
  const result = []

  function dfs(res) {
    if (res.length === nums.length) {
      result.push([...res])
      return
    }
    for (const item of nums) {
      if (!res.includes(item)) {
        res.push(item)
        dfs(res)
        res.pop()
      }
    }
  }
  dfs([])
  return result
};
const res = permute([1, 2, 3])
console.log(res)