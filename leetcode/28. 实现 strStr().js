var strStr = function (haystack, needle) {
  if (!needle) return 0;
  if (needle === haystack) return 0;
  let index = -1;
  for (let j = 0; j < haystack.length - needle.length + 1; j += 1) {
    let str = "";
    if (haystack[j] === needle[0]) {
      for (let z = j; z < needle.length + j; z += 1) {
        str += haystack[z];
      }
      if (str === needle) {
        index = j;
        break;
      }
      str = "";
    }
  }
  return index;
};

var s = strStr("mississippi", "pi");
console.log(s);
