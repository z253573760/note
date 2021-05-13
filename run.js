/**
  extensions is an Array and each item has such format:
  {firstName: 'xxx', lastName: 'xxx', ext: 'xxx', extType: 'xxx'}
  lastName, ext can be empty, extType can only has "DigitalUser", "VirtualUser","FaxUser","Dept","AO".
**/

/**
  Question 1: sort extensions by "firstName" + "lastName" + "ext" ASC
**/
function sortExtensionsByName(extensions) {}

/**
  Question 2: sort extensions by extType follow these orders ASC
  DigitalUser < VitrualUser < FaxUser < AO < Dept.
**/
function sortExtensionsByExtType(extensions) {}

/**
  saleItems is an Array has each item has such format:
  {
  month: n, //[1-12],
  date: n, //[1-31],
  transationId: "xxx",
  salePrice: number
  }
**/
const saleItems = [
  { month: 1, date: 20, salePrice: 100, transationId: 3 },
  { month: 1, date: 20, salePrice: 200, transationId: 3 },
  { month: 5, date: 20, salePrice: 200, transationId: 2 },
  { month: 1, date: 20, salePrice: 200, transationId: 4 },
  { month: 1, date: 20, salePrice: 200, transationId: 7 },
  { month: 1, date: 20, salePrice: 200, transationId: 5 },
  { month: 3, date: 20, salePrice: 200, transationId: 11 },
  { month: 12, date: 20, salePrice: 100, numtransationIds: 4 },
];
/**
  Question 3: write a function to calculate and return a list of total sales (sum) for each quarter, expected result like:
  [
    {quarter: 1, totalPrices: xxx, transactionNums: n},
    {....}
  ]
**/
function sumByQuarter(saleItems) {
  const getQuarter = (num) =>
    // [1, 1, 1, 2, 2, 2, 3, 3, 3, 4, 4, 4][num - 1]
    Math.ceil(num / 3);

  const res = saleItems.reduce((res, cur) => {
    const { month, salePrice } = cur;
    const quarter = getQuarter(month);
    if (!res[quarter]) {
      res[quarter] = {
        quarter: quarter,
        totalPrices: 0,
        transactionNums: 0,
      };
    }
    res[quarter].totalPrices += salePrice;
    res[quarter].transactionNums += 1;
    return res;
  }, {});
  return Object.values(res);
}

const sumByQuarterRes = sumByQuarter(saleItems);
console.log("sumByQuarterRes", sumByQuarterRes);
/**
  Question 4: write a function to calculate and return a list of average sales for each quarter, expected result like:
  [
    {quarter: 1, averagePrices: xxx, transactionNums: n},
    {....}
  ]
**/

function averageByQuarter(saleItems) {
  return sumByQuarter(saleItems).map((item) => ({
    ...item,
    averagePrices: (item.totalPrices / item.transactionNums).toFixed(2),
  }));
}
const averageByQuarterRes = averageByQuarter(saleItems);
console.log("averageByQuarterRes", averageByQuarterRes);
/**
  Question 5: please create a tool to generate Sequence
  Expected to be used like:
  var sequence1 = new Sequence();
  sequence1.next() --> return 1;
  sequence1.next() --> return 2;
  
  in another module:
  var sequence2 = new Sequence();
  sequence2.next() --> 3;
  sequence2.next() --> 4;
**/
const count = Symbol("count");
const cache = {
  [count]: 0,
};
class Sequence {
  next() {
    cache[count] += 1;
    return cache[count];
  }
}
var sequence1 = new Sequence();
var sequence2 = new Sequence();
console.log(sequence2.next());
console.log(sequence1.next());
console.log(sequence1.next());
console.log(sequence2.next());
/**
    Question 6:
    AllKeys: 0-9;
    usedKeys: an array to store all used keys like [2,3,4];
    We want to get an array which contains all the unused keys,in this example it would be: [0,1,5,6,7,8,9]
**/

function getUnUsedKeys(allKeys, usedKeys) {
  //TODO
  if (!Array.isArray(allKeys)) {
    throw TypeError("allKeys must bew a array");
  }
  if (!Array.isArray(usedKeys)) {
    throw TypeError("usedKeys must bew a array");
  }
  return allKeys.filter((_) => !usedKeys.includes(_));
}

const allKeys = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
const usedKeys = [2, 3, 4];
const res = getUnUsedKeys(allKeys, usedKeys);
console.log(res);
