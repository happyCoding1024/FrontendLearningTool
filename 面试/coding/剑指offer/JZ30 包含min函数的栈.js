const stack = [];
const minStack = [];

function push(node)
{
    // write code here
    if (minStack.length === 0) {
      stack.push(node);
      minStack.push(node);
      return;
    }

    if (node < minStack[minStack.length - 1]) {
      stack.push(node);
      minStack.push(node);
    } else {
      stack.push(node);
      minStack.push(minStack[minStack.length - 1]);
    }
}
function pop()
{
    // write code here
    if (stack.length === 0) return null;
    
    minStack.pop();
    return stack.pop();
}
function top()
{
    // write code here
    return stack[stack.length - 1];
}
function min()
{
    // write code here
    return minStack[minStack.length - 1];
}
module.exports = {
    push : push,
    pop : pop,
    top : top,
    min : min
};