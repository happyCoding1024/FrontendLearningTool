function throttle(fn, interval) {
  let timer = null;

  return (...args) => {
    if (timer) return;

    timer = setTimeout(() => {
      fn(...args);
      timer = null;
    }, interval)
  }
}

const jieliu = throttle(() => {
  console.log(123)
}, 3000);

