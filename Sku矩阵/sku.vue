<template>
  <div class="page">
    <div class="line">已选：{{ result }}</div>
    <div class="line">商品： {{sku}}</div>
    <div
      class="radio-wrap"
      v-for="item in radioList"
      :key="item.title"
    >
      <div>{{ item.title }}</div>
      <div class="spec-wrap">
        <div
          class="spec-title"
          @click="onChoose(item.title, spec.title, spec.disabled)"
          :class="{
            'spec-active': getActive(item.title, spec.title),
            'spec-disabled': spec.disabled,
          }"
          v-for="spec in item.list"
          :key="spec.title"
        >
          {{ spec.title }}
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref } from "vue";

const specList = [
  { title: "颜色", list: ["红色", "紫色", "白色", "黑色"] },
  { title: "套餐", list: ["套餐一", "套餐二", "套餐三", "套餐四"] },
  { title: "内存", list: ["64G", "128G", "256G"] },
];

const skuList = [
  // { id: 1608188117177, specs: ["红色", "套餐一", "64G"] },
  // { id: 1608188117178, specs: ["红色", "套餐一", "128G"] },
  // { id: 1608188117179, specs: ["红色", "套餐一", "256G"] },
  // { id: 1608188117180, specs: ["红色", "套餐二", "64G"] },
  // { id: 1608188117181, specs: ["红色", "套餐二", "128G"] },
  // { id: 1608188117182, specs: ["红色", "套餐二", "256G"] },
  // { id: 1608188117183, specs: ["红色", "套餐三", "64G"] },
  // { id: 1608188117184, specs: ["红色", "套餐三", "128G"] },
  // { id: 1608188117185, specs: ["红色", "套餐三", "256G"] },
  // { id: 1608188117186, specs: ["红色", "套餐四", "64G"] },
  // // { id: 1608188117187, specs: ["红色", "套餐四", "128G"] },
  // // { id: 1608188117188, specs: ["红色", "套餐四", "256G"] },
  // { id: 1608188117189, specs: ["紫色", "套餐一", "64G"] },
  // { id: 1608188117190, specs: ["紫色", "套餐一", "128G"] },
  // { id: 1608188117191, specs: ["紫色", "套餐一", "256G"] },
  // { id: 1608188117192, specs: ["紫色", "套餐二", "64G"] },
  // { id: 1608188117193, specs: ["紫色", "套餐二", "128G"] },
  // { id: 1608188117194, specs: ["紫色", "套餐二", "256G"] },
  // { id: 1608188117195, specs: ["紫色", "套餐三", "64G"] },
  // { id: 1608188117196, specs: ["紫色", "套餐三", "128G"] },
  // { id: 1608188117197, specs: ["紫色", "套餐三", "256G"] },
  // { id: 1608188117198, specs: ["紫色", "套餐四", "64G"] },
  // { id: 1608188117199, specs: ["紫色", "套餐四", "128G"] },
  // { id: 1608188117200, specs: ["紫色", "套餐四", "256G"] },
  // { id: 1608188117201, specs: ["白色", "套餐一", "64G"] },
  // { id: 1608188117202, specs: ["白色", "套餐一", "128G"] },
  // { id: 1608188117203, specs: ["白色", "套餐一", "256G"] },
  // { id: 1608188117204, specs: ["白色", "套餐二", "64G"] },
  // { id: 1608188117205, specs: ["白色", "套餐二", "128G"] },
  // { id: 1608188117206, specs: ["白色", "套餐二", "256G"] },
  // { id: 1608188117207, specs: ["白色", "套餐三", "64G"] },
  // { id: 1608188117208, specs: ["白色", "套餐三", "128G"] },
  // { id: 1608188117209, specs: ["白色", "套餐三", "256G"] },
  // { id: 1608188117210, specs: ["白色", "套餐四", "64G"] },
  // { id: 1608188117211, specs: ["白色", "套餐四", "128G"] },
  // { id: 1608188117212, specs: ["白色", "套餐四", "256G"] },
  // { id: 1608188117213, specs: ["黑色", "套餐一", "64G"] },
  // { id: 1608188117214, specs: ["黑色", "套餐一", "128G"] },
  // { id: 1608188117215, specs: ["黑色", "套餐一", "256G"] },
  // { id: 1608188117216, specs: ["黑色", "套餐二", "64G"] },
  // { id: 1608188117217, specs: ["黑色", "套餐二", "128G"] },
  // { id: 1608188117218, specs: ["黑色", "套餐二", "256G"] },
  { id: 1608188117219, specs: ["黑色", "套餐三", "64G"] },
  { id: 1608188117220, specs: ["黑色", "套餐三", "128G"] },
  { id: 1608188117221, specs: ["黑色", "套餐三", "256G"] },
  { id: 1608188117222, specs: ["黑色", "套餐四", "64G"] },
  { id: 1608188117223, specs: ["黑色", "套餐四", "128G"] },
  { id: 1608188117224, specs: ["黑色", "套餐四", "256G"] },
];

function cacheDisabled() {
  const cache = {};
  function getDisabled(key, value, result) {
    result[key] = value;
    const strKey = JSON.stringify(result);
    if (Object.prototype.hasOwnProperty.call(cache, strKey))
      return !cache[strKey];
    const skuTarget = skuList.find((item) => {
      const specs = item.specs;
      let count = 0;
      Object.values(result).forEach((sku) => {
        if (sku === null) {
          count++;
        } else if (sku !== null && specs.includes(sku)) {
          count++;
        }
      });
      return count === specs.length;
    });
    cache[strKey] = skuTarget;
    return !flag;
  }
  getDisabled.getSku = function (result) {
    const isEmpty = Object.values(result).some((_) => _ === null);
    if (isEmpty) return null;
    const strKey = JSON.stringify(result);
    console.log("cache", cache, strKey);
    return cache[strKey];
  };
  return getDisabled;
}
const getDisabled = cacheDisabled();
const getRadioList = (result) => {
  return [...specList].map((_item) => ({
    ..._item,
    list: _item.list.map((item) => ({
      title: item,
      disabled: getDisabled(_item.title, item, { ...result }),
    })),
  }));
};
export default {
  setup() {
    const sku = ref(null);
    const result = ref(
      [...specList].reduce((res, cur) => {
        res[cur.title] = null;
        return res;
      }, {})
    );
    const radioList = ref(getRadioList(result.value));
    const getActive = (key, value) => {
      return result.value[key] === value;
    };
    const onChoose = (key, value, disabled) => {
      if (disabled) return;
      if (result.value[key] === value) {
        result.value[key] = null;
        radioList.value = getRadioList(result.value);
        sku.value = getDisabled.getSku(result.value);
        return;
      }
      result.value[key] = value;
      radioList.value = getRadioList(result.value);
      sku.value = getDisabled.getSku(result.value);
    };
    return {
      specList,
      radioList,
      skuList,
      result,
      getActive,
      onChoose,
      sku,
    };
  },
};
</script>
<style lang="scss" scoped>
.page {
  text-align: left;
  padding: 20px;
}
.line {
  height: 40px;
}
.radio-wrap {
  padding: 5px 0;
}
.spec-wrap {
  display: flex;
  flex-wrap: wrap;
  padding: 5px 0;
}
.spec-title {
  padding: 3px 10px;
  border: 1px solid;
  margin-right: 8px;
  color: rgb(21, 169, 238);
}
.spec-active {
  background: rgb(238, 19, 56);
  color: #fff;
}
.spec-disabled {
  cursor: not-allowed;
  border: 1px dashed;
  color: rgb(158, 154, 154);
}
</style>
