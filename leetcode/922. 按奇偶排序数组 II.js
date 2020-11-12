// 922. 按奇偶排序数组 II
// 给定一个非负整数数组 A， A 中一半整数是奇数，一半整数是偶数。

// 对数组进行排序，以便当 A[i] 为奇数时，i 也是奇数；当 A[i] 为偶数时， i 也是偶数。

// 你可以返回任何满足上述条件的数组作为答案。

// 示例：

// 输入：[4,2,5,7]
// 输出：[4,5,2,7]
// 解释：[4,7,2,5]，[2,5,4,7]，[2,7,4,5] 也会被接受。

// 提示：

// 2 <= A.length <= 20000
// A.length % 2 == 0
// 0 <= A[i] <= 1000

// 通过次数43,561提交次数63,120
/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortArrayByParityII = function (A) {
  let even = 0;
  let odd = 1;
  const len = A.length;
  while (even < len && odd < len) {
    if (A[even] % 2 !== 0 && A[odd] % 2 !== 1) {
      const cur = A[even];
      A[even] = A[odd];
      A[odd] = cur;
    }
    if (A[even] % 2 === 0) {
      even += 2;
    }
    if (A[odd] % 2 === 1) {
      odd += 2;
    }
  }
  return A;
};

const res = sortArrayByParityII([4, 2, 5, 7]);
console.log(res);
