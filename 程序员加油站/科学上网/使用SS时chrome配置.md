## 浏览器设置教程 - Chrome

**这里假设您已经配置好 Shadowsocks 客户端，具体请参考**

- [Windows 下安装配置 Shadowsocks 使用教程](https://portal.shadowsocks.center/index.php?rp=/knowledgebase/47)
- [macOS 下安装配置 Shadowsocks 使用教程](https://portal.shadowsocks.center/index.php?rp=/knowledgebase/48)
- [Linux 下安装配置 Shadowsocks 使用教程](https://portal.shadowsocks.center/index.php?rp=/knowledgebase/40)

## 安装扩展

- 开始前请在 Chrome 地址栏内访问 chrome://settings/system 确认 Chrome 的代理没有被其他的扩展控制

- 可以通过 Chrome 商店安装 [Proxy SwitchyOmega](https://chrome.google.com/webstore/detail/padekgcemlokbadohgkifijomclgjgif) 扩展 (开启系统代理后，访问该连接)。

- 单击“添加至 

  Chrome 

  ” > 单击 “扩展应用程序”。

  ![安装到chrome](bro-chromeinstall.png)

**如果无法访问** 

- Chrome / Chromium 72 以上版本无法直接拖放安装，手动安装方法请参考：[浏览器设置教程 - Chrome 手动安装 SwitchyOmega](https://portal.shadowsocks.center/knowledgebase/115/Chrome--SwitchyOmega.html)
- 其他 Chrome 核心浏览器可访问 `chrome://extensions/`，请使用 Chrome 浏览器复制粘贴输入地址栏并回车访问。
- 在 [Github](https://github.com/FelisCatus/SwitchyOmega/releases) 下载 SwitchyOmega.crx 文件并拖移入`chrome://extensions/` 。

![使用Guthub](bro-chrome-useGithub.png)

## 扩展的配置

**「推荐」** 可以直接使用本站提供的已经设置好的备份直接恢复配置。

通过下面链接下载 SwitchyOmega 的配置文件：

|                  Windows/Linux/macOS(1080)                   |      |
| :----------------------------------------------------------: | :--: |
| [SwitchOmega + GFWList 自动切换配置文件(1080)](https://portal.shadowsocks.center/dl.php?type=d&id=74) |      |
| 适用于 Shadowsocks-Windows / Linux / ShadowsocksX(macOS) 等默认端口为 1080 的客户端。 |      |

 

- 点击 “Proxy SwitchyOmega” > "选项" > "导入/导出" > "从备份文件中恢复" 。
- 选择刚才下载的配置文件 > "打开"。
- 点击 "Switchyomega" 图标， 可以看到如下四个模式：

 

|  连接方式   |              功能              |
| :---------: | :----------------------------: |
|  直接连接   |    所有访问都不是使用代理。    |
|  系统代理   | 访问网站与系统的默认代理有关。 |
| Shadowsocks |      所有访问都使用代理。      |
|  自动切换   | 根据规则区分网站是否使用代理。 |

> 本站提供的配置使用了 "GFWList", 可以使大部分无法直接访问的网站默认使用代理，推荐日常使用， 在下文中会包含 "自定义配置规则"。

![从备份文件中恢复](bro-switchyomega.png)

## 自定义规则

- 点击"自动切换模式" > "添加条件"。
- 条件类型选择： "域名通配符"。
- 条件设置填写： "*.域名".
- 情景模式： 选 "Shadowsocks" 则经过代理， 选 “直接连接” 则不经过代理。

![自定义规则](bro-swocustomize.png)