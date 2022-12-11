/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  if (!nums || nums.length < 3) return [];
  
  nums.sort((a, b) => a - b);

  const res = [];
  const length = nums.length;

  for (let i = 0, len = nums.length; i < len; i++) {
    // 每次都从i的后面找可以组成三元组的元素，因此如果i处大于0那么后面就不用再进行判断了
    if (nums[i] > 0) return res;

    // 当前元素和前一个元素相等时，去重
    if (i > 0 && nums[i] === nums[i - 1]) continue;

    let l = i + 1;
    let r = length - 1;

    while(l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        res.push([nums[i], nums[l], nums[r]]);
        
        // 去重
        while (l < r && nums[l] === nums[l + 1]) {
          l++; 
        }

        // 去重
        while (l < r &&nums[r] === nums[r - 1]) {
          r--;
        }

        // 继续寻找下一个三元组
        l++;
        r--;
      } else if (sum < 0) {
        l++;
      } else {
        r--;
      }
    }
  } 

  return res;
};

const nums = [0, 0, 0]
console.log(threeSum(nums));