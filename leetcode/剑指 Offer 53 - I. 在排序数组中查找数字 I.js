// 剑指 Offer 53 - I. 在排序数组中查找数字 I
// 统计一个数字在排序数组中出现的次数。

//

// 示例 1:

// 输入: nums = [5,7,7,8,8,10], target = 8
// 输出: 2
// 示例 2:

// 输入: nums = [5,7,7,8,8,10], target = 6
// 输出: 0
//

// 限制：

// 0 <= 数组长度 <= 50000

//

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/zai-pai-xu-shu-zu-zhong-cha-zhao-shu-zi-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
var search = function (nums, target) {
  if (nums.length === 0) return 0;
  const search2 = function (start, end) {
    console.log(start, end);
    const midd = Math.floor((start + end) / 2);
    const res = nums[midd];
    if (start > end) return false;
    if (res === target) return midd;
    if (res > target) return search2(start, midd - 1);
    if (res < target) return search2(midd + 1, end);
    if (end === start) return false;
  };
  const index = search2(0, nums.length - 1);
  if (!index && index !== 0) return 0;
  let count = 0;
  for (let i = index; i < nums.length; i += 1) {
    if (nums[i] !== target) break;
    count += 1;
  }
  for (let i = index; i >= 0; i -= 1) {
    if (nums[i] !== target) break;
    count += 1;
  }
  return count - 1;
};
const res = search([1], 2);
console.log(res);
