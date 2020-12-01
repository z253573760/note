// 34. 在排序数组中查找元素的第一个和最后一个位置
// 给定一个按照升序排列的整数数组 nums，和一个目标值 target。找出给定目标值在数组中的开始位置和结束位置。

// 如果数组中不存在目标值 target，返回 [-1, -1]。

// 进阶：

// 你可以设计并实现时间复杂度为 O(log n) 的算法解决此问题吗？

// 示例 1：

// 输入：nums = [5,7,7,8,8,10], target = 8
// 输出：[3,4]
// 示例 2：

// 输入：nums = [5,7,7,8,8,10], target = 6
// 输出：[-1,-1]
// 示例 3：

// 输入：nums = [], target = 0
// 输出：[-1,-1]

// 提示：

// 0 <= nums.length <= 105
// -109 <= nums[i] <= 109
// nums 是一个非递减数组
// -109 <= target <= 109
// 通过次数155,792提交次数381,410
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange1 = function (nums, target) {
  //
  const res = [-1, -1];
  let start = 0;
  let end = nums.length - 1;
  while (start <= end) {
    if (res[0] !== -1 && res[1] !== -1) {
      return res;
    }
    if (nums[start] === target) {
      res[0] = start;
    }
    if (nums[end] === target) {
      res[1] = end;
    }
    if (nums[start] < target) {
      start++;
    }
    if (nums[end] > target) {
      end--;
    }
  }
  return res;
};
//二分法
var searchRange = function (nums, target) {
  function search(start, end) {
    if (start > end) return -1;
    const index = parseInt(end + start);
    const t = nums[index];
    if (t === target) {
      return index;
    } else if (t > target) {
      end = index - 1;
    } else {
      start = index + 1;
    }
    return search(start, end);
  }
  const index = search(0, nums.length - 1);
  if (index === -1) {
    return [-1, -1];
  }
  let left = index;
  for (let i = index; i >= 0; i -= 1) {
    if (target === nums[i]) {
      left = i;
    }
  }
  let right = index;
  for (let i = index; i < nums.length; i += 1) {
    if (target === nums[i]) {
      right = i;
    }
  }
  return [left, right];
};
const res = searchRange([1, 1, 1, 1], 1);
console.log(res);
