// N级台阶，一次上1级或2级或3级或M级，总共有多少种走法

//解法1 从100往下减  直接爆炸  生成树 的形式
var climbStairs1 = function (n) {
  class Tree {
    constructor(num) {
      this.num = num;
      if (this.num === 0) {
        this.left = null;
        this.right = null;
        return this;
      }
      if (this.num === 1) {
        this.left = new Tree(num - 1);
        this.right = null;
        return this;
      }
      this.left = new Tree(num - 1);
      this.right = new Tree(num - 2);
    }
  }
  const tree = new Tree(n);
  let count = 0;

  function dfs(tree) {
    if (tree.num === 0) {
      count = count + 1;
      return;
    }
    tree.left && dfs(tree.left);
    tree.right && dfs(tree.right);
  }
  dfs(tree);
  console.log(count);
  return count;
};
const mapTree = {};
// 加法
var climbStairs2 = function (n) {
  let count = 0;
  class Tree {
    constructor(num) {
      this.num = num;
      if (this.num === n) {
        count += 1;
        this.left = null;
        this.right = null;
        return this;
      }
      if (this.num === n - 1) {
        this.left = new Tree(num + 1);
        this.right = null;
        return this;
      }
      this.left = new Tree(num + 1);
      this.right = new Tree(num + 2);
      //  mapTree[num] = this
    }
  }
  const tree = new Tree(0);
  return count;
};

var climbStairs2 = function (n) {
  const map = {};

  function bar(n) {
    if (map[n]) return map[n];
    if (n === 1 || n === 0) return 1;
    map[n] = bar(n - 2) + bar(n - 1);
    return map[n];
  }
  console.log(map);
  return bar(n);
};

var climbStairs = function (n) {
  const list = [0, 1];
  for (let i = 2; i <= n + 1; i += 1) {
    list[i] = list[i - 1] + list[i - 2];
  }
  return list[n + 1];
};
const res = climbStairs(1000);
console.log(res);

/**
 * {
  2: 2,
  3: 3,
  4: 5,
  5: 8,
  6: 13,
  7: 21,
  8: 34,
  9: 55,
  10: 89,
}
 */
