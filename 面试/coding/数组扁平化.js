function arrayFlatten (arr) {
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

const arr = [1, 2, [3, [4, [5, 6]]]];

console.log(arrayFlatten(arr));