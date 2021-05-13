function bar(list, target, start = 0, end = list.length - 1) {
  if (start > end) {
    return -1;
  }
  const midd = Math.floor((start + end) / 2);
  const res = list[midd];
  console.log({ res, midd, start, end });
  if (res === target) return midd;
  if (res < target) {
    return bar(list, target, midd + 1, end);
  }
  if (res > target) {
    return bar(list, target, start, midd - 1);
  }
}

const res = bar([1, 2, 3, 4, 5, 6], 9);
console.log("res", res);
