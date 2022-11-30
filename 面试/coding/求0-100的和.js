function calSumfrom0To100(start, end) {

  const rec = (pre, cur) => {
    if (cur === end) return pre + cur;

    return rec(pre + cur, cur + 1); 
  }

  return rec(start, start);
}

console.log(calSumfrom0To100(0, 100));