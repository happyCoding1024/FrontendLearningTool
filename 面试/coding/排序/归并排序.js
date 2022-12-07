Array.prototype.mergeSort = function () {
  const sortArr = rec(this);
  this.forEach((item, index) => this[index] = sortArr[index])
  return sortArr;

  function rec (arr) {
    if (arr.length === 1) return arr;
  
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid, arr.length);

    return merge(rec(left), rec(right));
  }

  function merge (left, right) {
    const res = [];
    let il= 0, ir = 0;
    while (il < left.length && ir < right.length) {
      if (left[il] < right[ir]) {
        res.push(left[il++]);
      } else {
        res.push(right[ir++]);
      }
    }

    while (il < left.length) {
      res.push(left[il++]);
    }

    while (ir < right.length) {
      res.push(right[ir++]);
    }

    return res;
  }
}

const arr = [5, 4, 3, 2, 1];

arr.mergeSort();

console.log(arr);