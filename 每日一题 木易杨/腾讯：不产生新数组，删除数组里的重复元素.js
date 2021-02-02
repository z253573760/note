//腾讯：不产生新数组，删除数组里的重复元素 #135
const arr = [1, 2, 3, 1, 3, 5, 5, 5, 5, 5, 5];

function removeDuplicates(list) {
  const map = {};
  for (let i = 0; i < list.length; i += 1) {
    const item = list[i];
    if (!map[item]) {
      map[item] = true;
    } else {
      list.splice(i, 1);
      i -= 1;
    }
  }
}

removeDuplicates(arr);
console.log(arr); // [1, 2, 3, 5];
