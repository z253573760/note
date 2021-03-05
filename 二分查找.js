const { Z_VERSION_ERROR } = require("zlib");

const arr = [0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5, 5, 5, 6, 7, 8];

// 递归版
function binargSearch(list, target, start = 0, end = list.length - 1) {
  const midd = Math.floor((end + start) / 2);
  const current = list[midd];
  if (start > end) return -1;
  if (current === target) {
    return midd;
  } else if (current < target) {
    return binargSearch(list, target, midd + 1, end);
  } else {
    return binargSearch(list, target, start, midd - 1);
  }
}
// 计算边界
function computed(list, index) {
  const target = list[index];
  let left = index;
  let right = index;
  for (let i = index; i >= 0; i -= 1) {
    if (list[i] === target) {
      left = i;
    } else {
      break;
    }
  }
  for (let i = index; i < list.length; i += 1) {
    if (list[i] === target) {
      right = i;
    } else {
      break;
    }
  }
  return [left, right];
}

// const index = binargSearch(arr, 10);
// const res = computed(arr, index);
// console.log("res1", res);
function binargSearch2(list, target) {
  let left = 0;
  let right = list.length - 1;
  while (left <= right) {
    const midd = Math.floor((left + right) / 2);
    const current = list[midd];
    if (current === target) {
      return midd;
    } else if (current < target) {
      left = midd + 1;
    } else {
      right = midd - 1;
    }
  }
  return -1;
}
const res2 = binargSearch2(arr, 10);

function sum(root) {
  let res = 0;
  function bar(root) {
    res += root.value;
    root.left && bar(root.left);
    root.right && bar(root.right);
  }
  bar(root);
  return res;
}
const root = {
  value: 1,
  left: {
    value: 2,
    left: {
      value: 1,
      right: {
        value: 3,
      },
    },
  },
  right: {
    value: 3,
  },
};
const a = sum(root);
console.log("a", a);
