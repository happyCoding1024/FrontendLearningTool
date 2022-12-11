/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 
 * @param array int整型一维数组 
 * @return int整型一维数组
 */
 function FindGreatestSumOfSubArray( array ) {
 
  let dp=[]
  dp[0]=array[0]
  let tmp=dp[0]
  let start,end
  for(let i = 1; i < array.length; i++){
      dp[i] = Math.max(array[i], array[i] + dp[i-1]);
  }
  end = dp.lastIndexOf(Math.max(...dp))
  for(start=end;start>0;start--){
      if(dp[start-1]<0) break;
  }
   
  return array.slice(start,end+1)
}
module.exports = {
  FindGreatestSumOfSubArray : FindGreatestSumOfSubArray
};

const arr = [1,-2,3,10,-4,7,2,-5];
console.log(FindGreatestSumOfSubArray(arr));

module.exports = {
  FindGreatestSumOfSubArray : FindGreatestSumOfSubArray
};