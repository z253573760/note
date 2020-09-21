var reverse = function (x) {
  let str = "";
  let b = "";
  let j = 0;
  if (x < 0) {
    b = "-";
    j = 1;
  }
  x = `${x}`;

  for (i = j; i < x.length; i += 1) {
    str = x[i] + str;
  }
  const res = Number(b + str);
  if (res < Math.pow(-2, 31)) return 0;
  if (res > Math.pow(2, 31) - 1) return 0;
  return res;
};
const s = reverse(1534236469);
console.log(s);
