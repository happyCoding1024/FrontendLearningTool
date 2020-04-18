[TOC]

# Apache 注意点

## 1. 当某个目录下没有默认文档(index.html)时，Apache会在网页上显示该目录下的内容

![1568174083449](C:\Users\zgc\AppData\Local\Temp\1568174083449.png)

![1568174064950](C:\Users\zgc\AppData\Local\Temp\1568174064950.png)

## 2. 当修改完httpd.conf配置文件，就算是立即重启服务器，这个时候再访问页面也不会立刻生效

由于浏览器缓存的问题，这个时候必须`ctrl+R`刷新页面后才会看到配置更改过后的页面。

## 3. 域名后缀命名问题

在使用apache配置虚拟主机时，`servername`(域名)的后缀名一般不要很奇怪，例如将域名设置成baixiu.abcd,在浏览器地址栏中输入时，会出现下面的情况：

![1568250098249](C:\Users\zgc\AppData\Local\Temp\1568250098249.png)

敲回车后会直接利用Google进行搜索。

一种补救方法是在前面加上`http`协议

![1568250621868](C:\Users\zgc\AppData\Local\Temp\1568250621868.png)

设置成常规的域名后缀后，会变成下面的情况：

![1568250076015](C:\Users\zgc\AppData\Local\Temp\1568250076015.png)

## 4. 虚拟主机

虚拟主机是Apache提供的一项功能，可以实现一台服务器上服务多个网站，说白了就是多个域名对应这个服务器的`IP`地址(就是说通过那些域名解析后得到的`IP`都能访问到这台服务器)。

![1568253323031](C:\Users\zgc\AppData\Local\Temp\1568253323031.png)



出现forbidden的情况是因为在`httpd.conf`文件里将根目录(/)都设置了禁止访问

```html
<Directory />
    AllowOverride none
    Require all denied //禁止访问目录中的所有内容
</Directory>
```

要想能够访问某个目录需要重新写一个`Drectory`来将某个目录变为能够访问的，代码如下：

```html
<Directory "D:/www">
    Options Indexes FollowSymLinks
    AllowOverride None
    Require all granted
</Directory>
```

上面的代码要放在在`httpd-vhosts.conf`文件`<VirtualHost *:80> </VirtualHost>` 标签里面 ，如下所示：

```html
<VirtualHost *:80>
    # 网站管理员(站长)
    ServerAdmin webmaster@dummy-host.example.com
    # 根目录，也就是将文档放在哪个目录里
    DocumentRoot "D:/site0"
    # 让当前目录变为可访问的
    <Directory "D:/site0">
    Options Indexes FollowSymLinks
    AllowOverride None
    Require all granted
    </Directory>
    # 访问的域名(真正到了公司后会变成公司购买的域名)
    ServerName site0.io
    ErrorLog "logs/site0.io-error.log"
    CustomLog "logs/site0.io-access.log" common
</VirtualHost>
```

