/*
 * @lc app=leetcode.cn id=557 lang=javascript
 *
 * [557] 反转字符串中的单词 III
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  let result = ''
  let strArr = []

  for (const item of s.split(' ')) {
    strArr.push(item.split('').reverse().join(''))
  }
  result = strArr.join(' ')
  return result;
};
// @lc code=end

