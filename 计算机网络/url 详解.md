# url 详解

url 称为统一资源定位符，用于标识网络上的某个资源。

www 到底是什么？

一、 域名定义：域名类似于互联网上的门牌号码，用俗话讲就是网址。是用于识别和定位互联网上计算机的层次结构式字符标识，与该计算机的互联网协议（IP）地址相对应。但相对于IP地址而言，更便于使用者理解和记忆。域名属于互联网上的基础服务，基于域名可以提供WWW、EMAIL、FTP等应用服务。

二、域名分类：域名通常分两种：国际域名和国内域名。国际域名是用户可注册的通用顶级域名的俗称。它的后缀为.com、.net或.org。国内域名为后缀为.cn的域名，它比国际域名低一个层次。二者注册机构不同，在使用中基本没有区别。 只是目前个人还不能注册国内域名 

三、域名构造：域名的构造：一个完整的域名由四部分构成。 

 　　第一部分：“www.***.***.**”，该部分指明该站点的“网络类别”，`www代表是“Web站点”，而不是用于文件传输的“Ftp站点”或用于新闻讨论的“News站点”等`。www的含义为“全球网络”，也有称之为“万维网络”的。它代表着该站点的应用范围，主要用于公众浏览与服务。 (`服务器的名称，标识这个服务器的作用是什么`)

> 这个 www 到底算不算域名的一部分困扰我很久了，总是会看到不同的答案。在 Ajax 请求时如果 一个 www 一个是 ftp 那肯定是跨域，可是上面的意思好像 www 并不是域名的一部分。

 　　第二部分：“***.xxx.***.**”，该部分指明站点的“名称”，是由该站点“所有者”自己决定的。就象一个人的名字，不是任何人或法律法规强制你叫什么名字的。“另外，在确定该部分时，要注意简洁易记，最好带有一定的特色，中心目的是为了抓住访问者的记忆和眼球，让他（她）一次访问，终生难忘。 

 　　第三部分：“***.***.com.**”，该部分的作用是指明该站点所属单位的性质。在申请域名时，申请人应该依据自身的性质选择相应的标识，此部分只能由申请人选择，而不能由申请人随意定义。不同的内容有不同含义，完全是有NIC（国际互联网信息中心）规定好的，全球范围内通用。例如，“com”代表“工商企业”；“net”代表“网络服务商”；“edu”代表教育机构；“org”代表“非盈利组织”等等。 