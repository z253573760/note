const Promise = require("./index");
console.log("Promise", Promise);
const p = new Promise((reslove, reject) => {
  setTimeout(() => {
    reslove(1);
  }, 100);
});
p.then(
  (res) => {
    console.log("success", res, p);
    return res + 1;
  },
  (res) => console.log("fail", res, p)
)
  .then(
    (res) => {
      console.log("success2", res);
      return new Promise((reslove, reject) => {
        setTimeout(() => {
          reject(res + 1);
        }, 300);
      });
    },
    (err) => {
      console.log("err2", err);
      return "err:" + res + 1;
    }
  )
  .catch((err) => {
    console.log("catch1", err);
  })
  .then(
    (res) => {
      console.log("success3", res);
    },
    (err) => {
      console.log("err3", err);
    }
  )
  .catch((err) => {
    console.log("catch2", err);
  });
const p2 = Promise.all("1234");
console.log("p2", p2);
