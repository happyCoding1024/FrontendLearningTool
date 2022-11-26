/**
 * 使用Set
 */
function uniqueArray1 (arr) {
  return [...new Set([...arr])];
}

// 利用object key的唯一性
function uniqueArray2 (arr) {
  const map = new Map();
  const newArr = [];

  for (const item of arr) {
    if (!map.get(item)) {
      map.set(item, true);
      newArr.push(item);
    }
  }

  return newArr;
}

// 使用indexOf
function uniqueArray3 (arr) {
  const newArr = [];

  for (let item of arr) {
    if (newArr.indexOf(item) === -1) {
      newArr.push(item);
    }
  }

  return newArr;
}

// 测试代码
const arr = [1, 1, 2, 2, 3];
console.log(uniqueArray3(arr));