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
  let max = nums[0];
  let current = max;
  for (let i = 1; i < nums.length; i += 1) {
    const num = nums[i];
    if (num >= max) {
      current = num;
    } else {
      current = num + current;
    }
    max = Math.max(current, max);
  }
  return max;
};
const list = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
const res = maxSubArray(list);
console.log("res", res);
function maxSubArray3(list) {
  let left = 0;
  let right = 1;
  let current = list[0];
  let max = current;
  while (right < list.length) {
    current = current + list[right];
    max = Math.max(max, current);
    right += 1;
    if (right === list.length) {
      left = left + 1;
      right = left + 1;
      current = list[left];
      max = Math.max(max, current);
    }
  }
  return max;
}
const res2 = maxSubArray3(list);
console.log("res2", res2);
