/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function FindPath(root, expectNumber)
{
    // write code here
    if (!root) return [];

    const res = [];
    rec(root, [root.val], root.val);
    return res;

    function rec (node, path, sum) {
      if (!node) return;

      if (!node.left && !node.right) {
        if (sum === expectNumber) {
          res.push(path);
        }
      }

      if (node.left) rec(node.left, path.concat(node.left.val), sum + node.left.val);
      if (node.right) rec(node.right, path.concat(node.right.val), sum + node.right.val);
    }
}
module.exports = {
    FindPath : FindPath
};