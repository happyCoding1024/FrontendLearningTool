[TOC]

# 数组的扩展(ES6)

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

   

2. 与解构赋值结合

3. 函数的返回值

4. 字符串

5. 实现了 Iterator 接口的对象

6. Map 和 Set 结构， Generator 函数

## 2. Array.from







