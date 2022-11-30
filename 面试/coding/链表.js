class Node {
  constructor (element, next) {
    this.element = element;
    this.next = next;
  }
}

class LinkedList {
  constructor () {
    this.head = null;
    this.length = 0;
  }
}

Object.assign(LinkedList.prototype, {
  append,
  insert,
  reverse
})

// 增加节点
function append (element) {
  const node = new Node(element);
  if (!this.head) {
    this.head = node;
    this.length = 1;
    return;
  } 

  let cur = this.head;

  while(cur.next) {
    cur = cur.next;
  }

  cur.next = node;
  this.length += 1;
}

// 插入节点
function insert (element, pos) {
  const node = new Node(element);
  let previous = this.head;
  let current = this.head;
  let index = 0;

  if (pos > 0 && pos < this.length) {
    if (pos === 0) {
      this.head = node;
      this.length++;
    } else {
      while(current.next) {
        previous = current;
        current = current.next;
        index++;
        if (pos === index) {
          previous.next = node;
          node.next = current;
          this.length++;
        }
      }
    }
  }
}

// 翻转链表
function reverse() {
  let p1 = this.head;
  let p2 = null;

  while (p1) {
    temp = p1.next;
    p1.next = p2;
    p2 = p1;
    p1 = temp;
  }

  // 翻转原链表
  this.head = p2;
}



const linkedList = new LinkedList();
linkedList.append(1);
linkedList.append(2);
linkedList.append(3);
linkedList.reverse();

console.log(linkedList);

