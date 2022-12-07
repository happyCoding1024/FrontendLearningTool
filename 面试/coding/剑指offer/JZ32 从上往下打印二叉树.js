/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function PrintFromTopToBottom(root)
{
    // write code here
    if (!root) return [];

    const res = [];
    const queue = [root];

    while(queue.length) {
      const node = queue.shift();
      res.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    return res;
}
module.exports = {
    PrintFromTopToBottom : PrintFromTopToBottom
};