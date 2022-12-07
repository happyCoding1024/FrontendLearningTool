Array.prototype.selectSort = function () {
  const arr = this;

  for (let i = 0; i < arr.length; i++) {
    indexMin = i;
    for (let j = i; j < arr.length; j++) {
      if (arr[indexMin] > arr[j]) {
        indexMin = j;
      }
    }

    [arr[indexMin], arr[i]] = [arr[i], arr[indexMin]];
  }
}

const arr = [5, 4, 3];

arr.selectSort();

console.log(arr);