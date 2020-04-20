# 你真的理解devDependencies和dependencies区别吗?

> 原文链接： https://blog.csdn.net/achenyuan/article/details/80899783 

网上统一的观念是

`devDependencies` 用于本地环境开发时候。
`dependencies` 用户发布环境

其实看名字我也知道是这个意思，我觉得没解释情况。

**`devDependencies` 是只会在开发环境下依赖的模块，生产环境不会被打入包内。**

通过NODE_ENV=developement或NODE_ENV=production指定开发还是生产环境。

而 **`dependencies` 依赖的包不仅开发环境能使用，生产环境也能使用。**

其实这句话是重点，按照这个观念很容易决定安装模块时是使用--save还是--save-dev。

