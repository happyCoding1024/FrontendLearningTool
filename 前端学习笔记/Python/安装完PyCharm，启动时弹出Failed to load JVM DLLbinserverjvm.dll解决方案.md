# 安装完PyCharm，启动时弹出"Failed to load JVM DLL\bin\server\jvm.dll"解决方案

问题描述：打开PyCharm时，弹出“Failed to load JVM DLL\bin\server\jvm.dll   if you already have a 32-bit JDK install....”

解决方案：

别人的解决方案：

（1）安装Microsoft Visual C++ 2010 Redistributable Package ；

（2）然后再运行pycharm；

（3）问题解决。

但经检查我电脑上之前就已经成功安装了Microsoft Visual C++ 2010 Redistributable Package，所以这个方法对我无效。

我的解决方案：

（1）下载JDK_8.0.1310.11_32bit；（下载链接：https://pan.baidu.com/s/16Wsq3S1isYAHLIPEJujymw 密码：hf2n）

（2）配置环境变量：JAVA_HOME；

（3）重启电脑让配置的环境变量生效；

（4）运行PyCharm，问题解决。


