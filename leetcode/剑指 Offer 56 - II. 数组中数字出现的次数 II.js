// 剑指 Offer 56 - II. 数组中数字出现的次数 II
// 在一个数组 nums 中除一个数字只出现一次之外，其他数字都出现了三次。请找出那个只出现一次的数字。

// 示例 1：

// 输入：nums = [3,4,3,3]
// 输出：4
// 示例 2：

// 输入：nums = [9,1,7,9,7,9,7]
// 输出：1

// 限制：

// 1 <= nums.length <= 10000
// 1 <= nums[i] < 2^31

/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  const map = {};
  for (const item of nums) {
    if (!map[item]) {
      map[item] = 0;
    }
    map[item] += 1;
  }
  for (const key in map) {
    if (map[key] === 1) return key;
  }
};

const res = singleNumber([3, 4, 3, 3]);
console.log(res);
