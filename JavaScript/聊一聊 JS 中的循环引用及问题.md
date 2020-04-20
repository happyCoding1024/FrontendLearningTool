# 聊一聊 JS 中的循环引用

本文主要从 JS 中为什么会出现循环引用，垃圾回收策略中引用计数为什么有很大的问题，以及循环引用时的对象在使用 JSON.stringify 时为什么会报错，怎样解决这个问题简单谈谈自己的一些理解。

## 1. 什么是循环引用

当对象 1 中的某个属性指向对象 2，对象 2 中的某个属性指向对象 1 就会出现循环引用，（当然不止这一种情况，不过原理是一样的）下面通过代码和内存示意图来说明一下。

```js
function circularReference() {
  let obj1 = {
	};
	let obj2 = {
 	 b: obj1
	};
	obj1.a = obj2;
}
```

上述代码在内存中的示意图

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvMjAyMDAxMDkyMDA3MzgucG5n?x-oss-process=image/format,png)

从上图可以看出 obj1 中的 a 属性引用 obj2，obj2 中的 b 属性引用 obj1，这样就构成了循环引用。

## 2. JS 中引用计数垃圾回收策略的问题

先简单讲一下 JS 中引用垃圾回收策略大体是什么样的一个原理，当一个变量被赋予一个引用类型的值时，这个引用类型的值的引用计数加 1。就像是代码中的 obj1 这个变量被赋予了 obj1 这个对象的地址，obj1 这个变量就指向了这个 obj1(右上)这个对象，obj1(右上)的引用计数就会加1.当变量 obj1的值不再是 obj1(右上)这个对象的地址时，obj1(右上)这个对象的引用计数就会减1.当这个 obj1（右上）对象的引用计数变成 0 后，垃圾收集器就会将其回收，因为此时没有变量指向你，也就没办法使用你了。

看似很合理的垃圾回收策略为什么会有问题呢？

就是上面讲到的循环引用导致的，下面来分析一下。当 obj1 这个变量执行 obj1 这个对象时，obj1 这个对象的引用计数会加 1，此时引用计数值为 1，接下来 obj2 的 b 属性又指向了 obj1 这个对象，所以此时 obj1 这个对象的引用计数为 2。同理 obj2 这个对象的引用计数也为2.

当代码执行完后，会将变量 obj1 和 obj2 赋值为 null，但是此时 obj1 和 obj2 这两个对象的引用计数都为1，并不为 0，所以并不会进行垃圾回收，但是这两个对象已经没有作用了，在函数外部也不可能使用到它们，所以这就造成了内存泄露。

在现在广泛采用的标记清除回收策略中就不会出现上面的问题，标记清除回收策略的大致流程是这样的，最开始的时候将所有的变量加上标记，当执行 cycularReference 函数的时候会将函数内部的变量这些标记清除，在函数执行完后再加上标记。这些被清除标记又被加上标记的变量就被视为将要删除的变量，原因是这些函数中的变量已经无法被访问到了。像上述代码中的 obj1 和 obj2 这两个变量在刚开始时有标记，进入函数后被清除标记，然后函数执行完后又被加上标记被视为将要清除的变量，因此不会出现引用计数中出现的问题，因为标记清除并不会关心引用的次数是多少。

## 3. 循环引用的对象使用 JSON.stringify 为什么会报错

`JSON.stringify` 用于将一个 JS 对象序列化为一个 JSON 字符串，假设现在我们要将 obj1 这个对象序列化为 JSON 字符串，现在我们先将 obj1 这个对象打印出来看一下。

```js
function circularReference() {
  let obj1 = {
	};
	let obj2 = {
 	 b: obj1
	};
	obj1.a = obj2;
  console.log(obj1);
}
circularReference();
```

结果如下所示：

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvMjAyMDAxMDkyMDI5NTUucG5n?x-oss-process=image/format,png)

obj1 这个对象和 obj2 会无限相互引用，JSON.tostringify 无法将一个无限引用的对象序列化为 JOSN 字符串。

下面是 MDN 的解释：

> JSON.stringify() 将值转换为相应的JSON格式：
>
> - 转换值如果有 toJSON() 方法，该方法定义什么值将被序列化。
> - 非数组对象的属性不能保证以特定的顺序出现在序列化后的字符串中。
> - 布尔值、数字、字符串的包装对象在序列化过程中会自动转换成对应的原始值。
> - `undefined`、任意的函数以及 symbol 值，在序列化过程中会被忽略（出现在非数组对象的属性值中时）或者被转换成 `null`（出现在数组中时）。函数、undefined 被单独转换时，会返回 undefined，如`JSON.stringify(function(){})` or `JSON.stringify(undefined)`.
> - **对包含循环引用的对象（对象之间相互引用，形成无限循环）执行此方法，会抛出错误。**
> - 所有以 symbol 为属性键的属性都会被完全忽略掉，即便 `replacer` 参数中强制指定包含了它们。
> - Date 日期调用了 toJSON() 将其转换为了 string 字符串（同Date.toISOString()），因此会被当做字符串处理。
> - NaN 和 Infinity 格式的数值及 null 都会被当做 null。
> - 其他类型的对象，包括 Map/Set/WeakMap/WeakSet，仅会序列化可枚举的属性。

我们可以从加粗的字体中看到，对包含循环引用的对象执行 JSON.stringify，会抛出错误。

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvSlNPTi5zdHJpbmdpZnklRTYlOEElQTUlRTklOTQlOTkucG5n?x-oss-process=image/format,png)

**解决方法**

一个自然的想法能不能消除循环引用，一个 [JSON 扩展包]( https://github.com/douglascrockford/JSON-js ) 做到了这一点， 使用 JSON.decycle 可以去除循环引用。为了方便测试我直接在 JSON 扩展包的 Github 仓库中下载了 cycle.js 这个函数，将下面这段代码赋值到最下面，然后利用 node 运行进行测试，问题得到解决，结果如下图所示。

```js
function circularReference() {

  let obj1 = {
  };
  let obj2 = {
    b: obj1
  };
  obj1.a = obj2;
  let c = JSON.decycle(obj1);
  console.log(JSON.stringify(c));
}
circularReference();
```
运行结果
![消除循环引用.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvMjAyMDAxMDklRTYlQjYlODglRTklOTklQTQlRTUlQkUlQUElRTclOEUlQUYlRTUlQkMlOTUlRTclOTQlQTgucG5n?x-oss-process=image/format,png)

完，如有不恰当之处，欢迎指正哦。