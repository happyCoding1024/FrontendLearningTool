# Shadowsocks 客户端设置教程 - macOS

## 系统要求

**在安装之前，请始终确保您的系统满足最低系统要求。**

您需要具备 MacOS 10.11 或更高版本才能运行 ShadowsocksX-NG。如果您的操作系统版本较旧， 则请先升级到 MacOS 10.11 或更高版本。

## 安装 ShadowsocksX-NG

按照下面的说明在 MacOS 上下载并安装 ShadowsocksX-NG。

#### 1. 下载客户端

访问 Shadowsocks [下载页面](https://github.com/shadowsocks/ShadowsocksX-NG/releases/)。 点击最新版本的 `ShadowsocksX-NG.x.x.x.zip` 进行下载 (`x.x.x`为版本号) 。

![下载客户端](mac-shadowsockDownload.png)

或是前往 [客户中心](https://portal.shadowsocks.center/index.php?rp=/download/category/1/Shadowsocks-.html) 下载

#### 2. 安装客户端

双击解压 `ShadowsocksX-NG.x.x.x.zip` , 获取 `ShadowsocksX-NG`。

![安装客户端](mac-shadowsocksIcon.png)

将 "ShadowsocksX-NG" 拖移到 “访达”里面的 “应用程序”。

!["ShadowsocksX-NG" 移动到 "访达" 里面的 "应用程序"](mac-shadowsocksDrag.gif)

在 "应用程序" 中双击 "ShadowsocksX-NG" > 选择 "打开"。

![选择打开](mac-NGprompt.png)

## 配置 Shadowsocks 账号

#### 在您的电脑上， 执行下列操作：

**点击[这里](https://portal.shadowsocks.center/knowledgebase/46/-.html)学习如何使用我们的网站查看节点信息。**

- 点击屏幕顶部菜单栏的 ![menu_icon_disabled](mac-menu_icon_disabled.png)> "服务器" > "服务器设置"。

![点击屏幕最上方菜单栏](mac-menubar.png)

- 点击窗口上的 "+" > 填写 "地址" > 填写 “服务端口" > 选择 ”加密方法"。
- 填写 "密码“ > 填写"备注" 为可选项。
- 点击 "打开Shadowsocks" 。
- 当显示 `Shadowsocks: On`时，表示系统代理已经打开。

![服务器设置，打开ss](mac-shadowsocksSetting.png)

#### 可以通过二维码方式单独增加节点， 在您的电脑上， 执行下列操作：

**点击[这里](https://portal.shadowsocks.center/knowledgebase/46/-.html)学习如何使用我们的网站查看二维码。**

此二维码同样适用于其他客户端。

- 点击屏幕顶部菜单栏的 ![menu_icon_disabled](https://portal.shadowsocks.center/files/images/mac-menu_icon_disabled.png) > "扫描屏幕上的二维码" > 当看到 "已添加新的Shadowsocks服务器"，代表添加成功。
- 点击 "打开Shadowsocks" 。
- 当显示 `Shadowsocks: On`时，表示系统代理已经打开。

![打开ss](mac-QR.png)

## 配置本地端口为1080

点击屏幕右上方菜单栏的 >”偏好设置” > 高级 >本地 Socks5 端口 > 从1086 修改为 1080

![img](pe17B4JdGqhOucE.png)

## 配置系统代理模式

- 点击屏幕右上方菜单栏的 ![menu_icon_disabled](https://portal.shadowsocks.center/files/images/mac-menu_icon_disabled.png) > "PAC自动模式"。

![pac设置](mac-pac.png)

## 注意事项

- **PAC 模式** 表示可以实现自动代理， 及本来可以访问的网站不会经过代理，推荐日常使用。
- **全局模式** 表示计算机内大多数流量都会经过代理， 不推荐日常使用。

## 配置 Firefox 的代理

**如需使用 Firefox 浏览器 通过代理浏览网页，请参考下面链接：**
[Firefox上设置代理](https://portal.shadowsocks.center/index.php?rp=/knowledgebase/42)

## 配置 Chrome 的代理

**如需使用 Chrome 浏览器通过代理浏览网页，请参考下面链接：**
[Chrome + Proxy SwitchyOmega 设置](https://portal.shadowsocks.center/index.php?rp=/knowledgebase/50)