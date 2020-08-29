//1.写一个 mySetInterVal(fn, a, b),每次间隔 a,a+b,a+2b 的时间，然后写一个 myClear，停止上面的 mySetInterVal


function mySetInterVal(fn, a, b) {
  let step = 0
  let timer = null
  const create = (timeout) => {
    timer = setTimeout(() => {
      fn(a + step * b)
      step += 1
      create(a + step * b)
    }, timeout);
  }
  create(a + step * b)

  return function myClear() {
    console.log("结束了")
    clearTimeout(timer)
  }
}
const myClear = mySetInterVal((val) => console.log(val), 1000, 1000)

setTimeout(() => {
  myClear()
}, 10000)