//实现go
// go(); //gol

function go(s) {
  let str = go.name;
  const fn = (x) => {
    if (x) {
      str += x;
      return str;
    } else {
      str += "0";
      return fn;
    }
  };
  return fn(s);
}
console.log(go("l"));
console.log(go()("l"));
console.log(go()()()("l"));
