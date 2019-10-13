[TOC]

# pip和conda 添加国内清华镜像

python模块安装，使用国内源可以提高下载速度。

## 1. pip源更改：

pip源有好几个，我一直用的清华的pip源，它5分钟同步一次。
临时使用：
pip 后加参数 -i https://pypi.tuna.tsinghua.edu.cn/simple
例1：pip install -i https://pypi.tuna.tsinghua.edu.cn/simple pandas

例2：我想安装tensorflow-gpu1.4.1,执行：

pip install -i https://pypi.tuna.tsinghua.edu.cn/simple tensorflow-gpu==1.4.1

我们可以点进去那个清华链接，这个链接和下面那个conda的清华链接不太一样，注意，有非常多的镜像


永久使用：
Linux下：
修改 ~/.pip/pip.conf (没有就创建一个)， 修改 index-url至tuna，内容如下：

        [global]
        index-url = https://pypi.tuna.tsinghua.edu.cn/simple

windows下:
直接在user目录中创建一个pip目录，如：C:\Users\xxxx\pip，新建文件pip.ini，内容如下

     [global]
     index-url = https://pypi.tuna.tsinghua.edu.cn/simple

## 2. conda源更改：

conda源国内只有清华有，利用下面的命令找到 `.condarc` 的位置

```
conda config --show-sources
```

然后修改  `.condarc`  文件的内容如下：

    channels: 
    - https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/ 
    - defaults
    
    show_channel_urls: yes


