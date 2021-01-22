import { useState, useMemo } from 'react';
import './index.css';
const classnames = require('classnames');

class Adjoin {
  constructor(vertex) {
    this.vertex = vertex;
    this.quantity = vertex.length;
    this.init();
  }

  init() {
    this.adjoinArray = Array.from({ length: this.quantity * this.quantity });
  }

  getVertexRow(id) {
    const index = this.vertex.indexOf(id);
    const col = [];
    this.vertex.forEach((item, pIndex) => {
      col.push(this.adjoinArray[index + this.quantity * pIndex]);
    });
    return col;
  }

  getAdjoinVertexs(id) {
    return this.getVertexRow(id)
      .map((item, index) => (item ? this.vertex[index] : ''))
      .filter(Boolean);
  }

  setAdjoinVertexs(id, sides) {
    const pIndex = this.vertex.indexOf(id);
    sides.forEach((item) => {
      const index = this.vertex.indexOf(item);
      this.adjoinArray[pIndex * this.quantity + index] = 1;
    });
  }

  getRowToatl(params) {
    params = params.map((id) => this.getVertexRow(id));
    const adjoinNames = [];
    this.vertex.forEach((item, index) => {
      const rowtotal = params
        .map((value) => value[index])
        .reduce((total, current) => {
          total += current || 0;
          return total;
        }, 0);
      adjoinNames.push(rowtotal);
    });
    return adjoinNames;
  }

  // 交集
  getUnions(params) {
    const row = this.getRowToatl(params);
    console.log('row', row);
    return row.map((item, index) => item >= params.length && this.vertex[index]).filter(Boolean);
  }

  // 并集
  getCollection(params) {
    params = this.getRowToatl(params);
    return params.map((item, index) => item && this.vertex[index]).filter(Boolean);
  }
}

class ShopAdjoin extends Adjoin {
  constructor(commoditySpecs, data) {
    super(commoditySpecs.reduce((total, current) => [...total, ...current.list], []));
    this.commoditySpecs = commoditySpecs;
    this.data = data;
    // 单规格矩阵创建
    this.initCommodity();
    // 同类顶点创建
    this.initSimilar();
  }

  initCommodity() {
    this.data.forEach((item) => {
      this.applyCommodity(item.specs);
    });
  }

  initSimilar() {
    // 获得所有可选项
    const specsOption = this.getCollection(this.vertex);
    this.commoditySpecs.forEach((item) => {
      const params = [];
      item.list.forEach((value) => {
        if (specsOption.indexOf(value) > -1) params.push(value);
      });
      // 同级点位创建
      this.applyCommodity(params);
    });
  }

  querySpecsOptions(params) {
    // 判断是否存在选项填一个
    if (params.some(Boolean)) {
      // 过滤一下选项 =>交集
      params = this.getUnions(params.filter(Boolean));
    } else {
      // 兜底选一个 =>并集
      params = this.getCollection(this.vertex);
    }
    return params;
  }

  applyCommodity(params) {
    params.forEach((param) => {
      this.setAdjoinVertexs(param, params);
    });
  }
}

export default function App() {
  const data = [
    { id: '1', specs: ['紫色', '套餐一', '64G'] },
    { id: '2', specs: ['紫色', '套餐一', '128G'] },
    { id: '3', specs: ['紫色', '套餐二', '128G'] },
    { id: '4', specs: ['黑色', '套餐三', '256G'] },
  ];
  const commoditySpecs = [
    { title: '颜色', list: ['红色', '紫色', '白色', '黑色'] },
    { title: '套餐', list: ['套餐一', '套餐二', '套餐三', '套餐四'] },
    { title: '内存', list: ['64G', '128G', '256G'] },
  ];
  const [specsS, setSpecsS] = useState(Array.from({ length: commoditySpecs.length }));
  // 创建一个购物矩阵
  const shopAdjoin = useMemo(() => new ShopAdjoin(commoditySpecs, data), [commoditySpecs, data]);
  console.log({ shopAdjoin });
  // 获得可选项表
  const optionSpecs = shopAdjoin.querySpecsOptions(specsS);
  const handleClick = function (bool, text, index) {
    if (specsS[index] !== text && !bool) {
      console.log('true=>return ');
      return;
    }
    specsS[index] = specsS[index] === text ? '' : text;
    setSpecsS(specsS.slice());
  };

  return (
    <div className="container">
      {commoditySpecs.map(({ title, list }, index) => (
        <div key={index}>
          <h1>{title}</h1>
          <div wrap="wrap">
            {list.map((value, i) => (
              <span
                key={i}
                className={classnames({
                  box: true,
                  option: optionSpecs.indexOf(value) > -1,
                  active: specsS.indexOf(value) > -1,
                })}
                onClick={() => handleClick(optionSpecs.indexOf(value) > -1, value, index)}
              >
                {value}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// 作者：蚂蚁保险体验技术
// 链接：https://juejin.cn/post/6844904013801095176
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
