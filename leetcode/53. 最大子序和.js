// 53. 最大子序和
// 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。

// 示例:

// 输入: [-2,1,-3,4,-1,2,1,-5,4]
// 输出: 6
// 解释: 连续子数组 [4,-1,2,1] 的和最大，为 6。
// 进阶:

// 如果你已经实现复杂度为 O(n) 的解法，尝试使用更为精妙的分治法求解。

// 通过次数368,064提交次数697,763
// 在真实的面试中遇到过这道题？
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function (nums) {
  if (nums.length === 0) return 0;
  let curSum = nums[0];
  let maxSum = curSum;
  for (let i = 1; i < nums.length; i += 1) {
    const num = nums[i];
    if (curSum > 0) {
      curSum += num;
    } else {
      curSum = num;
    }
    if (curSum > maxSum) {
      maxSum = curSum;
    }
  }
  return maxSum;
};
const res = maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
console.log(res);
