[TOC]

> [art-template官网](http://aui.github.io/art-template/zh-cn/docs/index.html )

# art-template模板引擎

## 1. 在浏览器中使用art-template模板引擎

- 注意在浏览器中使用需要引用`lib/template-web.js`文件
- script标签中的type属性不能写成javascript，否则就会按照js去解析了

```javascript
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>在浏览器中使用art-template</title>
    <script src="node_modules/art-template/lib/template-web.js"></script>
</head>
<body>
<script type="text/template" id="tpl">
    大家好，我叫： {{ name }}
    今年:{{age}}
    我喜欢：{{ each hobbies }} {{ $value }} {{/each}}
</script>
<script>
    var ret = template('tpl', {
        name: 'Jack',
        age: '18',
        hobbies: [
            'coding',
            'sing',
            'dance'
        ]
    });
    console.log(ret);
</script>
</body>
</html>                                   
```

**输出：** 

```javascript
大家好，我叫： Jack
今年:18
我喜欢： coding  sing  dance 
```
- **强调**： 模板引擎不关心字符串的内容，只关心自己能认识的模板标记语法，例如 {{}} 语法倍称之为mustache 语法。

## 2. 在node中使用模板引擎

- 安装

  * npm install art-template
  * 该命令在哪里执行就会把包下载到哪里，默认会下载到node_modules目录下中
  * node_modules 不要改，也不支持改

- 在node中使用 art-template 模板引擎，其实模板引擎最早就是诞生于服务器领域，后来才发展到了前端

  使用步骤：

  1. 安装， npm install art-template
  2. 在需要使用文件的模块中加载art-template
      - 只需要使用require方法加载就可以了： require('art_template')
      - 参数中的 `art_template` 就是下载的包的名字
      - 也就是说利用npm时install的是什么，则在node中require的就是什么
  3. 查文档，主要是看模板引擎提供的API. **[art-template官网](http://aui.github.io/art-template/zh-cn/docs/index.html )**
  4. 服务端渲染：
      * 说白了就是在服务端使用模板引擎
      * 模板引擎最早诞生于服务端，后来才发展到前端

  ![服务端渲染黑马node](C:\Users\zgc\AppData\Local\Temp\1567910329681.png)

  5. 客户端渲染：

     ![客户端渲染黑马node](C:\Users\zgc\AppData\Local\Temp\1567910428736.png)

     

  6. 客户端渲染不利于SEO(搜索引擎优化)，ajax请求的数据爬虫是爬不到的，用户搜索不到。

     + 例如，京东主页中的商品大多采用的服务端渲染，也就是说客户端请求过来的是完整数据的页面只需渲染显示就好不需要再发送ajax请求请求数据，这样做的好处是利于SEO，网络爬虫能够爬到，但是问题加载页面的速度没有客户端渲染快，因为客户端渲染可以做到先把部分页面显示，数据再发起请求。用户马上可以看到部分页面，提升了用户体验。商品评论列表，不需要考虑SEO，所以采用的客户端渲染。
     + 真正的网站是两者结合起来的
     + 判断看到的网页哪些内容是客户端渲染，哪些是服务端渲染的方法是打开网页源代码，复制网页中的某些内容，在网页中查找，如果能找到说明是服务端渲染，如果找不到说明是客户端渲染，即用ajax后来请求来的数据。

  

  

