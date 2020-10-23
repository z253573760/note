// 35. 搜索插入位置
// 给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

// 你可以假设数组中无重复元素。

// 示例 1:

// 输入: [1,3,5,6], 5
// 输出: 2
// 示例 2:

// 输入: [1,3,5,6], 2
// 输出: 1
// 示例 3:

// 输入: [1,3,5,6], 7
// 输出: 4
// 示例 4:

// 输入: [1,3,5,6], 0
// 输出: 0
// 通过次数265,574提交次数568,331
// 在真实的面试中遇到过这道题？
var searchInsertV1 = function (nums, target) {
  //
  let start = 0;
  while (start <= nums.length) {
    const item = nums[start];
    if (target === item) return start;
    if (target < item) return start;
    start += 1;
  }
  return nums.length;
};
var searchInsert = function (nums, target) {
  let start = 0;
  let end = nums.length - 1;
  if (target < nums[0]) return 0;
  if (target > nums[nums.length - 1]) return nums.length;

  while (start <= end) {
    let midd = Math.floor((start + end) / 2);
    const res = nums[midd];
    if (res === target) {
      return midd;
    } else if (end - start === 1) {
      return end;
    } else if (target > res) {
      start = midd;
    } else {
      end = midd;
    }
  }
};
const res = searchInsert([0, 1, 2, 3, 4, 5, 6, 7, 9], 8);

console.log(res);
