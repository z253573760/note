const list = [1, 99, 2, 33, 444, 57, 3, 4, 3, 5, 6];
function sort1(list) {
  list = [...list];
  for (let i = list.length - 1; i >= 0; i -= 1) {
    let maxIndex = 0;
    for (j = 0; j < i; j += 1) {
      if (list[maxIndex] < list[j]) {
        maxIndex = j;
      }
    }
    if (maxIndex) {
      [list[i], list[maxIndex]] = [list[maxIndex], list[i]];
    }
  }
  return list;
}
const res1 = sort1(list);
console.log(res1);
