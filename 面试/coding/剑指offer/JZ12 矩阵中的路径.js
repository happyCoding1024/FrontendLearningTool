/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 
 * @param matrix char字符型二维数组 
 * @param word string字符串 
 * @return bool布尔型
 */
 function hasPath( matrix ,  word ) {
   let isVistedMatrix;
  // 记录当前节点是否被访问过
  function generateIsvistedMatrix () {
    let isVistedMatrix = []
    for (let i = 0; i < matrix.length; i++) {
      isVistedMatrix[i] = []
      for (let j = 0; j < matrix[0].length; j++) {
        isVistedMatrix[i][j] = false;
      }
    }
    return isVistedMatrix;
  }

  // write code here
  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[0].length; j++) {
      isVistedMatrix = generateIsvistedMatrix();
      if (dfs(matrix, i, j, word, 0)) {
        return true;
      }
    }
  }

  return false;

  function dfs(matrix, i, j, word, index) {

    const str = word[index];
    if (i > matrix.length - 1 || i < 0 || j < 0 || j > matrix[0].length - 1 || matrix[i][j] !== str) {
      return false;
    }

  
    if (isVistedMatrix[i][j]) return;

    if (index === word.length - 1) return true;

    let res;

    res = dfs(matrix, i - 1, j, word, index + 1)
      || dfs(matrix, i + 1, j, word, index + 1)
      || dfs(matrix, i, j - 1, word, index + 1)
      || dfs(matrix, i, j + 1, word, index + 1)
      
    return res;
  }
}

const matrix = [['a', 'b','c','e'],['s','f','c','s'],['a','d','e','e']]
module.exports = {
  hasPath : hasPath
};