// 202. 快乐数
// 编写一个算法来判断一个数 n 是不是快乐数。

// 「快乐数」定义为：对于一个正整数，每一次将该数替换为它每个位置上的数字的平方和，然后重复这个过程直到这个数变为 1，也可能是 无限循环 但始终变不到 1。如果 可以变为  1，那么这个数就是快乐数。

// 如果 n 是快乐数就返回 True ；不是，则返回 False 。

// 示例：

// 输入：19
// 输出：true
// 解释：

// 通过次数103,851提交次数170,904

var isHappy = function (n) {
  const map = {};
  function bar(n) {
    n = n + "";
    if (map[n]) return false;
    if (n === "1") return true;
    let sum = 0;
    for (const item of n) {
      sum += item ** 2;
    }
    map[n] = sum;
    return bar(sum);
  }
  return bar(n);
};
const res = isHappy(7);
console.log(res);
