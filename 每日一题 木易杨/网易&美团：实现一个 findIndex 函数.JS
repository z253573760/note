//找到有序数组 [1, 2, 3, 4, 7, 7, 7, 9, 12, 23, 34, 45, 55, 67]
//中第一次出现的位置，比如7第一次出现的位置是4
const arr = [1, 2, 3, 4, 7, 7, 7, 9, 12, 23, 34, 45, 55, 67];

function findIndex(arr, target, start = 0, end = arr.length - 1) {
  let index = Math.floor((start + end) / 2);
  const midd = arr[index];
  if (midd === target) {
    while (index >= 0) {
      if (arr[index] === target) {
        index -= 1;
      } else {
        return index + 1;
      }
    }
  }
  if (midd < target) {
    return findIndex(arr, target, index + 1, end);
  } else {
    return findIndex(arr, target, start, index - 1);
  }
}
const res = findIndex(arr, 7); //4
console.log(res);
