// 第 77 题：算法题「旋转数组」
// 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

// 示例 1：

// 输入: [1, 2, 3, 4, 5, 6, 7] 和 k = 3
// 输出: [5, 6, 7, 1, 2, 3, 4]
// 解释:
// 向右旋转 1 步: [7, 1, 2, 3, 4, 5, 6]
// 向右旋转 2 步: [6, 7, 1, 2, 3, 4, 5]
// 向右旋转 3 步: [5, 6, 7, 1, 2, 3, 4]
// 示例 2：

// 输入: [-1, -100, 3, 99] 和 k = 2
// 输出: [3, 99, -1, -100]
// 解释: 
// 向右旋转 1 步: [99, -1, -100, 3]
// 向右旋转 2 步: [3, 99, -1, -100]

// function foo(list, k) {
//   if (!list.length) return list
//   function foo2(list) {
//     const last = list[list.length - 1]
//     for (let i = list.length - 1; i > 0; i -= 1) {
//       list[i] = list[i - 1]
//     }
//     list[0] = last
//   }
//   for (let i = 0; i < k; i += 1) {
//     foo2(list)
//   }
//   return list
// }
// const res = foo([-1, -100, 3, 99], 2)
// console.log(res)


function roateArr(list, k) {
  if (!list.length) return list
  if (k === 0) return list
  if (k > list.length) {
    k = k % list.length
  }
  const res = new Array(list.length)
  const midd = list.length - k
  for (let i = 0; i < list.length; i += 1) {
    if (i < midd) {
      res[i + midd - 1] = list[i]
    } else {
      res[Math.abs(i - midd)] = list[i]
    }
  }
  return res
}
const res = roateArr([1, 2, 3, 4, 5, 6, 7], 10)
console.log(res)