# 修改Hosts临时解决GitHub的raw.githubusercontent.com无法链接的问题

> 原文链接:  https://www.ioiox.com/archives/62.html 

## 前言

正值双11,各大云服务商的活动非常给力,正好给公司添置一台项目服务器,在配置相关环境时,发现GitHub的`raw.githubusercontent.com`域名解析竟然因某些你懂的原因给临时污染了.终于通过修改hosts解决掉此问题,可以正常部署环境了.

## 解决方法

### 查询真实IP

通过[`IPAddress.com`](https://www.ipaddress.com/)首页,输入`raw.githubusercontent.com`查询到真实IP地址
[![1.jpg](https://static.ioiox.com/usr/uploads/2019/11/1639029163.jpg)](https://static.ioiox.com/usr/uploads/2019/11/1639029163.jpg)

### 修改hosts

CentOS及macOS直接在终端输入

```
sudo vi /etc/hosts
```

添加以下内容保存即可

```
199.232.4.133 raw.githubusercontent.com
```

