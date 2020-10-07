const list = [1, 2, 4, 5, 6, 7, 3];
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
function sort2(list) {
  function searchOf(start, end, target) {
    while (start >= end) {
      //
    }
  }
  function move(start, end, target) {
    for (let i = end; i > start; i -= 1) {
      list[i] = list[i - 1];
    }
    list[start] = target;
  }
}
// const res2 = sort1(list);
// console.log(res2);

function move(start, end, target) {
  for (let i = end; i > start; i -= 1) {
    list[i] = list[i - 1];
  }
  list[start] = target;
}

console.log(list);
