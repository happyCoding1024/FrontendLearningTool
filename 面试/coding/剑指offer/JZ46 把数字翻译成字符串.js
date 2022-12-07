/**
 * 解码
 * @param nums string字符串 数字串
 * @return int整型
 */

 function solve(nums) {
  // write code here
  const len = nums.length;
  if (len == 0 || (len == 1 && nums[0] == "0")) {
      return 0;
  }
  let dp = [1];
  for (let i = 1; i < len; i++) {
      if (nums[i] == "0") {
          // 连续两个0，或者0前面的数大于2则无法解码0的部分
          if (nums[i - 1] == "0" || parseInt(nums[i - 1]) > 2) {
              return 0;
          }
          if (i > 1) {
              dp.push(dp.slice(-2)[0]);
          }
          // 字符串第二位即为0
          else dp.push(1);
      } else {
          if (parseInt(nums[i]) + parseInt(nums[i - 1]) * 10 > 26) {
              dp.push(dp.slice(-1)[0]);
          } else {
              if (nums[i - 1] != "0") {
                  dp.push(dp.slice(-1)[0] + dp.slice(-2)[0]);
              } else {
                  dp.push(dp.slice(-1)[0]);
              }
          }
      }
  }
  return dp.slice(-1)[0];
}
module.exports = {
  solve: solve,
};
