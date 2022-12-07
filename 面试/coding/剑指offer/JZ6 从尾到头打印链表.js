/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function printListFromTailToHead(head)
{
    // write code here
    let p1 = head;
    let p2 = null;
    const res = [];
    
    while (p1) {
      const temp = p1.next;
      p1.next = p2;
      p2 = p1;
      p1 = temp;
    }
    
    while (p2) {
      res.push(p2.val)
      p2 = p2.next;
    }

    return res;
}
module.exports = {
    printListFromTailToHead : printListFromTailToHead
};