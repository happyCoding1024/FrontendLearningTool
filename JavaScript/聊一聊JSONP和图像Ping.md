## JSONP

在讲 JSONP 之前需要再来回顾一下在页面上使用 script  引入外部的 js 文件时到底引入了什么？

先建立一个 index.js 文件。

```js
console.log(123)
```

再建立一个 index.html 文件。

```html
<!DOCTYPE html>
<html lang='en'>
  <head>
    <meta charset='utf-8'>
    <title>JSONP</title>
  </head>
  <body>
    <script src='index.js'></script>
  </body>
</html>
```

上面的 

```html
<script src='index.js'></script>
```

等价于

```js
<script>
	console.log(123)  
</script>
```

现在再来看 JSONP 就比较好理解了。

假设我现在需要向 www.abc.com 上请求一个资源 asset。我需要先创建一个 script 标签令其 src 等于这个源来访问这个资源

```html
<script src= 'http://www.abc.com/?dataName=asset&callback=handleResponse'></script>
```

根据上面的举例我们知道 script 返回的就是一段 JS 代码，那么服务器在接收到我们的请求时，如果给我们返回一段 JS 代码，这段代码可以是一个函数执行的代码，而且函数的参数可以就是我们请求的资源。

例如上面的 `handleResponse` 函数在本地的定义如下：

```js
handleResponse(asset) {
  console.log('从服务端得到的资源 asset 为', asset)
}
```

服务端给我们返回的 JS 代码如下：

```js
handleResponse(asset)
```

在script 标签就相当于

```html
<sctript>
  handleResponse(asset)
</sctript>
```

`handleResponse` 在本地又有定义，服务端的资源 asset 也通过函数参数的形式传递下来了。

由于 asset 的形式往往是 JSON 的格式，所以这种跨域的方式被称为 JSONP。

JSONP 由两部分构成，

- 参数（JSON格式，就是服务端需要传递给客户端的数据

- 回调函数

  名字要和浏览器端代码中定义的名字相同，在上面的例子中浏览器端定义的是 `handleResponse`，在服务端返回的函数名字也应该是 `handleResponse`，只有这样在浏览器端接收到后才能进行调用。

## 图像 Ping

我们知道使用 script 标签返回的是一段 JS 代码，请问下面这段代码返回的是什么。

```html
<img src='http://www.abc.com/?dataName=img1'>
```

往往返回的是一张图片，因此浏览器端是没有办法接收到服务端的返回值的。

虽然它不像 JSONP 使用那么广泛，但是还是有一定的用武之地的。

例如用于统计某个广告的点击次数，创建一个 img 标签，然后绑定一个 click 事件，当点击图片时给 `img.src` 赋值，这个时候就会向 `'http://www.abc.com/count'` 发送请求，服务端在接收到这个请求之后就可以令点击次数加 1. 

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
</head>
<body>
  <script>
    const img = document.createElement('img')
    img.onclick = function () {
      img.src='http://www.abc.com/count'
    }
    document.appendChild(img)
  </script>
</body>
</html>
```

注意这个例子并不严谨，这里主要是说明统计点击某个广告次数的思路，使用图像 Ping 是可以实现的。

