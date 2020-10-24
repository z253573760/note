// 15. 三数之和
// 给你一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，使得 a + b + c = 0 ？请你找出所有满足条件且不重复的三元组。

// 注意：答案中不可以包含重复的三元组。

// 示例：

// 给定数组 nums = [-1, 0, 1, 2, -1, -4]，

// 满足要求的三元组集合为：
// [
//   [-1, 0, 1],
//   [-1, -1, 2]
// ]
// 通过次数350,969提交次数1,175,685
// 在真实的面试中遇到过这道题？
var threeSum2 = function (nums) {
  const result = [];
  const used = [];
  function dfs(res = [], sum = 0, index = 0) {
    if (res.length > 3) return;
    if (sum === 0 && res.length === 3) {
      result.push([...res]);
      return;
    }
    for (let i = index; i < nums.length; i += 1) {
      if (nums[i - 1] == nums[i] && i - 1 >= 0 && !used[i - 1]) continue;
      const item = nums[i];
      used[i] = true;
      res.push(item);
      sum += item;
      dfs(res, sum, i + 1);
      res.pop();
      sum -= item;
      used[i] = false;
    }
  }
  dfs();
  return result;
};

var threeSum = function (nums) {
  nums = nums.sort((a, b) => a - b);
  const result = [];
  let k = 0;
  let start = k + 1;
  let end = nums.length - 1;
  while (k >= 0 && k < nums.length && start <= end) {
    if (nums[k] > 0) break;
    // 指针碰撞or指针溢出 重置条件
    if (start === end || start == -1) {
      k = getStart(k, nums.length - 1); //找出对比当前的值下一个不重复的索引
      start = k + 1;
      end = nums.length - 1;
    } else {
      const sum = nums[k] + nums[start] + nums[end];
      if (sum === 0) {
        result.push([nums[k], nums[start], nums[end]]);
        start = getStart(start, end);
        end = nums.length - 1;
      } else if (sum < 0) {
        start = getStart(start, end); //找出对比当前的值下一个不重复的索引
      } else {
        end = end - 1;
      }
    }
  }
  function getStart(start, end) {
    const res = nums[start];
    let index = -1;
    for (let i = start + 1; i <= end; i += 1) {
      if (nums[i] !== res) {
        index = i;
        break;
      }
    }
    return index;
  }
  return result;
};
const res = threeSum([-1, 0, 1, 2, -1, -4]);
// const res = threeSum([0, 0, 0, 0]);
console.log(res);
