# JS 中检测数组的四种方法

今天和大家分享一下 JS 中检测是不是数组的四种方法，虽然篇幅不长，不过方法应该算是比较全面了。

## 1. instanceof 方法

instanceof 用于检测一个对象是不是某个类的实例，数组也是一种对象所以也可以利用 instaceof 来进行判断。

```js
let arr = [1, 2, 3];
console.log(arr.instanceof(Array)); // true
```

这种方法在只有一个全局作用域的环境下是可以的，但是如果一个网页中包含多个框架，那么就会存在不同的全局环境，不同的环境 Array 构造函数是不同的，所以要在两个框架下传递数组时就会出现问题，在某个框架里检测出来是数组但是在另一个框架里检测出来并不是数组。

## 2. Array.isArray 方法

isArray 方法用于确定一个值到底是不是数组，不管是在哪个环境下都是可以的。不过这个方法在低版本的 IE 的浏览器中是不支持的。

```js
let arr = [1, 2, 3];
console.log(Array.isArray(arr));
```

## 3. 数组构造函数

在创建数组时可以使用 `let arr = new Array()` 的形式，反过来我们也可以利用 constructor 属性来获取它的构造函数根据是不是 Array 来判断一个值是不是数组。

```js
let arr = [1, 2, 3];
console.log(arr.constructor === Array) // true
```

这种方法和方法 1 有相同的缺点，在多个环境下 Array 构造函数有可能是不同的，而且在多个环境下如果要进行数组传递的话很有可能会出现问题。

## 4. Object.prototype.toString.call() 方法

我们知道，在任何值上调用 Object 原生的 toString 方法，都会返回 [object NativeConstructorName] 格式的字符串，利用这一点也可以用来检测是不是数组。

```js
let arr = [1, 2, 3];
console.log(Object.prototype.toString.call(arr) === "[object Array]"); // true
```

由于原生数组的构造函数名与全局环境无关，因此无论在哪一个环境下这个方法都可以正确的检测一个数组。

> 注意：方法 1 和 方法 3 中的 Array 是 window 的属性。



完，如有不恰当之处欢迎指正哦。





