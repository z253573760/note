const lights = [
  { color: "red", time: 10000, t: 4000 },
  { color: "yellow", time: 10000 },
  { color: "green", time: 10000, t: 4000 },
];

class Deng {
  constructor(lights) {
    this.lights = lights;
    this.init(lights);
  }
  init() {
    const list = [];
    for (const item of lights) {
      list.push({
        color: item.color,
        time: item.time - (item.t || 0),
      });
      if (item.t) {
        for (let i = 0; i < item.t; i += 1000) {
          list.push(
            {
              color: "white",
              time: 500,
            },
            {
              color: item.color,
              time: 500,
            }
          );
        }
      }
    }
    this.list = list;
  }
  run() {
    const list = this.list;
    if (!list.length) return;
    const start = list.shift();
    console.log("当前", start.color, "我需要显示", start.time / 1000, "秒");
    setTimeout(() => {
      this.run();
    }, start.time);
  }
}

new Deng(lights).run();
