# 聊一聊 webpack 中的 preloading 和 Prefetching

提到 Preloading 和 Prefetching 就不得不先说一下代码分割，通过下面的例子我们来说明为什么需要代码分割？

```js
// index.js
import _ from 'lodash'; // 假设大小为 1 MB

业务代码 // 假设大小为 1 MB
```

- 在首次访问时， index.js 文件的大小为 2 MB，需要加载的大小是 2 MB
- 业务代码改变用户再次访问时，index.js 的大小为 2 MB，需要加载的大小还是 2 MB

现在进行代码分割：

```js
// src/index.js 

业务代码 // 假设大小为 1 MB

// src/lodash.js
import _ from 'lodash';
window._ = _; // 以后在其它文件中使用 _ 就可以使用 lodash 库了。
```

- 首次访问时，index.js 1 MB，lodash.js 1 MB ， 需要加载的大小是 2 MB，而且此时可以进行并行加载，速度一般会比上面的快。

- 业务代码改变用户再次访问时，index.js 1 MB，由于 lodash.js 文件并没有发生变化，所以无需再次加载，因为浏览器的缓存中有，所以此次只需加载 1 MB。

从上面的例子可以看出，代码分割提高了性能，但是第一次访问的时间并没有减少多少，webpack 想让第一次访问的时候也得到很大的优化。

我们先从 webpack 中的 SplitChunkPlugin 的默认配置中找到答案，

```js
optimazition: {
  splitChunks: {
    chunks: 'async', // 异步代码才会进行代码分割
    ...
  }
}
```

我们可以看到，`chunks` 的配置是 `async` ，只有当异步时才会进行代码分割。

webpack 为什么要这样默认设置呢？

还是从下面的例子来说明：

创建一个div元素，并在页面上显示出来。

```js
// index.js
document.addEventListener('click', () => {
  const div = document.createElement('div');
  div.innerHTML = 'hello webpack';
  document.body.appendChild(div);
});
```

思考上面的代码写的有问题吗？还有优化的空间吗？

现在我们将上面的代码打包在浏览器中运行，在浏览器中 按 `Ctrl + Shift + P`  ，然后在弹出的对话框中输入 `coverage` ，点击回车，然后再点击下面的小黑原点，小黑圆点变成红圆点之后，刷新页面，会出现下图所示的页面：

![coverage example](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/coverage示例图.png)

从红色的方框中可以看出当前加载的文件中在当前页面中的利用率为 `74.6%` 。

仔细分析一下上面的代码，在回调函数中的下面三行代码只有在点击页面之后才会有用，因此加载页面时没必要加载它们。

```js
const div = document.createElement('div');
div.innerHTML = 'hello webpack';
document.body.appendChild(div);
```

现在我们换一种写法，将它们异步加载进来，现在新建一个 click 文件：

```js
// click.js
function handleClick() {
  const div = document.createElement('div');
  div.innerHTML = 'hello webpack';
  document.body.appendChild(div);
}

export default handleClick;
```

然后改写 index.js 文件：

```js
document.addEventListener('click', () => {
  import('./click.js').then(({default: func}) => {
    func();
  })
});
```

这时候将异步代码写在一个单独的文件中，只有当点击页面时才会去加载 click.js 这个文件。

现在再看此时的代码利用率为 `75%` 有了一点提升，设想如果异步加载在的代码比较大的话，提升的会比较多。

![改变代码后coverage](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/coverage2.png)



现在我们就看出来 webopack 为什么要使用 `chunks: 'async'` 这样的默认配置了。

webpack 优化的侧重点是代码的使用率而不是缓存，只是使用缓存的方式来优化意义是不大的，通过异步的方式提高代码的利用率才能比较大程度地提高网站的性能。

这也是为什么老提倡写异步代码的原因。

现在又有一个问题，只有当用户点击页面时才会加载 `click.js`这个文件，那么如果这个文件很大，那加载的时间也会很长呀，用户体验也不高呀。

那这个问题应该如何解决呢？

有些小伙伴可能会想，能不能在加载完页面网络空闲的时候先把这些文件加载进来呀，真聪明，这就是接下来要讲的 Preloading 和 Prefetching。

- Prefetching

  使用方法也比较简单，就是在要异步加载的文件前面加上 `/* webpackPrefetch: true */`  这个 magic comment 即可。

  ```js
  document.addEventListener('click', () => {
    import(/* webpackPrefetch: true */ './click.js').then(({default: func}) => {
      func();
    })
  });
  ```

  ![Prefetching](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/Prefetching.png)

  上图中的 0.js 是 click.js 打包之后，可以看出在页面加载完之后的空闲时间还没有点击页面时已经加载了 0.js ，当点击页面时，0.js 直接从缓存中读取，因此耗时非常短。

- Preloading 和 Prefetching 有什么区别？

  两者的最大区别在于，Prefetching 是在核心代码加载完成之后带宽空闲的时候再去加载，而 Preloading 是和核心代码文件一起去加载的。

因此，使用 Prefetching 的方式去加载异步文件更合适一些，不过要注意浏览器的兼容性问题。

完， 如有不恰当之处，欢迎指正哦。

