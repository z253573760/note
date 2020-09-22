var removeDuplicates1 = function (nums) {
  for (let i = 0; i < nums.length; i += 1) {
    const prev = nums[i - 1]
    const cur = nums[i]
    if (prev === cur) {
      nums.splice(i, 1)
      i -= 1
    }
  }
  return nums.length
};
var removeDuplicates2 = function (nums) {
  let left = 0,
    right = 1;
  while (right < nums.length) {
    if (nums[left] !== nums[right]) {
      nums[++left] = nums[right];
    }
    right++;
  }
  console.log(nums)
  return left + 1;
};

var removeDuplicates = function (nums) {
  var count = 0;
  var n = nums.length;
  for (let i = 1; i < n; i++) {
    if (nums[i] != nums[i - 1]) {
      nums[i - count] = nums[i]
    } else {
      count++;
    }
  }
  return n - count;
};



const res = removeDuplicates([0, 0, 1, 1, 1, 2, 2, 3, 3, 4])
console.log(res)