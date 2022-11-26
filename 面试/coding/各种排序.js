// 冒泡排序
Array.prototype.bubbleSort = function () {
  const arr = this;
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];
      }
    }
  } 
}

// 选择排序
Array.prototype.selectionSort = function () {
  const arr = this;
  let indexMin = 0;
  for (let i = 0, len = arr.length; i < len - 1; i++) {
    for (let j = i; j < len; j++) {
      if (arr[indexMin] > arr[j]) {
        indexMin = j;
      }
    }
    [arr[indexMin], arr[i]] = [arr[i], arr[indexMin]]; 
  }
}

// 插入排序
Array.prototype.insertSort = function () {
  const arr = this;
  // 需要插入的元素
  for (let i = 0, len = arr.length; i < len; i++) {
    let j = i;
    const temp = arr[j];
    while (j > 0 && temp < arr[j - 1]) {
      arr[j] = arr[--j];
    }

    arr[j] = temp;
  }
}

// 归并排序
Array.prototype.mergeSort = function () {
  const mergeSortRec = (arr) => {
    const len = arr.length;
    if (len === 1) return arr;

    let left, right;
    const mid = Math.floor(len / 2);

    left = arr.slice(0, mid);
    right = arr.slice(mid, len);

    const merge = (left, right) => {
      const res = [];
      let il = 0, ir = 0;

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

    return merge(mergeSortRec(left), mergeSortRec(right))
  }

  mergeSortRec(this);
}

// 快速排序
Array.prototype.quickSort = function () {
  const quickSortRec = (arr, left, right) => {
    const pivot = arr[Math.floor((left + right) / 2)];
    let il = left;
    let ir = right;
    
    while(il <= ir) {
      while (arr[il] < pivot) il++;
      while (arr[ir] > pivot) ir--;
      if (il <= ir) {
        [arr[il], arr[ir]] = [arr[ir], arr[il]];
        il++;
        ir--;
      }
    }

    if (left < il - 1) {
      quickSortRec(arr, left, il - 1);
    }
    if (right > il) {
      quickSortRec(arr, il, right);
    }
  }

  quickSortRec(this, 0, this.length - 1);
}

// 测试代码
const arr = [3, 4, 6, 2, 1];
// arr.bubbleSort();
// arr.selectionSort();
// arr.insertSort();
// arr.mergeSort(arr);
arr.quickSort();
console.log(arr);

