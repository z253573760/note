// 209. 长度最小的子数组
// 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。

// 示例：

// 输入：s = 7, nums = [2,3,1,2,4,3]
// 输出：2
// 解释：子数组 [4,3] 是该条件下的长度最小的子数组。

// 进阶：

// 如果你已经完成了 O(n) 时间复杂度的解法, 请尝试 O(n log n) 时间复杂度的解法。
// 通过次数98,256提交次数220,560
/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (s, nums) {
  let left = 0;
  let right = 0;
  let sum = 0;
  let len = nums.length + 1;
  while (right < nums.length) {
    sum += nums[right];
    while (sum >= s) {
      sum -= nums[left];
      len = Math.min(len, right - left + 1);
      left += 1;
    }
    right += 1;
  }
  return len === nums.length + 1 ? 0 : len;
};

const res = minSubArrayLen(7, [2, 3, 1, 2, 4, 3]);
console.log(res);
