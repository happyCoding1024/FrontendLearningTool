# 使用 WebpackDevServer 实现请求转发

前后端联调时服务器是不同的，在开发过程中前端使用的是后端开发测试的服务器，在真正上线后使用的是线上的服务器，很明显这两个服务器的地址是不同的。

这样的话就会有一个问题，如果向服务端请求数据时使用绝对路径，那么在由开发转到线上时就要去更改使用绝对路径的代码，这样是很不方便的。那么我们可不可以使用相对路径，然后通过一个代理来实现使用相对路径访问的是我们想访问的服务器呢，答案是肯定的。使用 WebpackDevServer 实现请求转发就可以做到。

实现流程：

1. 配置 dev-server

   ```js
   // webpack.config.js
   devServer: {
     ...
     proxy: {
       '/react/api': 'http://www.dell-lee.com'
     }
   }
   ```

   经过上面的配置之后，当在 axios 中请求 `/react/api` 时就相当于请求的是 `http://www.dell-lee.com` 这台服务器。

2. index.js 中请求数据

   ```js
   import axios from 'axios';
   
   axios.get('/react/api/header.json')
     .then((res) => {
     	console.log(res);
   });
   ```

我们实际要访问的绝对路径是 ` http://www.dell-lee.com/react/api/header.json ` ，经过上面的配置之后，遇到 `/react/api` 时就会去请求 `http://www.dell-lee.com` 这台服务器，因此实际访问的地址就是 ` http://www.dell-lee.com/react/api/header.json ` 。

现在有一个问题是如果后端告诉你目前 header.json 暂时不能用，你先用 demo.json 吧，由于header.json 是前后端商量好后在线上时要使用的接口，所以一般不要更改这里的 header.json，可以通过下面的配置来实现路径的重写，只需这样配置 WebpackDevServer :

```js
// webpack.config.js

proxy: {
  '/react/api': {
    target: 'http://www.dell-lee.com',
      pathRewrite: {
        'header.json': 'demo.json'
      }
  },
}
```

这样在请求 header.json 时实际上请求的是 demo.json。

**注意：**

这里配置的 proxy 是 WebpackDevServer 中的，只有在开发环境下才会去使用 WebpackDevServer，是为了方便开发。

真正到了线上，请求 `/react/api/header.json` 就是去请求线上服务器的 `/react/api/header.json`。

在之前开发不使用 webpack 作为打包工具的时候还需要使用 charles 类似的工具，使用 webpack 之后完全可以替代这些软件，而且功能也很强大。

完，如有不恰当指出，欢迎指正哦。