/**
 * @param {string} s
 * @return {string}
 */
// 暴力解法
 var longestPalindrome = function(s) {
  if (!s) return;

  let subStr;
  let maxHuiwenLen = 1;
  let maxHuiwenStr = s[0];

  for (let i = 0; i < s.length; i++) {
      for (let j = i + 1; j < s.length; j++) {
          subStr = s.slice(i, j+1);
          if (isHuiwenStr(subStr) && subStr.length > maxHuiwenLen) {
            maxHuiwenLen = subStr.length;
            maxHuiwenStr = subStr;
          }
      }
  }

  // 判断是否是回文串
  function isHuiwenStr (str) {
    let left = 0, right = str.length - 1;
    while(left < right) {
      if (str[left] !== str[right]) {
        return false;
      }
      left++;
      right--;
    }
    
    return true;
  }

  return maxHuiwenStr;
};

// 中心扩展算法
var longestPalindrome1 = function (s) {
  let len = 1;
  let start = 0, end = 0;

  for (let i = 0; i < s.length; i++) {
    let len1 = expandAroundCenter(s, i, i);
    let len2 = expandAroundCenter(s, i, i + 1);
    len = Math.max(len1, len2);

    if (len > end - start) {
      start = i - Math.floor((len - 1) / 2);
      end = i + Math.floor(len / 2);
    }
  }

  function expandAroundCenter(s, left, right) {
    while(left >= 0 && right < s.length && s[left] === s[right]) {
      left--;
      right++
    }
    return right - left - 1;
  }

  return s.slice(start, end + 1);
}


const str = "bcaaaacbrefi";
console.log(longestPalindrome1(str));