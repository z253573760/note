// 136. 只出现一次的数字
// 给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。

// 说明：

// 你的算法应该具有线性时间复杂度。 你可以不使用额外空间来实现吗？

// 示例 1:

// 输入: [2,2,1]
// 输出: 1
// 示例 2:

// 输入: [4,1,2,1,2]
// 输出: 4
// 通过次数311,350提交次数441,
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function (nums) {
  const res = nums.reduce((a, b) => {
    a[b] = a[b] ? a[b] + 1 : 1;
    return a;
  }, {});
  for (const key in res) {
    if (res[key] === 1) return key;
  }
};
const res = singleNumber([2, 2, 1]);
console.log(res);
