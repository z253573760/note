var numRescueBoats = function (people, limit) {
  people.sort((a, b) => (a - b));
  var num = 0
  let left = 0
  let right = people.length - 1
  while (left <= right) {
    if ((people[left] + people[right]) <= limit) {
      left++
    }
    right--
    num++
  }
  return num
};
const res = numRescueBoats([3, 5, 3, 4], 5)
console.log(res)