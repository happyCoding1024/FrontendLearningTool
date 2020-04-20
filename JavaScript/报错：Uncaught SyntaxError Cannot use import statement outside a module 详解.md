## 报错：Uncaught SyntaxError: Cannot use import statement outside a module 详解

> 原文链接:  https://blog.csdn.net/qq_43340929/article/details/101862294 

JS错误Uncaught SyntaxError: Cannot use import statement outside a module< 分析及解决方法

错误信息：

![]( https://img-blog.csdnimg.cn/20191001195028823.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzMzQwOTI5,size_16,color_FFFFFF,t_70 )

错误分析：
HTML 网页中，浏览器通过 script 标签加载 JavaScript 脚本。由于浏览器脚本的默认语言是 JavaScript，因此type="application/javascript"可以省略。

在报错中了解到，是说无法在模块外部使用import语句，因为Module 的加载实现的是es6语法，所以在浏览器加载html文件时，需要在script 标签中加入type="module"属性。

解决办法：

![solve]( https://img-blog.csdnimg.cn/20191001200159251.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzMzQwOTI5,size_16,color_FFFFFF,t_70 )



