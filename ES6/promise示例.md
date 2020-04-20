## Promise 示例

通过不同的方式读取在 files 文件夹下的三个文件来引出 promise，files 文件夹有三个文件 a.json，b.json，c.json。

```js
// a.json
{
  "content": "this is a.json",
  "next": "b.json"
}
// b.json
{
  "content": "this is b.json",
  "next": "c.json"
}
// c.json
{
  "content": "this is c.json",
  "next": null
}
```

现在要依次读取这三个文件，并且 b.json 的文件名要通过 a.json 文件中的 next 属性获得，c.json 的文件名要通过 b.json 的文件名获得。

首先我们先来看一下读取文件时输出内容的格式

```js
const fs = require('fs')
const path = require('path')

// 回调函数且不封装为函数的方式
  const fullFileName = path.resolve(__dirname, 'files', 'a.json')
  fs.readFile(fullFileName, (err, data) => {
    console.log(data)
  })
```

从文件中直接读取出来的是二进制的形式

**data 是二进制形式**

![data二进制形式](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200331121551.png)

**data 转换为字符串**

```js
console.log(data.toString());
```

![data转换为字符串](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200331121743.png)

**data 转换为对象**

```js
console.log（JSON.parse(data.toString());
```

![data转换为对象](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200331122006.png)

现在我们用最符合人思维方式的写法来一次读取三个文件的内容。

```js
// 回调函数且不封装为函数的方式
const fullFileName = path.resolve(__dirname, 'files', 'a.json')
// 读取a.json
fs.readFile(fullFileName, (err, data) => {
  console.log(JSON.parse(data.toString()))
  const fileName = JSON.parse(data.toString()).next
  const fullFileName = path.resolve(__dirname, 'files', fileName)
  // 从a.json中获得b.json文件名，然后读取b.json
  fs.readFile(fullFileName, (err, data) => {
    console.log(JSON.parse(data.toString()))
    const fileName = JSON.parse(data.toString()).next
    const fullFileName = path.resolve(__dirname, 'files', fileName)
    // 从b.json中获取c.json文件名，然后读取c.json
    fs.readFile(fullFileName, (err, data) => {
      console.log(JSON.parse(data.toString()))
    })
  })
})
```

读取结果：

​											![promise示例1](https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_200331093355promise示例1.png) 

上面这样写代码复用性很低，我们可以考虑将读取文件内容封装为一个函数，这样每次读取文件内容时直接调用那个函数就可以了。

```js
// 将读取文件内容封装成一个函数
function readFileContent(fileName) {
  fs.readFile(fileName, (err, data) => {
    console.log(JSON.parse(data.toString()))
  })
}
// 读取a.json的内容
const fullFileName = path.resolve(__dirname, 'files', 'a.json')
readFileContent(fullFileName)
```

读取结果：

![promise示例2](https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_200331094854promise示例2.png)

如果我们想要完成连续读取三个文件，并且下一个文件的文件名来自上一个文件，上面封装的函数显然是不能满足要求的。

上面回调函数的内容是 `console.log(JSON.parse(data.toString()))`，这样写死的显然不能再读取下一个文件，如果我们将 `readFileContent` 的第二个参数变成一个函数，然后在回调函数中调用执行，那么在这个函数中我们就可以再次读取下一个文件。

```js
// 封装连续读取文件的函数
function readFileContent(fileName, callback) {
  const fullFileName = path.resolve(__dirname, 'files', fileName)
  fs.readFile(fullFileName, (err, data) => {
    // 这里使用callback时需要传递一个参数，那么定义的callback函数也有一个参数
    callback(JSON.parse(data.toString()))
  })
}

const fileName = 'a.json'
readFileContent(fileName, aData => {
  console.log(aData);
  // 获取b.json的名称
  const fileName = aData.next;
  // 读取b.json
  readFileContent(fileName, bData => {
    console.log(bData)
    // 获取c.json的名称
    const fileName = bData.next
    // 读取c.json
    readFileContent(fileName, cData => {
      console.log(cData)
    })
  })
})
```

像上面这样写如果需要读取的文件继续增多，那么回调函数就会一直增加下去，呈现金字塔的形状，函数中间嵌套着函数，导致代码可读性较低，这也就是经常说的回调地狱。

> 关于回调地狱推荐这篇博文，讲的很清楚，[回调地狱]( https://www.cnblogs.com/zhangguicheng/articles/12607894.html )。

解决回调地狱一种比较常用的方法就是使用 promise，关于 promise 的知识在这里就不多说了，现在利用 promise 读取一个文件的内容。

```js
const promise = new Promise((resolve, reject) => {
  const fullFileName = path.resolve(__dirname, 'files', 'a.json');
  fs.readFile(fullFileName, (err, data) => {
    if (err) {
      reject(err)
    } else {
      resolve(data)
    }
  })
})

promise.then((data) => {
  console.log(JSON.parse(data.toString()))
}, (err) => {
  console.log(err)
})
```

读取结果

![promise示例2](https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_200331094854promise示例2.png)

这样写很显然不能完成多个文件的读取，我们现在也考虑将其封装为一个函数，如果让这个函数返回一个 promise 那么调用一次就返回一个 promise，这样就可以多次读取文件了。

```js
// 封装函数利用promise读取三个文件的内容
function readFileContent(fileName) {
  const fullFileName = path.resolve(__dirname, 'files', fileName)
  return new Promise((resolve, reject) => {
    fs.readFile(fullFileName, (err, data) => {
      if (err) {
        reject(err)
      } else {
        resolve(data)
      }
    })
  })
}

const fileName = 'a.json'
readFileContent(fileName).then((data) => {
  console.log(JSON.parse(data.toString()));
  const fileName = JSON.parse(data.toString()).next;
  return readFileContent(fileName)
}).then((data) => {
  console.log(JSON.parse(data.toString()));
  const fileName = JSON.parse(data.toString()).next;
  return readFileContent(fileName)
}).then((data) => {
  console.log(JSON.parse(data.toString()));
}) 
```

读取结果：

![promise示例4](https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_200331094854promise示例2.png)

重点在于第19行和23行的代码，当在 then 中返回一个新的 promise 时，下一个 then 中的 data 就是这个新的 promise 中 resolve(data) 的参数 data，then 响应的是这个新的 promise。

可以看到当使用 promise 时，不会再出现函数嵌套的情况了，每个 then 都是一个异步操作，条理也比较清晰，因此 promise 也作为一种解决回调地狱比较常见的方式，解决回调地狱更多的方法可以参考上面推荐的那篇博客。

完，如有不恰当之处，还望告知，感谢。