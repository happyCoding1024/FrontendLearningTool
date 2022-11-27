const arr = [1, 2, 3];

/**
 * 实现reduce 方法
 */
Array.prototype.reduce1 = function (fn, initialData) {
  const arr = this;
  let res = initialData;

  for (let i = 0, len = arr.length; i < len; i++) {
    cur = arr[i];
    res = fn(res, cur);
  }

  return res;
}

const res = arr.reduce1((pre, cur) => {
  return pre + cur;
}, 0)

console.log(res);


