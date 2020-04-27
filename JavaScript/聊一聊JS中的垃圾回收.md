# 聊一聊 JS 中的垃圾回收

> 参考文章：
>
> [JavaScript 内存泄漏教程](http://www.ruanyifeng.com/blog/2017/04/memory-leak.html)
>
> [中高级前端必须要了解的——JS中的内存管理]( https://baijiahao.baidu.com/s?id=1642227403103069193&wfr=spider&for=pc )

JS 是一门高级语言，程序员不需要手动分配内存和释放内存。但是了解 JS 中是如何进行垃圾回收还是很必要的。

## 引用计数垃圾回收机制

在 JS 中当一个对象没有被引用时，那么就应该被释放掉了。基于此，我们最开始能想到的可能是，给一个对象的引用进行计数，引用一次就加 1，这个对象的引用减少一次，引用计数就减 1.当引用次数为 0 的时候，这个对象所占的内存就应该被回收了。

上面说的这种方法实际上就是**引用计数**，这也是各大浏览器最开始时使用的内存回收机制，但是由于存在循环引用的问题，现在各大浏览器厂商已经很少有使用引用计数方式的了。

关于循环引用可以参考这篇文章 [简单聊一聊JS中的循环引用及问题](https://www.cnblogs.com/zhangguicheng/p/12173538.html)。

## 标记清除垃圾回收机制

接下来就出现了现在广泛使用的标记清除垃圾回收机制。

之前使用的引用计数的目标是找那些引用次数为 0，不再需要的对象。

标记清除算法假定设置一个叫做根（root）的对象（在Javascript里，根是全局对象）。垃圾回收器将定期从根开始，找所有从根开始引用的对象，然后找这些对象引用的对象……从根开始，垃圾回收器将找到所有可以获得的对象和收集所有不能获得的对象。 

从全局对象能找到的对象说明是有用的，保留这些有用的然后去释放那些找不到的。

实现的流程:

1）垃圾收集器会在运行的时候会给存储在内存中的所有变量都加上标记。

2）从根部出发将能获取到的对象的标记清除。

3）那些还存在标记的变量被视为准备删除的变量。

4）最后垃圾收集器会执行最后一步内存清除的工作，销毁那些带标记的值并回收它们所占用的内存空间。 

**标记清除动态示例图**

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/标记清除动态示例图.gif)

## 内存泄漏

程序的运行需要内存。只要程序提出要求，操作系统或者运行时（runtime）就必须供给内存。

对于持续运行的服务进程（daemon），必须及时释放不再用到的内存。否则，内存占用越来越高，轻则影响系统性能，重则导致进程崩溃。

不再用到的内存，没有及时释放，就叫做内存泄漏（memory leak）。

有些语言（比如 C 语言）必须手动释放内存，程序员负责内存管理。

像下面的几种案例，即使是有垃圾回收机制也是没有作用。

### 常见的内存泄露案例

**意外的全局变量**

```js
function foo() { 
  bar1 = 'some text';
}
```

bar1 实际上是一个全局变量。

**被遗忘的定时器和回调函数**

在很多库中, 如果使用了观察者模式, 都会提供回调方法, 来调用一些回调函数。 要记得回收这些回调函数。举一个 setInterval的例子：

```js
var serverData = loadData();
setInterval(function() { 
  var renderer = document.getElementById('renderer'); 
  if(renderer) { 
    renderer.innerHTML = JSON.stringify(serverData); 
  }
}, 5000); 
```

每 5 秒调用一次复制代码如果后续 renderer 元素被移除，整个定时器实际上没有任何作用。 但如果你没有回收定时器，整个定时器依然有效, 不但定时器无法被内存回收， 定时器函数中的依赖也无法回收。在这个案例中的 serverData 也无法被回收。

**闭包**

在 JS 开发中，我们会经常用到闭包，一个内部函数，有权访问包含其的外部函数中的变量。 下面这种情况下，闭包也会造成内存泄露:

```js
var theThing = null;
var replaceThing = function () { 
  var originalThing = theThing; 
  var unused = function () { 
    if (originalThing) // 对于 'originalThing'的引用 
    console.log("hi"); 
  }; 
  theThing = { 
    longStr: new Array(1000000).join('*'), 
    someMethod: function () { 
      console.log("message"); 
    } 
  };
};
setInterval(replaceThing, 1000);
```

复制代码这段代码，每次调用 replaceThing 时，theThing 获得了包含一个巨大的数组和一个对于新闭包 someMethod 的对象。 同时 unused 是一个引用了 originalThing 的闭包。

这个范例的关键在于，闭包之间是共享作用域的，尽管 unused 可能一直没有被调用，但是 someMethod 可能会被调用，就会导致无法对其内存进行回收。 当这段代码被反复执行时，内存会持续增长。

**DOM 引用**

很多时候, 我们对 Dom 的操作, 会把 Dom 的引用保存在一个数组或者 Map 中。

```js
var elements = { image: document.getElementById('image')};function doStuff() { elements.image.src = 'http://example.com/image_name.png';}function removeImage() { document.body.removeChild(document.getElementById('image')); 
```

这个时候我们对于 #image 仍然有一个引用, Image 元素, 仍然无法被内存回收.}复制代码上述案例中，即使我们对于 image 元素进行了移除，但是仍然有对 image 元素的引用，依然无法对齐进行内存回收。

另外需要注意的一个点是，对于一个 Dom 树的叶子节点的引用。 举个例子: 如果我们引用了一个表格中的td元素，一旦在 Dom 中删除了整个表格，我们直观的觉得内存回收应该回收除了被引用的 td 外的其他元素。 但是事实上，这个 td 元素是整个表格的一个子元素，并保留对于其父元素的引用。 这就会导致对于整个表格，都无法进行内存回收。所以我们要小心处理对于 Dom 元素的引用。

### 使用 WeakMap 减少内存泄漏

前面说过，及时清除引用非常重要。但是，你不可能记得那么多，有时候一疏忽就忘了，所以才有那么多内存泄漏。

最好能有一种方法，在新建引用的时候就声明，哪些引用必须手动清除，哪些引用可以忽略不计，当其他引用消失以后，垃圾回收机制就可以释放内存。这样就能大大减轻程序员的负担，你只要清除主要引用就可以了。

ES6 考虑到了这一点，推出了两种新的数据结构：[WeakSet](http://es6.ruanyifeng.com/#docs/set-map#WeakSet) 和 [WeakMap](http://es6.ruanyifeng.com/#docs/set-map#WeakMap)。它们对于值的引用都是不计入垃圾回收机制的，所以名字里面才会有一个"Weak"，表示这是弱引用。

下面以 WeakMap 为例，看看它是怎么解决内存泄漏的。

> ```javascript
> const wm = new WeakMap();
> 
> const element = document.getElementById('example');
> 
> wm.set(element, 'some information');
> wm.get(element) // "some information"
> ```

上面代码中，先新建一个 Weakmap 实例。然后，将一个 DOM 节点作为键名存入该实例，并将一些附加信息作为键值，一起存放在 WeakMap 里面。这时，WeakMap 里面对`element`的引用就是弱引用，不会被计入垃圾回收机制。

也就是说，DOM 节点对象的引用计数是`1`，而不是`2`。这时，一旦消除对该节点的引用，它占用的内存就会被垃圾回收机制释放。Weakmap 保存的这个键值对，也会自动消失。

基本上，如果你要往对象上添加数据，又不想干扰垃圾回收机制，就可以使用 WeakMap。





