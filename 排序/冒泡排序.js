const list = [1, 99, 2, 33, 444, 57, 3, 4, 3, 5, 6];
function sort1(list) {
  list = [...list];
  for (let i = list.length; i >= 0; i -= 1) {
    for (let j = 1; j < i; j += 1) {
      const prev = list[j - 1];
      const cur = list[j];
      if (prev > cur) {
        [list[j - 1], list[j]] = [list[j], list[j - 1]];
      }
    }
  }
  return list;
}
const res1 = sort1(list);
console.log(res1);
