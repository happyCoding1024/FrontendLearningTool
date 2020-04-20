# 浅析 JS 中的 setTimeout和setInterval

setTimeout 为什么定时时间会不准？因为 JS 是单线程的，执行代码时会有一个任务队列，设置 setTimeout后表示再过多长时间将这个任务添加到任务队列中，如果任务队列中有任务在执行的话那么它只能等待，如果任务队列中没有任务那么它会立即执行。

关于setTimeout和setInterval的面试题

```js
var timer=setTimeout(function(timer){
console.log(timer);
timer+=1;
console.log(timer);
},0)
console.log(timer);
```


请问以上代码输出结果是？

输出结果为 1 undefined NaN

第一个为undefine是因为timer为参数，相当于声明了，但没有赋值，所以为undefined;
第二个为NaN是因为undefined+1不是一个数字，所以显示NaN;
第三个为1，是指定时器的返回值，一般认为是id值，每个定时器都有一个对应的id值，
将这个ID值传递给clearInterval()，clearTimeout() 可以取消定时器的执行；

其实这个是由于setTimeout方法是异步的（js执行本身也是用单线程去执行），在等待过程中，程序会去执行setTimeout方法后边的内容，如果后边的内容没有结束，setTimeout里边的函数执行就会等待。
