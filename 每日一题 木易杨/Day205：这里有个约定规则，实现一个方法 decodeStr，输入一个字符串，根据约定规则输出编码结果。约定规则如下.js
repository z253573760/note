// 每天 get 一个知识点

// Day205:这里有个约定规则，实现一个方法 decodeStr，输入一个字符串，根据约定规则输出编码结果。约定规则如下：
// //str = "2[a]1[bc]", 返回 "aabc".
// // str = "2[e2[d]]", 返回 "eddedd".
// // str = "3[abc]2[cd]ff", 返回 "abcabcabccdcdff".
// // 可以看出: N[string]，表示string 正好重复 N 次。假设字符串一定是有效正确的字符串；但是你需要考虑其他可能出现的入参错误场景。
function decodeStr(str) {
  let num = 1;
  let res = "";
  for (let i = 0; i < str.length; i += 1) {
    const item = str[i];
    if (isNaN(item)) {
      num = Number(item);
    } else if (item === "[") {
      //
    }
  }
}

decodeStr();
