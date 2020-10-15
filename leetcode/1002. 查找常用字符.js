// 1002. 查找常用字符
// 给定仅有小写字母组成的字符串数组 A，返回列表中的每个字符串中都显示的全部字符（包括重复字符）组成的列表。例如，如果一个字符在每个字符串中出现 3 次，但不是 4 次，则需要在最终答案中包含该字符 3 次。

// 你可以按任意顺序返回答案。

//  

// 示例 1：

// 输入：["bella","label","roller"]
// 输出：["e","l","l"]
// 示例 2：

// 输入：["cool","lock","cook"]
// 输出：["c","o"]
//  

// 提示：

// 1 <= A.length <= 100
// 1 <= A[i].length <= 100
// A[i][j] 是小写字母
// 通过次数19,420提交次数27,441

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/find-common-characters
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
/**
 * @param {string[]} A
 * @return {string[]}
 */
var commonChars = function (A) {
  const map = {}
  const res = []
  const [target, ...other] = A
  for (const item of target) {
    (!map[item]) && (map[item] = [0])
    map[item][0] = map[item][0] + 1
  }

  for (let i = 0; i < other.length; i += 1) {
    const item = other[i]
    for (const s of item) {
      if (!map[s]) continue
      const len = map[s].length
      if (i + 1 > len) {
        delete map[s]
        continue
      };
      (!map[s][i + 1]) && (map[s][i + 1] = 0)
      map[s][i + 1] = map[s][i + 1] + 1
    }
  }

  Object.keys(map).forEach(item => {
    const target = map[item]
    if (target.length === A.length) {
      const min = target.reduce((a, b) => {
        if (b < a) return b
        return a
      }, Math.pow(2, 53) - 1)
      res.push(...new Array(min).fill(item))
    }
  });
  console.log(map)
  return res
};
const a = ["acabcddd", "bcbdbcbd", "baddbadb", "cbdddcac", "aacbcccd", "ccccddda", "cababaab", "addcaccd"]
const res = commonChars(["cool", "lock", "cook", "cook", "cook"])
console.log(res)