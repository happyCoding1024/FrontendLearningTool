# React启动查看http://localhost:3000的原因

当我们建立好React项目后，npm start启动服务器查看[http://localhost:3000](https://link.jianshu.com?t=http%3A%2F%2Flocalhost%3A3000)。那么npm start后我们的经过了怎样的过程，**为什么会查看3000而不是其他端口呢？**
 首先，我们看看当npm start后我们服务器怎样运行

![img](https:////upload-images.jianshu.io/upload_images/10205349-10949eef738155c5.png?imageMogr2/auto-orient/strip|imageView2/2/w/640/format/webp)

我们可以看到在npm start后，实际上我们服务器去了C:\Users\Administrator\react\myworkspace\shopping-front，然后运行了react-scripts start。打开package.json，也就是这个项目所需要的各种模块，以及项目的配置信息（比如名称、版本、许可证等元数据）。我们发现

![img](https:////upload-images.jianshu.io/upload_images/10205349-ba0e0bffed06c0b7.png?imageMogr2/auto-orient/strip|imageView2/2/w/338/format/webp)

瞬间明白了。我们再回到原来的问题上，为什么是3000端口？当我们明白此时运行的是react-scripts,对应的找到项目中node_modules\react-scripts\bin\react-scripts.js

![img](https:////upload-images.jianshu.io/upload_images/10205349-82655fa638571590.png?imageMogr2/auto-orient/strip|imageView2/2/w/440/format/webp)

当script值是start时，执行‘../scripts/’+script,也就是\node_modules\react-scripts\scripts中的start.js。我们打开start.js


![img](https:////upload-images.jianshu.io/upload_images/10205349-3b39ffdc9e57fd26.png?imageMogr2/auto-orient/strip|imageView2/2/w/511/format/webp)
 当我们启动服务器，DEFAULT_PORT的默认值是3000，我们访问的就是默认端口3000，这就是我们查看端口3000的原因。**再想想，我们如果想改访问端口又该怎么改？****第一种**



![img](https:////upload-images.jianshu.io/upload_images/10205349-14a0df190c735ba6.png?imageMogr2/auto-orient/strip|imageView2/2/w/644/format/webp)

**第二种**：我们在packjson.json中将script中
 `"start": "react-scripts start",`
 改为
 `"start": "set PORT=3001&&react-scripts start",`
 我们npm start

![img](https:////upload-images.jianshu.io/upload_images/10205349-7ac14c789b5f061b.png?imageMogr2/auto-orient/strip|imageView2/2/w/645/format/webp)

同样可以改变访问端口。