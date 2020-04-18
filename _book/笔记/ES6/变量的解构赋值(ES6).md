[TOC]

# 变量的解构赋值

## 1. 数组的解构赋值

**解构：** `ES6` 中允许按照一定的模式从数组和对象中提取值，然后对变量进行赋值，这被称为解构(Destructuring).

### 1. 基本用法

**本质上，这种写法属于“模式匹配”，只要等号两边的模式相同，左边的变量就会被赋予相应的值。**

- **完全解构**

```js
let [a, b, c] = [1, 2, 3];
console.log(a); // 输出1
let [a, b] = [1];
console.log(b); // 解构不成功时返回undefined
```

- **不完全解构**

  等号左边只匹配到等号右边的一部分。

  ```js
  let [a, [b], c] = [1, [2, 3], 4];
  console.log(b); // 输出2，只匹配到右边的右边数组[2, 3]中的2 
  ```

- **不能解构情况**

  如果等号右边不是可遍历的解构，或者说等号右边的值或是转换为对象以后也不具备 `Iterator` 接口，那么就会解构失败。

  ```js
  let [a] = 1;
  let [a] = false;
  let [a] = NaN;
  let [a] = undefined;
  let [a] = null;
  let [a] = {}
  ```

  **总结：事实上，只要某种数据结构具有 `Iterator` 接口，都可以采用数组形式的解构赋值。

### 2. 默认值

解构赋值允许指定默认值。

**ES6内部使用严格相等运算符(===)判断数组的某个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。**

```js
let [a = 2] = [null];
// a = null
let [a = 2] = [];
// a = 2
```

**如果默认值是一个表达式，那么这个表达式是惰性求值的**

```js
function f() {
    return 2;
}
let [a = f()] = [1];
// a = 1, f函数不会执行

let [a = f()] = [];
// a = 2, f函数会执行
```

**默认值可以引用解构赋值的其它变量，但是该变量必须已经声明**

```js
let [x = 1, y = x] = [];
// x = 1, y = 1
let [x = y, y = 1] = [];
// ReferenceError,在使用变量y时还并没有声明
```
## 2. 对象的解构赋值

**对象解构赋值的内部机制是先找到同名属性，然后再赋值给对应的变量，真正被赋值的是后者而不是前者**

举例说明：

```js
let {foo:bar} = {foo:"aaa"};
console.log(bar); // bar = "aaa"
console.log(foo); // ReferenceError, foo is not defined
console.log({foo:bar}.foo); // {foo:bar}.foo = "aaa"
```

上面代码中 `foo` 是匹配的模式，通过 `foo` 匹配到对象 `{foo:bar}` 中 `foo` 属性的值( `bar` 变量)，然后将值赋给 `bar` 变量，这样对象 `{foo:bar}` 中 `foo` 属性就有值了，即 `bar` 的值 `"aaa"`.

```js
// 实际上
let {foo1, foo2} = {foo1:"aaa", foo2:"bbb"};
// 是下面语句的简写形式
let {foo1:a, foo2:b} = {foo1:"aaa", foo2:"bbb"};
```

**对象的解构也可以指定默认值，默认值生效的条件是，对象的属性值严格等于undefined**

```js
let {x = 3} = {x: undefined};
// x = 3
// 上面的语句等价于
let {x:x = 3} = {x: undefined};
// x = 3
// {x:x = 3} = 3 

let {x = 3} = {x: null};
// x = null
```

**如果解构模式是嵌套的对象，而且子对象所在的父属性不存在，那么将会报错**

``` js
let {foo: {bar}} = {bar: 'bar'};
// 报错，因为foo = {bar} = undefined,{bar}对象中的bar属性在解构时会报错，因为{bar}是undefined，undefined是不能转换为对象的，对undefined取bar属性会报错。 
// 和下面的代码原理一样：
let obj = {bar: "bar"};
obj.foo.bar // 报错，因为obj.foo = undefined,对undefined取属性会报错。
"bar".foo // undefined,不会报错，因为字符串可以转换为对象
```

**在将已经声明的变量进行解构赋值时，要注意解构赋值语句不能直接写在行首**

```js
let x;
{x} = {x: 1}; // 报错，这个地方不是很懂
// 书上的解释是：JS引擎将{x}理解成一个代码块，从而发生语法错误。
// 若想避免这个错误，可以这样写：
({x} = {x: 1});
```

## 3. 字符串的解构赋值

**字符串可以解构赋值是因为字符串可以转换成一个类似数组的包装对象。**

```js
let [a, b, c, d, e] = "hello";
// a = 'h'  b = 'e'  c = 'l'  d = 'l'  e = 'o'
```

由于类似数组的包装对象有一个 `length` 属性，因此在解构赋值时可以利用这个属性。

```js
let {length: len} = 'hello';
// len = 5
```

## 4. 数值和布尔值的解构赋值

**解构赋值时，如果等号右边是数值或布尔值，则会先转为对象**

```js
let {toString: s} = 123;
console.log(s === Number.prototype.toString) // true
```

数值 `123` 被转换为对象，数值对象中有 `toString` 方法，与 `toString` 匹配，变量 `s` 中存储的是 `toString` 方法，该方法就是 `Number` 原型对象中的 `toString` 方法。

## 5. 函数参数的解构赋值

**函数参数的解构也可以使用默认值**

```js
function f({x = 0, y = 0} = {}) {
	return {x, y};
}
console.log(f({x: undefined, y: 1}));
// 输出： {0， 1}
```

这里 `x, y ` 使用了默认值，当传递进去的值是 `undefined` 时，就是用默认值。下面这个例子则不相同：

```js
function f({x, y} = {x: 0, y: 0}) {
    return {x, y};
}
console.log(f({x: undefined, y: 1}));
// 输出： {undefined, 1}

function f({x, y} = {x: 0, y: 0}) {
    return {x, y};
}
console.log(f({x: 1, y: 1}));
// 输出： {1, 1}

function f({x, y} = {x: 0, y: 0}) {
    return {x, y};
}
console.log(f({}));
// 输出： {undefined, undefined}

function f({x, y} = {x: 0, y: 0}) {
    return {x, y};
}
console.log(f();
// 输出： {0, 0}  当不传递实参时，形参的值是原有的值
```

函数的形参实际上是 `{x: 0, y: 0}`，当有实参传递进来时形参原来的值就会被覆盖。

## 6. 圆括号问题

**对于编译器而言，一个式子到底是模式还是表达式，没有办法一开始就知道，必须解析到(或解析不到)等号才能知道**

- **不能使用圆括号的情况**

  1. 变量声明语句
  2. 函数参数
  3. 赋值语句表达式

- **可以使用圆括号的情况**

  赋值语句中的非模式部分可以使用圆括号。

  ``` js
  [(a)] = [3]; // a并不是模式
  （{ p: (d) } = {}）; // p是模式，d并不是模式
  ```

**建议：无论什么情况都尽量不要在模式中使用圆括号**

## 7. 解构赋值的作用

1. **交换变量的值**

   ```js
   let a = 1;
   let b = 2;
   [a, b] = [b, a];
   ```

2. **方便处理函数返回值**

   ```js
   function f([x, y]) {
       return [x+1, y+2];
   }
   let [a, b] = f([1, 1]);
   ```

3. **函数参数定义**

   解构赋值可以方便地将一组参数与变量名对应起来。

   ```js
   function f1({x, y, z}){
       return x+y+z;
   }
   f1({y: 1, z: 2, x: 3 }); // 可以做到实参没有次序
   ```

4. **提取JSON数据**

   可以很方便地从JSON中提取需要的数据。

   ```js
   let JSON = {
       name: "happyCoding1024",
       age: 18,
       hobby: "coding"
   }
   let [name, age, hobby] = JSON;
   ```

5. **函数参数默认值**

   非常简化方便地使用函数参数默认值。

   ```js
   function f([x=0,y=0] = []){
       return x+y;
   }
   f([]); // 当传入的是undefined时，就会使用默认值
   ```

6. **遍历Map结构**

   任何部署了 `Iterator` 接口的对象都可以用 `for...of` 循环遍历。`Map` 结构原生支持 `Iterator` 接口，配合变量的解构赋值获取键名和键值非常方便。

   ```js
   let map = new Map();
   map.set('first', 'hello');
   map.set('second', 'world');
   for (let [key, value] = map){
       console.log(key + "is" + value);
   }
   ```

7. **输入模块的指定方法**

   加载模块时，往往需要制定输入的方法，解构赋值使得输入语句非常清晰。

   ```js
   const {SourceMapConsumer, SourceNode} = require("source-map");
   ```

   