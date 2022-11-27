// 递归
function arrayFlatten1 (arr) {
  const newFlattenArr = [];

  arr.forEach(element => {
    if (Array.isArray(element)) {
      newFlattenArr.push(...arrayFlatten(element));
    } else {
      newFlattenArr.push(element);
    }
  });

  return newFlattenArr;
}

// while + 扩展运算符
function arrayFlatten2 (arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }

  return arr;
}

const arr = [1, 2, [3, [4, [5, 6]]]];

console.log(arrayFlatten2(arr));