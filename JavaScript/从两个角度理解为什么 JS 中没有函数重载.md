## 两个角度理解为什么 JS 中没有函数重载

> 函数重载是指在同一作用域内，可以有一组具有相同函数名，不同参数列表（参数个数、类型、顺序）的函数，这组函数被称为重载函数。重载函数通常用来声明一组功能相似的函数，这样做减少了函数名的数量，避免了名字空间的污染，对于程序的可读性有很大的好处。 

但是在 JS 如果不通过一些方法是无法实现重载的，可以从以下两个角度去理解。

## 1. 方法签名

方法签名指的是函数的名称加形参列表，并且通过函数的名称或者形参列表都可以区分出是不同的函数。

JS 中通过形参是没有办法区分出不同的函数的，只能通过函数的名称区分出不同的函数，现在我们来看一下下面的例子.

```js
function add(a, b) {
  return a + b;
}
function add(a, b) {
  return a + b + 1;
}
```

上述实际上是一个函数，后面的函数 add 会覆盖前面的函数，究其原因还是因为 JS 是弱类型的语言，a 和 b 实际上都是用 var 声明的，等价于

```js
function add(var a, var b) {
  return a + b;
}
```

所以在 JS 中只能通过函数名称来辨别是不是同一个函数，形参是没有用的。

但是在强类型的语言中就是可以的，例如在 c 语言中，定义函数时形参必须要指定类型，向里面传值的时候也必须传递指定类型的值。函数名相同，形参名不同的函数也会被认为是不同的函数。

```c
#include <stdio.h>

int add(int a, int b) {
	return a + b;
}
double add(double a, double b) {
	return a + b + 1;
}

int main() {
	printf("第一种声明函数结果 add(1, 3)= %d \n", add(1, 3));
	printf("第二种声明函数结果 add(1.0, 3.0)= %lf \n", add(1.0, 3.0));
}
```

上述两个函数是不同的，可以打印一下结果验证一下。

![C语言运行结果.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvMjAyMDAxMDZDJUU4JUFGJUFEJUU4JUE4JTgwJUU4JUJGJTkwJUU4JUExJThDJUU3JUJCJTkzJUU2JTlFJTlDLnBuZw?x-oss-process=image/format,png)

所以，在 C 语言这种强类型的语言中是可以实现函数重载的，JS 这种弱类型的语言是不可以的。

## 2. 函数指针

另一中理解的角度是可以将函数名想象为指针，函数名中存放的是函数体存放的地址。还是通过代码来说明。

```js
function add(a, b) {
  return a + b;
}
function add(a, b) {
  return a + b + 1.0;
}
```

上面的两种声明方式等价于

```js
var add = function （a, b) {
  return a + b;
}
add = function (a, b ) {
  return a + b + 1.0;
}
```

最终 add 实际上指向的是第二个函数，第一个函数被覆盖了，所以最终调用 add 时调用的也是第二个函数，并不能实现函数的重载。

```js
console.log(add(1, 3)) // 5
```



完，如有不恰当之处，欢迎指正哦。

也是第二个函数，并不能实现函数的重载。

```js
console.log(add(1, 3)) // 5
```



完，如有不恰当之处，欢迎指正哦。