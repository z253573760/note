// 假设你正在爬楼梯。需要 n 阶你才能到达楼顶。

// 每次你可以爬 1 或 2 个台阶。你有多少种不同的方法可以爬到楼顶呢？

// 注意： 给定 n 是一个正整数。

// 示例 1：

// 输入： 2
// 输出： 2
// 解释： 有两种方法可以爬到楼顶。
// 1. 1 阶 + 1 阶
// 2. 2 阶
// 示例 2：

// 输入： 3
// 输出： 3
// 解释： 有三种方法可以爬到楼顶。
// 1. 1 阶 + 1 阶 + 1 阶
// 2. 1 阶 + 2 阶
// 3. 2 阶 + 1 阶

function bar(nums) {
  if (nums === 0 || nums === 1) return 1;
  return bar(nums - 1) + bar(nums - 2);
}
function foo(nums) {
  const list = [1, 1];
  for (let i = 2; i <= nums; i += 1) {
    list[i] = list[i - 1] + list[i - 2];
  }
  return list[nums];
}
const res2 = foo(40);
const res = bar(40);

console.log(res === res2);
