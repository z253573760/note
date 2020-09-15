// 	108 ms	43.9 MB
var averageOfLevelsV1 = function (root) {
  if (!root) return []
  const list = [root.val]
  const map = {}
  bar(root)

  function bar(node, i = 1) {
    if (!node) return
    if (!map[i]) {
      map[i] = {
        val: 0,
        count: 0
      }
    }
    if (node.left && node.right) {
      map[i] = {
        val: map[i].val + node.left.val + node.right.val,
        count: 2 + map[i].count
      }
      list[i] = map[i].val / map[i].count
      bar(node.left, i + 1)
      bar(node.right, i + 1)
      return
    }
    if (node.left) {
      map[i] = {
        val: map[i].val + node.left.val,
        count: 1 + map[i].count
      }
      list[i] = map[i].val / map[i].count
      bar(node.left, i + 1)
      return
    }
    if (node.right) {
      map[i] = {
        val: map[i].val + node.right.val,
        count: 1 + map[i].count
      }
      list[i] = map[i].val / map[i].count
      bar(node.right, i + 1)
      return
    }
  }
  return list
};


var averageOfLevels = function (root) {
  const res = []
  const queue = [root]
  while (queue.length) {
    let sum = 0
    let len = queue.length
    for (let i = 0; i < len; i += 1) {
      const node = queue.shift()
      sum += node.val
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    res.push(sum / len)
  }
  return res
}