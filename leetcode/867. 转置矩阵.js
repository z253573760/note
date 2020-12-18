// 867. 转置矩阵
// 给定一个矩阵 A， 返回 A 的转置矩阵。

// 矩阵的转置是指将矩阵的主对角线翻转，交换矩阵的行索引与列索引。

// 示例 1：

// 输入：[[1,2,3],[4,5,6],[7,8,9]]
// 输出：[[1,4,7],[2,5,8],[3,6,9]]
// 示例 2：

// 输入：[[1,2,3],[4,5,6]]
// 输出：[[1,4],[2,5],[3,6]]

// 提示：

// 1 <= A.length <= 1000
// 1 <= A[0].length <= 1000
// 通过次数36,374提交次数54,156

/**
 * @param {number[][]} A
 * @return {number[][]}
 */
var transpose = function (A) {
  const res = [];
  for (let i = 0; i < A[0].length; i += 1) {
    const list = [];
    for (let j = 0; j < A.length; j += 1) {
      list.push(A[j][i]);
    }
    res.push(list);
  }
  return res;
};

transpose([
  [1, 2, 3],
  [4, 5, 6],
]);
