// 229. 求众数 II
// 题目描述
// 评论 (176)
// 题解 (185)
// 提交记录
// 229. 求众数 II
// 给定一个大小为 n 的整数数组，找出其中所有出现超过 ⌊ n/3 ⌋ 次的元素。

// 进阶：尝试设计时间复杂度为 O(n)、空间复杂度为 O(1)的算法解决此问题。

// 示例 1：

// 输入：[3,2,3]
// 输出：[3]
// 示例 2：

// 输入：nums = [1]
// 输出：[1]
// 示例 3：

// 输入：[1,1,1,3,3,2,2,2]
// 输出：[1,2]

var majorityElement = function (nums) {
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
const res = majorityElement([1, 1, 1, 3, 3, 2, 2, 2]);
console.log(res);
