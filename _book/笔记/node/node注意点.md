[TOC]

# node学习注意点



## 1. node中没有全局作用域，只有模块作用域



## 2. 如果网页中显示的中文是乱码，而且是编码问题导致的，请问是哪里出了问题，如何解决

1. node服务端程序中，没有设置响应内容的编码方式，应该通过设置setHeader中的Content-Type参数content_type来设置响应内容的编码方式为utf-8.

   ```javascript
   server.on("request", function (req, res) {
       fs.readFile("../jQuery/2travelPhotoAlbum.html", function(err, data){
           if(err){
               res.setHeader("Content-Type", "text/plain;charset=utf-8")
               res.end("文件读取失败，请稍后重试！");
           }else{
               res.setHeader("Content-Type", "text/html;charset=utf-8");
               res.end(data);
           }
       })
   });
   ```

2. 也可以在html文件中通过meta元数据来生命当前文本的编码格式为utf-8，浏览器会按照utf-8的编码格式来解析收到的响应内容。

   ```javascript
       <meta charset="UTF-8">
   ```

   





