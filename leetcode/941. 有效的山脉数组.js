// 941. 有效的山脉数组
// 给定一个整数数组 A，如果它是有效的山脉数组就返回 true，否则返回 false。

// 让我们回顾一下，如果 A 满足下述条件，那么它是一个山脉数组：

// A.length >= 3
// 在 0 < i < A.length - 1 条件下，存在 i 使得：
// A[0] < A[1] < ... A[i-1] < A[i]
// A[i] > A[i+1] > ... > A[A.length - 1]

// 示例 1：

// 输入：[2,1]
// 输出：false
// 示例 2：

// 输入：[3,5,5]
// 输出：false
// 示例 3：

// 输入：[0,3,2,1]
// 输出：true

// 提示：

// 0 <= A.length <= 10000
// 0 <= A[i] <= 10000
/**
 * @param {number[]} A
 * @return {boolean}
 */
var validMountainArray = function (A) {
  const n = A.length;
  if (n < 3) return false;
  let index = 0;
  let index2 = n - 1;
  for (let i = 1; i < n; i += 1) {
    const item = A[i - 1];
    const item2 = A[i];
    if (item2 > item) {
      index = i;
    } else {
      break;
    }
  }
  if (index === 0 || index === n - 1) return false;
  for (let i = n - 1; i >= 0; i -= 1) {
    const item = A[i - 1];
    const item2 = A[i];
    if (item2 < item) {
      index2 = i - 1;
    } else {
      break;
    }
  }
  console.log(index, index2);
  return index === index2;
};

const res = validMountainArray([0, 1, 2, 3, 5, 3]);
console.log(res);
