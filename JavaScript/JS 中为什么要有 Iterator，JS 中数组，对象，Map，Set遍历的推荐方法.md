JavaScript 原有的表示 “集合 ”的数据结构主要是数组（ Array ）和对象（ Object), ES6 又添加了 Map 和 Set。 这样就有了 4 种数据集合，用户还可以组合使用它们，定义自己的数据结 构，比如数组的成员是 Map, Map 的成员是对象 。 这样就需要一种统一 的接口机制来处理所有 不同的数据结构 。

遍历器（ Iterator ）就是这样一种机制 。它是一种接口，为各种不同的数据结构提供统一 的 访问机制。任何数据结构，只要部署 Iterator 接口，就可以完成遍历操作（即依次处理该数据结 构的所有成员） 。

Iterator 的作用有 3 个： 一是为各种数据结构提供一个统一的、简便的访问接口； 二是使得 数据结构的成员能够按某种次序排列； 三是 ES6 创造了 一种新的遍历命令一－for . . . of 循环， Iterator 接口 主要供 for ... of 消费。

## 遍历 `数组，对象，Map，Set` 的推荐方法

全用 `for ... of` ，和其它遍历方式相比，`for…of` 的优势主要有以下几方面。

![https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20221025112017.png](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20221025112017.png)

### 数组

```tsx
const arr = [1, 2, 3];

for(let value of arr) {
  console.log('arr\n', value);
}
```

![https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20221025112251.png](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20221025112251.png)

### 对象

对象不能直接用 `for...of` ，因为没有部署 `Iterator` 接口，使用 `for...in` 还是可以的，但是 `for...in` 有下面的一些缺点。

![https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20221025112710.png](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20221025112710.png)

所以我们还是使用 `for...of` 更好一些，我们可以使用 `Object.keys(obj), Object.values(obj), Object.entries(obj)` 转换成数组然后再使用 `for...of` 。

```tsx
const obj = {
  '1': 1,
  '2': 2,
  '3': 3
}

for (let [key, value] of Object.entries(obj)) {
  console.log('obj\n', value);
}
```

![https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20221025113233.png](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20221025113233.png)

### Set

天然具备 Iterator 接口可直接使用 `for...of`。

```tsx
const set = new Set([1, 2, 3]);

for (let value of set) {
  console.log('set\n', value);
}
```

![https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20221025113413.png](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20221025113413.png)

### Map

天然具备 Iterator 接口可直接使用 `for...of`。

```tsx
const map = new Map();
map.set('1', 1);
map.set('2', 2);
map.set('3', 3);

for (let [key, value] of map) {
  console.log('map\n', value);
}
```

![https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20221025113541.png](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20221025113541.png)