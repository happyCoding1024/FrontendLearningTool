const stack1 = [];
const stack2 = [];

function push(node)
{
    // write code here
    stack1.push(node);
}
function pop()
{
    // write code here
    while(stack1.length) {
      stack2.push(stack1.pop());
    }

    const res = stack2.pop();

    while (stack2.length) {
      stack1.push(stack2.pop());
    }

    return res;
}
module.exports = {
    push : push,
    pop : pop
};