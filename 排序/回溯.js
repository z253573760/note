// 输入[1,2,3]

// 输出：

// 排列为6种：[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]

// 组合为8种：[],[1],[1,2],[1,2,3],[1,3],[2],[2,3],[3]
const list = [1, 2, 4]

function pailie(list) {
  const res = []

  function dfs(result) {
    if (list.length === result.length) {
      res.push([...result])
      return
    }
    for (const item of list) {
      if (!result.includes(item)) {
        result.push(item)
        bar(result)
        result.pop()
      }
    }
  }
  dfs([])
  return res
}

// function pailie2(list) {

//   function bar(list) {
//     for (const item of list) {
//       //
//     }
//   }
//   bar(list)
// }
// const res = pailie2(list)
// console.log(res)