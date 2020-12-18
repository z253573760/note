// 剑指 Offer 58 - II. 左旋转字符串
// 字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。

// 示例 1：

// 输入: s = "abcdefg", k = 2
// 输出: "cdefgab"
// 示例 2：

// 输入: s = "lrloseumgh", k = 6
// 输出: "umghlrlose"

// 限制：
/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
var reverseLeftWords = function (s, n) {
  let str1 = "";
  let str2 = "";
  for (let i = 0; i < s.length; i += 1) {
    if (i < n) {
      str1 += s[i];
    } else {
      str2 += s[i];
    }
  }
  return str2 + str1;
};
var reverseLeftWords2 = function name(s, n) {
  let str = "";
  for (let i = n; i < s.length; i += 1) {
    str += s[i];
  }
  for (let i = 0; i < n; i += 1) {
    str += s[i];
  }
  return str;
};
const res = reverseLeftWords("abcdefg", 2);
console.log(res);
