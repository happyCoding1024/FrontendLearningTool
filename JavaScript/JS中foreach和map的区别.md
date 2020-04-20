## JS 中 foreach 和 map 方法的区别

**map方法：**

map对一个数组对象进行操作时，一般是生成一个新的数组，可以在map中限制生成新数组的条件，有返回值。

**forEach方法：**

forEach方法也是对数组进行遍历，没有返回值。

**示例**

将 arr 数组中的每个元素翻倍。

```js
let arr1 = [1, 2, 3]
    arr2 = [1, 2, 3]
const newArr_foreach = arr1.forEach(item => {
  return item * 2
})
console.log('newArr_foreach = ', newArr_foreach)
console.log('arr1 = ', arr1)

const newArr_map = arr2.map(item => {
  return item * 2
})
console.log('newArr = ', newArr_map)
console.log('arr2 = ', arr2)
```

运行结果：

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200402152802.png)

