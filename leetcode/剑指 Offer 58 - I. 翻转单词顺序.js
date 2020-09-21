/**
 * @param {string} s
 * @return {string}
 */
var reverseWords1 = function (s) {
  const res = []
  let i = 0
  let isEmpty = false
  for (const item of s) {
    if (item !== " ") {
      if (!res[i]) res[i] = ""
      res[i] = res[i] += item
      isEmpty = false
    } else {
      if (res[i]) {
        i += 1
      }
    }
  }
  let str = ""
  for (let i = res.length - 1; i >= 0; i -= 1) {
    str += res[i]
    if (i === 0) break
    str += " "
  }
  return str
};
var reverseWords = function (s) {
  let str = ""
  let cache = ""
  for (const item of s) {
    if (item !== " ") {
      cache = cache + item
    } else {
      if (cache === "") continue
      if (str === "") {
        str = cache + str
      } else {
        str = " " + str
        str = cache + " " + str
      }
      cache = ""
    }
  }
  if (cache) return (cache + " " + str)
  return str
};
const s = reverseWords("the sky is blue")
console.log(s)