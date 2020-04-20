# npm

## npm 常用命令

```bash
# 更新 npm
npm install npm@版本号 
npm install npm@latest # 最新版本

# 下载包
npm install 安装包
npm install 安装包@版本号 

# 更新包
npm update 安装包

# 删除安装包
npm uninstall 安装包

```

## npm 常用配置

执行 npm init 之后会问你一系列的问题，在 npm 的眼里这个项目就是一个包，所以首先会让你填写 package name，不能有大写字母，在使用 import 等方法导入时，例如 `import React from 'react'`，react 就是这里的 package name。

还有一个要强调的就是 `entry point`，当别人引入我们包的时候，我们的包要经过执行后返回内容，这个 entry

point 指定的文件就是程序开始执行的入口文件。

```bash
keyword: 编写上后更有利于别人搜索到你的包
license：使用 MIT 就可以
scripts: 定义一些运行的脚本，例如 npm run dev 中的 dev 就是在 scripts 中定义的
```

