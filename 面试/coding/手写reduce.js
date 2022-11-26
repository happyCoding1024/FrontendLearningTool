const arr = [1, 2, 3];

/**
 * 实现reduce 方法
 */
Array.prototype.reduce1 = function (fn) {
  const arr = this;
  let pre = arr[0];

  for (let i = 1, len = arr.length; i < len; i++) {
    cur = arr[i];
    pre = fn(pre, cur);
  }

  return pre;
}

const res = arr.reduce1((pre, cur) => {
  return pre + cur;
})

console.log(res);


