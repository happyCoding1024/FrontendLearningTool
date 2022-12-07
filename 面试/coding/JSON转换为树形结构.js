//已知扁平化数据Arr
let Arr = [
  { id: 1, title: "标题1", parent_id: 0 },
  { id: 2, title: "标题2", parent_id: 0 },
  { id: 3, title: "标题2-1", parent_id: 2 },
  { id: 4, title: "标题3-1", parent_id: 3 },
  { id: 5, title: "标题4-1", parent_id: 4 },
  { id: 6, title: "标题2-2", parent_id: 2 },
];

const result = [];
function fn(list) {
  const idmap = {};
  for (const value of list) {
    idmap[value.id] = value;
  }

  //console.log(remap);
  //###第二步，循环遍历数组，判断是不是(树状结构最外层，祖宗层数据)第一层的数据(本处就是parent_id等不等于0)
  for (let item of list) {
    //用普通的for循环也行，但是用for in 不行,只能获取数组的元素下标,或者对象的键
    if (item.parent_id === 0) {
      result.push(item);
      continue;
    }

    if (item.parent_id in idmap) {
      const parent = idmap[item.parent_id];

      if (!parent.children) {
        parent.children = [];
      } else {
        parent.children.push(...[parent.children, item]);
      }
    }
  }

  return result;
}

// const tree = fn(Arr);

const a = 2;

const arr = [
  { id: 1, name: 1 },
  { id: 2, name: 2, parent_id: 1 },
  { id: 3, name: 3, parent_id: 2 },
  { id: 4, name: 4, parent_id: 3 },
];

// {
// 	id: 1,
// 	name: 1,
// 	children: []
// }

// 阿里一面
function convert2Tree(arr) {
	const idMap = {};
	let tree;

	for (const item of arr) {
		idMap[item.id] = item;
	}

	for (const item of arr) {
		if (!item.parent_id) {
			tree = idMap[item.id];
			continue;
		}

		parent = idMap[item.parent_id];
		if (!parent.children) {
			parent.children = [item];
		} else {
			parent.children.push(item);
		}
	}

	return tree;	
}

let resss =convert2Tree(arr)

let aaa = 1;
// const key = 'a_b_c_d_e';
// const reg = /_([a-z])/g;
// console.log(reg.exec(key));
