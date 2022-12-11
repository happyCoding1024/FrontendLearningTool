/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumProduct = function(nums) {
  const len = nums.length;
  if (nums.length < 3) return null;

  nums.sort((a, b) => a - b);

  // 正数 三大
  // 负数 三大
  // 正负 两小一大

  return Math.max(nums[len - 3] * nums[len - 2] * nums[len - 1], nums[0] * nums[1] * nums[len - 1]);
};

const nums = [1, 2, 3, 4];

console.log(maximumProduct(nums));