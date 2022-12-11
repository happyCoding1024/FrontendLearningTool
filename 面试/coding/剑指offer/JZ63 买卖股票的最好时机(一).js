
/**
  * 
  * @param prices int整型一维数组 
  * @return int整型
  */
 function maxProfit( prices ) {
  // write code here
  let max = 0;
  for (let i = 0, len = prices.length; i < len; i++) {
    for (let j = i + 1; j < len; j++) {
      max = Math.max(prices[j] - prices[i], max);
    }
  }

  return max;
}
module.exports = {
  maxProfit : maxProfit
};