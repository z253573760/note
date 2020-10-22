// 763. 划分字母区间
// 字符串 S 由小写字母组成。我们要把这个字符串划分为尽可能多的片段，同一个字母只会出现在其中的一个片段。返回一个表示每个字符串片段的长度的列表。

// 示例 1：

// 输入：S = "ababcbacadefegdehijhklij"
// 输出：[9,7,8]
// 解释：
// 划分结果为 "ababcbaca", "defegde", "hijhklij"。
// 每个字母最多出现在一个片段中。
// 像 "ababcbacadefegde", "hijhklij" 的划分是错误的，因为划分的片段数较少。

// 提示：

// S的长度在[1, 500]之间。
// S只包含小写字母 'a' 到 'z' 。
// 通过次数24,455提交次数33,250
// 在真实的面试中遇到过这道题？
/**
 * @param {string} S
 * @return {number[]}
 */
var partitionLabels = function (S) {
  const res = [];
  const map = {};
  for (let i = 0; i < S.length; i += 1) {
    map[S[i]] = i;
  }
  let start = 0; // 记录准备切割的未知
  let currMaxIndex = 0;
  for (let i = 0; i < S.length; i += 1) {
    const item = S[i];
    const maxIndex = map[item];
    if (currMaxIndex < maxIndex) {
      currMaxIndex = maxIndex;
    }
    if (i === currMaxIndex) {
      const str = S.substr(start, i + 1 - start);
      res.push(str);
      start = i + 1;
    }
  }
  return res.map((_) => _.length);
};

const res = partitionLabels("ababcbacadefegdehijhklij");
console.log(res);
