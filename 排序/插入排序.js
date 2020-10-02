const list = [1, 99, 2, 33, 444, 57, 3, 4, 3, 5, 6];
function sort1(list) {
  list = [...list];
  for (let i = 1; i < list.length; i += 1) {
    let cur = i;
    while (cur >= 1) {
      const a = list[cur];
      const b = list[cur - 1];
      if (a < b) {
        [list[cur - 1], list[cur]] = [list[cur], list[cur - 1]];
        cur -= 1;
      } else {
        cur = -1;
      }
    }
  }
  return list;
}

const res2 = sort1(list);
console.log(res2);
