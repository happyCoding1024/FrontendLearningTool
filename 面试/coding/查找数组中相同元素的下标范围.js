// 数组是升序的，找出相同元素的下标范围
// 例如 nums = [1, 2, 6, 6, 6, 6, 9]  返回值 [3, 5]
function foo1 (nums, target) {
  if (!nums || nums.length === 0) return [-1, -1];
  
  const index = nums.indexOf(target);
  const lastIndex = nums.lastIndexOf(target);

  if (index === -1 || lastIndex === -1) return [-1, -1];

  return [index, lastIndex];
}

function foo2(nums, target) {

  function rec (nums, target) {
    let left = 0, right = nums.length - 1;
    while (left < right) {
      const mid = Math.floor((left + right) / 2);
  
      if (target <= nums[mid]) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    return left;
  }

  const left = rec(nums, target);

  if (left >= nums.length - 1) return [-1, -1]

  return [left, rec(nums, target + 1) - 1];
}

const nums = [1, 2, 3, 6, 6, 6, 9];
console.log(foo2(nums, 6));