/******单向链表*****/

/**
 * 定义单向链表中的每个节点
 */
class ListNode<Element> {
  element: Element;
  next: ListNode<Element> | null;

  constructor(element: Element) {
    this.element = element;
    this.next = null;
  };
}

// 定义单向链表
class SinglyLinkedList<Element> {
  length: number;
  head: ListNode<Element> | null;
  
  constructor() {
    this.length = 0;
    this.head = null;
  }

  // 添加节点
  append(element: number) {
    const node = new ListNode<number>(element);

    if (!this.head) {
    }
  }
}

