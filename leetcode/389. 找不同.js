// 389. 找不同
// 给定两个字符串 s 和 t，它们只包含小写字母。

// 字符串 t 由字符串 s 随机重排，然后在随机位置添加一个字母。

// 请找出在 t 中被添加的字母。

// 示例 1：

// 输入：s = "abcd", t = "abcde"
// 输出："e"
// 解释：'e' 是那个被添加的字母。
// 示例 2：

// 输入：s = "", t = "y"
// 输出："y"
// 示例 3：

// 输入：s = "a", t = "aa"
// 输出："a"
// 示例 4：

// 输入：s = "ae", t = "aea"
// 输出："a"
/**
 * @param {string} s
 * @param {string} t
 * @return {character}
 */
var findTheDifference = function (s, t) {
  function sumChatCode(str) {
    return Array.from(str).reduce((prev, cur) => prev + cur.charCodeAt(), 0);
  }
  const res = sumChatCode(t) - sumChatCode(s);
  return String.fromCharCode(res);
};
const res = findTheDifference("abcd", "abcde");
console.log(res);
