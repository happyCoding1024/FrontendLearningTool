function printMatrix(matrix)
{
    // write code here
    const res = [];

    if (matrix.length === 0) return res;

    let left = 0,
      right = matrix[0].length - 1,
      up = 0,
      down = matrix.length - 1;

    while (left <= right && up <= down) {
      // 向右走
      for (let i = left; i <= right; i++) {
        res.push(matrix[up][i]);
      }
      up++;
      if (up > down) break;

      // 向下走
      for (let i = up; i <= down; i++) {
        res.push(matrix[i][right]);
      }
      right--;
      if (left > right) break;

      // 向左走
      for (let i = right; i >= left; i--) {
        res.push(matrix[down][i]);
      }
      down--;
      if (up > down) break;

      // 向上走
      for (let i = down; i >= up; i--) {
        res.push(matrix[i][left]);
      }
      left++
      if (left > right) break;
    }

    return res;
}

printMatrix([[1,2,3,4],[5,6,7,8],[9,10,11,12],[13,14,15,16]])
module.exports = {
    printMatrix : printMatrix
};