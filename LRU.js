// 某进程的页面访问顺序1，3，2，4，2，3，1，2
// 系统最多分配3个物理页面 采用LRU算法会出现几次缺页

class LRU {
  constructor() {
    this.list = [];
    this.cache = 3;
    this.count = 0;
  }
  put(val) {
    const index = this.list.findIndex((_) => _ === val);
    if (index !== -1) {
      this.list.splice(index, 1);
      this.list.push(val);
      return;
    }
    if (this.list.length === this.cache) {
      this.list.shift();
    }
    this.list.push(val);
    this.count++;
  }
}

const lru = new LRU();
const list = [1, 3, 2, 4, 2, 3, 1, 2];
for (const item of list) {
  lru.put(item);
}
console.log(lru, count);
