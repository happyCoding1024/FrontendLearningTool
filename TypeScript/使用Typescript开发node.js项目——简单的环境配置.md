# 使用Typescript开发node.js项目——简单的环境配置

> 原文链接：https://segmentfault.com/a/1190000007574276

> 最近在学习`typescript`的过程中，想到也许可以使用ts来开发node.js项目。在网上搜了一下，其实已经有很多开发者实践了这方面的内容。这里，我记录一下自己搭建开发环境的简单过程。

## 使用Typescript开发的好处:

- 较严格的类型检查和语法检查。
- 对`ES6`/`ES2015`/`ES7(部分)`支持比较好。
- 编译后的js文件很干净，也支持多种代码规范。
- 其他，请参见文档。

## 准备

- [node.js v6.9.1](https://nodejs.org/en/) 或者任意的新版本，老版本暂时没有试验。
- `tsc` typescript编译器，使用npm安装:`npm install -g typescript`,当前是`v2.0.10`
- 编辑器：`vscode`
- 命令行终端:windows的cmd

特别提示和吐槽：安装`tsc`可能需要翻墙（如果特别慢的话），所以也可以使用淘宝镜像。

## 建立node.js项目

使用`npm init`在指定的目录中建好项目的目录。

在这里我建立了一个自己的项目目录结构:

```
testTS
|---build                 //编译后的js文件目录
|---src                   //ts文件目录
|---static                //客户端静态文件
|  |---scripts
|  |     |---main.js
|  |----styles
|  |     |---style.css
|  |----assets
|---views                 //html文件目录
|    |---index.html
|---package.json
|---tsconfig.json
```

## 编辑 `tsconfig.json`

在上面的目录结构中有一个`tsconfig.json`文件，用来设置ts的编译选项。
想要获取这份文件，可以在项目根目录下使用`tsc --init`，就会自动建立好一份`.tsconfig.json`。

### 编写需要的配置项

默认情况下，`tsc`会使用默认的编译配置编译目录中的所有`.ts`文件。通过书写`tsconfig.json`，我们可以配置`tsc`的编译行为，达到想要的结果：

```
{
    "compilerOptions": {
        "module": "commonjs",   //指定生成哪个模块系统代码
        "target": "es6",        //目标代码类型
        "noImplicitAny": false, //在表达式和声明上有隐含的'any'类型时报错。
        "sourceMap": false,     //用于debug   
        "rootDir":"./src",      //仅用来控制输出的目录结构--outDir。
        "outDir":"./build",     //重定向输出目录。   
        "watch":true            //在监视模式下运行编译器。会监视输出文件，在它们改变时重新编译。
    },
    "include":[
        "./src/**/*"
    ],
    "exclude":[
        "views",
        "static"
    ]
}
```

### 配置文件注意点

`"compilerOptions"`是编译选项，具体详情，请参见：

- [中文文档](https://github.com/zhongsp/TypeScript/blob/master/doc/handbook/Compiler Options.md)
- [英文文档](http://www.typescriptlang.org/docs/handbook/compiler-options.html)

`"module"`是用来指定设置编译后的js代码，使用何种模块规范。由于是开发node.js项目，所以选择`commonjs`。(有兴趣的话，可以把所有`module`所有可能的值都试一遍，查看编译后的js文件的差别，会发现生成的代码还是很不错的，很干净。)

`"target"`是编译后的js代码遵循何种规范，可以是`es3`/`es5`/`es6`等等，这里为了对比`ts 2.0`代码和`es6`代码的不同，使用了`"es6"`。

`"rootDir"`是一个需要注意的地方，它会告诉编译器，此目录下的文件需要经过编译。那么，如果设置了这个选项，又在外部（比如根目录）放置了`.ts`文件，会怎么样呢？`tsc`会提示一条类似这样的错误：

```
"error TS6059: File 'D:/workplace/nodeWP/testTS/index.ts' is not under 'rootDir' 'D:/workplace/nodeWP/testTS/src'. 'rootDir' is expected to contain all source files."
```

并且，在build的目录中，输出的目录结构也会变化:

![build的目录结构变化](https://segmentfault.com/img/bVFVTY?w=224&h=97)

这显然不是我们想要的结果。

解决方案是使用`include`和`exclude`属性。按照文档说明，"include" 和 "exclude" 属性指定一个文件glob匹配模式列表。表明需要包含的文件目录或文件，以及需要过滤掉的文件或目录（也可以使用`"files"`配置项，不过需要一个一个文件录入,"files" 属性明确指定的文件却总是会被包含在内，不管 "exclude" 如何设置。），详见官方文档说明。

所以，添加`"./src/**/*"`到`"include"`所指向的数组，就可以指定`./src`下的所有文件，是我们真正需要被编译的，其他目录将会被排除。

`"outDir"` 指向了编译后的js代码输出的地方。在文档中也有`"outFile"`选项，可以把所有的ts文件按照一定顺序规则打包成一个文件，具体可以参考文档。在这里，我们优先使用`outDir`。

## 试验一下

在书写完2个配置文件之后，就可以开始撰写代码，并执行编译了。我们试验一下：
在`./src/server.ts`中,写一段简单的：

```
interface ICache{
    useCache:boolean;
    [propName:string]:any;
}
const cache:ICache = {useCache:true};
```

之后，在终端中输入：

```
D:\workplace\nodeWP\testTS>tsc
```

经过编译，会生成`server.js`到build目录中:

```
//server.js
const cache = { useCache: true };
```

## 使用`.d.ts`文件

既然要开发一个项目，显然不会只有这些代码。肯定要用到内建模块和第三方模块。然而，直接导入模块，在`.ts`文件中是不行的。例如：
![直接导入模块，在code.ts/code文件中是不行的](https://segmentfault.com/img/bVFV13?w=870&h=157)

这是由于 typescript 自身的机制，需要一份`xx.d.ts`声明文件，来说明模块对外公开的方法和属性的类型以及内容。感觉有一些麻烦。好在，官方以及社区已经准备好了方案，来解决这个问题。

在TypeScript 2.0以上的版本，获取类型声明文件只需要使用npm。在项目目录下执行安装:

```
npm install --save-dev @types/node
```

就可以获得有关`node.js v6.x`的API的类型说明文件。之后，就可以顺利的导入需要的模块了:

```
import * as http from 'http';
```

完成之后，不仅可以正常的使用`http`模块中的方法，也可以在vscode中获得相应的代码提示。

对于内建模块，安装一个`@types/node`模块可以整体解决模块的声明文件问题。那么，对于浩如烟海的第三方模块，该怎么办呢？官方和社区中也提供了查找和安装的渠道：

- [typings](https://github.com/typings/typings)
- [DefinitelyTyped](http://definitelytyped.org/)
- [TypeSearch](http://microsoft.github.io/TypeSearch/)

## 自动编译和自动重启服务

解决完了声明文件之后，其实我们已经可以使用ts简单的进行node.js项目的开发了。但是，每次写完或者修改代码，就要编译，然后再启动，是一件不大但是相当让人烦躁的事情。为了效率，我们应当改善它。

首先，要让`.ts`文件可以自动被编译。这在上文中的`tsconfig.json`文件中，已经被设置好了，就是`"watch":true `。此时在命令行执行`tsc`命令后，编译器就会时时监控目录中`.ts`文件的变化，然后自动编译。

自动重启node服务器，我们可以使用 [supervisor](https://www.npmjs.com/package/supervisor) 模块解决，或者任何具有类似功能的解决方案都可以。

全局安装supervisor模块`npm install -g supervisor`，之后就可以在终端中使用`supervior ./build/server.js`启动服务器，并在服务器端代码改变之后，自动重启服务器。

## 让启动服务更简单

由于以上的2个命令，在启动时都可能需要附加一些参数，每次输入很麻烦。

可以使用`npm script`来解决。在`package.json`文件中的`"scripts"`中，我们设置:

```
{
    "scripts":{
        "dev": "supervisor -w build ./build/server.js",
        "build": "tsc",
    }
}
```

执行`npm run dev`之后，如果`./build`目录中的`.js`文件发生改变时，就会重启服务器。

执行`npm run build`时，则只会编译ts文件并监控ts的改变。

## 使用例子来试验一下

```
import * as http from 'http';
//====================
const server = http.createServer(function(request:http.IncomingMessage,response:http.ServerResponse):void{
    console.log("create a server...");
    response.writeHead(200,{'Content-Type':'text/plain'});
    response.write('Hello world,we use typescript to develop.');
    response.end();
});

server.listen(3000,function(){
    console.log("Server listening on port 3000");
    console.log("test...");
});
```

## 补充：一个命令实现tsc编译和重启服务器

2017.5.3更新:

感谢大家对本文的支持。有朋友(@Ajaxyz)提出，有没有办法将ts编译监视和重启服务器合并为一个命令？

这里提出一个比较简易的方法，使用`gulp`来管理这2个流程。（如何使用gulp工作，请参考[Gulp API](https://github.com/gulpjs/gulp/blob/master/docs/API.md)）

### 1. 使用`gulp`的`watch()`来监控`ts`文件的变化并重启服务器。

这种方式，需要使用`gulp`和`gulp-typescript`插件（[安装](https://www.npmjs.com/package/gulp-typescript)）

注意的一点是:`gulp-typescript`可能需要在项目的目录安装`typescript`，所以可以在项目的目录中，运行命令行:

```
npm install typescript
```

准备好`gulp`和插件之后，需要书写一份`gulpfile.js`作为`gulp`项目需要执行的任务文件，例子如下:

```
    //gulpfile.js
    
    let gulp = require('gulp');
    let ts = require('gulp-typescript');
    let tsp = ts.createProject('tsconfig.json'); //使用tsconfig.json文件配置tsc
    let exec = require('child_process').exec;
    
    let child;
    //目录常量
    const PATHS = {
        scripts:['./src/**/*.ts'],
        output:'./build',
    };
    //编译ts文件
    gulp.task('build-ts',['restart'],function(){
        return gulp.src(PATHS.scripts)
            .pipe(tsp())
            .pipe(gulp.dest(PATHS.output));    
    });
    //监视ts文件变化
    gulp.task('watch-ts',['build-ts'],function(){    
        gulp.watch(PATHS.scripts,['build-ts']);
    });
    //自动重启服务器
    gulp.task('restart',function(){
        child = exec('supervisor -w build ./build/server.js',(error,stdout,stderr)=>{
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
    });
    //开发任务
    gulp.task('dev',['build-ts','restart','watch-ts']);
```

这样，在开发时，直接在项目目录运行`gulp dev`，就可以启动编译和服务器了。此后，`gulp`会监视`ts`文件的改动，然后编译`ts`文件并重启服务器。刷新页面，就可以看到新结果已经输出在浏览器页面中了。

还有一点需要留意的是,由于`gulp`负责监视`ts`文件的变化，因此请在`tsconfig.json`将`"watch"`设置为`false`或者删掉这个属性。

### 2. 使用`tsconfig.json`监控`ts`文件变化并重启服务器

用这种方式，首先打开`tsconfig.json`对`ts`文件的监视，然后修改`gulpfile.js`文件，如下:

```
    //...requier部分同上面例子，这里省略
    
    let tsChild,        //监视ts文件修改子进程
        serverChild;    //重启服务器子进程
    //编译ts文件
    gulp.task('build-ts',function(){
         tsChild = exec('tsc',(error,stdout,stderr)=>{
            console.log(`tsc====>stdout: ${stdout}`);
            console.log(`tsc====>stderr: ${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
    });
    //自动重启服务器
    gulp.task('restart',function(){
        serverChild = exec('supervisor -w build ./build/server.js',(error,stdout,stderr)=>{
            console.log(`restart=====>stdout: ${stdout}`);
            console.log(`restart=====>stderr: ${stderr}`);
            if (error !== null) {
                console.log(`exec error: ${error}`);
            }
        });
    });
    //开发任务
    gulp.task('dev2',['build-ts','restart']);
```

运行`gulp dev2`，效果和上一个例子一样。

------

以上，提供一种解决办法的方式和思路，仅供参考，如果用在实际环境中，还需要进一步完善功能。

## 结语

本文只是对搭建typescript开发node.js项目的环境做一个简单研究和记录。

最初这样想，也只是好奇可不可以这么做。实际上在node.js稳定版本`v6.9.1`中已经支持了90%的`ES6`。因此，直接使用ES6开发node.js项目，是很好的选择。

不完善的地方，请见谅，后面会慢慢补充。

## 参考资料

[Typescript中文手册](https://github.com/zhongsp/TypeScript)
[Gulp](http://gulpjs.com/)
[gulp-typescript](https://www.npmjs.com/package/gulp-typescript)
[简单使用gulp-typescript](http://www.typescriptlang.org/docs/handbook/integrating-with-build-tools.html#gulp)


