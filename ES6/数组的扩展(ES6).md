[TOC]

# 数组的扩展(ES6)

数组平时肯定是用的比较多的，今天和大家聊一下ES6对数组的扩展，理解的东西不多，主要是比较繁琐，简单整理了一下，主要是下面的几个地方。

## 1. 扩展运算符

扩展运算符(spread) 是三个点（...），它如同 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

```js
console.log(...[2,3,4]);
```

该运算符主要用于函数调用。

```js
function push(array, items) {
    array.push(...items);
    console.log(items); // items=[1, 2, 3]
    console.log(...items); // ...items = 1 2 3
}

var array = [];
var value = [1, 2, 3];
push(array, value); // array = [1, 2, 3]
```

再看一下下面的例子，比较一下最终array的结果。

```js
function push(array, ...items) {
    array.push(...items);
    console.log(items); // items = [[1, 2, 3]] items.length = 1
    console.log(...items); // ...items = [1 2 3]
}

var array = [];
var value = [1, 2, 3];
push(array, value); // array = [[1, 2, 3]]
```

`items=[1, 2, 3]` 作为形参传递到实参，函数的实参采用了ES6中的rest参数，将形参的值[1, 2, 3]保存到items数组的第0项，即 `items = [[1, 2, 3]]` 。

然后执行 `array.push(...items); ` `...` 在这里是扩展运算符。因为 `items=[[1, 2, 3]]` 所以经过扩展运算后 `...items=[1, 2, 3]` ，进而经过 `array.push([1, 2, 3])` 后，`array=[[1, 2, 3]]`。 

**扩展运算符的应用**

1. 合并数组

   ```js
   // ES5
   [1, 2, 3].concat([4, 5]);
   
   // ES6
   [1, 2, 3, ...[4, 5]]
   ```

2. 与解构赋值结合

   ```js
   // ES5
   a = list[0];
   rest = list.slice(1);
   
   // ES6
   [a, ...rest] = list;
   ```

3. 字符串

   扩展运算符还能将字符串转为数组。

   ```js
   [..."hello"] // ["h", "e", "l", "l", "o"];
   ```

   上面这种写法的好处是能够识别32位的 `Unicode` 字符。

   ```js
   'x\uD842\uDFB7y'.length // 4 
   ```

   `'\uD842\uDFB7'` 表示的是码点占四个字节的 `'𠮷'`，上面这种写法并没有识别出来 `\uD842\uDFB7` 表示的是一个字符。

   ```js
   [...'x\uD842\uDFB7y'].length // 3
   ```

   利用扩展运算符就能够识别出32位的 `Unicode` 字符。

4. 实现了 Iterator 接口的对象

   任何具有 `Iterator` 接口的对象都可以用扩展运算符转为真正的数组。

   ```js
   var nodeList = document.querySelectorAll('div');
   var array = [...nodeList];
   ```

   `nodeList` 不是一个数组而是一个类似数组的对象，但是扩展运算符会将其转换为真正的数组，因为它具有 `Iterator` 接口。

   下面的对象看起来像是一个类数组对象，但是由于没有 `Iterator` 接口，所以不能利用扩展运算符将其转换为数组。

   ```js
   var arrayLike = {
       "0": 'a',
       "1": 'b',
       length: 2
   };
   
   var array = [...arrayLike] // TypeError: Cannot spread non-iterator object 
   ```

5. Map 和 Set 结构， Generator 函数

   扩展运算符内部调用的是数据结构的 `Iterator` 接口，因此只要具有 `Iterator` 接口的对象，都可以使用扩展运算符，如 `Map` 结构。

   ```js
   let map = new Map([
       [1, 'one'],
       [2, 'two'],
   ]);
   
   let arr = [...map.keys()]; // [1, 2, 3]
   ```

## 2. Array.from 

`Array,from` 方法用于将两类对象转为真正的数组：类似数组的对象(array-like object) 和可遍历(iterator)的对象。

下面是将一个类似数组的对象转为真正的数组。

```js
let arrayLike = {
  '0': 'a',
  '1': 'b',
  length: 2
};

// ES5
var arr1 = [].slice.call(arrayLike);
// ES6
var arr2 = Array.from(arrayLike);
```

何为类似数组对象，本质特征只有一点，即必须有 `length` 属性，因此任何有 `length` 属性的对象，都可以通过 `Array.from` 方法转为数组。

## 3. Array.of()

**作用**：将一组值转换为数组。

**初衷：** 弥补 `Array` 构造函数的不足。

```js
// Array 构造函数的不足
Array() // [] 空数组
Array(3) // [, , ,] 
Array(3, 11, 8) // [3, 11, 8]
```

可以看到Array(3) 返回的并不是 `[3]`。`Array.of` 可以做到括号中是什么数值，生成的数组中就是什么数值。

```js
Array(3) // [3]
Array(2) // [2]
```

以下代码可以模拟实现 `Array.of()` 方法。

```js
function Array.of() {
    return [].slice.call(arguments);
}
```

## 4. copyWithin()

**作用：**将当前数组指定位置的成员复制到其它指定的位置，然后返回当前数组，使用这个方法会修改当前数组。

```js
Array.prototype.copyWithin(target, start = 0, end = this.length)
```

- target(必选)： 从该位置开始替换数据
- start(可选)： 从该位置开始读取数据
- end(可选)：到该位置前停止读取数据，注意不包括该位置。

```js
var arr = [1, 2, 3, 4, 5];
arr.copyWithin(0, 3); // arr = [4, 5, 3, 4, 5]
```

## 5. find() 和 findIndex()

`find` 方法用于找到第一个符合条件的数组成员，它的参数是一个回调函数，所有的数组成员依次执行该回调函数，直到找出**第一个**返回值为 true 的成员，然后返回该成员，如果没有符合条件的成员，则返回undefined。

```js
[1, 5, 10, 15].find(function (value, index, arr) {
    return value < 9;
}); // 10
```

`findIndex` 方法用法与 `find` 方法类似，只是返回第一个符合条件的数组成员的位置，如果所有的数组成员都不符合条件则返回 -1 。

```js
[1, 5, 10, 15].findIndex(function (value, index, arr) {
    return value < 9;
}); // 2
```

这两个方法都可以发现 `NaN` ，弥补了数组 `IndexOf` 方法的不足。

## 6. fill()

**作用：** 使用给定值填充一个数组。

```js
['a', 'b', 'c'].fill(1); // [1, 1, 1]
new Array(3).fill(1); // [1, 1, 1]
```

## 7. entries(), keys() 和 values()

`ES6` 提供了三个新方法: `entries()，keys()，values()` 来遍历数组。它们都返回一个遍历器对象，可用 `for...of` 循环遍历。

**区别：**keys() 是对键名的遍历，values() 是对键值的遍历， entries() 是对键值对的遍历。 

```js
// ES5
var arr = ['a', 'b', 'c'];
for (var value of arr) {
    console.log(value); // a b c
}

// ES6 遍历键值
var arr = ['a', 'b', 'c'];
for (var value of arr.values()) {
    console.log(value); // a b c
}

// ES6 遍历键名
var arr = ['a', 'b', 'c'];
for (var key of arr.keys()) {
    console.log(key); // 0 1 2
}

// ES6 遍历键值对
var arr = ['a', 'b', 'c'];
for (var [key, value] of arr.entries()) {
    console.log(key, value);
}
// 0 "a"
// 1 "b"
// 2 "c"
```

## 8. includes()

`Array.prototype.includes` 方法返回一个布尔值，表示某个数组是否包含给定的值，字符串的 `includes` 方法类似。

```js
[1, 2, 3].includes(1); // true
[1, 2, 3].includes(4); // false
[1, 2, 3, NaN].includes(NaN); // true 可以准确判断出NaN
```

没有该方法之前，我们通常使用数组的 `indexOf` 方法检查是否包含某个值，如下面的代码所示：

```js
var arr = [1, 2, 3, NaN];
function hasValue(arr, value) {
    if (arr.indexOf(value) === -1) {
        console.log(value + " is not in " + arr);
    } else {
        console.log(value + " is in " + arr);
    }
}
hasValue(arr, 4); // 4 is not in [1,2,3]
hasValue(arr, 1); // 1 is in [1,2,3]
hasValue(arr, NaN) // NaN is not in [1,2,3,NaN] 会对NaN造成误判
```

`indexOf` 方法有两个缺点：一是不够语义化，其含义是找到参数值第一个出现的位置，所以要比较是否不等于    ``-1``，表达起来不够直观；二是，其内部使用严格相等运算符(===)进行判断，会导致对 `NaN` 的误判。

## 9. 数组的空位

数组的空位指数组的某个位置没有任何值，比如，`Array(5)` 返回的数组都是空位。

```js
Array(5) // [, , , , ,] 返回一个具有5个空位的数组。
```

**重点来了：**

空位不是 `undefined` ，一个位置的值等于 `undefined` 依然是有值的。空位是没有任何值的，下面用 `in`运算符来说明这一点。

> in 运算符： 如果指定的属性在指定的对象或其原型链中，则**in 运算符**返回`true`。 

 ```js
0 in [undefined undefined]; // true
0 in [, ,]; // false  
 ```

数组是一种特殊的对象，`[1 ,2, 3]` 实际上就是 :

```js
{
    "0": 1,
	"1": 2,
	"2": 3
}
```

`0`这个属性在 `[undefined， undefined] ` 中，但是不在 `[, ,]` 中说明，`undefined`是有值的，`undefined` 并不是空位。 

ES6 和 ES5 对空位的处理规则不太一致，总结起来就是下面的一句话：

ES5 大多数情况下会忽略空位，ES6则不会忽略空位而是遇到空位是将其转换为 `undefined`。



完

如有错误欢迎指正哦。

