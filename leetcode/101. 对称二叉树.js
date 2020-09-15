var isSymmetric = function (root) {
  function diff(left, right) {
    if (!left && !right) return true
    if (!left || !right) return false
    return left.val === right.val && diff(left.left, right.right) && diff(left.right, right.left)
  }
  if (root.length === 0) return true
  if (!root.left || !root.right) return false
  return diff(root.left, root.right)
};