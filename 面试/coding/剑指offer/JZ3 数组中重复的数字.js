/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 
 * @param numbers int整型一维数组 
 * @return int整型
 */
 function duplicate( numbers ) {
  // write code here
  if (!numbers.length) return -1;

  const map = new Map();

  for (let i = 0; i < numbers.length; i++) {
    if (map.has(numbers[i])) {
      return numbers[i];
    } else {
      map.set(numbers[i], true);
    }
  }
}
module.exports = {
  duplicate : duplicate
};