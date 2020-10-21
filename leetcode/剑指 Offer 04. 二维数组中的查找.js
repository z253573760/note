//剑指 Offer 04. 二维数组中的查找
// 在一个 n * m 的二维数组中，每一行都按照从左到右递增的顺序排序，每一列都按照从上到下递增的顺序排序。请完成一个函数，输入这样的一个二维数组和一个整数，判断数组中是否含有该整数。

//

// 示例:

// 现有矩阵 matrix 如下：

// [
//   [1,   4,  7, 11, 15],
//   [2,   5,  8, 12, 19],
//   [3,   6,  9, 16, 22],
//   [10, 13, 14, 17, 24],
//   [18, 21, 23, 26, 30]
// ]
// 给定 target = 5，返回 true。

// 给定 target = 20，返回 false。

//

// 限制：

// 0 <= n <= 1000

// 0 <= m <= 1000

//

// 来源：力扣（LeetCode）
// 链接：https://leetcode-cn.com/problems/er-wei-shu-zu-zhong-de-cha-zhao-lcof
// 著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。
var findNumberIn2DArray = function (matrix, target) {
  for (let i = 0; i < matrix.length; i += 1) {
    const list = matrix[i];
    if (list.length === 0) return false;
    const start = list[0];
    const end = list[list.length - 1];
    console.log(start);
    if (start === target) {
      return true;
    }
    if (end === target) {
      return true;
    }
    if (start < target && end > target) {
      if (list.includes(target)) {
        return true;
      }
    }
    if (start > target) break;
    // if (end < target) break;
  }
  return false;
};

const res = findNumberIn2DArray([[5], [6]], 6);
console.log(res);
