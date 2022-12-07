/*function ListNode(x){
    this.val = x;
    this.next = null;
}*/
function EntryNodeOfLoop(pHead)
{
    // write code here
    if (!pHead) return null;
    if (!isCycle(pHead)) return null;

    let slow = pHead;
    let fast = pHead;

    // 获取相遇节点
    while (slow && fast) {
      slow = slow.next;
      fast = fast.next?.next;
      if (slow === fast) break;
    }

    // 若是快指针指向null，则不存在环
    // if(fast == null || fast.next == null) return null;

    fast = pHead;
    
    while(slow !== fast) {
      slow = slow.next;
      fast = fast.next;
    }

    return slow;


    function isCycle(head) {
      let walker = head;
      let runner = head;

      while (walker && runner) {
        walker = walker.next;
        runner = runner.next?.next;
        if (walker === runner ) return true;
      }

      return false;
    }
}
module.exports = {
    EntryNodeOfLoop : EntryNodeOfLoop
};