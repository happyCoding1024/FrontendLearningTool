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

// 二叉树的所有路径
function getAllPath (tree) {
  if (!tree) return;

  const res = [];

  rec(tree, [tree.val]);

  function rec (node, path) {
    if (!node) return;

    if (!node.left && !node.right) {
      res.push(path);
    }

    if (node.left) {
      rec(node.left, path.concat(node.left.val));
    }

    if (node.right) {
      rec(node.right, path.concat(node.right.val));
    }
  }

  return res.map((item, index) => item.join('=>'));
}

// 另一棵树的子树
function isSubTree (root, subRoot) {
  let isSame = true;
  const sameRoot = [];
  rec(root);
  
  function rec (node) {
    if (!node) return;

    if (node.val === subRoot.val) {
      sameRoot.push(node);
    }
    
    if (node.left) {
      rec(node.left);
    }

    if (node.right) {
      rec(node.right);
    } 
  }

  function isSameTree(node1, node2) {
    if (!node1 || !node2 ) return;

    if (node1.val !== node2.val) {
      isSame = false;
    }

    if (node1.left && node2.left) {
      dfs(node1.left, node2.left);
    }

    if (node1.right && node2.right) {
      dfs(node1.right, node2.right);
    }
  }

  for (const node of sameRoot) {
    isSameTree(node, subRoot);
  }

  return isSame;
}




// DFS(tree);
// BFS(tree);
// preOrderTraverse(tree);
// console.log(getMaxArrInPerLevel(tree));
console.log(getAllPath(tree));
// console.log(getMaxDepth(tree));