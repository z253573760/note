// 387. 字符串中的第一个唯一字符
// 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。

// 示例：

// s = "leetcode"
// 返回 0

// s = "loveleetcode"
// 返回 2

// 提示：你可以假定该字符串只包含小写字母。

// 通过次数107,361提交次数226,076
// 在真实的面试中遇到过这道题？
var firstUniqChar = function (s) {
  const map = {};
  let len = s.length;
  for (let i = 0; i < len; i += 1) {
    const item = s[i];
    if (!map[item]) {
      map[item] = 0;
    }
    map[item] += 1;
  }
  // Object.values(map).forEach(({ count, index }) => {
  //   if (count === 1 && index < len) {
  //     len = index;
  //   }
  //   if (len === 0) return 0;
  // });
  for (let i = 0; i < len; i += 1) {
    const item = s[i];
    if (map[item] === 1) return i;
  }
  return -1;
};

const res = firstUniqChar("loveleetcode");
console.log(res);
