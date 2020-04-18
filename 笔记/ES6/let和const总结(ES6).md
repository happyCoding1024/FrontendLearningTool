[TOC]

# let const

## 1. let要好好用

### 1. 基本用法

**let命令用于声明变量，但是在所声明的变量具有块级作用域的特性，只在let命令所在的代码块中有效。**

先看下面这段代码输出什么：

```js
var a = [];
for (var i = 0; i < 10; i++){
    a[i] = function () {
        console.log(i);
    };
}
a[8]();
```

程序的输出结果是10而不是8，因为i是全局变量，执行完for循环后，i的值变为10，a数组中存放的是`console.log(i)`这段代码，在调用 `a[8]()` 时 `i` 的值 为10，故最终输出10.

若使用let上述代码的输出会变成什么呢？

```js
var a = [];
for (let i = 0; i < 10; i++){
    a[i] = function () {
        console.log(i);
    };
}
a[8]();
```

程序最终输出8，因为使用let声明变量 `i` 后，每一次循环的的 `i` 实际上都是一个新的变量，`a[6]` 和 `a[8]` 对应的 `i` 并不是同一个 `i` ，`JavaScript` 引擎会记住当前的 `i` 值，在进行下一个 `i` 值执行 `i++` 时会在当前的 `i` 的基础上进行计算。

```js
for (let i =0; i < 3; i++){
    let i = 'abc';
    console.log(i);
}
//程序输出
'abc'
'abc'
'abc'
```

可以看到内部的 `i` 并没有覆盖掉外部for循环中的 `i` ,两个变量虽然同名但是两个完全不同的变量，两者互不影响，并不存在覆盖的情况。**它们有各自单独的作用域。**

### 2. let声明的变量不存在变量提升

**`var` 命令声明的变量是有变量提升的，但是 `let` 命令声明的变量不存在变量提升**

看下面的例子：

```javascript
// var
consol.log(i); // 输出undefined
var i = 3;

// let
console.log(i); // ReferenceError
let i = 3; 
```

使用 `var` 命令时，在程序预解析阶段，`js` 解释器遇到 `var` 命令时会将后面变量进行提前声明，但是注意并不会赋值，而 `let` 命令并不会进行提前声明，故会报`ReferenceError` 错误。

### 3. TDZ(temporal dead zone)暂时性死区

**ES6明确规定，如果在某个区块中存在 `let` 和 `const` 命令，那么这个区块中对用 `let` 和 `const`  命令声明的变量从一开始就形成封闭作用域，只要在声明之前使用这些变量，就会报错。**

也就是说在这个区块中用这两个命令声明的变量的作用域链中只有当前作用域，只在当前作用域中起作用，在其它作用域中重名的变量和它们没有半毛钱的关系，并不会形成覆盖等作用，就像第一条基本用法中第三段代码，变量   ` i` 并不会进行覆盖。 

```js
var tmp = 123;
if (true) {
    tmp = 'abc';
    let tmp;
    console.log(tmp);
}
```

运行结果截图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190927105334802.png)

在使用 `let` 声明之前就执行`tep = 'abc'; ` 使用了变量 `tmp` 导致出现引用错误。

再看一例：

```js
var tmp = 123;
if (true) {
    let = tmp;
    console.log(tmp);
}
```

运行结果截图：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190927105411811.png)

`if` 语句块内的 `tmp` 变量和外面的 `tmp` 变量并不是一个变量，它们两个没有半毛钱的关系，在 `if` 语句块内声明了 `tmp` 但是并没有赋值，故输出 `undefined`.

**ES6规定暂时性死区和let，const不出现变量提升，主要是为了减少运行时的错误，在没有声明变量之前就使用它，一是不符合正常的思维逻辑，二是会引发一些意料之外的行为。**

**因此，平时在写代码时要养成先声明后使用的编程习惯！**

### 4. 不允许重复声明

**ES6规定：`let` 不允许在相同的作用域内重复声明同一个变量**

下面的代码都是错误的：

```js
// 报错
function () {
    var i;
    let i;
}
// 报错
function () {
    let a = 1;
    let a = 2;
}
// 报错
function f (arg) {
    let arg;
}
// 不报错
function f (arg) {
    {
        let arg;
    }
}
```

前面两种很好理解，第三种，我们知道在 `js` 中函数的形参实际上就是函数内部的一个局部变量，`function f(arg)`  就相当于 `function f (var arg)`, 所以实际上和前面两种情况一样。

第四种由于在函数内部又新建了一个区块，故两个变量是存在于不同的区块中，故不会报错。

**用 `let` 声明的变量只在当前的区块中有效，并且在当前区块中只能有一个这样的变量，不能出现同名的变量**

## 2. 块级作用域

### 1. 为什么需要块级作用域

两段代码来说明原因：

例1(内层变量覆盖外层变量)：

```js
// 覆盖
var tmp = new Date();

function f () {
    console.log(tmp);
    if (false) {
        var tmp = 'hello';
    }
}

f(); // 输出 undefined
```

上述代码相当于：

```js
// 覆盖
var tmp = new Date();

function f () {
    var tmp; // 变量提升
    console.log(tmp);
    if (false) {
    	var tmp = 'hello';
    }
}

f(); // 输出 undefined
```

在预解析阶段，由于变量提升，在函数 `f` 内部，变量 `tmp` 被提升到函数 `f` 作用域的头部，但是并未赋值，赋值是在执行阶段进行的。

例2(循环计数变量变为全局变量)：

```js
for (var i = 0; i < 10; i++) {
    console.log(i);
}
console.log(i); // 输出10
```

在其它具有块级作用域的语言中，在 `for` 循环执行完毕后，变量 `i` 就被销毁了，但是在 `js` 中，变量 `i` 并没有被销毁，反而变成了全局变量。

### 2. ES6中实现了块级作用域

**ES6中块级作用是利用 `let` 命令实现的，单纯写一对大括号，并不是块级作用域**

```js
// 没有用let命令
{
    var tmp =2
}
	console.log(tmp); // 输出2
```

上面的代码并没有利用 `let` 命令，`tmp` 是一个全局变量。

```js
// 使用let命令
{
    let tmp =2
}
	console.log(tmp); // undefined
```

运行结果：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190927105506731.png)

tmp是一个局部变量，在外部无法访问内部的变量，故输出undefined。

**块级作用域的出现使得之前广泛使用的立即执行匿名函数(IIFE)的写法变得不再必要**

### 3. 块级作用域与函数声明

**ES5规定：函数只能在顶层作用域和函数作用域中声明，不能在块级作用域中声明**

**ES6规定：允许在块级作用域中声明函数，在块级作用域中，函数声明语句的行为类似于 `let` 在块级作用域之外不可引用**

**ES6环境浏览器行为方式：**

- 允许在块级作用域内声明函数
- 函数声明类似于 `var` ，即会提升到全局作用域或函数作用域的头部
- 同时，函数声明还会提升到所在的块级作用域的头部

可以看到ES6规定和浏览器的实现是不一致的，这是为了降低对旧代码产生的影响。

下面举例来说明一下：

例：

```js
function f () {
	console.log("I am outside");
}
(function () {
	if (false) {
		function f() {
			console.log("I am inside");
		}
	}
	f();
}());
// 输出结果：
// "I am inside"
```

在 `ES5`环境下，以上代码相当于：

```js
// ES5环境
function f () {
	console.log("I am outside");
}
(function () {
    function f() {
			console.log("I am inside"); // 函数f声明提前，注意在ES5下函数体也提前了
		}
	if (false) {
	}
	f();
}());
// 输出结果：
// "I am inside"
```

在IE浏览器下调试时，`IE10 `及以下浏览器版本应该都是 `ES5` 环境，因为运行上述代码时结果与理论上一致，而在 `edge `版本上运行时，却发生引用错误和 `ES6` 环境理论上一致。

在 `ES6`环境下，以上代码相当于：

```js
// ES6环境
function f () {
	console.log("I am outside");
}
(function () {
    var f = undefined; // 在ES6环境下同样也是提前了，但是函数体并没有提前
	if (false) {
        function f() {
			console.log("I am inside"); // 函数f声明提前，注意在ES5下函数体也提前了
		}
	}
	f();
}());
```

运行结果：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019092710564547.png)

在` chrome，IE edge ，Firefox `下和上述结果是一致的，应该是 `ES6` 环境。

**无论支不支持在块级作用域中声明函数，这种行为是不好的，即使真的需要，也应该在块级作用域中写成函数表达式的形式**

### 4. do表达式(仅仅是提案)

**`do` 表达式解决的是在块级作用域不能返回值的问题**

`do` 表达式的用法如下：

```js
let x = do {
    let t = 3;
    t+1;
};
```

如果浏览器能实现的话， `x` 的值应该为块级作用域的返回值 `t+1` 为4.

## 3. const(不要忘记立即初始化哦)

### 1. 基本用法

**`const` 声明的是一个只读的常量，一旦声明，常量的值就不能改变**

```js
const PI = 3.1415929;
pi = 2; // 报错，不能够给常量再赋值
```

**`const` 一旦声明常量，就必须立即初始化，否则也会报错**

```js
const PI; // SyntaxError：Misssing initializer in const declaration
```

**`const` 的作用域与 `let` 命令相同，也是只在声明所在的块级作用域中生效**

```js
if (true) {
    const MAX = 5;
}
console.log(MAX); // Uncaught ReferenceError MAX is not defined
```

**`const` 命令声明的常量不会提升，同样存在暂时性死区**

```js
if (true) {
    console.log(MAX); // ReferenceError,必须在变量使用之前声明它
    const MAX = 5;
}
```

**使用`const` 声明的常量与`let` 一样不可进行重复声明 **

```js
var a = 1;
const a = 1; // 报错，在同一个块级作用域内不能声明两个同名的变量(常量)
```

### 2. const的本质

**`const` 实际上保证的并不是变量的值不得改动，而是变量指向的那个内存地址不得改动，对于简单数据类型而言，值就保存在变量指向的内存地址中，内存地址不改变，值自然也就不会改变。但是对于复合类型的数据类型而言，变量指向的内存地址中保存的是一个指针，这个指针指向的内存空间中保存的是这个复合数据类型的值。我们对象是可变的数据类型，故地址不变，对象的内容实际上是可以改变的。**

举例说明：

```js
const obj = {};
// 为对象添加一个属性
obj.prop = 1; // 添加成功
// 令obj指向另一个对象
obj = {}; // 报错
```

将 `obj` 指向另一个对象时，由于地址发生了改变，会改变 `obj` 的值，故会报错。

**如果真的想将对象冻结，可以使用 `Object.freeze` 方法**

```js
const foo = Object.freeze({});
// 常规模式下，下面一行不起作用
// 严格模式下，下面一行会报错
foo.prop = 123;
```

常量 `foo` 指向了一个冻结的对象，所以添加新属性时不起作用，严格模式下还会报错。

## 4. ES6中声明变量的六种方法

- **var**
- **function**
- **let**
- **const**
- **import**
- **class**

## 5. ES6对顶层对象属性的改变

###  1. ES5中顶层对象的属性

顶层对象在浏览器环境中指的是 `window` 对象，在 `Node` 环境中指的是 `global` 对象。在 `ES5` 中顶层对象的属性与全局变量是等价的。

```js
window.a = 2;
console.log(a) // 输出2
```

**顶层对象的属性与全局变量相关带来的问题：**

- 无法在编译时就提示变量未声明的错误，只有在运行时才能知道(因为全局变量有可能是顶层对象的属性创造的，而属性的创造是动态的)
- 程序员不知不觉就会创建全局变量(比如打字出错)
- 顶层对象的属性是到处都可以读写的，非常不利于模块化编程

### 2. ES6中顶层对象的属性

**1. 为了保持兼容性，`var` 和 `function` 命令声明的全局变量依然是顶层对象的属性**

**2. `let,const,class` 命令声明的全局变量不属于顶层对象的属性**

```js
var a = 1;
console.log(window.a); // 1
let b = 2;
console.log(window.b); // undefined 
```

有 `let` 声明的变量 `b` 并不是顶层对象的属性，故会输出 `undefined`





















