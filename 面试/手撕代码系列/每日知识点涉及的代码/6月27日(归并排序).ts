function mergeSort (arr: number[]): number[] {
  let len: number = arr.length
  if (len === 1) {
    return arr
  }
  let mid: number = Math.floor(arr.length / 2)
  let left: number[] = arr.slice(0, mid)
  let right: number[] = arr.slice(mid, len)
  return merge (mergeSort(left), mergeSort(right))
  
  function merge (left: number[], right: number[]): number[] {
    let res: number[] = []
    let i: number = 0
    let j: number = 0
    while (i < left.length && j < right.length) {
      if (left[i] > right[j]) {
        res.push(right[j++])
      } else {
        res.push(left[i++])
      }
    }
    while(i < left.length) {
      res.push(left[i++])
    }
    while(j < right.length) {
      res.push(right[j++])
    }
    return res
  }
}

console.log(mergeSort([1, 3, 2]))

