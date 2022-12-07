function Find(target, array)
{
    // write code here
    // 方法一 暴力解法
    // for (let i = 0; i < array.length; i++) {
    //   for (let j= 0; j < array[i].length; j++) {
    //     if (target === array[i][j]) {
    //       return true;
    //     }
    //   }
    // }

    // return false;

    // 二分法
    if (!array.length) return false;
    if (!array[0].length) return false;

    let i = array.length - 1
    let j = 0;

    while (i >= 0 && i < array.length && j < array[0].length) {
      if (array[i][j] > target) {
        i--;
      } else if (array[i][j] < target) {
        j++;
      } else {
        return true;
      }
    }

    return false;
}

let res = Find(5,[[1,2,8,9],[2,4,9,12],[4,7,10,13],[6,8,11,15]])
module.exports = {
    Find : Find
};