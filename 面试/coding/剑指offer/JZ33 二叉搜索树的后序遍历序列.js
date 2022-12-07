function VerifySquenceOfBST(sequence) {
  // write code here
  const len = sequence.length;
  if (len == 0) return false; // 注意审题, 约定空树不是二叉搜索树
  return check(sequence, 0, len - 1);

  function check(sequence, l, r) {
      if (l >= r) return true; // 若当前子树只有一个节点

      root = sequence[r]; // 当前子树的根节点

      // 找右子树区间
      let j = r - 1;
      while (j > 0 && j < r && sequence[j] > root) j--;

      // 判断左子树是否有大于根节点的值
      for (i = 0; i < j; i++) {
          if (sequence[i] > root) return false;
      }

      return check(sequence, l, j) && check(sequence, j + 1, r - 1);
  }
}
module.exports = {
  VerifySquenceOfBST: VerifySquenceOfBST,
};
