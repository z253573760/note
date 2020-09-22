/**
 * @param {number[]} nums
 * @return {number}
 */
var findRepeatNumber = function (nums) {
  const map = {}
  for (const item of nums) {
    if (map[item]) return item
    map[item] = item
  }
};


const res = findRepeatNumber([2, 3, 1, 0, 2, 5, 3])
console.log(res)