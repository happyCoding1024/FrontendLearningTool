/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function ReverseList(pHead)
{
    // write code here
    if (!pHead) return null;
    let p1 = pHead;
    let p2 = null;

    while (p1) {
      const temp = p1.next;
      p1.next = p2;
      p2 = p1;
      p1 = temp;
    }

    return p2;
}
module.exports = {
    ReverseList : ReverseList
};