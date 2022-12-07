Array.prototype.quickSort = function () {
  const arr = this;
  rec(0, arr.length - 1);

  function rec (left, right) {
    const pivot = arr[Math.floor((left + right) / 2)];
    let il = left;
    let ir = right;

    while (il < ir) {
      while (arr[il] < pivot) il++;
      while (arr[ir] > pivot) ir--;

      if (il < ir) {
        [arr[il], arr[ir]] = [arr[ir], arr[il]];
      }
    }

    if (left < il) {
      rec(left, il);
    }

    if (right > il) {
      rec(il + 1, right);
    }
  }
}

const arr = [5, 4, 3];
arr.quickSort();
const a = 1;