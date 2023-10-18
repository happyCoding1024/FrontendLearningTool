/*
 * @lc app=leetcode.cn id=88 lang=javascript
 *
 * [88] 合并两个有序数组
 */

// @lc code=start
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  let i = m, j = n;

  while(i > 0 && j > 0) {
    if (nums1[i] < nums2[j]) {
      nums1[i + j]  = nums2[j]
      i--
      j--
    } else {
      nums1[i + j] = nums1[i]
      i--
      j--
    }

    while (j > 0) {
      nums1[j] = nums2[j]
      j--;
    }
  }
};
// @lc code=end

