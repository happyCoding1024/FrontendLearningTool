function insertSort: number[] (arr: number[]) {
  for (let i = 0, len = arr.length; i < len; i++) {
    let j: number = i
    while(j > 0 && arr[j] < arr[j - 1]) {
      [arr[j], arr[j - 1]] = [arr[j - 1], arr[j]]
      j--
    }
  }
  return arr
}