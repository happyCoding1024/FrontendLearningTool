# 聊一聊 Vue 中 watch 对象中的回调函数为什么不能是箭头函数

> 本文重点知识点速览：
>
> - Vue 中的 watch 对象中的回调函数不能是箭头函数。
> - 箭头函数中的 this 指向的是函数定义时所在的对象，普通函数中的 this 指向的是函数运行时所在的对象。
> - 函数的 this 指向问题。
>
> 一起学习吧...

说起箭头函数大家一定不陌生，箭头函数是 ES6 中对函数的扩展，使用起来方便快捷，可能有些小伙伴对箭头函数不是特别了解，所以在这里先举个例子吧。

```js
// 普通函数定义
function add(a, b) {
	return a + b;
}

// 箭头函数等价定义
const add = (a, b) => {
  return a + b;
}

// 普通匿名函数
fucntion() {
  console.log('hello');
} 

// 箭头函数等价定义
() => {
  console.log('hello');
}
```

箭头函数在定义回调函数中使用的非常多，但是在 Vue 中的 watch 对象的回调函数中就不能使用回调函数，先看下面的例子：

代码有一点长，简单说明一下就不用看所有的代码了，下面代码实现的是实现监视数据 a 和 b 的变化，当其中一个改变时执行相应的回调函数求a与b的和，重点在 23-30 行。

下面的代码中 watch 中回调函数是普通的函数，我们知道 **对于普通函数，函数中的this指向函数运行时所在的对象。**

所以，当我们在浏览器中改变a的值时(例如在浏览器的控制台输入 vm.a = 10)，代码 23 行打印出来的是一个 Vue 对象(即代码 14行新创建出来的vm实例)，因为此时 代码 22 行的 function 函数运行在 vm 对象中，此时页面会发生变化，由原来的 3 变为 12.

```js
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Vue中的watch</title>
  <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
</head>
<body>
  <div id="app">
    {{sum}}
  </div>

  <script>
    var vm = new Vue({
      el: "#app",
      data: {
       	a: 1,
        b: 2,
        sum: 3
      },
      watch: {
        a: function() {
 					console.log(this);
          this.sum = this.a + this.b;
        },
        b: function() {
          this.sum = this.a + this.b;
        }
      }
    })
  </script>

</body>
</html>
```

我们再来看一下用箭头函数当做 watch 的回调函数的情况，把代码21-29行换成如下的代码即可：

```js
watch: {
  a: () => {
    console.log(this);
    this.sum = this.a + this.b;
  },
    b: () => {
      this.sum = this.a + this.b;
    }
}
```

当我们这时候再在浏览器的控制台改变 a 的值时(比如 在控制台输入 vm.a = 10),会发现打印出来的是 window 对象，所以页面的内容也不会发生变化。

JS 代码分为 预解析阶段和执行阶段，在预解析阶段遇到函数声明会提前进行预解析，此时下面代码中的箭头函数会在全局定义，因为 `var vm = new Vue({...})` 这句代码在预解析阶段还没有被执行。当到了执行阶段并且在控制台改变 a 的值后，watch 中的下面代码中的箭头函数开始执行，此时的运行环境确实是新创建的 vm 对象。但是对于箭头函数来说，**箭头函数中的 this 指向的是定义时的对象而不是函数运行时所在的对象，**这一点与普通函数有很大的区别。

```js
  a: () => {
    console.log(this);
    this.sum = this.a + this.b;
  }
```

如果对于 this 的指向问题如果还不是很清楚可以参考下面的两篇博客：

- [图文结合深入理解JS中的this值]( https://blog.csdn.net/qq_43199318/article/details/102749323 )

- [深入理解this原理(JavaScript)](https://blog.csdn.net/qq_43199318/article/details/102505861)

完

欢迎指正







