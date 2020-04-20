## 在windows 下如何解决Git中 warning: LF will be replaced by CRLF in README.md.

> 原文链接：   https://blog.csdn.net/cfarmerreally/article/details/79940167 

什么是CRLF/LF？

Carriage-Return 回车符\r， Line-Feed 换行符\n

在Windows环境中，换行符是CRLF，也就是\r\n，但是在Linux环境中，换行符是LF，也就是\n。

git如何处理换行符?
git在维护版本库的时候统一使用的是LF，这样就可以保证文件跨平台的时候保持一致。
在Linux下默认的换行符也是LF，那也就不存在什么问题。
在Windows下默认的换行符是CRLF，那么我们需要保证在文件提交到版本库的时候文件的换行符是LF，通常来说有两种方法：

```bash
# 在工作区使用CRLF，使用git commit提交的时候git帮你把所有的CRLF转换为LF。
git config --global core.autocrlf true
# git服务器->lf
# 工作区->crlf
```

> 我采用的是下面这种方式

```bash
# 在工作区使用LF
git config --global core.autocrlf input
# git服务器-> lf
# 工作区->lf
```

为了避免文件中有混用换行符，记得

```bash
git config --global core.safecrlf true
```

