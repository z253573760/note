const list = [1, 99, 2, 33, 444, 57, 3, 4, 3, 5, 6];
function sort1(list) {
  if (list.length <= 1) return list;
  const [midd, ...newList] = list;
  const left = [];
  const right = [];
  for (const item of newList) {
    if (item < midd) {
      left.push(item);
    } else {
      right.push(item);
    }
  }

  return [...sort1(left), midd, ...sort1(right)];
}

function sort2(list) {
  if (list.length <= 1) return list;
  const left = [];
  const right = [];
  const midd = list[0];
  for (let i = 1; i < list.length; i += 1) {
    const item = list[i];
    if (item < midd) {
      left.push(item);
    } else {
      right.push(item);
    }
  }
  return [...sort1(left), midd, ...sort1(right)];
}
const res2 = sort2(list);
console.log(res2);
