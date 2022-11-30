const tree = {
  val: 3,
  left: {
    val: 9,
    left: {
      val: 11,
      left: {
        val: 12,
        left: null,
        right: null,
      },
      right: null,
    },
    right: null,
  },
  right: {
    val: 20,
    left: {
      val: 15,
      left: null,
      right: null,
    },
    right: {
      val: 7,
      left: null,
      right: null,
    }
  }
}

// 获取树的深度
function getMaxDepth(tree) {
  let max = 0;

  if (!tree) return max;

  rec(tree, 1);

  function rec (tree, len) {
    if (!tree?.left && !tree?.right) {
      max = Math.max(max, len);
    }

    if (tree.left) {
      rec(tree.left, len + 1);
    }

    if (tree.right) {
      rec(tree.right, len + 1);
    }
  }

  return max;
}

// 深度优先遍历
function DFS (tree) {
  rec(tree); 

  function rec (node) {
    console.log(node?.val);
    if (!node)  return;

    if (node.left) {
      rec(node.left);
    } 

    if (node.right) {
      rec(node.right);
    }
  }
}

// 广度优先遍历
function BFS (tree) {
  rec(tree);

  function rec (node) {
    if (!node) return;
    const queue = [];
    queue.push(node);

    while(queue.length) {
      const item = queue.shift();
      console.log(item.val);

      if (item?.left) {
        queue.push(item.left);
      }

      if (item?.right) {
        queue.push(item.right);
      }
    }
  }
}

// 前序遍历
function preOrderTraverse(tree) {
  if (!tree) return;
  rec(tree); 

  function rec (node) {
    if (!node) return;
    console.log(node.val);
    rec(node.left);
    rec(node.right);
  }
}

// 二叉树每一层的最大值
function getMaxArrInPerLevel(tree) {
  if (!tree) return;

  const res = [];
  const map = new Map();

  rec(tree, 1);

  function rec(node, deep) {
    if (!node) return;
    
    if (map.has(deep)) {
      map.set(deep, Math.max(map.get(deep), node.val))
    } else {
      map.set(deep, node.val);
    }

    if (node.left) {
      rec(node.left, deep + 1);
    }

    if (node.right) {
      rec(node.right, deep + 1);
    }
  }

  for (let [, value] of map) {
    res.push(value);
  }

  return res;
}



// DFS(tree);
// BFS(tree);
// preOrderTraverse(tree);
console.log(getMaxArrInPerLevel(tree));
// console.log(getMaxDepth(tree));