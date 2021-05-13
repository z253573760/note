// 给定一个只包含 '(' 和 ')' 的字符串，找出最长的包含有效括号的子串的长度。

/** 暴力 嵌套循环  这个版本直接超时了 尴尬
 * @param {string} s
 * @return {number}
 */
var longestValidParenthesesV1 = function (s) {
  let max = 0;
  if (s.length <= 1) return max;
  /** 计算字符串得有效括号
   * @param {string} s
   * @return {number}
   */
  function bar(s) {
    let num = 0;
    let len = 0;
    for (const str of s) {
      if (str === "(") {
        num += 1;
      } else {
        if (num === 0) return -1;
        num -= 1;
      }
      len += 1;
    }
    return num === 0 ? len : -1;
  }
  for (let i = 0; i < s.length; i += 1) {
    for (let j = i + 1; j <= s.length; j += 1) {
      const foo = bar(s.substring(i, j));
      max < foo && (max = foo);
    }
  }
  return max;
};

/** 暴力 嵌套循环  做点优化判断下有没有必要循环
 * @param {string} s
 * @return {number}
 */
var longestValidParentheses = function (s) {
  if (s.length <= 1) return 0;
  let max = 0;
  let statck = [];
  for (let i = 0; i < s.length; i += 1) {
    if (s.length - i < max) {
      return max;
    }
    const str = s[i];
    if (str === "(") {
      stack.push(-i);
    } else {
      //
    }
  }
  return max;
};
const str = "()))(()(";
console.log(str.length);
console.time("a");
const res = longestValidParentheses(str);
console.timeEnd("a");
console.log(res);
