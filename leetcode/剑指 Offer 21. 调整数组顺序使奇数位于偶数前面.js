// 剑指 Offer 21. 调整数组顺序使奇数位于偶数前面
// 输入一个整数数组，实现一个函数来调整该数组中数字的顺序，使得所有奇数位于数组的前半部分，所有偶数位于数组的后半部分。

// 示例：

// 输入：nums = [1,2,3,4]
// 输出：[1,3,2,4]
// 注：[3,1,2,4] 也是正确的答案之一。

// 提示：

// 1 <= nums.length <= 50000
// 1 <= nums[i] <= 10000
var exchange = function (nums) {
  let start = 0;
  let end = nums.length - 1;
  while (start < end) {
    const left = nums[start];
    const right = nums[end];
    if (left % 2 === 0 && right % 2 === 1) {
      let cur = nums[end];
      nums[end] = nums[start];
      nums[start] = cur;
      start += 1;
      end -= 1;
    } else {
      if (left % 2 === 1) {
        start += 1;
      }
      if (right % 2 === 0) {
        end -= 1;
      }
    }
  }
  console.log(nums);
  return nums;
};

const res = exchange([1, 3, 3, 3, 3, 3, 3, 2, 3, 4]);
