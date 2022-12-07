function minNumberInRotateArray(rotateArray)
{
  let left = 0, right = rotateArray.length-1;
  while(left < right){
    let mid = Math.floor( (left + right)/2 );
    if(rotateArray[mid] < rotateArray[right]){
      right = mid;
    }else if(rotateArray[mid] > rotateArray[right]){
      left = mid+1;
    }else{
      right--;
    }
  }
  return rotateArray[left];
}
module.exports = {
    minNumberInRotateArray : minNumberInRotateArray
};