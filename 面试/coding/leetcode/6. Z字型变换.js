/**
 * @param {string} s
 * @param {number} numRows
 * @return {string}
 */
 var convert = function(s, numRows) {
  if (!s) return;
  
  if (numRows < 2) return s;


  const res = new Array(numRows).fill('');
  let flag = -1;
  let index = 0;
  

  for (let i = 0; i < s.length; i++) {
    res[index]= res[index].concat(s[i]);
    if (index === 0 || index === numRows - 1) flag = -flag;
    index += flag;
  }
  
  return res.reduce((pre, cur) => pre + cur);
};

s = "AB", numRows = 1

console.log(convert(s, numRows));