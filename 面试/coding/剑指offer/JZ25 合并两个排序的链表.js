/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function Merge(pHead1, pHead2)
{
    // write code here
    if (!pHead1 && !pHead2) return null;
    if (!pHead1 && pHead2) return pHead2;
    if (pHead1 && !pHead2) return pHead1;
    
    const head = new ListNode();
    let cur = head;
    let p1 = pHead1, p2 = pHead2;

    while(p1 && p2) {
      if (p1.val < p2.val) {
        cur.next = p1;
        p1 = p1.next;
      } else {
        cur.next = p2;
        p2 = p2.next;
      }

      cur = cur.next;
    }

    if (p1) {
      cur.next = p1;
    }

    if (p2) {
      cur.next = p2;
    }

    return head.next;
}
module.exports = {
    Merge : Merge
};