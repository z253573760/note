/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var containsNearbyDuplicate = function (nums, k) {
  const map = {};
  for (let i = 0; i < nums.length; i += 1) {
    if (map[nums[i]] === undefined) {
      map[nums[i]] = i;
      continue;
    }
    if (i - map[nums[i]] <= k) {
      return true;
    }
    map[nums[i]] = i;
  }
  return false;
};
const res = containsNearbyDuplicate([1, 2, 3, 1], 2);
console.log(res);
