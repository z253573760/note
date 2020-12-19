// 面试题 17.10. 主要元素
// 数组中占比超过一半的元素称之为主要元素。给定一个整数数组，找到它的主要元素。若没有，返回-1。

// 示例 1：

// 输入：[1,2,5,9,5,9,5,5,5]
// 输出：5

// 示例 2：

// 输入：[3,2]
// 输出：-1

// 示例 3：

// 输入：[2,2,1,1,1,2,2]
// 输出：2
/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
  const map = {};
  for (const item of nums) {
    if (!map[item]) {
      map[item] = 0;
    }
    map[item] += 1;
    if (map[item] > nums.length / 2) {
      return item;
    }
  }
  return -1;
};

var majorityElement2 = function (nums) {
  let len = nums.length,
    count = 1,
    goal = nums[0];
  for (i = 0; i < len; i++) {
    if (nums[i] == goal) {
      count++;
    } else {
      count--;
    }
    if (count == 0) {
      goal = nums[i];
      count = 1;
    }
  }
  return goal;
};
const res = majorityElement2([1, 2, 5, 9, 5, 9, 5, 5, 5]);
console.log(res);
