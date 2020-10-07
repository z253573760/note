const list = [1, 1, 1, 2, 3, 4, 5, 6, 7, 11];
function indexOf(list, target, diff = 0) {
  console.log("diff", diff);
  let len = list.length;
  if (len === 1 && target !== list[0]) return -1;
  const index = Math.floor(len / 2);
  const midd = list[index];
  if (midd === target) {
    return index + diff;
  } else if (midd > target) {
    len = index;
    return indexOf(list, target, diff);
  } else if (midd < target) {
    diff = index + diff + 1;
    list = list.slice(index + 1);
    return indexOf(list, target, diff);
  }
  return -1;
}

function indexOfleft(list, target) {
  let start = 0;
  let end = list.length - 1;
  while (start <= end) {
    const middIndex = Math.floor((start + end) / 2);
    const midd = list[middIndex];
    if (target === midd) {
      if (list[middIndex - 1] === target) {
        end = middIndex;
      } else {
        return middIndex;
      }
    } else if (target > midd) {
      start = middIndex + 1;
    } else if (target < midd) {
      end = middIndex - 1;
    }
  }
  return -1;
}
const res2 = indexOfleft(list, 2);
console.log(res2);
