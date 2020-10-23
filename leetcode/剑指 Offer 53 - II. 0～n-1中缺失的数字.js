// 剑指 Offer 53 - II. 0～n-1中缺失的数字
// 一个长度为n-1的递增排序数组中的所有数字都是唯一的，并且每个数字都在范围0～n-1之内。在范围0～n-1内的n个数字中有且只有一个数字不在该数组中，请找出这个数字。

// 示例 1:

// 输入: [0,1,3]
// 输出: 2
// 示例 2:

// 输入: [0,1,2,3,4,5,6,7,9]
// 输出: 8

// 限制：

// 1 <= 数组长度 <= 10000

// 通过次数63,824提交次数144,910
// 在真实的面试中遇到过这道题？
var missingNumber = function (nums) {
  let start = 0;
  let end = nums.length - 1;
  while (start <= end) {
    const midd = Math.floor((start + end) / 2);
    if (midd === nums[midd]) {
      start = midd + 1;
    } else {
      end = midd - 1;
    }
  }
  return start;
};

const res = missingNumber([0]);
console.log(res);
