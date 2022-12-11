/**
 * @param {number[]} height
 * @return {number}
 */
 var maxArea = function(height) {
  // 由较小的值决定 
  let maxRes = 0, minHeight = 0;

  for (let i = 0; i < height.length; i++) {
      minHeight = height[i];
      for (let j = i + 1; j < height.length; j++) {
          minHeight = Math.min(height[i], height[j]);
          maxRes = Math.max(maxRes, (j - i) * minHeight);
      }
  }

  return maxRes;
};

const height = [1,8,6,2,5,4,8,3,7];
console.log(maxArea(height));