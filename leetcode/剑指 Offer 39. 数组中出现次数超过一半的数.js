// 剑指 Offer 39. 数组中出现次数超过一半的数字
// 数组中有一个数字出现的次数超过数组长度的一半，请找出这个数字。

// 你可以假设数组是非空的，并且给定的数组总是存在多数元素。

// 示例 1:

// 输入: [1, 2, 3, 2, 2, 2, 5, 4, 2]
// 输出: 2

// 限制：

// 1 <= 数组长度 <= 50000

// 注意：本题与主站 169 题相同：https://leetcode-cn.com/problems/majority-element/
var majorityElement = function (nums) {
  let res = nums[0];
  let count = 1;
  for (let i = 1; i < nums.length; i += 1) {
    const item = nums[i];
    if (item === res) {
      count += 1;
      continue;
    }
    count -= 1;
    if (count === 0) {
      res = nums[i];
      count += 1;
    }
  }
  return res;
};

const res = majorityElement([1, 2, 3, 2, 2, 2, 5, 4, 2]);
console.log(res);
