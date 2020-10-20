// 377. 组合总和 Ⅳ
// 给定一个由正整数组成且不存在重复数字的数组，找出和为给定目标正整数的组合的个数。

// 示例:

// nums = [1, 2, 3]
// target = 4

// 所有可能的组合为：
// (1, 1, 1, 1)
// (1, 1, 2)
// (1, 2, 1)
// (1, 3)
// (2, 1, 1)
// (2, 2)
// (3, 1)

// 请注意，顺序不同的序列被视作不同的组合。

// 因此输出为 7。
// 进阶：
// 如果给定的数组中含有负数会怎么样？
// 问题会产生什么变化？
// 我们需要在题目中添加什么限制来允许负数的出现？

// 致谢：
// 特别感谢 @pbrother 添加此问题并创建所有测试用例。

// 通过次数18,900提交次数43,961
// 在真实的面试中遇到过这道题？

//回溯 超时了
var combinationSum41 = function (nums, target) {
  const result = [];
  const map = {};
  function dfs(res = [], sum = 0) {
    if (sum > target) return;
    map[sum] = map[sum] ? map[sum] + 1 : 1;
    if (sum === target) {
      result.push([...res]);
      return;
    }
    for (let i = 0; i < nums.length; i += 1) {
      sum = sum + nums[i];
      res.push(nums[i]);
      dfs(res, sum);
      res.pop();
      sum = sum - nums[i];
    }
  }
  dfs();
  console.log(result);
  console.log(map);
  return result.length;
};

var combinationSum43 = function (nums, target) {
  const map = {};

  function dfs(target) {
    if (map[target]) return map[target];
    if (target === 0) return 1;
    let sum = 0;
    for (const item of nums) {
      const res = target - item;
      if (res >= 0) {
        sum += dfs(res);
      }
    }
    map[target] = sum;
    return sum;
  }
  dfs(target);
  console.log(map);
  return map[target];
};

var combinationSum4 = function (nums, target) {
  const list = [];
  for (let i = 0; i < target; i += 1) {
    //
  }
};
const res = combinationSum43([1, 2, 3], 4);
console.log(res);
