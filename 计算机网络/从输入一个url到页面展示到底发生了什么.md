# 从输入url到页面展示到底发生了什么？

> 原文链接：  https://mp.weixin.qq.com/s?__biz=MzI2OTgwNzYyOA==&mid=2247484795&idx=1&sn=38fcb2d334caf371ddf55c27430509da&chksm=eadbfc18ddac750e29c5a3f2749d14327fa5f2069f1131c6b38e0750977c4decb7a065f23e64&mpshare=1&scene=23&srcid=0601nkBMSBRNl2uStg102B9i&sharer_sharetime=1588239815350&sharer_shareid=09a8776b636d85c0815532ec3b647031#rd 

刚开始写这篇文章还是挺纠结的，因为网上搜索“从输入url到页面展示到底发生了什么”，你可以搜到一大堆的资料。而且面试这道题基本是必考题，二月份面试的时候，虽然知道这个过程发生了什么，不过当面试官一步步追问下去的，很多细节就不太清楚了。

最近刚好也在看http协议相关的东西，所以想对这个话题来个深入的总结，本文的目的是通过输入url之后发生的事情来做知识的总结和扩展。所以文章可能会很杂。

总的过程大概如下:

------

## 1、输入地址

当我们开始在浏览器中输入网址的时候，浏览器其实就已经在智能的匹配可能得 url 了，他会从历史记录，书签等地方，找到已经输入的字符串可能对应的 url，然后给出智能提示，让你可以补全url地址。对于 google的chrome 的浏览器，他甚至会直接从缓存中把网页展示出来，就是说，你还没有按下 enter，页面就出来了。

------

## 2、浏览器查找域名的 IP 地址　　

1、请求一旦发起，浏览器首先要做的事情就是解析这个域名，一般来说，浏览器会首先查看本地硬盘的 hosts 文件，看看其中有没有和这个域名对应的规则，如果有的话就直接使用 hosts 文件里面的 ip 地址。

2、如果在本地的 hosts 文件没有能够找到对应的 ip 地址，浏览器会发出一个 DNS请求到本地DNS服务器 。本地DNS服务器一般都是你的网络接入服务器商提供，比如中国电信，中国移动。

3、查询你输入的网址的DNS请求到达本地DNS服务器之后，本地DNS服务器会首先查询它的缓存记录，如果缓存中有此条记录，就可以直接返回结果，此过程是递归的方式进行查询。如果没有，本地DNS服务器还要向DNS根服务器进行查询。

4、根DNS服务器没有记录具体的域名和IP地址的对应关系，而是告诉本地DNS服务器，你可以到域服务器上去继续查询，并给出域服务器的地址。这种过程是迭代的过程。

5、本地DNS服务器继续向域服务器发出请求，在这个例子中，请求的对象是.com域服务器。.com域服务器收到请求之后，也不会直接返回域名和IP地址的对应关系，而是告诉本地DNS服务器，你的域名的解析服务器的地址。

6、最后，本地DNS服务器向域名的解析服务器发出请求，这时就能收到一个域名和IP地址对应关系，本地DNS服务器不仅要把IP地址返回给用户电脑，还要把这个对应关系保存在缓存中，以备下次别的用户查询时，可以直接返回结果，加快网络访问。

下面这张图很完美的解释了这一过程：

![img](https://mmbiz.qpic.cn/mmbiz_png/JfTPiahTHJhrveNibsGNAYwFicicqoHsYTcLQYBT4V7eR1ibVPA1bQhTTNkpntXX0gv5Jxu4wwzQviaYdy9tWl6VQ46Q/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

### —知识扩展—

#### 1.什么是DNS？

DNS（Domain Name System，域名系统），因特网上作为域名和IP地址相互映射的一个分布式数据库，能够使用户更方便的访问互联网，而不用去记住能够被机器直接读取的IP数串。通过主机名，最终得到该主机名对应的IP地址的过程叫做域名解析（或主机名解析）。
　　
通俗的讲，我们更习惯于记住一个网站的名字，比如www.baidu.com,而不是记住它的ip地址，比如：167.23.10.2。而计算机更擅长记住网站的ip地址，而不是像www.baidu.com等链接。因为，DNS就相当于一个电话本，比如你要找www.baidu.com这个域名，那我翻一翻我的电话本，我就知道，哦，它的电话（ip）是167.23.10.2。

#### 2.DNS查询的两种方式：递归查询和迭代查询

**1、递归解析**

当局部DNS服务器自己不能回答客户机的DNS查询时，它就需要向其他DNS服务器进行查询。此时有两种方式，如图所示的是递归方式。局部DNS服务器自己负责向其他DNS服务器进行查询，一般是先向该域名的根域服务器查询，再由根域名服务器一级级向下查询。最后得到的查询结果返回给局部DNS服务器，再由局部DNS服务器返回给客户端。

![img](https://mmbiz.qpic.cn/mmbiz_png/JfTPiahTHJhrveNibsGNAYwFicicqoHsYTcLJEqhad3CiaBGT1Jn9qhtzoqfc54ukxa6nf0PvYLNRShdbcRg2HsLZoQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**2、迭代解析**

当局部DNS服务器自己不能回答客户机的DNS查询时，也可以通过迭代查询的方式进行解析，如图所示。局部DNS服务器不是自己向其他DNS服务器进行查询，而是把能解析该域名的其他DNS服务器的IP地址返回给客户端DNS程序，客户端DNS程序再继续向这些DNS服务器进行查询，直到得到查询结果为止。也就是说，迭代解析只是帮你找到相关的服务器而已，而不会帮你去查。比如说：baidu.com的服务器ip地址在192.168.4.5这里，你自己去查吧，本人比较忙，只能帮你到这里了。

![img](https://mmbiz.qpic.cn/mmbiz_png/JfTPiahTHJhrveNibsGNAYwFicicqoHsYTcLU4x8jadafZYeZIZf6c8sGjOWZwDgiadqeD6qZgYqH3ZqxZDAoCCesJA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 3.DNS域名称空间的组织方式

我们在前面有说到根DNS服务器，域DNS服务器，这些都是DNS域名称空间的组织方式。按其功能命名空间中用来描述 DNS 域名称的五个类别的介绍详见下表中，以及与每个名称类型的示例

![img](https://mmbiz.qpic.cn/mmbiz_png/JfTPiahTHJhrveNibsGNAYwFicicqoHsYTcLTxJMSQTA3uF4ia1icUdVfrkOTrAOGuVnEFCDHibT7SUJyloYOm03YClDg/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 4.DNS负载均衡

当一个网站有足够多的用户的时候，假如每次请求的资源都位于同一台机器上面，那么这台机器随时可能会蹦掉。处理办法就是用DNS负载均衡技术，它的原理是在DNS服务器中为同一个主机名配置多个IP地址,在应答DNS查询时,DNS服务器对每个查询将以DNS文件中主机记录的IP地址按顺序返回不同的解析结果,将客户端的访问引导到不同的机器上去,使得不同的客户端访问不同的服务器,从而达到负载均衡的目的｡例如可以根据每台机器的负载量，该机器离用户地理位置的距离等等。

------

## 3、浏览器向 web 服务器发送一个 HTTP 请求

拿到域名对应的IP地址之后，浏览器会以一个随机端口（1024<端口<65535）向服务器的WEB程序（常用的有httpd,nginx等）80端口发起TCP的连接请求。这个连接请求到达服务器端后（这中间通过各种路由设备，局域网内除外），进入到网卡，然后是进入到内核的TCP/IP协议栈（用于识别该连接请求，解封包，一层一层的剥开），还有可能要经过Netfilter防火墙（属于内核的模块）的过滤，最终到达WEB程序，最终建立了TCP/IP的连接。
　　
TCP连接如图所示: 　　

![img](https://mmbiz.qpic.cn/mmbiz_png/JfTPiahTHJhrveNibsGNAYwFicicqoHsYTcLVyuxia2r0Libkc63JFwPKUPJSwTfEQYYe737gklXP69vJ3CumZicsjOIA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

建立了[TCP连接](http://mp.weixin.qq.com/s?__biz=MzU2MTI4MjI0MQ==&mid=2247484376&idx=1&sn=f5654ddc27e9998c98a646c89b178765&chksm=fc7a6e76cb0de760b5e0e22ac9911649da3a54f9608c75ca6087c6cf73e3564d0e0dc6280efd&scene=21#wechat_redirect)之后，发起一个http请求。一个典型的 http request header 一般需要包括请求的方法，例如 GET 或者 POST 等，不常用的还有 PUT 和 DELETE 、HEAD、OPTION以及 TRACE 方法，一般的浏览器只能发起 GET 或者 POST 请求。
　　
客户端向服务器发起http请求的时候，会有一些请求信息，请求信息包含三个部分：

- 请求方法URI协议/版本
- 请求头(Request Header)
- 请求正文

下面是一个完整的HTTP请求例子：

```
GET/sample.jspHTTP/1.1Accept:image/gif.image/jpeg,*/*Accept-Language:zh-cnConnection:Keep-AliveHost:localhostUser-Agent:Mozila/4.0(compatible;MSIE5.01;Window NT5.0)Accept-Encoding:gzip,deflateusername=jinqiao&password=1234
```

> 注意：最后一个请求头之后是一个空行，发送回车符和换行符，通知服务器以下不再有请求头。

1.请求的第一行是“方法URL议/版本”：GET/sample.jsp HTTP/1.1
2.请求头(Request Header)

请求头包含许多有关的客户端环境和请求正文的有用信息。例如，请求头可以声明浏览器所用的语言，请求正文的长度等。

```
Accept:image/gif.image/jpeg.*/*Accept-Language:zh-cnConnection:Keep-AliveHost:localhostUser-Agent:Mozila/4.0(compatible:MSIE5.01:Windows NT5.0)Accept-Encoding:gzip,deflate.
```

3.请求正文
请求头和请求正文之间是一个空行，这个行非常重要，它表示请求头已经结束，接下来的是请求正文。请求正文中可以包含客户提交的查询字符串信息：

```
username=jinqiao&password=1234
```

### — 知识扩展—

#### 1.TCP三次握手

**第一次握手：**客户端A将标志位SYN置为1,随机产生一个值为seq=J（J的取值范围为=1234567）的数据包到服务器，客户端A进入SYN_SENT状态，等待服务端B确认；

**第二次握手：**服务端B收到数据包后由标志位SYN=1知道客户端A请求建立连接，服务端B将标志位SYN和ACK都置为1，ack=J+1，随机产生一个值seq=K，并将该数据包发送给客户端A以确认连接请求，服务端B进入SYN_RCVD状态。

**第三次握手：**客户端A收到确认后，检查ack是否为J+1，ACK是否为1，如果正确则将标志位ACK置为1，ack=K+1，并将该数据包发送给服务端B，服务端B检查ack是否为K+1，ACK是否为1，如果正确则连接建立成功，客户端A和服务端B进入ESTABLISHED状态，完成三次握手，随后客户端A与服务端B之间可以开始传输数据了。

如图所示：

![img](https://mmbiz.qpic.cn/mmbiz_png/JfTPiahTHJhrveNibsGNAYwFicicqoHsYTcLIiamPTviaaM2tn5UjaSR5TFn9y49l4maPLWFFvLuYxf2BUKWBB2cbuzw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 2.为什需要三次握手？

《计算机网络》第四版中讲“三次握手”的目的是“为了防止已失效的连接请求报文段突然又传送到了服务端，因而产生错误”

书中的例子是这样的，“已失效的连接请求报文段”的产生在这样一种情况下：client发出的第一个连接请求报文段并没有丢失，而是在某个网络结点长时间的滞留了，以致延误到连接释放以后的某个时间才到达server。本来这是一个早已失效的报文段。但server收到此失效的连接请求报文段后，就误认为是client再次发出的一个新的连接请求。于是就向client发出确认报文段，同意建立连接。

假设不采用“三次握手”，那么只要server发出确认，新的连接就建立了。由于现在client并没有发出建立连接的请求，因此不会理睬server的确认，也不会向server发送数据。但server却以为新的运输连接已经建立，并一直等待client发来数据。这样，server的很多资源就白白浪费掉了。采用“三次握手”的办法可以防止上述现象发生。例如刚才那种情况，client不会向server的确认发出确认。server由于收不到确认，就知道client并没有要求建立连接。”。主要目的防止server端一直等待，浪费资源。

#### 3.TCP四次挥手

**第一次挥手：**Client发送一个FIN，用来关闭Client到Server的数据传送，Client进入FIN_WAIT_1状态。

**第二次挥手：**Server收到FIN后，发送一个ACK给Client，确认序号为收到序号+1（与- SYN相同，一个FIN占用一个序号），Server进入CLOSE_WAIT状态。

**第三次挥手：**Server发送一个FIN，用来关闭Server到Client的数据传送，Server进入LAST_ACK状态。

**第四次挥手：**Client收到FIN后，Client进入TIME_WAIT状态，接着发送一个ACK给Server，确认序号为收到序号+1，Server进入CLOSED状态，完成四次挥手。

![img](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/3.jpg)

#### 4.为什么建立连接是三次握手，而关闭连接却是四次挥手呢？

这是因为服务端在LISTEN状态下，收到建立连接请求的SYN报文后，把ACK和SYN放在一个报文里发送给客户端。而关闭连接时，当收到对方的FIN报文时，仅仅表示对方不再发送数据了但是还能接收数据，己方也未必全部数据都发送给对方了，所以己方可以立即close，也可以发送一些数据给对方后，再发送FIN报文给对方来表示同意现在关闭连接，因此，己方ACK和FIN一般都会分开发送。

------

## 4、服务器的永久重定向响应

服务器给浏览器响应一个301永久重定向响应，这样浏览器就会访问`http://www.google.com/`而非`http://google.com/`。

为什么服务器一定要重定向而不是直接发送用户想看的网页内容呢？其中一个原因跟搜索引擎排名有关。如果一个页面有两个地址，就像http://www.yy.com/和http://yy.com/，搜索引擎会认为它们是两个网站，结果造成每个搜索链接都减少从而降低排名。而搜索引擎知道301永久重定向是什么意思，这样就会把访问带www的和不带www的地址归到同一个网站排名下。还有就是用不同的地址会造成缓存友好性变差，当一个页面有好几个名字时，它可能会在缓存里出现好几次。

### —-扩展知识—-

#### 1.301和302的区别。

301和302状态码都表示重定向，就是说浏览器在拿到服务器返回的这个状态码后会自动跳转到一个新的URL地址，这个地址可以从响应的Location首部中获取（用户看到的效果就是他输入的地址A瞬间变成了另一个地址B）——这是它们的共同点。

他们的不同在于。301表示旧地址A的资源已经被永久地移除了（这个资源不可访问了），搜索引擎在抓取新内容的同时也将旧的网址交换为重定向之后的网址；

302表示旧地址A的资源还在（仍然可以访问），这个重定向只是临时地从旧地址A跳转到地址B，搜索引擎会抓取新的内容而保存旧的网址。SEO302好于301

#### 2.重定向原因：

- 网站调整（如改变网页目录结构）；
- 网页被移到一个新地址；
- 网页扩展名改变(如应用需要把.php改成.Html或.shtml)。

这种情况下，如果不做重定向，则用户收藏夹或搜索引擎数据库中旧地址只能让访问客户得到一个404页面错误信息，访问流量白白丧失；再者某些注册了多个域名的网站，也需要通过重定向让访问这些域名的用户自动跳转到主站点等。

#### 3.什么时候进行301或者302跳转呢？

当一个网站或者网页24—48小时内临时移动到一个新的位置，这时候就要进行302跳转，而使用301跳转的场景就是之前的网站因为某种原因需要移除掉，然后要到新的地址访问，是永久性的。

清晰明确而言：使用301跳转的大概场景如下：

- 域名到期不想续费（或者发现了更适合网站的域名），想换个域名。
- 在搜索引擎的搜索结果中出现了不带www的域名，而带www的域名却没有收录，这个时候可以用301重定向来告诉搜索引擎我们目标的域名是哪一个。
- 空间服务器不稳定，换空间的时候。

#### 5、浏览器跟踪重定向地址

现在浏览器知道了 `http://www.google.com/` 才是要访问的正确地址，所以它会发送另一个http请求。

------

## 6、服务器处理请求

经过前面的重重步骤，我们终于将我们的[http请求](http://mp.weixin.qq.com/s?__biz=MzU2MTI4MjI0MQ==&mid=2247484360&idx=1&sn=2f0e3fd8caa4855bde7e16280cbbe5a4&chksm=fc7a6e66cb0de770f0c1235e2f9afd22364b6383f1a7f7188a01ee68e9b08baea539fdb237b7&scene=21#wechat_redirect)发送到了服务器这里，其实前面的重定向已经是到达服务器了，那么，服务器是如何处理我们的请求的呢？

后端从在固定的端口接收到TCP报文开始，它会对TCP连接进行处理，对HTTP协议进行解析，并按照报文格式进一步封装成HTTP Request对象，供上层使用。

一些大一点的网站会将你的请求到反向代理服务器中，因为当网站访问量非常大，网站越来越慢，一台服务器已经不够用了。于是将同一个应用部署在多台服务器上，将大量用户的请求分配给多台机器处理。

此时，客户端不是直接通过HTTP协议访问某网站应用服务器，而是先请求到Nginx，Nginx再请求应用服务器，然后将结果返回给客户端，这里Nginx的作用是反向代理服务器。同时也带来了一个好处，其中一台服务器万一挂了，只要还有其他服务器正常运行，就不会影响用户使用。

如图所示：

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/2.jpg)

通过[Nginx的反向代理](http://mp.weixin.qq.com/s?__biz=MzU2MTI4MjI0MQ==&mid=2247485395&idx=1&sn=e0263e2a8e2b4f84068817cb817e75cc&chksm=fc7a6a7dcb0de36bb2d3dc4b359887fcf524647af770a340a65ed4394f236345c34009501e11&scene=21#wechat_redirect)，我们到达了web服务器，服务端脚本处理我们的请求，访问我们的数据库，获取需要获取的内容等等，当然，这个过程涉及很多后端脚本的复杂操作。由于对这一块不熟，所以这一块只能介绍这么多了。

### —-扩展阅读—-

#### 1.什么是反向代理？

客户端本来可以直接通过HTTP协议访问某网站应用服务器，网站管理员可以在中间加上一个Nginx，客户端请求Nginx，Nginx请求应用服务器，然后将结果返回给客户端，此时Nginx就是反向代理服务器。

------

## 7、服务器返回一个 HTTP 响应　

经过前面的6个步骤，服务器收到了我们的请求，也处理我们的请求，到这一步，它会把它的处理结果返回，也就是返回一个HTPP响应。

HTTP响应与HTTP请求相似，HTTP响应也由3个部分构成，分别是：

- 状态行
- 响应头(Response Header)
- 响应正文



```
HTTP/1.1 200 OKDate: Sat, 31 Dec 2005 23:59:59 GMTContent-Type: text/html;charset=ISO-8859-1Content-Length: 122＜html＞＜head＞＜title＞http＜/title＞＜/head＞＜body＞＜!-- body goes here --＞＜/body＞＜/html＞
```

#### 状态行：

状态行由协议版本、数字形式的状态代码、及相应的状态描述，各元素之间以空格分隔。

> 格式: `HTTP-Version Status-Code Reason-Phrase CRLF`
> 例如: `HTTP/1.1 200 OK`

**协议版本：**是用http1.0还是其他版本

**状态描述：**状态描述给出了关于状态代码的简短的文字描述。比如状态代码为200时的描述为 ok

**状态码：**状态代码由三位数字组成，第一个数字定义了响应的类别，且有五种可能取值，如下：

1xx：信息性状态码，表示服务器已接收了客户端请求，客户端可继续发送请求。

- 100 Continue
- 101 Switching Protocols
- 2xx：成功状态码，表示服务器已成功接收到请求并进行处理。

200 OK 表示客户端请求成功

- 204 No Content 成功，但不返回任何实体的主体部分
- 206 Partial Content 成功执行了一个范围（Range）请求

3xx：重定向状态码，表示服务器要求客户端重定向。

- 301 Moved Permanently 永久性重定向，响应报文的Location首部应该有该资源的新URL
- 302 Found 临时性重定向，响应报文的Location首部给出的URL用来临时定位资源
- 303 See Other 请求的资源存在着另一个URI，客户端应使用GET方法定向获取请求的资源
- 304 Not Modified 服务器内容没有更新，可以直接读取浏览器缓存
- 307 Temporary Redirect 临时重定向。与302 Found含义一样。302禁止POST变换为GET，但实际使用时并不一定，307则更多浏览器可能会遵循这一标准，但也依赖于浏览器具体实现

4xx：客户端错误状态码，表示客户端的请求有非法内容。

- 400 Bad Request 表示客户端请求有语法错误，不能被服务器所理解
- 401 Unauthonzed 表示请求未经授权，该状态代码必须与 WWW-Authenticate 报头域一起使用
- 403 Forbidden 表示服务器收到请求，但是拒绝提供服务，通常会在响应正文中给出不提供服务的原因
- 404 Not Found 请求的资源不存在，例如，输入了错误的URL

5xx：服务器错误状态码，表示服务器未能正常处理客户端的请求而出现意外错误。

- 500 Internel Server Error 表示服务器发生不可预期的错误，导致无法完成客户端的请求
- 503 Service Unavailable 表示服务器当前不能够处理客户端的请求，在一段时间之后，服务器可能会恢复正常

#### 响应头：

响应头部：由关键字/值对组成，每行一对，关键字和值用英文冒号”:”分隔，典型的响应头有：

![img](https://mmbiz.qpic.cn/mmbiz_png/JfTPiahTHJhrveNibsGNAYwFicicqoHsYTcLGyWgxf93RLCvicKjITxfflogZlOYteOroTzbPJoCut3Nia7KibLs2YTDQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

#### 响应正文

包含着我们需要的一些具体信息，比如cookie，html，image，后端返回的请求数据等等。这里需要注意，响应正文和响应头之间有一行空格，表示响应头的信息到空格为止，下图是fiddler抓到的请求正文，红色框中的：响应正文：

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/1.jpg)

------

## 8、浏览器显示 HTML

在浏览器没有完整接受全部HTML文档时，它就已经开始显示这个页面了，浏览器是如何把页面呈现在屏幕上的呢？不同浏览器可能解析的过程不太一样，这里我们只介绍webkit的渲染过程，下图对应的就是WebKit渲染的过程，这个过程包括：

> 解析html以构建dom树 -> 构建render树 -> 布局render树 -> 绘制render树

**浏览器在解析html文件时，会”自上而下“加载，并在加载过程中进行解析渲染**。在解析过程中，如果遇到请求外部资源时，如图片、外链的CSS、iconfont等，请求过程是异步的，并不会影响html文档进行加载。

解析过程中，浏览器**首先会解析HTML文件构建DOM树，然后解析CSS文件构建渲染树，等到渲染树构建完成后，浏览器开始布局渲染树并将其绘制到屏幕上**。这个过程比较复杂，涉及到两个概念: reflow(回流)和repain(重绘)。

DOM节点中的各个元素都是以盒模型的形式存在，这些都需要浏览器去计算其位置和大小等，这个过程称为relow;当盒模型的位置,大小以及其他属性，如颜色,字体,等确定下来之后，浏览器便开始绘制内容，这个过程称为repain。

页面在首次加载时必然会经历reflow和repain。reflow和repain过程是非常消耗性能的，尤其是在移动设备上，它会破坏用户体验，有时会造成页面卡顿。所以**我们应该尽可能少的减少reflow和repain**。

当文档加载过程中遇到js文件，html文档会挂起渲染（加载解析渲染同步）的线程，不仅要等待文档中js文件加载完毕，还要等待解析执行完毕，才可以恢复html文档的渲染线程。因为JS有可能会修改DOM，最为经典的document.write，这意味着，在JS执行完成前，后续所有资源的下载可能是没有必要的，这是js阻塞后续资源下载的根本原因。所以我明平时的代码中，js是放在html文档末尾的。

**JS的解析是由浏览器中的JS解析引擎完成的**，比如谷歌的是V8。JS是单线程运行，也就是说，在同一个时间内只能做一件事，所有的任务都需要排队，前一个任务结束，后一个任务才能开始。但是又存在某些任务比较耗时，如IO读写等，所以需要一种机制可以先执行排在后面的任务，这就是：同步任务(synchronous)和异步任务(asynchronous)。

**JS的执行机制就可以看做是一个主线程加上一个任务队列(task queue)**。同步任务就是放在主线程上执行的任务，异步任务是放在任务队列中的任务。所有的同步任务在主线程上执行，形成一个执行栈;异步任务有了运行结果就会在任务队列中放置一个事件；脚本运行时先依次运行执行栈，然后会从任务队列里提取事件，运行任务队列中的任务，这个过程是不断重复的，所以又叫做事件循环(Event loop)。具体的过程可以看这篇文章：

> http://www.cnblogs.com/xianyulaodi/p/6414805.html

------

## 9、浏览器发送请求获取嵌入在 HTML 中的资源（如图片、音频、视频、CSS、JS等等）

其实这个步骤可以并列在步骤8中，在浏览器显示HTML时，它会注意到需要获取其他地址内容的标签。这时，浏览器会发送一个获取请求来重新获得这些文件。比如我要获取外图片，CSS，JS文件等，类似于下面的链接：

> 图片：http://static.ak.fbcdn.net/rsrc.php/z12E0/hash/8q2anwu7.gif
> CSS式样表：http://static.ak.fbcdn.net/rsrc.php/z448Z/hash/2plh8s4n.css
> JavaScript 文件：http://static.ak.fbcdn.net/rsrc.php/zEMOA/hash/c8yzb6ub.js

这些地址都要经历一个和HTML读取类似的过程。所以浏览器会在DNS中查找这些域名，发送请求，重定向等等…

不像动态页面，静态文件会允许浏览器对其进行缓存。有的文件可能会不需要与服务器通讯，而从缓存中直接读取，或者可以放到CDN中