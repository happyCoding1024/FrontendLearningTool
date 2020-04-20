# 简单理解 JS 中的闭包

> 原文链接:  http://www.ruanyifeng.com/blog/2009/08/learning_javascript_closures.html 
>
> 注：本文是阮一峰老师写的，通俗易懂，理解闭包很好的文章。在此此基础上加了自己的一些理解，阮一峰老师由于最后两道思考题没有给出答案，所以在本文中给了比较详细的解释。

闭包（closure）是Javascript语言的一个难点，也是它的特色，很多高级应用都要依靠闭包实现。

**一、变量的作用域**

要理解闭包，首先必须理解Javascript特殊的变量作用域。

变量的作用域无非就是两种：全局变量和局部变量。

Javascript语言的特殊之处，就在于函数内部可以直接读取全局变量。

```js
var n=999;

function f1(){
  alert(n);
}

f1(); // 999
```

另一方面，在函数外部自然无法读取函数内的局部变量。

```js
function f1(){
  var n=999;
}

alert(n); // error
```

这里有一个地方需要注意，函数内部声明变量的时候，一定要使用var命令。如果不用的话，你实际上声明了一个全局变量！

```js
function f1(){
  n=999;
}

f1();

alert(n); // 999
```

**二、如何从外部读取局部变量？**

出于种种原因，我们有时候需要得到函数内的局部变量。但是，前面已经说过了，正常情况下，这是办不到的，只有通过变通方法才能实现。

那就是在函数的内部，再定义一个函数。

```js
function f1(){

  var n=999;

  function f2(){
    alert(n); // 999
  }

}
```

在上面的代码中，函数f2就被包括在函数f1内部，这时f1内部的所有局部变量，对f2都是可见的。但是反过来就不行，f2内部的局部变量，对f1就是不可见的。这就是Javascript语言特有的"链式作用域"结构（chain scope），子对象会一级一级地向上寻找所有父对象的变量。所以，父对象的所有变量，对子对象都是可见的，反之则不成立。

既然f2可以读取f1中的局部变量，那么只要把f2作为返回值，我们不就可以在f1外部读取它的内部变量了吗！

```js
function f1(){

  var n=999;

  function f2(){
    alert(n);
  }

  return f2;

}

var result=f1();

result(); // 999
```

**三、闭包的概念**

上一节代码中的f2函数，就是闭包。

各种专业文献上的"闭包"（closure）定义非常抽象，很难看懂。我的理解是，闭包就是能够读取其他函数内部变量的函数。

由于在Javascript语言中，只有函数内部的子函数才能读取局部变量，因此可以把闭包简单理解成"定义在一个函数内部的函数"。

所以，在本质上，闭包就是将函数内部和函数外部连接起来的一座桥梁。

> 小白可能更容易理解的闭包概念:
>
> 闭包实际上就是一个能够访问另一个函数作用域中变量的函数。
>
> 如：
>
> ```js
> function f1(){
> var n=999;
> function f2(){
>  alert(n);
> }
> }
> ```
>
> 上述代码中的 f2 即使没有返回出去它也是一个闭包，因为它可以访问到另一个函数（f1）作用域中变量n，要想让闭包真正发挥作用要将 f2 函数作为函数返回值返回出去。
>
> ```js
> function f1(){
> var n=999;
> function f2(){
>  alert(n);
> }
> return f2;
> }
> var result=f1();
> result(); // 999
> ```
>
> 这样在 f1 函数的外部也可以访问到 f1 函数内部的变量 n。
>
> 说到这里下面这一种情况一定要注意：
>
> f2 作为参数传递给给 f1
>
> ```js
> function f1(f2){
> var n=999;
> 	f2();
> }
> var n = 100;
> function f2() {
> alert(n);
> }
> f1(f2);
> ```
>
> 输出结果是 100.
>
> 这个可以从内存的角度去理解，在全局环境下存储着 f1，f2，n 这三个变量。在 f1 中调用 f2 时，f2 是在全局环境下所以会在全局环境中去寻找变量 n，所以最终输出结果是 100.
>
> **可以记住下面一个技巧，当然理解原理才是最重要的**
>
> 函数中用到某个变量进行查找时会沿着作用域链一层一层地向上查找，注意最开始的一层作用域是函数定义的位置而不是函数调用执行的位置。

**四、闭包的用途**

闭包可以用在许多地方。它的最大用处有两个，一个是前面提到的可以读取函数内部的变量，另一个就是让这些变量的值始终保持在内存中。

怎么来理解这句话呢？请看下面的代码。

```js
function f1(){

  var n=999;

  nAdd=function(){n+=1}

  function f2(){
    alert(n);
  }

  return f2;

}

var result=f1();

result(); // 999

nAdd();

result(); // 1000
```

在这段代码中，result实际上就是闭包f2函数。它一共运行了两次，第一次的值是999，第二次的值是1000。这证明了，函数f1中的局部变量n一直保存在内存中，并没有在f1调用后被自动清除。

为什么会这样呢？原因就在于f1是f2的父函数，而f2被赋给了一个全局变量，这导致f2始终在内存中，而f2的存在依赖于f1，因此f1也始终在内存中，不会在调用结束后，被垃圾回收机制（garbage collection）回收。

这段代码中另一个值得注意的地方，就是"nAdd=function(){n+=1}"这一行，首先在nAdd前面没有使用var关键字，因此nAdd是一个全局变量，而不是局部变量。其次，nAdd的值是一个匿名函数（anonymous function），而这个匿名函数本身也是一个闭包，所以nAdd相当于是一个setter，可以在函数外部对函数内部的局部变量进行操作。

**五、使用闭包的注意点**

1）由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大，所以不能滥用闭包，否则会造成网页的性能问题，在IE中可能导致内存泄露。解决方法是，在退出函数之前，将不使用的局部变量全部删除。

2）闭包会在父函数外部，改变父函数内部变量的值。所以，如果你把父函数当作对象（object）使用，把闭包当作它的公用方法（Public Method），把内部变量当作它的私有属性（private value），这时一定要小心，不要随便改变父函数内部变量的值。

**六、思考题**

如果你能理解下面两段代码的运行结果，应该就算理解闭包的运行机制了。

代码片段一。

```js
var name = "The Window";

var object = {
  name : "My Object",
  console.log(this === object)

  getNameFunc : function(){
    return function(){
      return this.name;
    };
  }
};

alert(object.getNameFunc()());
```


代码片段二。

```js
var name = "The Window";

var object = {
  name : "My Object",

  getNameFunc : function(){
    var that = this;
    return function(){
      return that.name;
    };
  }
};

alert(object.getNameFunc()());
```

下面给出我的解答：

在做这两个题之前需要对 this 的指向问题有一个比较清晰的理解，如果不太清楚地可以参考 [图文结合深入理解 JS 中的 this 值]( https://www.cnblogs.com/zhangguicheng/p/12081109.html )。

下面是代码片段一中变量在内存的存储示意图:

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvMjAyMDAxMDgxMDI3MzQucG5n?x-oss-process=image/format,png)

这里主要考察的是 this 是 JS 中的一个关键字和变量不同它不会受作用域的限制，也就是在遇到的 this 时不会像遇到变量时那样沿着作用域链去向上查找。this 的取值取决于当前函数的运行环境。

执行 `object.getNameFunc()` 时实际上是在执行图中的外层匿名函数，由于 getNameFunc 是 object 的一个属性所以在外层匿名函数中 this 指向的是 object，所以 `console.log(this === object) ` 会输出 true。执行 `object.getNameFunc()` 后返回的是内层匿名函数，此时执行 `object.getNameFunc()()` 相当于直接调用内层匿名函数，当一个函数被当做纯函数调用时 this 是指向 window 对象的(上面那篇文章中有介绍)。所以在内层匿名函数中 `console.log(this === window)` 也会输出 true。

明白了这些之后，答案就很清晰了.

在代码片段一中，this.name 中的 this 指向的是 window，所以最终输出结果为 "The Window".

在代码片段二中，this.name 中的 this 是 that 变量，而 that 变量指向的 object，所以最终输出结果为 "My Object".

完，如有不恰当之处欢迎指正哦。