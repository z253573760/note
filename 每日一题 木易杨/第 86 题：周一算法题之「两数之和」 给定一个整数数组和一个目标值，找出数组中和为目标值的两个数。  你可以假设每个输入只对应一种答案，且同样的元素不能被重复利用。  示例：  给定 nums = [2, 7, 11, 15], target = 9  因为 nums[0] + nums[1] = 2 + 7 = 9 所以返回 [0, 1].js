// /第 86 题：周一算法题之「两数之和」
// 给定一个整数数组和一个目标值，找出数组中和为目标值的两个数。

// 你可以假设每个输入只对应一种答案，且同样的元素不能被重复利用。

// 示例：

// 给定 nums = [2, 7, 11, 15], target = 9

// 因为 nums[0] + nums[1] = 2 + 7 = 9
// 所以返回 [0, 1]

// function sum2(nums, target) {
//   const map = {}
//   for (let i = 0; i < nums.length; i += 1) {
//     const diff = target - nums[i]
//     if (map[diff]) {
//       return [map[diff].index, i]
//     }
//     map[nums[i]] = {
//       index: i
//     }
//   }
//   console.log(map)
//   return []
// }

function sum(list, target) {
  const map = {};
  for (let i = 0; i < list.length; i += 1) {
    const item = list[i];
    if (map[item]) {
      return [map[item], i];
    } else {
      const diff = target - item;
      map[diff] = i;
    }
  }
  return [-1, -1];
}
const res = sum([2, 7, 11, 15], 9);
console.log(res);
