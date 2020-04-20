### You are using the runtime-only build of Vue where the template compiler is not available.

> 原文链接：  https://blog.csdn.net/wxl1555/article/details/83187647#commentBox 

在升级脚手架到vue-cli3.0版本的时候出现了这个报错：

```
[Vue warn]: You are using the runtime-only build of Vue where the template compiler is not available. Either pre-compile the templates into render functions, or use the compiler-included build.
```

我在这里大概说一下出现这个报错的原因在哪里和解决办法

原因
vue有两种形式的代码 compiler（模板）模式和runtime模式（运行时），vue模块的package.json的main字段默认为runtime模式， 指向了"dist/vue.runtime.common.js"位置。

这是vue升级到2.0之后就有的特点。

而我的main.js文件中，初始化vue却是这么写的，这种形式为compiler模式的，所以就会出现上面的错误信息

```js
// compiler
new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: { App }
})
```

解决办法
将main.js中的代码修改如下就可以

```js
//runtime

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app")
```


到这里我们的问题还没完，那为什么之前是没问题的，之前vue版本也是2.x的呀？

到这里我们的问题还没完，那为什么之前是没问题的，之前vue版本也是2.x的呀？

这也是我要说的第二种解决办法

因为之前我们的webpack配置文件里有个别名配置，具体如下

```js
resolve: {
    alias: {
        'vue$': 'vue/dist/vue.esm.js' //内部为正则表达式  vue结尾的
    }
}
```


也就是说，import Vue from ‘vue’ 这行代码被解析为 import Vue from ‘vue/dist/vue.esm.js’，直接指定了文件的位置，没有使用main字段默认的文件位置

所以第二种解决方法就是，在vue.config.js文件里加上webpack的如下配置即可，

```bash
configureWebpack: {
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js' 
      }
    }
```


既然到了这里我想很多人也会想到第三中解决方法，那就是在引用vue时，直接写成如下即可

```js
import Vue from 'vue/dist/vue.esm.js'
```

