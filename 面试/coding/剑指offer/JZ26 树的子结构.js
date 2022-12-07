/* function TreeNode(x) {
    this.val = x;
    this.left = null;
    this.right = null;
} */
function HasSubtree(pRoot1, pRoot2)
{
    // write code here
    if (!pRoot1 || !pRoot2) return false;

    if (isSubTree(pRoot1, pRoot2)) {
      return true;
    } else {
      return HasSubtree(pRoot1.left, pRoot2) || HasSubtree(pRoot1.right, pRoot2)
    }

    // return isSubTree(pRoot1, pRoot2) // 特殊处理：判断以pRoot1为根的所有树是否包含pRoot2这样的树结构
    // // 3，最简单的情况处理完，剩下的用上帝写好的函数处理。
    // || HasSubtree(pRoot1.left, pRoot2)   //判断以pRoot1的左子树为根的树所能形成的所有子结构是否包含pRoot2这样的树结构
    // || HasSubtree(pRoot1.right, pRoot2); //判断以pRoot1的右子树为根的树所能形成的所有子结构是否包含pRoot2这样的树结构


    function isSubTree (rootA, rootB) {
      if (!rootB) {
        return true;
      } else if (!rootA) {
        return false;
      }

      if (rootA.val !== rootB.val) {
        return false;
      }

      return isSubTree(rootA.left, rootB.left) && isSubTree(rootA.right, rootB.right);
    }
}
module.exports = {
    HasSubtree : HasSubtree
};