// https://juejin.im/post/6859121743869509646

// 如下为一段代码，请完善sum函数，使得 sum(1,2,3,4,5,6) 函数返回值为 21 ,
// 需要在 sum 函数中调用 asyncAdd 函数进行数值运算，且不能修改asyncAdd函数
/**
 * 请在 sum函数中调用此函数，完成数值计算
 * @param {*} a 要相加的第一个值
 * @param {*} b 要相加的第二个值
 * @param {*} callback 相加之后的回调函数
 */
function asyncAdd(a, b, callback) {
  setTimeout(function () {
    callback(null, a + b);
  }, 1000);
}
const asyncAddPromise = (a, b) => {
  return new Promise((reslove) => {
    asyncAdd(a, b, (_, res) => {
      reslove(res);
    });
  });
};
async function main(str, cb) {
  console.time(str);
  const res = await cb(1, 2, 3, 4, 5, 6);
  console.log(str, res);
  console.timeEnd(str);
}
// 青铜
// 循环的方式依次叠加
// 过程 1+2 =>3 3+3=>6 6+4=>10 ....
//
async function sum(...rest) {
  return await rest.reduce(
    async (pre, cur) => await asyncAddPromise(await pre, cur),
    0
  );
}
// 白银
// 同时执行 1+2,3+4,5+6
// 再汇总
async function sumLevel2(...rest) {
  const list = [];
  for (let i = 0; i < rest.length; i += 2) {
    if (!rest[i + 1]) {
      list.push(asyncAddPromise(rest[i], 0));
    } else {
      list.push(asyncAddPromise(rest[i], rest[i + 1]));
    }
  }
  const arr = await Promise.all(list);
  return arr.reduce((pre, cur) => pre + cur, 0);
}

// 王者
// 利用闭包的特性和JS 单线程的性质 、
// 其实性能应该不如白银的解法
// 白银的解法 异步任务会根据参数的长度被二分
async function sumLevel3(...rest) {
  let res = 0;
  const obj = {
    valueOf() {
      return res;
    },
  };
  const list = rest.map((item) =>
    asyncAddPromise(obj, item).then((v) => (res = v))
  );
  await Promise.all(list);
  return res;
}

main("青铜", sum);
main("白银", sumLevel2);
main("王者", sumLevel3);

// 作者： 前端进击者
// 链接： https: //juejin.im/post/6859121743869509646
//   来源： 掘金
// 著作权归作者所有。 商业转载请联系作者获得授权， 非商业转载请注明出处。
