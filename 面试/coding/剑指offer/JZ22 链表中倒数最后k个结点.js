/*
 * function ListNode(x){
 *   this.val = x;
 *   this.next = null;
 * }
 */
/**
 * 代码中的类名、方法名、参数名已经指定，请勿修改，直接返回方法规定的值即可
 *
 * 
 * @param pHead ListNode类 
 * @param k int整型 
 * @return ListNode类
 */
 function FindKthToTail( pHead,  k ) {
  // write code here
  if (!pHead) return;
  let len = 0;
  let head = pHead;

  while(head) {
    len++;
    head = head.next;
  }

  if (k > len) {
    return null;
  }

  for (let i = 0; i < len - k; i++) {
    pHead = pHead.next;
  }

  return pHead;  
}
module.exports = {
  FindKthToTail : FindKthToTail
};