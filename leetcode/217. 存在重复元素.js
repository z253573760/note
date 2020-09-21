var containsDuplicate = function (nums) {
  const map = {};
  for (const item of nums) {
    if (map[item]) {
      return true;
    }
    if (!map[item]) {
      map[item] = true;
    }
  }
  return false;
};
const res = containsDuplicate([1, 2, 3, 1]);
console.log(res);
