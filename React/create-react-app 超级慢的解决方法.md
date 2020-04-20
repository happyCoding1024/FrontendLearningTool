#### create-react-app 超级慢的解决方法

在操作官方实例Create React App时,需要执行指令：

```js
create-react-app my-app
```

来创建一个新的React应用。由于某原因,在拉取各种资源时,往往会巨慢,一直卡在

> fetchMetadata: sill mapToRegistry uri http://registry.npmjs.org/whatwg-fetch

解决方案是换源,虽然平常使用cnpm来代替npm,但也只是使用新的指令而已，而在寻求create-react-app的相关配置希望修改registry时失败了，最后发现create-react-app指令默认调用npm，于是直接把npm的register给永久设置过来就好了，这样使用cnpm或者npm就没差别了。

```js
npm config set registry https://registry.npm.taobao.org
-- 配置后可通过下面方式来验证是否成功
npm config get registry
-- 或npm info express
```

设置成功后，再执行 `create-react-app my-app`

>  参考文章：[npm换源]( https://npm.taobao.org/ )

