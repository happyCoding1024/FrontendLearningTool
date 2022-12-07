/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function isSymmetrical(pRoot)
{
  if (!pRoot) return true;

    return rec(pRoot, pRoot);
    
    // write code here
    function rec (rootA, rootB) {
      if (!rootA && !rootB) {
        return true;
      }

      if (!rootA || !rootB || rootA.val !== rootB.val) {
        return false;
      }

      return rec(rootA.left, rootB.right) && rec(rootA.right, rootB.left);
    }
}
module.exports = {
    isSymmetrical : isSymmetrical
};