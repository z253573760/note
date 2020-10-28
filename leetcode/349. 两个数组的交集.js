// 349. 两个数组的交集
// 给定两个数组，编写一个函数来计算它们的交集。

// 示例 1：

// 输入：nums1 = [1,2,2,1], nums2 = [2,2]
// 输出：[2]
// 示例 2：

// 输入：nums1 = [4,9,5], nums2 = [9,4,9,8,4]
// 输出：[9,4]

// 说明：

// 输出结果中的每个元素一定是唯一的。
// 我们可以不考虑输出结果的顺序。
// 通过次数100,479提交次数141,419
// 在真实的面试中遇到过这道题？
var intersection = function (nums1, nums2) {
  const res = [];
  const map = nums1.reduce((map, item) => {
    map[item] = 1;
    return map;
  }, {});
  for (const item of nums2) {
    if (map[item]) {
      res.push(item);
      map[item] = false;
    }
  }
  return res;
};

const res = intersection([1, 2, 2, 1], [2, 2]);
console.log(res);
