[TOC]

# 函数的扩展

## 1. 函数参数的默认值

### 1.1 基本用法

ES5不能给函数参数设置默认值，ES6中可以通过下面的方式给函数参数设置默认值。

```js
function f(x = 1, y = 0) {
    console.log(x,y);
}
f(); // 1 0
```

注意参数变量是默认声明的，不能再次声明。

```js
function f(x = 1, y = 0) {
 	let x = 1; // 报错
    console.log(x,y);
}
```

### 1.2 与解构赋值默认值结合使用

参数默认值可以与解构赋值的默认值结合起来使用。

```js
function fetch (url, {method = 'GET' } = {}) {
    console.log(method);
} 

fetch('https://example.com'); // "GET"
```

`{method = "GET"}` 是函数参数， `{}` 是函数参数的默认值， `'GET'` 是解构赋值的默认值。

当传递的参数是 `'https://example.com'` 时，`url='https://example.com'` ，`{method = 'GET'} = {}` 此时`method` 使用默认值 `'GET'` 。

