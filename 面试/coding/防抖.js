function debounce(fn, interval) {
  let timer, timeout;

  return () => {
    if (timer < interval) {
      clearTimeout(timeout)
      timeout = setTimeout(fn, interval);
    }
  }  
}