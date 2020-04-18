[TOC]

# ES6标准入门算法

## 1. 尾递归计算阶乘

递归非常耗费内存，因为需要同时保存成百上千个调用帧(所有的 `调用帧` 形成一个 `调用栈`)，很容易发生 “栈溢出” 的错误。

对于尾递归来说，由于只存在一个调用帧，所以不会出现栈溢出的情况。

**常规写法**

最多需要保存 `n` 个调用记录，复杂度为 `O{n}`。

```js
function factorial (n) {
    if (n === 1) return 1;
    return n * factorial(n-1);
}
factorial(5) // 120
```

**尾递归**

只保留一个调用记录，复杂度为 `O(1)`。

```js
function factorial (n, total) {
    if (n === 1) return total;
    return factorial(n-1, n*total);
}
factorial(5, 1); // 120
```

## 2. 尾递归计算 Fibonacci 数列

**常规写法 **

```js
function fibonacci (n) {
    if (n <= 1) return 1;
    return fibonacci(n - 1) + fibonacci(n-2)
}

fibonacci(3); // 3
fibonacci(10); // 89
fibonacci(100); // 堆栈溢出
```

**尾递归**

```js
function fibonacci (n, ad1 = 1, ad2 = 1) {
    if (n <= 1) return ad1;
    return fibonacci(n-1, ad1 + ad2, ad1);
}

fibonacci(3) // 3
fibonacci(10); // 89
fibonacci(100); // 573147844013817200000（不会溢出）
```



