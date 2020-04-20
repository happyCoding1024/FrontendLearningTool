# 如何创建一个前端组件并发布到npm上

> 原文链接： https://www.cnblogs.com/thinkingthigh/p/11603962.html 
>
> 注：
>
> 1） package.json 中的 main 属性设置的文件是用户使用 import 时所要执行的文件，这个文件要导出我们想要发布的组件，而且还要是经过压缩后的，所以这个文件是打包后的 bundle.js 文件。在开发过程中使用 webapck-dev-server 开发时，需要将这个组件渲染出来，所以需要一个 index.js 文件导入这个组件然后再通过 ReactDOM 将这个组件渲染出来，所以在 webpack.dev.config.js 中设置的入口文件是 index.js。在 webpack.prod.config.js 中的入口文件是 keyboardnavigation.js.
>
> 在 package.json 中设置的入口文件是 import 时执行的文件，在 webpack 配置文件中设置的入口文件是执行 npm run .. 命令时要执行的文件。
>
> 2）使用 npm publish 时必须使用的是官方的网址，不能使用淘宝镜像。
>
> 设置官方网址： npm config set registry https://registry.npmjs.org/
>
> 设置淘宝镜像：npm config set registry https://registry.npm.taobao.org

首先npm文档摆在这里：

https://www.npmjs.cn/

参考组件
https://github.com/rakuten-rex/rex-dropdown
https://www.npmjs.com/package/react-slot

“造轮子”是非常有效的学习方法。在熟练掌握API的搬运方法之后，我们可以通过自己“造轮子”来进一步掌握和理解更底层的知识。自己完成一个组件的开发之后，我们可以打包上传到 NPM 来分享自己的成果。在后面的步骤中，将会实现以下几个小目标：

1. 配置开发环境
2. 开发组件
3. 打包组件，并在测试项目中引入打包组件模块，验证组件功能
4. 发布到 NPM

### 初始化

开始一个最基本的 React 工程，我们至少需要以下几项配置：

- React: 用于开发组件
- React dom: 渲染组件
- Babel: 用于转义 JSX
- webpack: 打包组件

我在这个例子里面做了一个叫做 react-tiny-autosuggest 的组件。首先创建 project 并且初始化。

```bash
mkdir react-tiny-autosuggest
cd react-tiny-autosuggest
npm init -y
```

这里我们需要改动三个地方：

- **main: 这里是我们组件的入口文件。开发者在 import 我们的组件的时候会引入这里 export 的内容**
- files: 申明将要发布到 npm 的文件。如果省略掉这一项，所有文件包括源代码会被一起上传到 npm
- scripts: 申明命令行可用的各种指令。

```cpp
// package.json
    
...
"main": "dist/bundle.js",
"files": ["dist"],
"scripts": {
    "start": "webpack-dev-server --config webpack.dev.config.js",
    "dev": "webpack-dev-server --config webpack.dev.config.js",
    "build": "webpack --config webpack.prod.config.js"
  },
...
```

接下来安装依赖

```java
npm i react react-dom
npm i -D  babel-loader @babel/core @babel/preset-env @babel/preset-react webpack webpack-dev-server webpack-cli html-webpack-plugin webpack-node-externals css-loader style-loader 
```

依赖版本的升级很快，所以如果读者发现依赖有问题，请参考官方文档正确安装。这篇文章最开始写于2018年初，到年之后更新的时候，好几个依赖都经过大更新了。

接下来配置 webpack。这里分成两份配置，一份用于开发环境(development)，一份用于单独打包组件用于生产环境(production)。

在开发环境下，我们需要搭建一个完整的项目，让我们可以开发组件，并可以将其引入其他组件，渲染到浏览器中看到效果。同时我们也需要一些开发工具的支持，比如 HMR（hot module reloa） 组件热更新和详细的报错信息。

在生产环境下，只需要打包组件本身，不包括工程里面的其他组件。同时我们需要压缩文件体积，尽量减小组件打包之后的体积。

### Webpack 配置

下面是我们的 webpack 开发配置

```tsx
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.cm\.styl$/,
        loader: 'style-loader!css-loader?modules&camelCase&localIdentName=[local]-[hash:base64:5]!stylus-loader'
      }
    ]
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new htmlWebpackPlugin({
      template: 'public/index.html'
    })
  ],
};
```

production 打包配置，区别是改变了 entry，因为我们只需要单独的组件，并且改变了 libraryTarget，这个配置项的默认参数是 'var'，我们需要改成 commonjs2，这样可以通过模块系统引入这个组件。另一点区别是使用了 nodeExternals 使得打包的组件中不包括任何 node_modules 里面的第三方组件，起到减小体积的作用。

```tsx
const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: './src/autosuggest.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist'),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.cm\.styl$/,
        loader: 'style-loader!css-loader?modules&camelCase&localIdentName=[local]-[hash:base64:5]!stylus-loader'
      }
    ]
  },
  externals: [nodeExternals()]
};
```

在 package.json 中，我们可以通过 --config 指定 webpack 使用哪一套配置。在这个 demo 里使用了 stylus 来写样式文档，所以添加了相应的 css pre-processor，把 stylus 语法 转化为 css 语法。并且在引入 css 的时候使用了模块化 css 以避免全局命名冲突。

### .babelrc

```json
{
  "presets": ["@babel/preset-env", "@babel/preset-react"]
}
```

## 开发组件

完成以上配置以后，我们可以在 src 文件夹里面开发自己组件。运行 npm run dev，让 webpack-dev-server 渲染到浏览器中，实时看到效果。

## 打包并验证

打包组件，只需要运行 npm run build 就可以了。
接下来可以通过 `npm link` 把打包之后的组件引入到 global node_modules 中，然后在验证 demo 中再通过 `npm link react-tiny-autosuggest` 引入这个组件，并验证是否符合预期。

```bash
// At development directory
npm run build
npm link

cd [test project folder]
npm link react-tiny-autosuggest
```

接下下 demo 里面就可以直接 `import AutoSuggest from 'react-tiny-autosuggest'`了。

## 发布到 NPM

发布组件到 npm: `npm publish`

取消发布: `npm unpublish`

更行版本: 更改 package.json 里面的版本号并重新发布

用心写代码，不辜负程序员之名