[TOC]

# webpack4.0 学习笔记

> 注：
>
> 1）`webpack` 是一个模块打包工具。
>
> 2）业务代码发生改变之后注意一定要重新打包才会起作用。（有了 3.8 节介绍的三种方法之后就没有这个问题了）
>
> 3）webpack 等配置文件发生改变时一定要重新打包才能够生效。
>
> 4）只要想建一个利用npm管理包的项目，第一件事二话不说先来一个 `npm init -y`，运行完之后会生成一个 `package.json` 文件。
>
> 5）在 packages.json dependencies 中的依赖包，利用 npm install 可以进行自动安装。
>
> 6）在 webpack 中 loader 用来告诉 webapck 遇到这种类型的文件时如何进行打包，plugin 是一些插件可以使得打包过程变得简单，便捷，presets 一般用来做代码的转换，例如 @babel/preset-env，@babel/preset-react 等。

## 1. 为什么要学webapck

**为什么要学`webpack`？ `webpack` 有什么作用？**

由于项目一般比较大，为了项目的可维护性和可扩展性，我们一般需要把代码分成好多个模块，但是一个大型的项目模块有特别多甚至有几千个，我们不可能通过手工引入这几千个模块，需要借助工具来管理我们的模块，`webpack` 就是一个这样的工具。

类似 `webpack` 的工具还有 `Gulp， browserify`，最火的是 `webpack`，目前三大框架都在使用 `webpack` 作为脚手架工具。

**`webpack` 和其它脚手架工具相比有哪些优势？**

- Tree Shaking

- 懒加载

- 代码分割

- ......

  

## 2. webpack 初探

### 2-1 webpack 究竟是什么？

> 总结： 使得浏览器认识 import 语句了，webpack 是一个模块打包工具。

没有 webpack 之前浏览器不认识 import 语句，引入 js 文件时需要利用 script 标签的形式在 html 文件中引入，这种做法有很多弊端，比如代码不利于维护，而且会显得 html 文件比较乱。

有了 webpack 之后，浏览器可以识别 import 语句了，所以有些 js 文件可以在某个 js 文件中通过 import 的方式进行引入，而不需要在 HTML 文件中引入了。

经过这节课的学习之后会认为 webpack 是一个 js 的翻译器，实际上是不对的，因为 webpack 只是翻译 import 其它的语法它做不到翻译。

**其实根据在 webpack 中做的一些配置来理解 webpack 到底是什么还是比较好理解的。webpack 首先要做的就是对输入的各种类型的文件进行一些转换，例如将 ES6 的代码转换为 ES5 的代码，其次就是根据代码中各个模块之间的导入导出规则来打包实现代码中所写的依赖关系。（这个再总结一下根据打包配置来说一来比较好说，二来可以显示出你是用过 webpack 的。）**

### 2-2 什么是模块打包工具？

**Bundler： 模块打包工具**

**怎样理解模块打包工具呢？**

从字面意义上就是可以将一些模块( js 文件)在一个 js 文件中引入，也就是将一些模块打包到一个 js 文件中，即模块打包工具。

通常我们在 react 或者 Vue 中使用的 import 属于 ES Module 规范，对于 node 采用的 CommonJS 模块引入规范，还有 CMD，ADM 模块引入规范都是有效的。‘

除此之外，webpack 还可以打包 css 文件等。

### 2-3 搭建 webpack 环境

1. 创建一个项目，进入到这个项目中，运行 `npm init ` 如果想直接使用默认配置可以加上 `-y` 参数，即 `npm init -y` 。

   **为什么要运行 npm init ？** 

   和 git init 结合起来理解，如果不执行这条语句，接下来的操作不知道按照哪个规范来执行，执行完 npm init 之后就可以按照 npm 规范来管理这个项目了，由于 npm 是 node 开发的，也就是按照 node 的规范来管理这个项目。

2. 全局安装 webpack(不推荐使用，因为有可能有webpak3的项目)

   `npm install webpack webpack-cli -g`

   卸载全局安装的 webpack。

   `npm uninstall webpack webpack-cli -g`

   **在某个项目中安装 webpack：**

   - 进入到那个项目中所在的目录，然后

   ```bash
   # --save-dev 表示 webpack和webpack-cli不会被打包线上环境中，只在开发环境中使用。这是合理的，因为线上环境需要的是webpack打包后的文件并不需要webpack这个工具了。
   npm install webpack webpack-cli -save-dev
   # 等价于
   npm install webpack webpack-cli -D
   
   # 自动安装依赖包
   npm install
   
   # 查看版本
   webpack -v
   ```


这时候会出现 `bash: webpack: command not found`，原因就在于运行 webpack 时系统会去找全局的 webpack 。

但是我们可以通过 

   ```bash
npx webpack 
   ```

这种形式来运行 webpack 命令， `npx` 会帮助我们去找当前项目下的 webpack 命令(在 node_modules 中就有)。

**安装特定版本的 webpack 。**

- 查看某个版本是否存在

  ```bash
  # 显示 webpack 现在可用的所有版本号，想查看其它的将 webpack 替换掉即可
  npm info webpack
  ```

- 安装特定版本的 webpack

  ```bash
  npm install webpack@3.12.0 webpack-cli -D
  ```

### 2-4 使用 webpack 的配置文件

> 使用 webpack 的配置文件可以在项目下新建 webpack.config.js 文件，对 webpack 进行配置。

如果没有 webpack.config.js 文件，那么在没有人为指定入口文件时，运行 `npx webpack` 会报错，因为 webpack 并不知道将哪一个文件作为入口文件。

当有 webpack.config.js 文件，在运行 `npx webpack` 时，webpack 会去查看webpack.config.js 文件的配置信息，找到其中的入口文件等信息，并按照其中的配置进行打包。

```js
const path = require('path');

module.exports = {
  // 打包的模式,，默认的模式是 production，还有一种是 development 模式，该模式下生成的输出文件不会被压缩。
  mode: 'production',
  // 入口文件也就是要打包的文件
  entry: {
    main: './src/index.js',
  },
  // 打包好文件的信息
  output: {
    filename: 'bundle.js',
    // 不能直接写相对路径，必须借助node中的path模块
    path: path.resolve(__dirname, 'dist'),
  }
};
```

> 注意：
>
> - output 中的 path 不能写相对路径只能利用 node 提供的 path 模块将其转换为绝对路径。
> - 在定义 entry 时就算是相同的的目录下，`./` 也一定要写上，如果不写 webpack 会提示找不到入口文件。

在默认情况下，webpack 只会将 webpack.config.js 作为配置文件，如果想指定某个文件作为 webpack 的配置文件可以使用下面这条命令。

```bash
npx webpack --config 配置文件名
```

**修改 webpack 打包的指令：**

> 项目下的 package.json 文件中的 scripts 定义了一些常用命令的简化形式。

```js
"scripts": {
  // 注意在这里写 webpack 时，会先在本项目下找是否有 webpack，而并不会直接就去找全局的 webpack
  "bundle": "webpack"
}
```

经过上面的修改之后，以后就可以利用 `npm run bundle` 命令来替代 `npx webpack` 命令。

### 2.5 浅谈 webpack 打包知识点

运行打包命令后的输出内容：

```js
Hash: 0071acf88b3dabc88234 // 此次打包独一无二的哈希值
Version: webpack 4.41.3
Time: 133ms
Built at: 2019-12-18 4:19:29 PM
// Chunks：存放的是输出文件的id值，在大型项目中输出文件不止一个，里面还会存放与之相关联的输出文件的id值。
// Chunks Name：和Chunks同理，只是里面存放的是名字，名字的来源就是entry中的属性名。
    Asset      Size  Chunks             Chunk Names
bundle.js  1.29 KiB       0  [emitted]  main
Entrypoint main = bundle.js
[0] ./src/index.js + 3 modules 707 bytes {0} [built]
    | ./src/index.js 140 bytes [built]
    | ./src/header.js 185 bytes [built]
    | ./src/sidebar.js 191 bytes [built]
    | ./src/content.js 191 bytes [built]
```



## 3. webpack 的核心概念

### 3.1 什么是 Loader？

**loader 其实就是一个打包方案，由于 webpack  只能识别出 js 文件，本身只能对 js 文件进行打包，当遇到其它类型的文件时，loader 的作用就是告诉 webpack 针对这种类型的文件应该如何去进行打包。**

**以后只要遇到打包的文件不是 js 文件，第一要想到的就是需要引入相应的 loader 了。**

```js
// index.js
const App = require('./App.js');
const JSPng = require('./JS.jpg');
console.log(JSPng);

```

现在有一张图片需要打包，如果不引入相应的 loader 那么 webpack 就会报错。现在我们引入 `file-loader` 对图片进行打包，需要先安装 file-loader，配置文件修改如下。

```js
// 安装 fileloader
npm install file-loader
// webpack.config.js
const path = require('path');
module.exports = {
	mode: 'development',
	entry: {
		main: './src/index.js'
	},
	module: {
		rules: [{
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'file-loader',
			}
		}]
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	}
};

```

打包的信息如下：

```bash
Hash: a6218893dcb1a8e0e3e6
Version: webpack 4.42.0
Time: 985ms
Built at: 2020-03-22 10:01:15 PM
                               Asset      Size  Chunks             Chunk Names
2b65174ed9bfd3d62c292c8f2d3171ab.jpg    19 KiB          [emitted]
                           bundle.js  4.63 KiB    main  [emitted]  main
Entrypoint main = bundle.js
[./src/App.js] 20 bytes {main} [built]
[./src/JS.jpg] 80 bytes {main} [built]
[./src/index.js] 88 bytes {main} [built]


```

`console.log(JSPng)` 的结果是 `Object [Module] { default: '2b65174ed9bfd3d62c292c8f2d3171ab.jpg' }`

**当使用 file-loader 打包图片文件时，实际上它帮我们做了两件事，首先它先将图片移动到配置文件指定的目录下，然后将图片的url返回给 JSPng 变量。**

```js
const img = new Image();
img.src = JSPng; 
const root = document.getElementById('root');
root.append(img);

```

那张图片会被显示在页面上。

### 3.2 使用 loader 打包静态资源（图片篇）

主要介绍了 `file-loader` 和 `url-loader` 这两种方式来打包图片资源。

**`url-loader` 是将一个图片转换为 base64 字符串的形式，这个字符串解析完后就是这张图片，img 标签的 src 属性的值是 base64 字符串，因此不用发起http请求就可以将图片展示出来。但是问题是如果图片很大，那么这个js文件就非常大，那么请求这个js文件过来再加载出来这张图片的时间会很长。**

**所以，对于 `url-loader` 最合理的使用方法是在配置 webpack 时使用 limit 属性，当图片小于 limit 时，就按 `url-loader` 将图片转换为 base64 字符串的方式进行加载，如果大于 limit 就按 `file-loader` 将图片的 url 赋值给 img 的 src 属性的方式进行加载，但时候请求图片时需要发送 http 请求。**

在处理大于 limit 的图片时可以说 `url-loader` 和 `file-loader` 是一模一样的，所以就没必要用 file-loader 了。

`url-loader` webpack 配置：

```js
module: {
  rules: [{
    test: /\.(jpg|png|gif)$/,
    use: {
      loader: 'url-loader',
      options: {
        // 设置打包后文件的名称，[name]指打包后文件的名字是原文件的名字，[ext]指原文件的后缀,[hash]打包后文件名字上加一个hash值
        name: '[name]_[hash].[ext]',
        // 将文件打包到指定的目录，它的上一级路径是output中设置的输出路径
        outputPath: './images/',
        // 设定文件的大小，如果小于limit的值就按url-loader的方式去处理
        // 如果大于 limit 的值那么就会按 file-loader 的方式去处理。
        // 单位为字节(B)
        limit: 20480,
      }
    }
  }]
}

```

当图片小于设置的 limit 时会将图片转换为 base64 字符串，将 base64 字符串传递给 img.src 也可以在页面上显示出来。

### 3.3 使用 loader 打包静态资源(样式篇上)

**css 文件的打包：**

style-loader 和 css-loader 配合使用，css-loader 通过 css 文件之间的引用关系(例如使用@import语法在一个 css 文件中引入另一个css 文件)负责将 css 内容整合起来，style-loader 将整合好的 css 内容挂载到 html 文件 head 中的 style 上。由于挂载到了 style 上，因此页面上的所有标签都可以访问这些样式，这也说明了 css 样式没有局部作用域的概念。这一部分可以参考 [聊一聊React中的CSS样式方案]()这篇文章。

webpack.config.js

```js
module: {
		rules: [{
			test: /\.(jpg|png|gif)$/,
			use: {
				loader: 'url-loader',
				options: {
					name: '[name].[ext]',
					outputPath: './images',
					limit: 10240
				}
			}
		}, {
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}]
	},

```

需要注意的一点是当遇到一种文件类型需要用到多个 loader 时，use 的值就应该是一个数组，而不是一个对象了。如果需要给某个 loader 加上 option 可以将相应的 loader 写成对象的形式。

```js
{
  test: /\.css$/,
  use: [
    'style-loader',
    {
      loader: 'css-loader',
      option: {
        importLoaders: 2 
      }
    }
  ]
}

```

**sass 文件的打包：**

需要安装 `sass-loader` 和 `node-sass` 这两个 loader。

在配置文件中 style-loader , css-loader, sass-loader 结合使用。

**在 webpack 中使用 loader 的顺序是从下往上，从右到左。**

```js
module: {
  rules: [{
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader', 
      'sass-loader'
    ]
  }

```

因此，sass-loader 先将 sass 文件转换成 css 文件，css-loader 将 css 文件根据引用关系将 css 内容整合起来，进而交给  style-loader 将样式挂载到 head 中的 style 标签上。

**为什么要加厂商前缀**

 在标准还未确定时，部分浏览器已经根据最初草案实现了部分功能，为了与之后确定下来的标准进行兼容，所以每种浏览器使用了自己的私有前缀与标准进行区分，当标准确立后，各大浏览器将逐步支持不带前缀的[css3](https://www.baidu.com/s?wd=css3&tn=SE_PcZhidaonwhc_ngpagmjz&rsv_dl=gh_pc_zhidao)新属性

目前已有很多私有前缀可以不写了，但为了兼容老版本的浏览器，可以仍沿用私有前缀和标准方法，逐渐过渡 。

对于 css3 一些新增加的标签我们一般会加上厂商前缀， `postcss-loader` 会自动帮我们加上厂商前缀。

**CSS3 属性自动添加厂商前缀方法：**

> [postcss-loader官网]( https://webpack.js.org/loaders/postcss-loader/#root )

- 安装 postcss-loader。

  ```js
  npm i -D postcss-loader
  ```
  
- 创建 postcss.config.js 文件，做一些配置。

  使用 autoprefixer 插件，安装 autoprefixer， `npm install autoprefixer -D`

  ```js
  // postcss.config.js 
  module.exports = {
  	plugins: [
  		require('autoprefixer')({
        browsers: ['last 10 versions','Firefox >= 20','Android >= 4.0','iOS >= 8']
      })
  	]	
  }
  ```

### 3.4 使用 loader 打包静态资源(样式篇下)

此时的 webpack 的配置文件如下：

```js
module: {
  rules: [{
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader',
      'postcss-loader',
  ]}
}            

```

当在 `index.js ` 中引入 `index.scss` 文件后 webpack 的打包过程是这样的：

从下往上，先是利用 post-loader 进行打包，紧接着是 sass-loader，依次向上。

现在有个问题是：

如果在 `index.scss` 中又引入了一个 scss 文件，即 `@import blockChain.scss` ，在对 index.scss 进行打包时，webpack 到了 css-loader 这一步，然后遇到 blockChain.scss 也需要打包，那么这时候只能从 css-loader 进行打包，而不会从下面的 postcss-loader 进行打包。

那么怎样解决这个问题呢？

对 css-loader 进行配置：

上面的 webpack 配置文件修改为：

```js
module: {
  rules: [{
    test: /\.scss$/,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
       	option: {
          importLoaders: 2
        }
      },
      'sass-loader',
      'postcss-loader',
  ]}
}     

```

`importLoaders: 2` 的含义是在遇到 `.scss` 文件时，再重新执行下面的两个 loader。 

**`import './index.scss' `和 `import style from './index.scss' 有什么区别？`**

前者是全局引入，页面上的所有标签都可以使用引入的样式。

后者是 CSS Modules，引入了样式局部作用域的概念，只在当前的组件中有用。

想要在 webpack 中配置 CSS Modules 需要在 css-loader 的 option 中配置 `modules: true`。

```js
{
  loader: 'css-loader',
  option: {
   importLoaders: 2,
   // 模块化的 css，默认值为 false
   modules: true
  }
}

```

通过 `import './index.scss'`引入的样式在整个模块中都会起作用，引入的样式是全局的。比如在 index.js 中引入 index.scss 之后，在 index.js 文件中还引入了 createBlockChain.js 文件，那么在 createBlockChain.js 文件中 index.scss 的样式也会起作用。

在 index.js 中 `import style from './index.scss'` ，只会在 index.js 中起作用，而且只能通过 `style.` 的形式来使用样式。

> 参考文章：[聊一聊React中的CSS样式方案]()

**如何打包并使用字体图标？**

字体图标的获取就不再详述了，[阿里图标库](https://www.iconfont.cn/?spm=a313x.7781069.1998910419.d4d0a486a)。

- 解压下载下来的字体图标文件

- 将 `.eot, .ttf, .svg, .woff` 文件复制粘贴到 `src/font` 文件夹下

- 将 `iconfont.css` 文件的内容复制粘贴到 `index.scss` 文件中。

- 修改 `index.scss` 文件，主要是里面的一些路径不对。

- `index.scss` 中最下面的类名就是字体图标，将 html 元素的 class 赋值为 index.scss 的类名之后就可以使用相应的字体图标了。

  ```js
  import './index.scss';
  const root = document.getElementById('root');
  root.innerHTML = '<div class="iconfont icon-dengpao">abc</div>';
  
  ```

- 使用 `file-loader` 对 `eot, ttf, svg, woff` 文件进行打包，对应的 webpack 配置文件如下：

  ```js
   {
     test: /\.(eot|ttf|svg|woff)$/,
     use: {
       loader: 'file-loader',
     }
  }
  
  ```

### 3.5 使用 plugins 让打包更便捷

> plugin 可以在 webpack 运行到某个时刻的时候，去做一些事情，这一点类似于 React 和 Vue 中的生命周期函数，既然类似于函数，那么在 webpack 配置文件中，plugin 需要首先被引入，在配置的时候需要 new Pluginin（）生成一个对象，其实仔细观察后会发现 webpack 中返回的都是对象，所以要实例化一个对象。
>
> 从 plugin 类似于函数这一点要理解和loader配置时的区别。
>
> 例如 html-webpack-plugin 这个插件就会在 webpack 打包结束的时刻，生成一个 index.html 文件。

**html-webpack-plugin 的作用？**

当我们把 dist 目录删除后，直接执行 `npm run bundle` 后在 dist 中并不会生成新的 index.html 文件，必须手动新建一个 index.html 文件。

使用 html-webpack-plugin 之后，再进行打包，在 dist 目录下就会自动生成一个新的 index.html 文件，并把打包生成的 js 自动引入到这个 HTML 文件中。

```js
<script type="text/javascript" src="bundle.js"></script>

```

在 webpack 配置文件中使用 html-webpack-plugin 时可以配置生成的 html 文件的模板，那么在 html-webpack-plugin 生成 html 文件时就会在这个模板文件的基础上再通过 script 标签引入生成的打包文件。

> 这样以后我们只需要提供相应的模板文件，不再需要关心打包文件的引入了，html-webpack-plugin 会自动结合两者帮我们生成最终的 index.html 文件。

---

**html-webpack-plugin 的使用流程**

1. 安装相应的 html-webpack-plugin。

2. 在 webpack 的配置文件中引入html-webpack-plugin，如

   ```js
   // webpack.config.js
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   ```
   
3. 在 webpack 的配置文件中使用 html-webpack-plugin，并配置生成 html 文件时的模板文件。

   ```js
   modules: {
     ...
   },
   plugins: [new HtmlWebpackPlugin({
     template: './src/index.html'
   })],
   output: {
     ...
   }
   
   ```

**clean-webpack-plugin 有什么作用？**

在生成打包文件的目录中，如果下一次生成的打包文件的名字变了，那么之前生成的打包文件还是存在的，这样有可能会导致一些问题。

**clean-webpack-plugin 脚本可以在这次打包之前删除上一次的打包文件。**

你可以在 dist 目录下自己人为建一个 `1.js`，使用这个插件之后会发现再次打包之后这个文件就不见了。

使用流程和 html-webpack-plugin 是一样的，只是注意新版的 clean-webpack-plugin 在webpack 的设置方式上发生了变化，参考博客 [clean-webpack-plugin 升级踩坑](https://blog.csdn.net/qq_43199318/article/details/103614731)。

### 3.6 Entry 和 Output 的基础配置

Entry 配置：

```js
entry: {
  // 要打包的文件是 index.js，打包后文件的名字是 main.js（如果output中filename的值没有设置那么打包后文件的名字就是 main.js）
  main: './src/index.js',
}
// 上面的写法等价于
entry: './src/index.js'

```

现在有一个需求，将 index.js 反复打包两次，第一次打包生成 main.js，第二次打包生成 sub.js。

```js
entry: {
  main: './src/index.js',
  sub: './src/index.js'
}

output: {
	filename: '[name].js'
}

```

简单解释一下： 

`main: './src/index.js'` 会将 index.js 打包到 main.js 中，`sub: './src/index.js'` 会将 index.js 打包到 sub.js 中，output 中的 `[name]` 是一个占位符(place holder)，在这里表示的是 main 和 sub。

现在又有一个需求，在现实开发中我们一般都需要将 js 文件上传到 CDN 上，假设现在我们将 js 文件都需要上传到 http://cdn.com.cn 上面，那么我们希望 index.html 中利用 script 标签引入打包后的文件时要在前面添加 `http://cdn.com.cn` 的前缀，应该如何实现？

```js
output: {
  publicPath: 'http://cdn.com.cn',
}

```

### 3.7 SourceMap 的配置

**sourceMap 是一种映射关系，它能够知道打包后的文件中的某行代码对应打包前哪个文件的哪行代码。**

> DellLee：这部分除了要掌握常见的 sourceMap 的配置方式还会问到 sourceMap 的原理。

假设你在书写代码的过程中出错了，浏览器中报错时只会报打包后的文件中代码的出错位置，但这并不是我们想要的，我们需要的是打包前的源文件是是哪行代码写错了。

通过 sourceMap 就可以满足我们上面的需求，当使用 source-map 时浏览器中报错就会提示打包前文件中代码的出错位置。

**如何开启 sourceMap？**

```js
// webpack.config.js  
// none -> 不使用 sourceMap
devtool: 'source-map',

```

inline-spurce-map 和 source-map 有什么区别？

使用 source-map 时会在打包后的文件下生成一个 `.map` 文件。

使用 inline-source-map 会将这个 map 关系直接写在打包后的文件中。

使用 sourceMap 是很消耗性能的，可以使用 inline-cheap-source-map , 如果出错时它只会告诉你是第几行出错了，但不会告诉你具体是这行的哪个地方出错了，其实这样也就足够了。

**在 [devtool](https://webpack.js.org/configuration/devtool/#root) 官方介绍中有很多 sourceMap 的选择，在实际项目中怎样进行选择呢？**

|                                          |         |         |            |                               |
| :--------------------------------------- | :------ | :------ | :--------- | :---------------------------- |
| devtool                                  | build   | rebuild | production | quality                       |
| (none)                                   | fastest | fastest | yes        | bundled code                  |
| eval                                     | fastest | fastest | no         | generated code                |
| eval-cheap-source-map                    | fast    | faster  | no         | transformed code (lines only) |
| eval-cheap-module-source-map             | slow    | faster  | no         | original source (lines only)  |
| eval-source-map                          | slowest | fast    | no         | original source               |
| eval-nosources-source-map                |         |         |            |                               |
| eval-nosources-cheap-source-map          |         |         |            |                               |
| eval-nosources-cheap-module-source-map   |         |         |            |                               |
| cheap-source-map                         | fast    | slow    | yes        | transformed code (lines only) |
| cheap-module-source-map                  | slow    | slower  | yes        | original source (lines only)  |
| inline-cheap-source-map                  | fast    | slow    | no         | transformed code (lines only) |
| inline-cheap-module-source-map           | slow    | slower  | no         | original source (lines only)  |
| inline-source-map                        | slowest | slowest | no         | original source               |
| inline-nosources-source-map              |         |         |            |                               |
| inline-nosources-cheap-source-map        |         |         |            |                               |
| inline-nosources-cheap-module-source-map |         |         |            |                               |
| source-map                               | slowest | slowest | yes        | original source               |
| hidden-source-map                        | slowest | slowest | yes        | original source               |
| hidden-nosources-source-map              |         |         |            |                               |
| hidden-nosources-cheap-source-map        |         |         |            |                               |
| hidden-nosources-cheap-module-source-map |         |         |            |                               |
| hidden-cheap-source-map                  |         |         |            |                               |
| hidden-cheap-module-source-map           |         |         |            |                               |
| nosources-source-map                     | slowest | slowest | yes        | without source content        |
| nosources-cheap-source-map               |         |         |            |                               |
| nosources-cheap-module-source-map        |         |         |            |                               |

一般情况下，在 development 模式下，建议使用 `cheap-module-eval-source-map` 这种形式的 devtool。

```js
devtool: 'cheap-module-eval-source-map',

```

因为提示的错误比较全面，打包速度也比较快。

在 production 模式下，建议使用 `cheap-module-source-map` 这种形式。

```js
devtool: 'cheap-module-source-map',

```

错误提示比较全面，打包速度也比较快。

### 3.8 使用 webpackDevServer 提升开发效率

现在我们每次修改完代码之后都需要重新运行打包命令后，修改的代码才会生效，如何解决这个问题，提高开发效率呢？

三种方法：

1）**修改 package.json 文件**

```js
// package.json
"scripts": {
    "watch": "webpack --watch"
},
  
// 执行打包命令
npm run watch

```

加上 `--watch` 参数再次运行 `npm run watch` 命令后，每当代码发生变化时，webpack 会自动监听代码的变化，一旦有变化会自动打包。

2）**使用 webpack-dev-server** 

- 当代码改变的时候不仅会重新打包，而且会重新刷新浏览器，上面 --watch 的方法并不会帮助我们重新刷新浏览器。

- React，Vue 的官方脚手架工具都使用了 webpack-dev-server.

- 打包后的文件并不会存放在 webpack.config.js 文件中规定的输出路径中，而是存放在内存中，这样做可以明显地提升性能。

- webpack 等配置文件改变后只有重启服务器之后才能生效。

使用方法

- 安装 webpack-dev-server

- 修改 webpack 配置文件

  ```js
  // 配置 devServer
  // 也就是启动一个webpack dev 服务器
  devServer: {
    // 服务器的根路径是 ./dist(里面有index.html文件)
    contentBase: './dist',
    open: true, // 自动地打开一个浏览器并访问这个服务器的地址
    port: 9000
  },
  
  ```

- 两种启动 webpack-dev-server 的方法

  1. 找到 webpack-dev-server 运行

     ```bash
     cd node_modules
     cd .bin
     webpack-dev-server
     
     ```

  2. 使用 npm

     首先修改 package.json 文件

     ```json
       "scripts": {
         "bundle": "webpack",
         "dev": "webpack-dev-server"
       },
     
     ```

     然后在命令行窗口中运行 `npm run dev`。

  如果自动打开浏览器显示出内容，并且端口号是 9000，表示启动成功。

3）**手动实现一个感知代码变化自动打包的服务器。**

1. 安装 express， webpack-dev-middleware 

   ```bash
   npm run express 
   
   ```

2. 修改 package.json，在 script 中添加下面一行代码，就可以使用 `npm run server` 来启动自己实现的服务器了。

   ```js
   scripts：{
     ....
   	"server": "node server.js"
   }
   
   ```

3. 修改 webpack.config.js 文件。

   添加下面这条语句：

   ```js
   output: {
   	publicPath: '/',
   }
   
   ```

4. 编写 server.js 

   ```js
   const express = require('express');
   const webpack = require('webpack');
   const webpackkDevMiddleware = require('webpack-dev-middleware');
   const config = require('./webpack.config');
   const path = require('path');
   
   // webpack(config) 会返回一个编译器，这个编译器执行一次就会重新打包一次.
   const complier = webpack(config);
   
   const app = express();
   // 只要代码发生变化,那么就会执行 complier 重新将代码打包，并将打包好的代码
   // 放在 localhost:3000 的 publicPath 下。
   app.use(webpackkDevMiddleware(complier, {
     publicPath: config.output.publicPath,
   }));
   
   app.listen(3000, () => {
     console.log('server is running on 3000');
     console.log(path.resolve(__dirname));
   });
   
   ```

5. 启动服务

   ```bash
   npm run server
   
   ```

   几个注意点：

   - `webpack-dev-middleware` 

     **`webpack-dev-middleware` 是一个封装器(wrapper)，它可以把 webpack 处理过的文件发送到一个 server。** 

     ```js
      app.use(webpackkDevMiddleware(complier, {
       publicPath: config.output.publicPath,
     }));
     
     ```

     当代码发生变化时，complier 就会执行将代码重新打包，假设打包完成后生成的文件是 main.js , 这个时候 webpack-dev-middleware 会把 main.js 存放到服务器 localhost:3000 的 publicPath 目录下。

     为什么这里的 publicPath 必须一定和 webpack 配置文件 output 中的 publicPath 相同呢？

     ​	从这个角度去理解，之前当 publicPath 是 `http://cdn.com.cn` 时，在script标签中引入时，`src='http://cdn.com.cn/main.js'` 所以只有前缀和 webpack 配置文件中的 publicPath 一致时才能访问到 main.js 文件。所以在这里 webpack 配置文件中是 `/` , 所以 server.js 中也必须是 `/` 。所以令 `publicPath = config.output.publicPath` 可以保证两者永远是一致的。

     ​	如果 webpack 配置文件中的 publicPath 是 `/test` 那么在浏览器中访问时应该输入`localhost:3000/test`

   - 为什么不会访问 src 下的 index.html ? 

     注意浏览器中显示的实际上是打包后新生成的文件 ，而不是 src 中的 index.html。

### 3.9 Hot module replacement 热模块更新(1)

> 简写 HMR
>
> 什么是热更新？
>
> 我的理解就是无需刷新页面当文件中的代码改变时页面就会自动发生变化。例如样式发生变化了，当前页面也不需要刷新，将改变后的样式应用到当前页面即可。

**下面说明的是当文件中的样式代码发生变化时 HMR 带来的变化**

以下代码实现的是，点击一下 add 按钮新创建一个 item div元素，并且当是偶数时背景色为黄色。

```js
// index.js
import './index/css';

var btn = document.createElement('button');
btn.innerHTML = 'add';
document.body.appendChild(btn);
btn.onclick = function() {
  var div = document.createElement('div');
  div.innerHTML = 'item';
  document.body.appendChild(div);
}

// style.css
div:nth-of-type(odd) {
    background-color: yellow;
}

```

使用 webpack-dev-server 时，当改变文件中的代码(例如将 style.css 中 background-color 改为 pink)，webpack-dev-server 感知到文件中的代码发生了变化，会重新打包，页面自然会重新刷新，那么之前页面上通过 add 按钮新增的 div 标签自然也就没有了。

那有没有什么方法，在改变文件中的代码后，当前页面的 DOM 元素不用变化呢？

有，用热更新就可以实现。

热更新可以实现在文件中的代码改变之后，在当前页面不刷新的情况下根据文件中代码的改变作出改变，例如当文件中的样式发生变化时，可以在当前页面不刷新的情况下应用改变后的样式。

在 webpack.config.js 中新增的代码如下：

```js
// HotModuleReplacementPlugin 是 webpack 中的方法，所以需要引入 webpack
const webpack = require('webpack');

devServer: {
  ...
  hot: true, // 使用 HMR 功能
  hotOnly: true // 当 HMR 失效时不需要浏览器做其它的工作，失效就失效了，如果不开启这个，当 HMR 失效时，浏览器可能会进行刷新等操作。
}

plugin: [
  ...
  new webpack.HotModuleReplacementPlugin()
]

```

**下面说明的是当文件中的 JS 代码发生变化时 HMR 带来的变化**

**利用热更新实现改变 js 代码时不需要刷新页面即可在页面上展示改变后的结果**

结合下面两个 js 文件来验证这个功能的实现。

`counter.js` 创建了一个 div 标签，每次点击时 innerHTML 的值加1.

`number.js` 创建了一个 div 标签，innerHTML 是 1000。

```js
// counter.js
function counter() {
  var div = document.createElement('div');
  div.innerHTML = '1';
  div.setAttribute('id', 'counter');
  div.onclick = function() {
    div.innerHTML = parseInt(div.innerHTML, 10) + 1;
  };
  document.body.appendChild(div)
}

export default counter;

// number.js
function number() {
  var div = document.createElement('div');
  div.innerHTML = '1000';
  div.setAttribute('id', 'number');
  document.body.appendChild(div);
}

export default number;

```

```js
// index.js
import number from './number.js';
import counter from './counter.js';

counter();
number();

```

webpack.confug.js 的配置和上面是一样的，表明开启了热更新。

运行 webpack-dev-server （npm run dev）后，页面上出现了 1 和 1000，现在点击 1，发现数值再加 1 变为 2，当我们改变 number.js 中的 innerHTML 变为 2000后，发现页面不会刷新，但是第二个值仍然是 1000，并没有改为 2000.

这是因为当改变 JS 代码时还要加上下面这几句代码热更新才会生效。

index.js 中的代码如下：

```js
// index.js
import number from './number.js';
import counter from './counter.js';

counter();
number();

// 如果开启了热更新
if(module.hot) {
  // 第一个参数指的是依赖的文件，这里是 number.js,如果 number.js 这个文件中的代码发生变化，那么就会执行后面的回调函数。这里要做的是，如果number文件发生变化，那么需要先清除掉之前在页面上显示的那个div，然后再去执行number函数去产生一个修改值后的div显示在页面上。
  module.hot.accept('./number', () => {
    // 先清除掉之前在页面上的那个 DOM 元素
    document.body.removeChild(document.getElementById('number'));
    // 将更改代码之后产生的 DOM 元素挂载到页面上
    number();
  })
}

```

第 9 - 17 行代码是核心所在，改变样式时不需要这几行代码的原因是 webpack 中的 css-loader 帮我们实现了这几行代码的功能。在 Vue，React 这些高级框架中都实现了 HMR，因此也不需要上述的代码，无论是样式改变还是 JS 改变 HMR 都会生效。

注意有些文件的 loader 是不支持 HMR，这个时候上面的那几行代码就需要自己编写了。 

### 3.11 使用 Babel 处理 ES6 语法（1）

> 目前有很多浏览器还并不支持或者只是支持部分的 ES6 语法，所以要想实现 ES6 的代码能够在各个浏览器上运行，就需要借助 Bable 将 ES6 的语法转换为浏览器能够支持的 ES5 代码。

在 [Babel 官网](https://babeljs.io/setup#installation) 的 setup 中提供了许多实用 babel 的方法，其中就有如何在 webpack 中使用 babel。

**在 webpack 中安装 Babel** 

```bash
npm install --save-dev babel-loader @babel/core

```

babel-loader 在 webpack 中配置时需要用到，当遇到 js 文件时提供给 webpack 一份打包方案，而不是使用默认的 js 打包方案。

@babel/core 是 babel 的核心库。

安装好 babel-loader 之后，只是将 webpack 和 babel 建立起了连接，也就是遇到 js 文件时告诉 webpack 用 babe-loader 提供的方案进行打包，但是 babel-loader 并不能够对 ES6 代码进行转换，要想真正实现转换需要借助 @babel/preset-env ，安装上它之后就可以在打包的过程中将 ES6 的代码转换成 ES5 的代码。

```bash
npm install @babel/preset-env --save-dev
```

在 webpack.config.js 中的配置如下:

```js
// webpack.congfig.js
rules: [
  ...
  {
    test: /\.js$/,
    // 第三方的代码没必要进行转换，其实那些代码已经做好了转换。
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      presets: ["@babel/presets-env"]
    }
  }
]  

```

经过上面的转换后，ES6 的代码确实转换成了 ES5 的代码，例如 const 语法转化为了 var 语法，箭头函数转换为了普通函数。

但是 ES6 中新增的一些对象和方法是不能用 babel 进行转换的，比如 Promise，经过转换之后还是 Promise。

![1584953675665](D:\frontEndNotes\webpack\webpack 4.0 课程笔记\1584953675665.png)

这个时候需要借助 polyfill，来让低版本的浏览器也能支持 Promise 等高级的用法。

> Polyfill 是一块代码（通常是 Web 上的 JavaScript），用来为旧浏览器提供它没有原生支持的较新的功能。
>
> 比如说 polyfill 可以让 IE7 使用 Silverlight 插件来模拟 HTML Canvas 元素的功能，或模拟 CSS 实现 rem 单位的支持，或 text-shadow，或其他任何你想要的功能。

安装 polyfill

```bash
npm install --save @babel/polyfill
```

>  Because this is a polyfill (which will run before your source code), we need it to be a `dependency`, not a `devDependency` 
>
>  参考：[你真的理解devDependencies和dependencies区别吗](https://blog.csdn.net/qq_43199318/article/details/103627785)

因为 polyfill 实际上就是一块 JS 代码用来模拟 ES6 中一些高级的语法，因此在线上环境中仍然需要这块代码，因此不能将其设置为 `devDependencies`。

webpack.config.js 配置：

```js
{
  test: /\.js$/,
    // 第三方的代码没必要进行转换，其实那些代码已经做好了转换。
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      presets: [['@babel/preset-env', {
      // 用到什么语法就转换什么语法，而不是所有的都进行转换
      useBuiltIns: 'usage'
			}]]
		}
}

```

在不加 useBuiltIns 时，所有的 语法都会加进去，这样无疑会使打包生成的 main.js 文件很大，加上 useBuiltIns 之后，代码中用到了什么就去转换什么，比如上面的代码中用到了 Promise 那么就去转换 Promise，其它的没有用到的并不会去转换。

使用 polyfill：

```js
// index.js
import "@babel/polyfill";

```

因为 polyfill 实际上就是一块 JS 代码用来模拟 ES6 中一些高级的语法，因此需要在文件中进行引入之后才能使用里面的代码。

这样引入之后 polyfill 的所有代码都在 index.js 文件中，经过上面 webpack 中 `useBuilIns: 'usage'` 配置之后，只有 polyfill 中被用到的语法才会被打包，这样就减少了打包文件的大小。

### 3.12 使用 Babel 处理 ES6 语法（2）

设定浏览器的版本，让 Babel 根据浏览器的版本进行转换：

Babel 转换后的代码需要在 chrome 67 及以上的版本上支持运行，由于 Chrome 67 版本对 ES6 语法已经支持地很好了，所以会发现 ES6 的语法几乎不需要转换，例如， const 等语法都不会被转换。

```js
// webpack.config.js
{
  test: /\.js$/,
    exclude: /node_modules/,
    loader: 'babel-loader',
    options: {
      presets: [['@babel/preset-env', {
      useBuiltIns: 'usage',
      targets: {
        chrome: '>67'
      }
    }]]
	}
}

```

使用 polyfill 的形式不适合开发第三方库，因为经过它转换的 Promise 方法会通过全局变量的形式（因为在引入polyfill的时候是通过 `import '@babel/polyfill';` 形式在 index.js 中引入的，全局都会生效），会污染全局环境。

>  When setting useBuiltIns: 'usage', polyfills are automatically imported when needed. 当在webpack 中配置了 useBuiltIns: 'usage' 时不需要再人为地引入 @babel/polyfill。

所以在打包第三方库的情况下，需要去换一种打包的方式。

借助 plugin-transform-runtime 插件

安装 plugin-transform-runtime 

```bash
npm install --save-dev @babel/plugin-transform-runtime
```

安装 runtime

```bash
npm install --save @babel/runtime
```

安装 runtime-corejs2

```bash
npm install --save @babel/runtime-corejs2
```

修改 webpack.config.js 

```js
test: /\.js$/,
      // 第三方的代码没必要进行转换，其实那些代码已经做好了转换。
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        // 将之前的presets配置删掉
        "plugins": [
          [
            "@babel/plugin-transform-runtime",
            {
              "absoluteRuntime": false,
              "corejs": 2,
              "helpers": true,
              "regenerator": true,
              "useESModules": false,
              "version": "7.0.0-beta.0"
            }
          ]
        ]
      }
    }]

```

**总结：** **开发类库时使用 plugin-transform-runtime 插件，因为它不会污染全局环境，开发业务代码时可以使用 polyfill， 使用 polyfill 实际上是在 windows 对象上加了一些 Promise 等的属性，所以它会污染全局环境。**

**一般 babel 的配置比较多，可以将 options 的内容单独取出来放到根目录下的 `.babelrc` 文件下，然后将 webpack babel 配置文件的 options 一项直接删除掉即可。**

### 3.13 webpack 实现对 React 代码的打包

首先安装 react，react-dom，然后安装 preset-react:。

```bash
# 因为 react，react-dom 在线上环境中也是需要的，所以要用 --save
npm install --save react react-dom
npm install --save-dev @babel/preset-react
```

修改 `.babelrc` 文件。

> 注意 `.babelrc` 文件中是不能有注释的，因为它的格式是什么都不清楚，用什么符号注释都不知道。

```js
{
  "presets": [
    [
      "@babel/preset-env", {
      "targets": {
        "chrome": "67"
      },
      "useBuiltIns": "usage"
      }
    ],
    "@babel/preset-react"
  ]
}

```

注意 webpack 的执行顺序是从下到上，从右往左，所以在遇到 `.js` （因为 babel 就是用来转换 js 文件的）文件时，是先采用 `@babel/preset-react`转换 React 的代码，然后才是 `@babel/preset-env` 转换 ES6 的代码。

### 3.14 webpack 核心概念总结

```js
// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  // 打包的模式，默认的模式是 production, development 模式下打包后的代码不会被压缩
  mode: 'development',
  // none -> 不使用 sourceMap
  // cheap： 生成 source-map 只有行信息，不带列信息，同时不需要包含 loader 里面代码的 source-map，只需要生成业务代码的 source-map 就可以了。
  // module：对 loader 里面的业务代码也生成 source-map
  // eval: 一种执行方式
  devtool: 'cheap-module-eval-source-map',
  // 配置 devServer, devServer可以使我们开启一个服务器当代码变化时，自动打包并刷新浏览器。
  // contnetBase: 在哪一个目录下去启动服务器
  // open：启动服务器时会帮我们自动打开一个页面
  // port: 端口号
  // hot: 是否启用热更新，true 启用
  // hotOnly: true 表示即使热更新出现了问题也不帮我们刷新浏览器。
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8080,
    hot: true,
    hotOnly: true
  },
  // 入口文件也就是要打包的文件
  entry: {
    // main 指的是打包后文件的名字，如果output配置中有指定filename那么就用output中指定的名字。
    main: './src/index.js',
  },
  // module: 遇到一个文件(模块)时怎样去打包，告诉webpack遇到哪种文件时应该如何去打包。
  // rules: webpack 进行打包的规则
  // test: 后面跟的是一种文件类型
  // use: 使用哪些loader
  // loader：使用哪一种loader
  module: {
    rules: [{
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
        'postcss-loader'
      ]
    }, {
      test: /\.(eot|ttf|svg|woff)$/,
      use: {
        loader: 'file-loader',
      }
    }, {
      test: /\.js$/,
      // 第三方的代码没必要进行转换，其实那些代码已经做好了转换。
      // 使用 babel-loader 时，options 项可以写在根目录下的 .babelrc 文件下
      // exclude 除去什么模块
      exclude: /node_modules/,
      loader: 'babel-loader',
    }]
  },
  // plugin: 插件
  // HtmlWebpackPlugin 自动生成一个 index.html 文件
  // CleanWebpackPlugin  自动删除上一次打包生成的文件
  // webpack.HotModuleReplacementPlugin 实现 HMR(热更新)功能
  plugins: [
    new HtmlWebpackPlugin({
    template: 'src/index.html'
    }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets:true, //自动删除未被使用的webpack资源
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  // 打包好文件的信息
  // publicPath: 打包后文件的前缀，如 /main.js
  // filename: 打包后的文件名，[name] 是一个占位符，[name]的值就是前面entry中的main
  // path： 生成的打包文件的存放路径，注意必须借助node中的path模块。并且在使用 npx webpack 执行打包时才会生成dist目录
  // 在使用 dev-server 时生成的打包文件直接保存在内存中，不会存放在dist目录下。
  output: {
    publicPath: '/',
    filename: '[name].js',
    // 不能直接写相对路径，必须借助node中的path模块
    path: path.resolve(__dirname, 'dist'),
  }
};

```



## 4. webpack 高级概念

### 4.1 Tree Shaking

**什么是 Tree Shaking？**

举例说明吧：

```js
// math.js
export const add = (a, b) => {
  console.log(a + b);
};

export const minus = (a, b) => {
  console.log(a - b);
};

// index.js
import { add } from './math';

add(1, 2);

```

在 math.js 中有两个方法，在 index.js 中只使用了一个方法，但是在打包生成的打包文件中这两个方法的代码都被打包进去了，这显得有点没必要。

那能不能用到了什么就打包什么呢？

可以的，TreeShaking 就可以实现，math.js 中的内容可以比作一个树形结构，通过 TreeShaking 将 minus 这个树枝 shaking 掉，这样打包的时候就只打包 add 这个方法就好了。

**TreeShaking 的作用就是只打包用到的东西，没有用到的东西不会出现在打包后的文件中。**

当 TreeShaking 发现 import 语句时就会去看从哪个被引入的模块中引入了什么东西到当前的模块中。如：

```js
import './style.css'; // 并未从 style.css 中导出任何东西，TreeShaking 会直接将 style.css 忽略
import { add } from './math' // 从 math.js 中导出了 add 方法，TreeShaking 会将 math.js 中的 add 方法打包到文件中，其它的东西都将被忽略。

```

**如何实现 TreeShaking ?**

> TreeShaking 只支持 ES Module 的模块引入方式（也就是只支持 import 这种模块引入方式），TreeShaking 只支持静态引入的方式，CommonJS 模块化是动态引入的方式。
>
> 关于 ES Module 与 CommonJS 模块化的区别见《ES6标准入门》P457。

**在 development 模式下：**

- webpack.config.js 文件中添加

  ```js
  optimization: {
    usedExports: true
  }
  
  ```

- package.json

  一般会直接写 `*.css` ，除了样式文件还有例如 `@babel/polyfill` 同样没有导出内容但是不能被忽略。

  ```js
  {
    ...
  	"sideEffects": [
      "@babel/polyfill",
      "style.css", 
    ]
    ...
  }
  
  ```

```
  
设置 TreeShaking 的忽略模块，就像前面讲的当  `import './style.css'` 时由于没有导出任何东西，所以 TreeShaking 直接会将其忽略，打包文件中不会出现 `style.css`，这是我们不希望看到的。
  
`sideEffects` 数组中的模块就是 TreeShaking 忽略的模块，即使没有导入任何东西也会被打包到打包文件中。 
  
设置完成之后再进行打包之后，main.js 中会发生下面的变化:
  
  ```js
  /*! exports provided: add, minus */
  /*! exports used: add */

```

**注：**

1）在 development 模式下，TreeShaking 不会将没有使用的代码忽略掉，而是也将其打包到打包文件中，只是会有提示一共导出了哪些，哪些被使用了。

提示方式:

 ```js
/*! exports provided: add, minus */
/*! exports used: add */

 ```

2）在 production 模式下，TreeShaking 会直接将没有使用代码忽略，不会将其打包到打包文件中。

**在 production 模式下：**

- webpackage.config.js 中不需要加 optimization

- package.json 

  ```js
  {
    ...
  	"sideEffects": [
      'style.css', 
    ]
    ...
  }
  
  ```

- 再次打包后，minus 的代码将不会打包到打包文件中。

### 4.2 Development 和 Production 模式的区分打包

Development 模式下代码不会被压缩，Production 模式下代码会被压缩，Development 模式下 source map 需要详细一些，Production 模式下比较简单就可以

如果 development 和 production模式都是使用的 webpack.config.js 这个文件，那么在打包的时候，如果现在要有 development 模式转为 production 模式，那么 webpack.config.js 会改动比较多，而且不方便。

现在创建 webpack.dev.js 和 webpack.prod.js 这两个文件来分别配置两种模式下的打包就不会出现上面的问题了。

接下来需要配置 package.json 

```js
  "scripts": {
    "dev": "webpack-dev-server --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"
  },

```

**`--config` 后面跟着的表示使用哪一个 webpack 配置文件。**

那么以后 

```bash
npm run dev # 启动 development 模式下的打包
npm run build # 启动 production 模式下的打包

```

现在有个问题是 webpack.dev.js 和 webpack.prod.js 重复的代码有很多，现在建立一个 webpack.common.js 来存放两者共同的代码，然后再利用 webpack-merge 库将它们结合起来。

```bash
npm install webpack-merge -D

```

webpack.dev.js

```js
const webpack = require('webpack');
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const devConfig = {
	mode: 'development',  
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    port: 9000,
    hot: true,
    // hotOnly: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    usedExports: true
  },
};

module.exports = merge(devConfig, commonConfig);

```

webpack.prod.js

```js
const merge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');

const prodConfig = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
};

module.exports = merge(prodConfig, commonConfig);

```

webpack.common.js

```js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {  
  entry: {
    main: './src/index.js',
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      },{
      test: /\.(jpg|png|gif)$/,
      use: {
        loader: 'url-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './images',
          limit: 10240
        }
      }
    }, {
      test: /\.css$/,
      use: [
        'style-loader', 
        'css-loader', 
      ]
    }, {
      test: /\.(eot|ttf|svg|woff)$/,
      use: {
        loader: 'file-loader'
      }
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        path.resolve(__dirname, 'dist'),
        "**/*", "!images",
      ],
    }),
  ],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  }
}

```

一般会建一个 build 文件夹，然后将这三个配置文件放在里面。

看到这有没有发现点什么，vue-cli 脚手架工具自动生成的 Vue 项目中就有 build 这个文件夹，而且里面也有这三个文件。

### 4.3 webpack 和 Code Splitting(1)

> lodash: 一个一致性、模块化、高性能的 JavaScript 实用工具库。
>
> 一般我们会将 lodash 起名为 _ ，即 `import _  from 'lodash'` 。

**所谓代码分割就是将一部分代码单独写在一个 js 文件中，如果某个文件比较大，就可以考虑使用代码分割，如果有的代码会经常改变，而有的代码不会经常改变也比较适合利用代码分割。**

举例说明这样做的意义：

```js
// index.js
import _ from 'lodash'; // 假设大小为 1 MB

业务代码 // 假设大小为 1 MB

```

- 在首次访问时， index.js 文件的大小为 2 MB，需要加载的大小是 2 MB
- 业务代码改变用户再次访问时，index.js 的大小为 2 MB，需要加载的大小还是 2 MB

现在做一点改变：

webpack.common.js 中 将 entry 添加 `lodash: 'src/lodash.js'` 。

```js
// src/index.js 

业务代码 // 假设大小为 1 MB
  
// src/lodash.js
import _ from 'lodash';
window._ = _; // 以后在其它文件中使用 _ 就可以使用 lodash 库了。

```

- 首次访问时，index.js 1 MB，lodash.js 1 MB ， 需要加载的大小是 2 MB，而且此时可以进行并行加载，速度一般会比上面的快。

- 业务代码改变用户再次访问时，index.js 1 MB，由于 lodash.js 文件并没有发生变化，所以无需再次加载，因为浏览器的缓存中有，所以此次只需加载 1 MB。

代码分割和 webpack 是没有什么关系的，上面实现的代码分割使我们人为地去实现的，不够智能，在 webapck 中使用自带的 SplitChunksPlugins 就可以很容易地实现代码分割。

**在 webpack 中使用 SplitChunksPlugins 实现代码分割的两种方式 **

> 这一部分总结的有点乱。

1. **同步代码**：**只需要在 webpack.common.js 中做 optimization 的配置即可。**

   ```js
   // splitChunks 是 webpack 中自带的，无需导入。
   optimization: {
     splitChunks: {
       chunks: 'all'
     },
   }
   
   ```

2. **异步代码**（利用 import 语法引入的组件或库）**会自动进行代码分割**

   ```js
   // 引入 lodash 之后将其赋给 _，并执行后面的函数
   function getComponent() {
     return import('lodash').then(({default: _}) => {
       ...
     })
   }
   
   ```

   > import 异步语法之前没接触过，补上。
   >
   > 要想使用 import 异步语法需要安装 dynamic-import-webpack。
   >
   > ```bash
   > npm install babel-plugin-dynamic-import-webpack -D
   > 
   > ```
   >
   > 

### 4.5 SplitChunksPlugin 配置参数详解

总结了一篇博客：

[SplitChunksPlugin 配置参数详解](https://blog.csdn.net/qq_43199318/article/details/103641038)

### 4.6 Lazy Loading 懒加载， Chunk 是什么？

**懒加载通俗点讲就是当用到了之后再去加载，即按需加载。**

举例说明：

实现当点击页面时才加载 lodash.

```js
function getComponent() {
  return import(/* webpackChunkName:"lodash" */ 'lodash')
    .then(({ default: _}) => {
      var element = document.createElement('div');
      element.innerHTML = _.join(['happy', 'Coding'], '_');
      return element;
  })
}

document.addEventListener('click', () => {
  getComponent().then(element => {
    document.body.appendChild(element);
  });
});

```

上面的代码实现的就是一个懒加载的过程，当点击页面时才开始加载 lodash.

懒加载有什么好处？

只有当用到了才会加载这无疑提升了性能，避免了无用资源的加载。

> 注：
>
> 我在实现懒加载时，index.html 文件中会有两个 script 标签不知道为什么？这样实际上并没有实现懒加载，因为一开始的时候两个打包文件就都加载了，检查了一下配置文件也不清楚是什么原因？主要是不清楚怎样设置 index.html 中的 script 标签的数量。

---

**什么是  chunk？**

在进行打包之后会生成很多 js 打包文件，每个 js 打包文件都被称为是一个 chunk。

打包时输出信息：

![chunk](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/chunk.png)

### 4.8 打包分析，Preloading，Prefectching

**什么是打包分析？**

对生成的打包文件借助一些分析工具来进行分析，检查打包是否合理。

[webpack 官方分析官网]( https://github.com/webpack/analyse )

**打包分析流程：**

- 配置 package.json 

  添加 `--profile --json > stats.json` 参数，目的是为了生成 stats.json 文件。

  ```js
  "scripts": {
    "dev-build": "webpack --profile --json > stats.json --config build/webpack.dev.js"
  }
  
  ```

- 借助分析工具，导入 stats.json 文件获得结果，常用的分析工具如下：

  - [官方分析工具](http://webpack.github.com/analyse)(科学上网)
  - [webpack 官网推荐的工具](https://webpack.js.org/guides/code-splitting/#bundle-analysis)
    - [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer) (推荐)

---

关于 Preloading 和 Prefetching 参考下面总结的这篇博客：

[聊一聊 webpack 中的 preloading 和 Prefetching]( https://blog.csdn.net/qq_43199318/article/details/103645691 )

###  4.9 CSS 文件的代码分割

用到的脚本是：[MiniCssExtractPlugin]( https://webpack.js.org/plugins/mini-css-extract-plugin/#root )。

如果不使用这个脚本就会将 css 文件一起打包到 js 文件中。

关于具体的使用可以参考[MiniCssExtractPlugin]( https://webpack.js.org/plugins/mini-css-extract-plugin/#root ) 的介绍，就不再说了，有一点需要注意的是， TreeShaking 要除去 css 和 scss 文件，因此在 package.json 中应该添加以下配置。

```js
"sideEffects": [
  "*.css",
  "*.scss"
],

```

###  4.10 webpack 与浏览器缓存(Caching)

举例说明这一小节中解决的问题：

```js
import _ from 'lodash';
import $ from 'jquery';

const dom = $('<div>');
dom.html(_.join(['hello', 'webpack']), ' ');
$('body').append(dom);

```

当浏览器访问过一次后，就会在在缓存中留下 main.js 和 vendors~main.chunk.js 文件，这时候如果我改变源代码，因为我再次打包后生成的文件名是不会发生变化的，所以浏览器普通刷新之后是不会重新向服务器请求更改过后的文件的，因为它会直接利用浏览器中的文件，名字还是那个名字，它会认为服务器中的文件没有发生变化，这就有问题了。

在 webpack 中通过给文件名中加一个独一无二的哈希值来实现这个问题，当文件发生变化时这个哈希值就会发生变化否则不会发生变化。

webpack 的配置如下：

```js
  output: {
    filename: '[name].[contentHash].js',
    chunkFilename: '[name].[contentHash].chunk.js',
    path: path.resolve(__dirname, '../dist'),
  }

```

在名字后面加上一个 contentHash 即可。

### 4.11 Shimming 的作用

> shim:  n. 楔子；垫片；填隙片  v. 用填隙片填入

还是以一个例子来引出 Shimming 的作用：

```js
// jq.ui.js
function ui() {
  $('<div>hello webpack</div>').appendTo($('#root'));
}
export default ui;

// index.js
import $ from 'jquery';
import ui from './jq.ui';

ui();

```

上面的代码是不能正常运行的，会提示 $ is not defined.

原因就在于，在一个模块中定义的变量只能在当前的模块中起作用，代码中 `index.js` 中引入的 `$` 变量并不能在 `jq.ui.js` 中起作用。

下面有一种解决方案就是在 index.js 中：

```js
// index.js
import $ from 'jquery';
import ui from './jq.ui';

window.$ = $; // 这样无论在哪个模块中都能够使用 $ 了。
ui();

```

这一种并不是本节想说的，本节说的是通过在 webpack 中增加配置的方法解决这个问题。

```js
// webpack.common.js
new webpack.ProvidePlugin({
  $: 'jquery',
  _join: ['lodash', 'join']
}),

```

通过上面的配置之后，`$` 就可以在全局使用了，和下面代码实现的功能类似

```js
import $ from 'jquery';
window.$ = $;

```

`_join` 和下面的代码功能类似：

```js
import _ from 'lodash';
window._join = _.join;

```

上面实现的只是垫片的一种，实际上垫片是一种思想，下面这种实现模块中的 this 指向 window 也是垫片应用的一种。

老样子还是用代码来说明：

```js
// index.js
console.log(this === window)

```

false, 因为 this 指向的是当前这个模块并不是全局 window 对象。 

使用 `imports-loader` 脚本，配置如下：

```js
// webpack.common.js 
{
  test: /\.js$/,
    exclude: /node_modules/,
      use: [
        {
          loader: 'babel-loader',
        }, {
          loader: 'imports-loader?this=>window'
        }
      ]
}

```

经过这样的配置之后每个模块中的 this 就都指向 window 对象了。

### 4.12 环境变量的使用

这一小节主要讲了如何通过 env 这个环境变量来区分不同的环境，实现的功能就是通过不同的通过传入不同的 env ，在都使用 webpack.common.js 的情况下实现不同环境下的代码打包。

实现的主要代码如下：

```js
// webpack.common.js
import merge from 'webpack-merge';
import prodConfig = './webpack.prod.js';
import devConfig = './webpack.dev.js';

const commonConfig = {
  ...
};
  
export default = (env) => {
  if (env && env.production) {
    return(merge(prodConfig, commonConfig));
  }else {
    return(merge(devConfig, commonConfig));
  }
}

// package.json
scripts: {
  'dev-build': 'webpack --config build/webpack-common.js'
  'dev': 'webpack-dev-server --config build/webpack-common.js'
  'build': 'webpack --env.production --config build/webpack-common.js '
}

```

·`dev-build` 和 `dev` 都没有传 `--env.production` 参数，所以会 `return(merge(prodConfig, commonConfig));`

`build` 都传了 `--env.production` 默认值为 `true`, 所以会 `return(merge(devConfig, commonConfig));`



## 5. Webpack 实战配置案例讲解

### 5.1 Library 的打包

之前都是业务代码进行打包，如果现在想要开发一个库，那怎样对库进行打包呢？

还是结合代码来说明：

1. 新建 library 文件夹

2. npm init -y 初始化，生成 package.json 文件

3. 安装webpack

   ```bash
   npm install webpack webpack-cli --save
   
   ```

4. 新建 src 文件夹，添加 math.js 文件, index.js 文件.

   ```js
   // src/math.js
   export default function add(a, b) {
     return a + b;
   }
   
   // src/index.js
   import * as math from './math';
   
   export default math;
   
   ```

5. 新建 webpack.config.js 文件

   ```js
   const path = require('path');
   
   module.exports = {
     mode: 'production',
     entry: './src/index.js',
     output: {
       path: path.resolve(__dirname, 'dist'),
       filename: 'library.js',
       library: 'lib',
       libraryTarget: 'umd' 
     }
   };
   
   ```

6. 打包

   ```bash
   npm run build
   
   ```

有几点需要注意：

- 用户引用库的方式有很多：

  ```js
  // ES Module
  import library from 'library';
  // CommonJS
  const library = require('library');
  // AMD
  require(['library'], function {
  })
  
  ```

  想让用户能够以各种各样的方式引用我们的库，需要多加一条配置，即在 webpack.config.js 中的 output 中添加 `libraryTarget: 'umd'`。

- 如果用户想通过 `<script src='library.js'></script>` 引入库，并且通过 `lib` 就可以使用我们的库，我们还需要添加一条配置。

  ```js
    output: {
  		...
      library: 'lib',
      ... 
    }
  
  ```

- 由于我们想让用户使用的是打包后的 library 文件，所以需要将 package.json 文件下的main 修改为我们打包好的文件。

  ```json
    "main": "./dist/library.js",
  
  ```

7. 发布到 npm 上

   1. [npm 官网](https://www.npmjs.com/) 上注册一个账号，并登录。

   2. 在 library 文件夹下打开命令行界面，添加 npm 账户。

      ```bash
      npm adduser
      
      ```

      输入完此命令后会让你填写 用户名，密码，邮箱。

   3. 登录到 npm。

      ```bash
      npm login
      
      ```

   4. 修改 package.json 文件中的 name 属性，因为不能和 npm 上已有的包重名。

   5. 发布

      ```bash
      npm publish
      
      ```

### 5.2 PWA 的打包配置

先简单说一下 PWA 吧，PWA 即渐进式 web 应用，当用户浏览过一次网页之后能够将网页内容缓存下来，即使服务器挂掉了，用户依然可以访问那个网页。

PWA 打包配置的流程：

1. 安装 workbox-webpack-plugin

   ```bash
   npm install workbox-webpack-plugin -D
   
   ```

2. 配置 webpack.prod.js

   ```js
   const workboxPlugin = require('workbox-webpack-plugin');
   
   plugins: [
     new workboxPlugin.GenerateSW({
       clientsClaim: true,
       skipWaiting: true
     })
   ],
   
   ```

3. 编写 index.js

   ```js
   // index.js
   
   if ('serviceWorker' in navigator) {
     window.addEventListener('load', () => {
       navigator.serviceWorker.register('/service-worker.js')
         .then(registration => {
           console.log('service-worker registed');
         }).catch(error => {
         console.log('service-worker register error');
       })
     })
   }
   
   ```

   上面代码要表达式的意思是： 如果 [navigator](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator) 中有 serviceWorker 那么就在 window 上注册一个 load 事件，等页面加载完后，如果 serviceWorker 注册成功，那么就缓存内容并打印 `service-worker registed`，如果失败就打印 `service-worker register error` 。

4. 安装 http-server

   ```bash
   npm install http-server -D
   
   ```

   配置 package.json

   ```js
   "scripts": {
     "start": "http-server dist",
      ...
   }
   
   ```

   真正的开发过程中是将我们打包生成的 dist 目录下的文件放到服务器上，现在我们将 http-server 运行在 dist 目录下来模拟。

5. 在浏览器中访问 `localhost:8080`，然后关掉 `http-server`，刷新浏览器再次访问 localhost:8080 你会发现依然可以正常访问，这就是 PWA 的作用。

   这个地方我有一个疑问就是，就算没有 PWA 不是也有缓存吗，不是照样可以访问吗？

   我现在的理解是这样的，当没有 PWA 的时候就算本地有缓存，也是需要向服务器上查看是不是访问的文件有变化，访问的时候由于服务器挂掉了，所以没办法访问，所以并不会访问本地的缓存。

   而 PWA 的机制时当访问不到服务器时就访问之前的缓存，这也许就是两者的区别吧。

   >  不是很确定，需要再进行核实。

### 5.3 TypeScript 的打包配置

先说一下 TypeScript 的打包流程;

1. 新建一个 type-script 的文件夹，并运行 `npm init -y` 进行初始化

2. 创建一个 src 文件夹，新建一个 index.ts 文件。

   ```typescript
   import * as _ from 'lodash';
   
   class Greeter {
     greeting: string;
   
     constructor(message: string) {
       this.greeting = message;
     }
     greet() {
       // return "hello, " + this.greeting;
       return _.join(['hello', ' ', this.greeting], ' ');
     }
   }
   
   let greeter = new Greeter('world');
   alert(greeter.greet());
   
   ```

3. 由于是 .ts 文件，所以 webpack 并不知道应该如何去打包，所以需要引入 `ts-loader` 来告诉 webpack 应该如何去打包 .ts 文件，因此创建一个 webpack.config.js 并进行以下配置。

   ```js
   const path = require('path');
   
   module.exports = {
     mode: "production",
     entry: './src/index.ts',
     
     // 使用 ts-loader
     module: {
       rules: [{
           test: /\.ts?$/,
           use: 'ts-loader',
           exclude: /node_modules/
         }
       ]
     },
     output: {
       filename: 'bundle.js',
       path: path.resolve(__dirname, 'dist')
     }
   };
   
   ```

4. 这个时候打包会报错，原因在于对 .ts 文件打包需要一个 tsconfig.json 。

   ```js
   // 注意 json 文件是不能进行注释的
   {
     "compilerOptions": {
       "module": "es6", // 模块的规范是 ES6 模块规范，也就是使用 import 这种形式引入模块
       "target": "es5", // 转换成 ES5 的代码
       "allowJs": true, // 允许在 ts 文件中使用 js 的模块
     },
   }
   
   ```

5. 这个时候打包是没有问题了，但是有个问题在于当按在 js 文件那样引入模块时，ts 并不会给予语法上的提示，不会报错，（例如函数的参数要求是 number ，传入的是 string，ts 文件也不会给出错误）这显然就失去了我们使用 ts 的初衷。

   解决方法是，引入相应 js 模块的类型文件，例如 lodash，需要 

   `npm install @types/lodash -D` 。

   关于哪些 js 模块有相应的 types ，可以在  [TypeSearch](https://microsoft.github.io/TypeSearch/) 中搜索（需科学上网）。

### 5.4 使用 WebpackDevServer 实现请求转发

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

### 5.5 WebpackDevServer 解决 React 单页面应用路由的问题

流程：

1. 安装 react-router-dom 

   ```bash
   npm install react-router-dom -save
   
   ```

2. index.js 文件中，使用 react 路由，并且处理路由逻辑.

   ```js
   import React, { Component } from 'react';
   import { BrowserRouter, Route } from 'react-router-dom';
   import ReactDom from 'react-dom';
   import Home from './home';
   import List from './list';
   
   class App extends Component {
     render() {
       return (
         <BrowserRouter>
           <div>
         		// 当访问根路径时，展示 Home 这个组件
             <Route path="/" exact component={Home} />
   					// 当访问 /list 时，展示 List 这个组件
             <Route path="/list" component={List} />
           </div>
         </BrowserRouter>
       );
     }
   }
   
   ReactDom.render(<App />, document.getElementById('root'));
   
   ```

   代码中 Home 和 list 组件一个在页面上显示 Home, 另一个在页面上显示 List。

   当我们访问 `http://localhost:8080/list` 时，后端以为我们要访问的是 list.html 这个文件，但是这个文件在后端中并不存在，所以显示找不到页面。

   那怎样去解决这个问题呢？

   通过配置 WebpackDevServer 就可以解决这个问题。

3. 配置 WebpackDevServer

   ```js
   devServer: {
   	...
     historyApiFallback: true,
     ...
   }
   
   ```

   当进行了上面的配置之后，只要是访问这台服务器，无论访问哪一个文件，都会将访问的地址变为访问根路径，也就是访问根路径下的 `index.html` 这个文件，然后再通过路由处理使得访问真正想要访问的页面，**这就是为什么称为单页面应用的原因**。

   关于 `historyApiFallback ` 的配置可以是一个对象，可配置的参数还有很多，但是一般在平时的开发中使用 `historyApiFallback: true` 就可以了。

   **注意：**

   上面的配置是在 WepackDevServer 中配置的，只在开发环境中有效，因此想要在线上实现相同的效果，需要后端的小伙伴在后端的服务器上进行类似的配置，也就是将用户请求的路径都变为请求 index.html 。

   **其实，只要是在 WevpackDevServer 中进行的配置，是为了模拟后端服务器的环境，真正到了线上的环境都是需要后端的小伙伴在后端的服务器上进行相应的配置的。**

### 5.6 ESLint 在 Webpack 中的配置（1）

ESLint 本身和 Webpack 是没有多大的关系的。

在 webpack 中配置 ESLint 的流程：

1. 安装 ESLint 。

```bash
npm install eslint -D

```

2. 配置 ESLint ，生成 ESLint 的配置文件，利用 `npx eslint --init` 可以根据向导进行配置快速生成 eslint 配置文件。

   > 注：在 windows 下运行 `npx eslint --init` 时使用 window 自带的命令行工具比较靠谱，使用 GitBash 总是不知道选项选没选上。

3. 使用 ESLint 。

   有两种方式：

   1. 使用 `npx eslint 要检查的文件或目录`，在命令行找那个就会显示出检查结果。

      缺点，只在命令行中显示错误，需要根据命令行中的提示一行一行地去找错误然后再在代码中去更改。

   2. 使用 eslint 插件

### 5.7 ESLint 在 Webpack 中的配置（2）

前面两种方式中，第一种方式查找错误比较费事，第二种方式在有些编辑器中使用无法安装插件比如 sublime，那怎样来解决这个问题呢？

还是使用 webpack ？

借助 webpack 中的 `eslint-loader`， wbpack 的配置文件如下：

```js
use: [
  'babel-loader',
  'eslint-loader'
]

```

即，在遇到 js 文件时，先使用 eslint-loader 检查是否有问题，再去使用 babel-loader 进行代码的转换。

在 webpack 配置文件的 devServer 配置中添加 ：

```js
devServer: {  
	overlay: true,
  ...
}

```

这样在进行打包时就会出现 ESLint 的检查结果，包括行数和列数，配合 vi 可以快速定位到问题行。

ESLint 检查结果：

![ESLint检查结果.png](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/ESLint检查结果.png)

eslint-loader 的配置有很多，例如：

```js
{
  loader: 'eslint-loader',
    options: {
      fix: true // 对于一些简单的 ESLint 检查出的错误进行自动修正
    }
}

```

在实际工作中一般是不会使用 eslint-loader 的，因为使用它会影响打包的时间。

最佳的实践方式是在使用 git 将代码提交到仓库是进行 ESLint 代码规范的检查，如果代码不规范就不能提交到远程的仓库。

实现方式是使用 git 中的一个钩子，命令如下：

```bash
git 钩子 eslint src

```

在提交的命令窗口中会出现 ESLint 的检查结果，如果出现错误可以根据那个结果来修改代码。

当然这种方式的缺点在于错误就不直观了，到底使用哪一种方式也要根据实际的情况去定。

### 5.8 webpack 性能优化

在打包大型项目的时候一次打包需要消耗特别长的时间，可以从以下方面出发提升 webpack 的打包速度。

1. 跟上技术的迭代（Node，Npm，Yarn）

   使用新的版本，因为新的版本一般都会有性能优化，webpack 是建立在 node 之上的，如果 node 的性能得到提升，那么 webpack 的性能自然也就能得到提升，npm，yarn 这种的包管理工具如果性能得到提升，那么对于 webpack 中处理包的引入等自然也就能得到提升。

2. 在尽可能少的模块上应用 Loader

   使用 exclude 或者 include 这种语法来规定 loader 的作用范围从而减少 loader 的使用

3. Plugin 尽可能精简并确保可靠

   Plugin 尽可能少地使用，并且尽量使用社区推荐的，可靠的 Plugin。

4. resolve 参数合理配置

   ```js
   resolve: {
     extensions: ['js', 'jsx'],
     mainFiles: ['index', 'child']
   }
   
   ```

   上面的配置的作用是：当引入 a.js 时， `import a from './a'` ，会在当前目录下先去查找是否有 a.js ，如果没有会再去查找是否有 a.jsx. 

   `mainFiles: ['index', 'child']` 的作用是当引入只写了目录时会先去查找当前目录下是否有 index 文件，如果没有会再去查找是否有 child 文件。

   `mainFiles: ['index', 'child']` 这个参数的配置实际上就是多余的，因为会默认查找 当前目录下的 index 文件，没有必要写 child 文件。

   因此 resolve 的配置一定要合理，因为如果很多选项会很消耗查询文件的时间。

5. 使用 DllPlugin 

   思想就是：第一次打包的时候将第三方模块都打包到一个 dll 文件中，之后再打包的时候第三方模块就不用再进行打包了，直接从 dll 文件中引入，这样在以后的打包过程中就会节省很多时间。

   比较详细的分析总结的博客 [《》]()

6. 控制包文件的大小

   要控制打包生成的文件尽可能地小，如果某个文件比较大要进行合理地拆分。

7. thread-loader, parallel-webpack, happypack 多进程打包

   webpack 使用 node 来运行的，所以默认单进程的打包过程，可以通过一些方法实现多进程打包提高性能。

8. 合理使用 sourceMap 

   sourceMap 生成的越详细打包的时间就会越长，所以要选择合理的生成 sourceMap 的方式。

9. 结合 stats 分析打包结果

   例如通过分析哪个模块打包分析的时间比较长等信息及时发现问题作出修正。

10. 开发环境和内存编译

    使用 webpackDevServer 打包后的打包文件不会写入本地硬盘中而是存储在内存中，内存的读取比硬盘要快得多，所以在开发环境下使用 webpackDevServer 比直接用 webpack 在 dist 目录下生成打包文件要快一些。

11. 开发环境无用插件剔除

    例如在开发环境下却把 mode 设置成了 `production`，这样还会有一个将代码压缩的过程也会浪费打包的时间。



