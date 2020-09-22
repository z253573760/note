var distributeCandies = function (candies) {
  let right = candies.length - 1
  const res = []
  let prev = -100000
  while (right >= 0) {
    const item = candies[right]
    if (item !== prev) {
      res.push(item)
      prev = item
    }
    if (res.length === candies.length / 2) return res.length
    right--
  }
  console.log(res)
  return res.length
};
const res = distributeCandies([
  1, 1, 1, 1, 2, 2, 2, 3, 3, 3
])
console.log(res)