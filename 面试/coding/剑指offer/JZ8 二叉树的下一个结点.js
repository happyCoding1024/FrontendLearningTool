/*function TreeLinkNode(x){
    this.val = x;
    this.left = null;
    this.right = null;
    this.next = null;
}*/
function GetNext(pNode)
{
    // write code here
    const inOrderTraverseArr = [];
    const originNode = pNode;

    while (pNode.next) {
      pNode = pNode.next;
    }

    inOrder(pNode);

    for (let i = 0; i < inOrderTraverseArr.length; i++) {
      if (inOrderTraverseArr[i].val === originNode.val) {
        return inOrderTraverseArr[i+1]
      }
    }

    function inOrder(node) {
      if (!node) return;

      inOrder(node.left);
      inOrderTraverseArr.push(node);
      inOrder(node.right);
    }

}
module.exports = {
    GetNext : GetNext
};