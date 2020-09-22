var maxProfit = function (nums) {
  let max = 0
  for (let i = 0; i < nums.length - 1; i += 1) {
    const diff = nums[i + 1] - nums[i]
    if (diff > 0) {
      console.log(diff)
      max += diff
    }
  }
  return max
};
const res = maxProfit([7, 1, 5, 3, 6, 4])
console.log(res)