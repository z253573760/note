const list = [1, 99, 2, 33, 444, 57, 3, 4, 3, 5, 6];
function sort1(list) {
  for (let i = list.length; i >= 0; i -= 1) {
    let isSort = true; // 假设给的数组就是有序的 直接break
    for (let j = 1; j < i; j += 1) {
      const prev = list[j - 1];
      const cur = list[j];
      if (prev > cur) {
        [list[j - 1], list[j]] = [list[j], list[j - 1]];
        isSort = false;
      }
    }
    if (isSort) break;
  }
}
sort1(list);
console.log(list);
