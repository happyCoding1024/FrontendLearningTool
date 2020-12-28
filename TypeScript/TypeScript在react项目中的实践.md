# TypeScript在react项目中的实践

> 原文链接： http://www.imooc.com/article/71712 

前段时间有写过一个[TypeScript在node项目中的实践](https://www.imooc.com/article/45594)。
在里边有解释了为什么要使用`TS`，以及在`Node`中的一个项目结构是怎样的。
但是那仅仅是一个纯接口项目，碰巧赶上近期的另一个项目重构也由我来主持，经过上次的实践以后，尝到了`TS`所带来的甜头，毫不犹豫的选择用`TS`+`React`来重构这个项目。
这次的重构不仅包括`Node`的重构（之前是`Express`的项目），同时还包括前端的重构（之前是由`jQuery`驱动的多页应用）。

**项目结构**

因为目前项目是没有做前后分离的打算的（一个内部工具平台类的项目），所以大致结构就是基于上次`Node`项目的结构，在其之上添加了一些`FrontEnd`的目录结构：

```diff
  .
  ├── README.md
  ├── copy-static-assets.ts
  ├── nodemon.json
  ├── package.json
+ ├── client-dist
+ │   ├── bundle.js
+ │   ├── bundle.js.map
+ │   ├── logo.png
+ │   └── vendors.dll.js
  ├── dist
  ├── src
  │   ├── config
  │   ├── controllers
  │   ├── entity
  │   ├── models
  │   ├── middleware
  │   ├── public
  │   ├── app.ts
  │   ├── server.ts
  │   ├── types
+ │   ├── common
  │   └── utils
+ ├── client-src
+ │   ├── components
+ │   │   └── Header.tsx
+ │   ├── conf
+ │   │   └── host.ts
+ │   ├── dist
+ │   ├── utils
+ │   ├── index.ejs
+ │   ├── index.tsx
+ │   ├── webpack
+ │   ├── package.json
+ │   └── tsconfig.json
+ ├── views
+ │   └── index.ejs
  ├── tsconfig.json
  └── tslint.json
```

其中标绿（也可能是一个`+`号显示）的文件为本次新增的。
其中`client-dist`与`views`都是通过`webpack`生成的，实际的源码文件都在`client-src`下。*就这个结构拆分前后分离其实没有什么成本*
在下边分了大概这样的一些文件夹：

|    dir/file     | desc                                                         |
| :-------------: | :----------------------------------------------------------- |
|   `index.ejs`   | 项目的入口`html`文件，采用`ejs`作为渲染引擎                  |
|   `index.tsx`   | 项目的入口`js`文件，后缀使用`tsx`，原因有二：<br/>1. 我们会使用`ts`进行`React`程序的开发 <br/>2. `.tsx`文件在vs code上的`icon`比较好看 :p |
| `tsconfig.json` | 是用于`tsc`编译执行的一些配置文件                            |
|  `components`   | 组件存放的目录                                               |
|    `config`     | 各种配置项存放的位置，类似请求接口的`host`或者各种状态的`map`映射之类的（可以理解为枚举对象们都在这里） |
|     `utils`     | 一些公共函数存放的位置，各种可复用的代码都应该放在这里       |
|     `dist`      | 各种静态资源的存放位置，图片之类文件                         |
|    `webpack`    | 里边存放了各种环境的`webpack`脚本命令以及`dll`的生成         |

**前后端复用代码的一个尝试**

实际上边还漏掉了一个新增的文件夹，我们在`src`目录下新增了一个`common`目录，这个目录是存放一些公共的函数和公共的`config`，不同于`utils`或者`config`的是，这里的代码是前后端共享的，所以这里边的函数一定要是完全的不包含任何环境依赖，不包含任何业务逻辑的。

类似的数字千分位，日期格式化，抑或是服务监听的端口号，这些不包含任何逻辑，也对环境没有强依赖的代码，我们都可以放在这里。
这也是没有做前后分离带来的一个小甜头吧，前后可以共享一部分代码。

要实现这样的配置，基于上述项目需要修改如下几处：

1. `src`下的`utils`和`config`部分代码迁移到`common`文件夹下，主要是用于区分是否可前后通用
2. 为了将对之前`node`结构方面的影响降至最低，我们需要在`common`文件夹下新增一个`index.ts`索引文件，并在`utils/index.ts`下引用它，这样对于`node`方面使用来讲，并不需要关心这个文件是来自`utils`还是`common`

```javascript
// src/common/utils/comma.ts
export default (num: number): string => String(num).replace(/\B(?=(\d{3})+$)/g, ',')

// src/common/utils/index.ts
export { default as comma } from './comma'

// src/utils.index.ts
export * from '../common/utils'

// src/app.ts
import { comma } from './utils' // 并不需要关心是来自common还是来自utils

console.log(comma(1234567)) // 1,234,567
```

1. 然后是配置`webpack`的`alias`属性，用于`webpack`能够正确的找到其路径

```javascript
// client-src/webpack/base.js
module.exports = {
  resolve: {
    alias: {
       '@Common': path.resolve(__dirname, '../../src/common'),
    }
  }
}
```

1. 同时我们还需要配置`tsconfig.json`用于`vs code`可以找到对应的目录，不然会在编辑器中提示`can't find module XXX`

```javascript
// client-src/tsconfig.json
{
  "compilerOptions": {
    "paths": {
      // 用于引入某个`module`
      "@Common/*": [
        "../src/common/*"
      ]
    }
  }
}
```

1. 最后在`client-src/utils/index.ts`写上类似`server`端的处理就可以了

```javascript
// client-src/utils/index.ts
export * from '@Common/utils'

// client-src/index.tsx
import { comma } from './utils'

console.log(comma(1234567)) // 1,234,567
```

**环境的搭建**

*如果使用`vs code`进行开发，而且使用了`ESLint`的话，需要修改`TS`语法支持的后缀，添加`typescriptreact`的一些处理，这样才会自动修复一些`ESLint`的规则：*

```javascript
"eslint.validate": [
  "javascript",
  "javascriptreact",
  {
    "language": "typescript",
    "autoFix": true
  },
  {
    "language": "typescriptreact",
    "autoFix": true
  }
]
```

### webpack的配置

因为在前端使用了`React`，按照目前的主流，`webpack`肯定是必不可少的。
并没有选择成熟的`cra`([create-react-app](https://www.npmjs.com/package/create-react-app))来进行环境搭建，原因有下：

1. `webpack`更新到4以后并没有尝试过，想自己耍一耍
2. 结合着`TS`以及公司内部的东西，会有一些自定义配置情况的出现，担心二次开发太繁琐

但是其实也没有太多的配置，本次重构选用的UI框架为Google Material的实现：[material-ui](https://material-ui.com/)
而他们采用的是[jss](http://cssinjs.org/) 来进行样式的编写，所以也不会涉及到之前惯用的`scss`的那一套`loader`了。

`webpack`分了大概如下几个文件：

|    file     | desc                                                         |
| :---------: | :----------------------------------------------------------- |
| `common.js` | 公共的`webpack`配置，类似`env`之类的选项                     |
|  `dll.js`   | 用于将一些不会修改的第三方库进行提前打包，加快开发时编译效率 |
|  `base.js`  | 可以理解为是`webpack`的基础配置文件，通用的`loader`以及`plugins`在这里 |
|  `pro.js`   | 生产环境的特殊配置（代码压缩、资源上传）                     |
|  `dev.js`   | 开发环境的特殊配置（`source-map`）                           |

`dll`是一个很早之前的套路了，大概需要修改这么几处：

1. 创建一个单独的`webpack`文件，用于生成`dll`文件
2. 在普通的`webpack`文件中进行引用生成的`dll`文件

```javascript
// dll.js
{
  entry: {
    // 需要提前打包的库
    vendors: [
      'react',
      'react-dom',
      'react-router-dom',
      'babel-polyfill',
    ],
  },
  output: {
    filename: 'vendors.dll.js',
    path: path.resolve(__dirname, '../../client-dist'),
    // 输出时不要少了这个option
    library: 'vendors_lib',
  },
  plugins: [
    new webpack.DllPlugin({
      context: __dirname,
      // 向外抛出的`vendors.dll.js`代码的具体映射，引用`dll`文件的时候通过它来做映射关系的
      path: path.join(__dirname, '../dist/vendors-manifest.json'),
      name: 'vendors_lib',
    })
  ]
}

// base.js
{
  plugins: [
    new webpack.DllReferencePlugin({
      context: __dirname,
      manifest: require('../dist/vendors-manifest.json'),
    }),
  ]
}
```

这样在`watch`文件时，打包就会跳过`verdors`中存在的那些包了。
**有一点要注意的，如果最终需要上传这些静态资源，记得连带着`verdors.dll.js`一并上传**

在本地开发时，`vendors`文件并不会自动注入到`html`模版中去，所以我们有用到了另一个插件，[add-asset-html-webpack-plugin](https://www.npmjs.com/package/add-asset-html-webpack-plugin)。
同时在使用中可能还会遇到`webpack`无限次数的重新打包，这个需要配置`ignore`来解决-.-：

```javascript
// dev.js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin')

{
  plugins: [
    // 将`ejs`模版文件放到目标文件夹，并注入入口`js`文件
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.ejs'),
      filename: path.resolve(__dirname, '../../views/index.ejs'),
    }),
    // 将`vendors`文件注入到`ejs`模版中
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, '../../client-dist/vendors.dll.js'),
      includeSourcemap: false,
    }),
    // 忽略`ejs`和`js`的文件变化，避免`webpack`无限重新打包的问题
    new webpack.WatchIgnorePlugin([
      /\.ejs$/,
      /\.js$/,
    ]),
  ]
}
```

### TypeScript相关的配置

`TS`的配置分了两块，一个是`webpack`的配置，另一个是`tsconfig`的配置。

首先是`webpack`，针对`ts`、`tsx`文件我们使用了两个`loader`：

```javascript
{
  rules: [
    {
      test: /\.tsx?$/,
      use: ['babel-loader', 'ts-loader'],
      exclude: /node_modules/,
    }
  ],
  resolve: {
    // 一定不要忘记配置ts tsx后缀
    extensions: ['.tsx', '.ts', '.js'],
  }
}
```

`ts-loader`用于将`TS`的一些特性转换为`JS`兼容的语法，然后执行`babel`进行处理`react/jsx`相关的代码，最终生成可执行的`JS`代码。

然后是`tsconfig`的配置，`ts-loader`的执行是依托于这里的配置的，大致的配置如下：

```javascript
{
  "compilerOptions": {
    "module": "esnext",
    "target": "es6",
    "allowSyntheticDefaultImports": true,
    // import的相对起始路径
    "baseUrl": ".",
    "sourceMap": true,
    // 构建输出目录，但因为使用了`webpack`，所以这个配置并没有什么卵用
    "outDir": "../client-dist",
    // 开启`JSX`模式, 
    // `preserve`的配置让`tsc`不会去处理它，而是使用后续的`babel-loader`进行处理
    "jsx": "preserve", 
    "strict": true,
    "moduleResolution": "node",
    // 开启装饰器的使用
    "experimentalDecorators": true,
    "emitDecoratorMetadata": true,
    // `vs code`所需要的，在开发时找到对应的路径，真实的引用是在`webpack`中配置的`alias`
    "paths": {
      "@Common": [
        "../src/common"
      ],
      "@Common/*": [
        "../src/common/*"
      ]
    }
  },
  "exclude": [
    "node_modules"
  ]
}
```

### ESLint的配置

最近这段时间，我们团队基于`airbnb`的`ESLint`规则进行了一些自定义，创建了自家的[eslint-config-blued](https://www.npmjs.com/package/eslint-config-blued)
同时还存在了[react](https://www.npmjs.com/package/eslint-config-blued-react)和[typescript](https://www.npmjs.com/package/eslint-config-blued-typescript)的两个衍生版本。

关于`ESLint`的配置文件`.eslintrc`，在本项目中存在两份。一个是根目录的`blued-typescript`，另一个是`client-src`下的`blued-react` + `blued-typescript`。
因为根目录的更多用于`node`项目，所以没必要把`react`什么的依赖也装进来。

```yaml
# .eslintrc
extends: blued-typescript

# client-src/.eslintrc
extends: 
  - blued-react
  - blued-typescript
```

**一个需要注意的小细节**
因为我们的`react`与`typescript`实现版本中都用到了`parser`。
`react`使用的是[babel-eslint](https://www.npmjs.com/package/babel-eslint)，`typescript`使用的是[typescript-eslint-parser](https://www.npmjs.com/package/typescript-eslint-parser)。
但是`parser`只能有一个，从`option`的命名中就可以看出`extends`、`plugins`、`rules`，到了`parser`就没有复数了。
所以这两个插件在`extends`中的顺序就变得很关键，`babel`现在并不能理解`TS`的语法，但好像`babel`开发者有支持`TS`的[意愿](https://github.com/babel/babel-eslint/issues/505)。
但就目前来说，一定要保证`react`在前，`typescript`在后，这样`parser`才会使用`typescript-eslint-parser`来进行覆盖。

### node层的修改

除了上边提到的两端公用代码以外，还需要添加一个`controller`用于吐页面，因为使用的是`routing-controllers`这个库，渲染一个静态页面被封装的非常棒，仅仅需要修改两个页面，一个用于设置`render`模版的根目录，另一个用来设置要吐出来的模版名称：

```javascript
// controller/index.ts
import {
  Get,
  Controller,
  Render,
} from 'routing-controllers'

@Controller('/')
export default class {
  @Get('/')
  @Render('index') // 指定一个模版的名字
  async router() {
    // 渲染页面时的一些变量
    // 类似之前的 ctx.state = XXX
    return {
      title: 'First TypeScript React App',
    }
  }
}

// app.ts
import koaViews from 'koa-views'

// 添加模版所在的目录
// 以及使用的渲染引擎、文件后缀
app.use(koaViews(path.join(__dirname, '../views'), {
  options: {
    ext: 'ejs',
  },
  extension: 'ejs',
}))
```

*如果是多个页面，那就创建多个用来`Render`的`ts`文件就好了*

#### 深坑，注意

目前的`routing-controller`对于`Koa`的支持还不是很好，（原作者对`Koa`并不是很了解，导致`Render`对应的接口被请求一次以后，后续所有的其他的接口都会直接返回该模版文件，原因是在负责模版渲染的`URL`触发时，本应返回数据，但是目前的处理却是添加了一个中间件到`Koa`中，所以任何请求都会将该模版文件作为数据来返回）所以`@Render`并不能适用于`Koa`驱动。
不过我已经提交了[PR](https://github.com/typestack/routing-controllers/pull/434)了，跑通了测试用例，坐等被合并代码，但是这是一个临时的修改方案，涉及到这个库针对外部中间件注册的顺序问题，所以对于`app.ts`还要有额外的修改才能够实现。

```javascript
// app.ts 的修改
import 'reflect-metadata'
import Koa from 'koa'
import koaViews from 'koa-views'
import { useKoaServer } from 'routing-controllers'
import { distPath } from './config'

// 手动创建koa实例，然后添加`render`的中间件，确保`ctx.render`方法会在请求的头部就被添加进去
const koa = new Koa()

koa.use(koaViews(path.join(__dirname, '../views'), {
  options: {
    ext: 'ejs',
  },
  extension: 'ejs',
}))

// 使用`useKoaServer`而不是`createKoaServer`
const app = useKoaServer(koa, {
  controllers: [`${__dirname}/controllers/**/*{.js,.ts}`],
})

// 后续的逻辑就都一样了
export default app
```

当然，这个是新版发出以后的逻辑了，基于现有的结构也可以绕过去，但是就不能使用`@Render`装饰器了，抛开`koa-views`直接使用内部的[consolidate](https://github.com/tj/consolidate.js)：

```javascript
// controller/index.ts
// 这个修改不需要改动`app.ts`，可以直接使用`createKoaServer`
import {
  Get,
  Controller,
} from 'routing-controllers'
import cons from 'consolidate'
import path from 'path'

@Controller()
export default class {
  @Get('/')
  async router() {
    // 直接在接口返回时获取模版渲染后的数据
    return cons.ejs(path.resolve(__dirname, '../../views/index.ejs'), {
      title: 'Example For TypeScript React App',
    })
  }
}
```

*目前的示例代码采用的上边的方案*

**小结**

至此，一个完整的TS前后端项目架构就已经搭建完成了（剩下的任务就是往骨架里边填代码了）。
我已经更新了之前的[typescript-exmaple](https://github.com/Jiasm/typescript-example) 在里边添加了本次重构所使用的一些前端`TS`+`React`的示例，还包括针对`@Render`的一些兼容。

`TypeScript`是一个很棒的想法，解决了N多`javaScript`种令人诟病的问题。
使用静态语言来进行开发不仅能够提高开发的效率，同时还能降低错误出现的几率。
结合着强大的`vs code`，Enjoy it.

如果在使用`TS`的过程中有什么问题、或者有什么更好的想法，欢迎来沟通讨论。