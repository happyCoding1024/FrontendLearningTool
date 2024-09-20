/**
 * 找出字符串中给定子串的所有索引
 * 
 * 例如，字符串：hello world inlld 中找出 ll 子串的索引，答案是[2, 14]
 */
function findAllIndex(str, subStr) {
  const result = []
  if (!str || str.indexOf(subStr) === -1) return result

  let curPos = str.indexOf(subStr)
  while(curPos !== -1) {
    result.push(curPos)
    curPos = str.indexOf(subStr, curPos + 1)
  }

  return result
}
