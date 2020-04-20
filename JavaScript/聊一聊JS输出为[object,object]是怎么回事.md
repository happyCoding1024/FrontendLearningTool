#### 聊一聊JS输出为[object object]

今天在学习ES6中的 `Symbol` 数据类型时，在写demo时控制台输出为 `Symbol[object object]` ，当时有点疑惑，查阅了相关资料后搞清楚了其中的原因。

在解释之前，由于有些小伙伴可能还没有接触过ES6，所以先说一下上面用到的ES6的一些特性：

---

> - const: 声明一个常量
>
> - Symbol：JS中的第7种数据类型，表示独一无二的值。Symbol类型的值有Symbol函数生成。
>
>     如 `var s1 = Symbol("abc");` // 生成Symbol类型的值`s=Symbol(abc)` 这个值是独一无二的。
>
>     `var s2 = Symbol("abc");` // `s2 = Symbol(abc)` 
>
>     `console.log(s1 === s2)` // false, 说明这两个值是不相等的  
>
> - 如果 Symbol 的参数是一个对象，那么就会调用 `toString()` 方法先将其转换为字符串。
>
> - 关于 Symbol 更详细的介绍可以参考阮一峰老师的[ES6标准入门](http://es6.ruanyifeng.com/ )。

---

现在上那段输出 `Symbol[object object]` 的代码：

```js
const obj = {
    f() {
        return "abc";
    }
};

const sym = Symbol(obj);
console.log(sym); // Symbol[object object]
```

由于 `obj` 是一个对象，所以会调用 `toString()` 方法将其转换为字符串，对  `toString` 方法不太了解的小伙伴可以查看下面MDN的解释：

---

> - 除了`null`和`undefined`之外，其他的类型(数值、布尔、字符串、对象)都有`toString()`方法，它返回相应值的字符串表现(并不修改原变量)。
> - 每个对象都有一个`toString()`方法。
> - 当该对象被表示为一个文本值时，或者一个对象以预期的字符串方式引用时自动调用。
> - **默认情况下，`toString()`方法被每个`Object`对象继承。如果此方法在自定义对象中未被覆盖，`toString()`返回 "`[object type]`"，其中`type`是对象的类型。**

---

`obj`是我们自定义的对象，而且 `toString()` 方法也没有被覆盖，所以会返回 `[object object]`。

现在我们尝试覆盖 `toString()` 方法，如下面的代码所示：

```js
// ES5写法
var obj = {
    toString: function() {
        return "abc";
    }
};

// ES6写法
const obj = {
    toString() {
        return "abc";
    }
};

const sym = Symbol(obj);
console.log(sym); // Symbol(abc)
```

当我们覆盖掉 `toString()` 方法之后，自定义对象 `obj` 在调用 `toString()` 方法的时候调用的就是我们自定义的  `toString()` 方法， 输出为 `"abc"` 。因此最终的结果为 `Symbol(abc)`。



完

如有不恰当之处欢迎指正哦。