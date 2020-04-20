# 解决 windows 下 Git Bash git log 命令中文乱码的问题

> 参考：  https://www.cnblogs.com/jimmycan/p/5466014.html 
>
> 速览：
>
> - 解决在 Windows 下 Git Bash git log 命令中文乱码的问题

在 `C:\Users\你的用户名` 目录下找到 `.gitconfig` 文件，添加下面的内容：

```shell
[gui]
encoding = utf-8  
[i18n]
commitencoding = utf-8 
[svn]
pathnameencoding = utf-8
```

通过英文名字可知每步设置的意义，就不再赘述。

重启一次即可解决问题。

完