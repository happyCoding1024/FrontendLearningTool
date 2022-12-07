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
 * @param head ListNode类 
 * @param val int整型 
 * @return ListNode类
 */
 function deleteNode( head ,  val ) {
  // write code here
  if (!head) return null;

  let current = head;
  let previous = null;

  if (head.val === val) {
    head = head.next;
  } else {
    while(current.next) {
      previous = current;
      current = current.next;

      if (current.val === val) {
        previous.next = current.next;
      }
    }
  }

  return head;
}
module.exports = {
  deleteNode : deleteNode
};