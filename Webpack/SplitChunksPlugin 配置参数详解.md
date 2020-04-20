# SplitChunksPlugin 配置参数详解

代码分割本身和 webpack 没有什么关系，但是由于使用 webpack 可以非常轻松地实现代码分割，所以提到代码分割首先就会想到使用 webopack 实现。

在 webpack 中是使用 [SplitChunksPlugin ](https://webpack.js.org/plugins/split-chunks-plugin/#root)来实现的，由于 `SplitChunksPlugin` 配置参数众多，接下来就来梳理一下这些配置参数。

官网上的默认配置参数如下：

```js
module.exports = {
  //...
  optimization: {
    splitChunks: {
      chunks: 'async', // 代码分割时对异步代码生效，all：所有代码有效，inital：同步代码有效
      minSize: 30000, // 代码分割最小的模块大小，引入的模块大于 30000B 才做代码分割
      maxSize: 0, // 代码分割最大的模块大小，大于这个值要进行代码分割，一般使用默认值
      minChunks: 1, // 引入的次数大于等于1时才进行代码分割
      maxAsyncRequests: 6, // 最大的异步请求数量,也就是同时加载的模块最大模块数量
      maxInitialRequests: 4, // 入口文件做代码分割最多分成 4 个 js 文件
      automaticNameDelimiter: '~', // 文件生成时的连接符
      automaticNameMaxLength: 30, // 自动生成的文件名的最大长度
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/, // 位于node_modules中的模块做代码分割
          priority: -10 // 根据优先级决定打包到哪个组里，例如一个 node_modules 中的模块进行代码
        }, // 分割，，既满足 vendors，又满足 default，那么根据优先级会打包到 vendors 组中。
        default: { // 没有 test 表明所有的模块都能进入 default 组，但是注意它的优先级较低。
          priority: -20, //  根据优先级决定打包到哪个组里,打包到优先级高的组里。
          reuseExistingChunk: true // //如果一个模块已经被打包过了,那么再打包时就忽略这个上模块
        }
      }
    }
  }
};
```

补充几点：

- 在分组中可以人为地规定打包后文件的名字，在 vendor 分组中添加 `filename = "vendor.js"` 之后，在 vendor 分组中打包后文件的名字都是 `vendor.js` 。

- `reuseExistingChunk ` 实例讲解：

  ```js
  // a.js
  import b from './b';
  
  // index.js
  import a from './a';
  import b from './b';
  ```

  在上述代码中，index.js 在执行 `import a from './a'` 时引入 a 模块，由于 a 模块中使用了 b 模块，所以同时也引入了 b 模块。再执行 `import b from './b'` 时，由于 b 模块已经被打包过了，所以就会忽略掉这个 b 模块，这就是 `reuseExistingChunk: true` 的作用。

- 如果想让两个模块打包到一个文件里应该如何实现？

  cacheGroup 就可以实现这个需求，假设有两个模块 module1 和 module2，且都满足 vendor 这个组，那么在进行代码分割时，会先将 module1 放到 CacheGroup 中，然后再将 module2 放到 cacheGroup 中，最后再将两者一起放到 vender 组里生成 vender.js 文件。



完，如有不恰当之处，欢迎指正哦。

