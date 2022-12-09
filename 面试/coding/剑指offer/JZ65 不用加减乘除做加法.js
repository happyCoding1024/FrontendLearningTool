function Add(num1, num2)
{
    // write code here
  while(num2) {
    let bujinwei = num1 ^ num2;
    let jinwei = (num1 & num2) << 1;
    num1 = bujinwei;
    num2 = jinwei;
  }

  return num1;
}
module.exports = {
    Add : Add
};