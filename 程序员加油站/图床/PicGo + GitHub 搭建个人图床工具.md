# PicGo + GitHub 搭建个人图床工具

## [PicGo介绍](https://github.com/Molunerfinn/PicGo)

这是一款图片上传的工具，目前支持`微博图床`，`七牛图床`，`腾讯云`，`又拍云`，`GitHub`等图床，未来将支持更多图床。

所以解决问题的思路就是，将本地的文件，或者剪切板上面的截图发送图床，然后生成在线图片的链接，这样就可以让Markdown文档飞起来了，走到哪就可以用到哪😊。

![img](https:////upload-images.jianshu.io/upload_images/3146329-a818a6851f18d336.png?imageMogr2/auto-orient/strip|imageView2/2/w/800/format/webp)

Pic Go支持的图床

在众多的图床中，我选择的GitHub图床，其它类型的图床如果你们有兴趣的话可以试一下。

## 创建自己的GitHub图床

### 1. 创建GitHub图床之前，需要注册/登陆GitHub账号

> 申请GitHub账号很简单，我就不演示了

### 2. 创建Repository

![img](https:////upload-images.jianshu.io/upload_images/3146329-25f1990a188f9103.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

点击"New repository"按钮

![img](https:////upload-images.jianshu.io/upload_images/3146329-596d8282a217da7e.png?imageMogr2/auto-orient/strip|imageView2/2/w/1097/format/webp)

最后1234步骤执行

> - 我已经建立过一个同名的repository的，所以第一步会显示红色
> - 第三步，为repository初始化一个README.md文件可以根据需求选择，非必选

## 3.生成一个Token用于操作GitHub repository

![img](https:////upload-images.jianshu.io/upload_images/3146329-69a2b38f4634e509.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

回到主页，点击"Settings"按钮

![img](https:////upload-images.jianshu.io/upload_images/3146329-833a01142ad92e6d.png?imageMogr2/auto-orient/strip|imageView2/2/w/1060/format/webp)

进入页面后，点击"Developer settings"按钮

![img](https:////upload-images.jianshu.io/upload_images/3146329-3ba67ab9f5224bda.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

点击"Personal access tokens"按钮

![img](https:////upload-images.jianshu.io/upload_images/3146329-8d67725f463f5fc8.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)

创建新的Token

![img](https:////upload-images.jianshu.io/upload_images/3146329-2cddeffa8fe35933.png?imageMogr2/auto-orient/strip|imageView2/2/w/1123/format/webp)

填写描述，选择"repo",然后点击"Generate token"按钮

> 注：创建成功后，会生成一串token，这串token之后不会再显示，所以第一次看到的时候，就要好好保存

# 配置PicGo

## 1. 下载运行PicGo

![img](https:////upload-images.jianshu.io/upload_images/3146329-9fe439e9625c741f.png?imageMogr2/auto-orient/strip|imageView2/2/w/1077/format/webp)

下载zip包后，解压，运行可执行文件

## 2. 配置图床

![img](https:////upload-images.jianshu.io/upload_images/3146329-33b10cfcc147cdc8.png?imageMogr2/auto-orient/strip|imageView2/2/w/800/format/webp)

如图配置

> - 设定仓库名的时候，是按照“账户名/仓库名的格式填写”
> - 分支名统一填写“master”
> - 将之前的Token黏贴在这里
> - 存储的路径可以按照我这样子写，就会在repository下创建一个“img”文件夹
> - 自定义域名的作用是，在上传图片后成功后，PicGo会将“自定义域名+上传的图片名”生成的访问链接，放到剪切板上`https://raw.githubusercontent.com/用户名/RepositoryName/分支名，`，自定义域名需要按照这样去填写

## 3.快捷键及相关配置

![img](https:////upload-images.jianshu.io/upload_images/3146329-8d2c2729e4f16fd6.png?imageMogr2/auto-orient/strip|imageView2/2/w/800/format/webp)

可以按照这样配置

> 注：可以将快捷键设置为`ctrl+shift+c`

# 总结

将上面的步骤都设置好之后，就可以让自己的Markdown文档飞起来了，每次截图之后，都可以按一下`ctrl+shift+c`，这样就会将剪切板上面的截图转化为在线网络图片链接，简直就是爽的不要不要的！！