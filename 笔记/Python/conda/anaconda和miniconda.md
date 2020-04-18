> 什么是conda
> conda的基本使用方式

conda是一个开源包管理系统和环境管理系统，用于安装多个版本的软件包及其依赖关系，并在它们之间轻松切换。 它适用于Linux，OS X和Windows，是为Python程序创建的，但可以打包和分发任何软件。

Anaconda是一个开源的Python发行版本，包含了conda、python等180多个科学包及其依赖项。因为包含了大量的科学包，所以Anaconda的安装包比较大。如果为了省时间，也可以使用Miniconda这个较小的发行版。

Miniconda是最小的conda安装环境。Miniconda的下载网址为<https://conda.io/miniconda.html>
Anaconda的下载网址为<https://www.anaconda.com/download/> 可以根据自己的需要，下载python2.7或python3.6版本的

如果是使用linux系统，个人推荐先把文件下载到本地然后再上传到服务器，因为conda.io下载文件真的很慢!下载完成后使用bash conda.sh

python -v看python环境是什么版本，对应下载！我安装的是miniconda的版本，暂时不需要科学计算

```
conda的作用：
1. conda可以给我们提供一个独立的环境，相当于python的virtualenv
conda create -name envname python=2.7
activate envname
2. conda info -envs 列出conda创建所有的环境
conda版本：conda --version
更新conda：conda update conda
切换回当前环境：deactivate
删除环境：conda remove --name flowers --all
制作环境副本：conda create --name flowers --clone snowflakes
查看在环境中安装的第三方包：conda list
搜索可安装的包：conda search
安装新软件：conda install --name packagename beautifulsoup4
也可以使用pip安装：pip install pkg
也可以从其它页面下载安装：conda install --channel https://conda.anaconda.org/pandas bottleneck
删除环境的第三方包：conda remove --name envname pck或者 pip uninstall pck
删除conda：rm -rf ~/miniconda OR  rm -rf ~/anaconda
```