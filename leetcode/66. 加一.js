// 66. 加一
// 给定一个由整数组成的非空数组所表示的非负整数，在该数的基础上加一。

// 最高位数字存放在数组的首位， 数组中每个元素只存储单个数字。

// 你可以假设除了整数 0 之外，这个整数不会以零开头。

// 示例 1:

// 输入: [1,2,3]
// 输出: [1,2,4]
// 解释: 输入数组表示数字 123。
// 示例 2:

// 输入: [4,3,2,1]
// 输出: [4,3,2,2]
// 解释: 输入数组表示数字 4321。
// 通过次数215,379提交次数472,236
// 在真实的面试中遇到过这道题？
/**
 * @param {number[]} digits
 * @return {number[]}
 */
var plusOne2 = function (digits) {
  function bar(index = digits.length - 1) {
    const res = digits[index];
    if (res < 9) {
      digits[index] = res + 1;
      return;
    } else if (index === 0) {
      digits[index] = 0;
      digits = [1, ...digits];
    } else {
      digits[index] = 0;
      bar(index - 1);
    }
  }
  bar();
  return digits;
};

var plusOne = function (digits) {
  for (let i = digits.length - 1; i >= 0; i -= 1) {
    const item = digits[i];
    if (item < 9) {
      digits[i] = item + 1;
      return digits;
    } else {
      digits[i] = 0;
    }
  }
  return [1, ...digits];
};
const res = plusOne([9, 9, 9]);
console.log(res);
