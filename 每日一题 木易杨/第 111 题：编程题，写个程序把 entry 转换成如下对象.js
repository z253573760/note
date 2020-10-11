// 第 111 题：编程题，写个程序把 entry 转换成如下对象
// var entry = {
//   a: {
//     b: {
//       c: {
//         dd: 'abcdd'
//       }
//     },
//     d: {
//       xx: 'adxx'
//     },
//     e: 'ae'
//   }
// }
// // 要求转换成如下对象
// var output = {
//   'a.b.c.dd': 'abcdd',
//   'a.d.xx': 'adxx',
//   'a.e': 'ae'
//   }
var entry = {
  a: {
    b: {
      c: {
        dd: 'abcdd'
      }
    },
    d: {
      xx: 'adxx'
    },
    e: 'ae'
  }
}

function hadnler(entry, str = "", map = {}) {
  Object.keys(entry).forEach(item => {
    const res = entry[item]
    if (typeof res != "object") {
      map[str + item] = res
    } else {
      hadnler(res, str + item + ".", map)
    }
  })

  return map
}
const res = hadnler(entry)
console.log('res', res)