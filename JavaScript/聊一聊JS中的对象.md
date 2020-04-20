[TOC]

# JS中的对象总结(ES5，ES6)

前几天刚把阮一峰老师的《ES6标准入门》大体学习完，刚才把《高程》中关于对象的知识又过了一遍，感觉又有一些收获，今天总结一下 `ES5` 和 `ES6` 中关于`JS` 对象的那些事，和大家一起学习。

## 1. 理解对象

### 1.1 什么是对象

`ECMA-262` 把对象定义为：“无序属性的集合，其属性可以包含基本值，对象或者函数。”

其实我们可以把对象理解成属性(方法也是一种特殊的属性)和值的集合，比如下面这个简单的对象：

```js
const obj = {
    name: "zhangsan",
    age: 18
}
```

`name` 和 `age` 就是 `obj` 这个对象的属性， `"zhangsan"` 和 `18` 就是对应的值。

### 1.2 如何访问对象

对象的属性名可以是合法的标识符也可以是一个字符串，访问对象的属性通常有两种方法

#### 1.2.1 点表示法

面向对象语言中访问对象属性通用的方法，有一点要求就是对象的属性必须是合法的标识符。

> `Js` 中的合法标识符：
>
> 1. 第一个字符必须是一个字母、下划线或一个美元符号;
> 2. 其它字符可以是字母、下划线、美元符号或数字。

```js
const obj = {
    name: "zhangsan",
    1abc: "aaa" // 报错，1abc不是合法的标识符
}

const obj1 = {
    name: "lisi",
    age: 20
}
console.log(obj1.name); // "lisi"
```

#### 1.2.2 方括号

利用方括号访问对象属性时既可以访问标识符命名的对象属性也可以访问字符串命名的对象属性。

```js
const obj = {
    name: "wangwu",
    "1abc": "aaa"
}

console.log(obj["name"]); // "wangwu"
console.log(obj["1abc"]); // "aaa"
```

## 2. 创建对象

关于对象的创建，从单个对象的创建和多个对象的创建两个角度来分析对 `JS` 中对象的创建。

### 2.1. 单个对象的创建

单个对象的创建主要有两种方法：

#### 2.1.1. 对象字面量

就像下面的这种形式一样，很简单。

```js
const person = {
    name: "zhaosi",
    age: 18
}
```

#### 2.1.2. 使用new 操作符后跟 `Object` 构造函数

Object 实际上是一个构造函数，前面加一个 `new` 操作符也可以创建一个对象，下面的代码产生的结果和上面利用对象字面量的方式产生的结果是一样的。

```js
const person = new Object(); // 创建一个person对象
person.name = "zhaosi"; // 为person对象添加name属性
person.age = 18;
```

### 2.2 多个对象的创建

如果现在需要创建很多个对象，那么利用上面的方法，每创建一个对象都要写很多代码，而且这些代码很多都是重复的，下面介绍几种创建多个对象是一般要用到的方法。

#### 2.2.1 工厂模式

这种模式抽象了创建具体对象的过程，说白了就是创建了一个能够生成对象的函数，每运行一次这个函数就生成一个对象。

```js
function createPerson(name, age) {
    let obj = new Object();
    obj.name = name;
    obj.age = age;
    return obj;
}

-- 下面创建两个对象
const person1 = createPerson("zhangsan", 18);
const person2 = createPerson("lisi", 20);
```

通过上面的代码可以看出想创建出一个 `person` 对象，只需要调用一次 `createPerson` 函数并传入相应的参数即可，不需要写大量的重复代码。

**弊端：** 无法完成对象识别，也就是不知道生成的对象的类型，所有生成的对象的类型都是 `Object`。

```js
console.log(person1 instanceOf Object); // true
console.log(person2 instanceOf Object); // true
```

#### 2.2.2 构造函数模式

为了解决工厂模式中不能进行对象识别的问题，产生了构造函数模式。构造函数模式其实就是自己创建一个构造函数，构造函数和普通函数没有什么区别，被 `new` 操作符调用就是构造函数，也可以当做普通函数调用。

```js
function Person(name, age) {
    this.name = name;
    this.age = age;
}

const person = new Person("zhangsan", 18);
-- person是Person的实例
console.log(person instanceOf Person) // true
```

使用构造函数时会用到 `new` 操作符，接下来结合上面的代码对 `new` 操作符做一些简要的说明

使用 `new` 操作符时会经历一下四个步骤：

1. 创建一个新对象(创建person对象)
2. 将构造函数的作用域赋给新对象，此时this指向新创建的person对象
3. 执行构造函数中的代码(为person对象添加name和age属性)
4. 返回新对象(返回新创建的person对象)

使用构造函数时还会用到 `this` 关键字，之前总结过，在这里不再赘述，可以参考这篇博文[聊一聊JS中奇妙的this值]( https://blog.csdn.net/qq_43199318/article/details/102730961 )。

在上面的代码中，我们可以看到 `console.log(person instanceOf Person)` 输出 `true` 说明利用构造函数创建出来的对象能够识别出对象的类型。















