// 31. 下一个排列
// 实现获取下一个排列的函数，算法需要将给定数字序列重新排列成字典序中下一个更大的排列。

// 如果不存在下一个更大的排列，则将数字重新排列成最小的排列（即升序排列）。

// 必须原地修改，只允许使用额外常数空间。

// 以下是一些例子，输入位于左侧列，其相应输出位于右侧列。
// 1,2,3 → 1,3,2
// 3,2,1 → 1,2,3
// 1,1,5 → 1,5,1

// 通过次数95,397提交次数275,586
// 在真实的面试中遇到过这道题？
var nextPermutation = function (nums) {
  let end = nums.length - 1;
  while (end > 0) {
    const cur = nums[end];
    const prev = nums[end - 1];
    if (cur > prev) {
      // const a = nums[index];
      // nums[index] = nums[end - 1];
      // nums[end - 1] = a;
      const target = nums[end - 1];
      let min = 9999;
      let minIndex = -1;
      console.log("min", target);
      for (let i = end; i < nums.length; i += 1) {
        const diff = nums[i] - target;
        console.log(diff, nums[i], target);
        if (diff > 0 && diff < min) {
          minIndex = i;
          min = diff;
        }
      }
      console.log(min);
      console.log(minIndex);
      [nums[end - 1], nums[minIndex]] = [nums[minIndex], nums[end - 1]];
      return nums;
    }
    end -= 1;
  }
  let start = 0;
  let last = nums.length - 1;
  while (start < last) {
    const a = nums[last];
    nums[last] = nums[start];
    nums[start] = a;
    start += 1;
    end -= 1;
  }
};

const res = nextPermutation([1, 3, 2]);
//1.2.3
//1.3.2
console.log(res);
