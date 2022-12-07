function IsPopOrder(pushV, popV)
{
    // write code here
    const stack = [];

    for (let i = 0; i < pushV.length; i++) {
      stack.push(pushV[i]);
      while(stack.length !== 0 && stack[stack.length - 1] === popV[0]) {
        popV.shift();
        stack.pop();
      }
    }

    if (stack.length === 0) {
      return true;
    } else {
      return false;
    }
}
module.exports = {
    IsPopOrder : IsPopOrder
};