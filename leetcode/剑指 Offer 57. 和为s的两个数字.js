/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  let left = 0;
  let right = nums.length - 1
  while (left < right) {
    const sum = nums[left] + nums[right]
    if (sum === target) {
      return [nums[left], nums[right]]
    } else if (sum < target) {
      left++
    } else if (sum > target) {
      right--
    }
  }
  return []
};

const res = twoSum([2, 7, 11, 15], 9)
console.log(res)