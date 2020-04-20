[TOC]

# CSS 学习笔记

## 2. HTML

### 2.1 HTML 常见元素

**head 区域的元素**

- meta
- title
- style
- link
- script
- base

之所以出现在 head 区域是因为不会在页面上直接显示内容

**body区域的元素**

- div、section、article、aside、header、footer
- p
- span、em、strong
- table、thead、tbody、tr、td
- ul、ol、li、dl、dt、dd
- a
- form、input、select、textarea、button

**重点元素讲解**

- `<meta charset='utf-8'>`

  设置字符集

- `<base href='/123'>`

  指定一个基础路径，所以的链接都是以这个路径为基准进行计算，例如 a 标签中的地址为 `/456`，那么真正的地址是 `/123/456`。

- ```html
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalsble=no"
  ```

  这是移动端进行适配的第一步，viewport 是让页面显示的区域，令视口的宽度等于设备的宽度，那么内容就会实现适应。假设在电脑上 960 px宽度的页面在 320 px 的页面上直接显示，那么会进行等比例自动缩小，所有的内容都变得很小，在手机上不易于阅读，设置视口的宽度等于手机的宽度之后，那么内容就会适应手机的宽度显示内容，例如原来在网页上显示一行的内容在手机上显示多行。

  > 移动端适配还要好好整理一下。

**重要属性讲解**

- a[href, target] 

- img[src, alt]

- table td[colspan, rowspan] 合并单元格

- form [action,target, method, enctype] 

  action: 指定表单数据发送到的 url

  target: 服务器的反馈信息显示在哪里，和 a 标签中的 target 设置的值是相同的，_blank 也表示显示在新的标签页中。

  method: 什么方式提交, GET, POST 等

  enctype: 编码方式: 有三种方式： 

  1. application/x-www-form-urlencode 默认编码方式，

  2. mutipart/form-data: 可以上传文件的方式（记住）
  3. text/plain: 没有特定的编码方法，各个浏览器有自己的编码方式。

- input [type, value]
- button[type]
- select option[value] 下拉框
- label[for]

当 input 的 type 是 radio 时表示的是单选框，单选框中的 name 属性很重要，相同name的表示在一组只能选择其中的一个。

label： 可以和input相关联，for 指的是与之关联的input元素的 id 值，下面的例子来说明。

```html
<input type='radio' name='radio1' id='radio1' />
<label for='radio1'>选项1</label>
```

当点击 选项1 文字时就可以选中前面的单选框，如果不加 label 只能点击选项1前面的小圆点才能选中这个单选框。

**面试题**

如果通过 Ajax 请求去提交，也就是 button 中的 submit 自己去用 Ajax 去定义，那么 form 元素还需要吗？为什么？

理论上不需要也是可以的，但是会带来下面的一些问题：

1. 没有 form 之后，向 submit，reset 等这些特性就没有办法利用了；
2. 当有 form 时可以批量获取表单的数据，即一次性获取表单中的所有的数据；
3. 在做表单验证时更方便
4. 当有 from 时，用户输入的用户名和密码可以被浏览器记住，有些用户是比较喜欢这样的。

### 2.2 如何理解 HTML

HTML 实际上是一个有结构的文档。

HTML5 将一些元素纳入大纲，https://h5o.github.io 是一个工具可以将一个页面的大纲提取出来。

下面是淘宝首页的 HTML 大纲：

![腾讯网首页HTML结构](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvJUU2JUI3JTk4JUU1JUFFJTlEJUU3JUJEJTkxJUU5JUE2JTk2JUU5JUExJUI1SFRNTCVFNyVCQiU5MyVFNiU5RSU4NC5wbmc?x-oss-process=image/format,png)

可能对用户来说这么优雅的大纲没什么用处，因为用户只关心他所看到的东西不会去关心内部的实现，但是注意如果这个用户是百度呢，爬虫呢，谷歌呢？

它能够更好地让机器去理解你的结构，其实这就是在讲 HTML 语义化的意义。

**面试题**

HTML 语义化是什么？有什么好处？

### 2.3 HTML 版本

HTML与XHTML对比：

![HTML与XHTML对比](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvWEhUTUwlRTQlQjglOEVIVE1MJUU1JUFGJUI5JUU2JUFGJTk0LnBuZw?x-oss-process=image/format,png)

在 [html验证](https://validator.w3.org) 网站上可以验证html是否正确，在以前的时候这个文件是必备的，现在写完 html 文件之后也可以在上面验证一下是否有错误或警告。

**HTML5 新增内容**

- 新区块标签
  - section
  - article
  - nav
  - aside

- 表单增强
  - 日期、时间、搜索
  - 表单验证(之前没有这项功能)
  - Placeholder 
  - 自动聚焦

- 新增语义

  - header/footer 头尾
  - section/article 区域（会进入大纲）

  - nav 导航
  - aside 不重要的内容(不会进入大纲)

  -  em/strong 强调 (之前的 i 和 bold 更偏重于样式，和 HTML 的语义不太挂钩)
  - i (在 HTML5 中常用来做 icon )

### 2.4 HTML 元素分类

- 按默认样式分
  - 块级 block （独占一行，形状是方形的，宽度和高度是可以改变的。）
  - 行内 inline （不会独占一行，宽度和高度是不可以改变的，而且形状是不固定的，意思就是当宽度很小时有可能会分到两行中去）
  - inline-block （不会独占一行，宽度和高度是可以改变的）（这样的元素比较少，向 input 这样的表单元素。）

- 按内容分
  - [W3 分类动态图 3.2.5.2 ](https://html.spec.whatwg.org/multipage/dom.html#phrasing-content-2)

### 2.5 HTML 元素嵌套关系

- 块级元素可以包含行内元素

- 块级元素不一定能包含块级元素

  例如，p 元素里面是不能包含 div 元素的。

- 行内元素一般不能包含块级元素

  什么叫 “一般” ？

  例如 a 元素是能包含 div 元素的，这个在实际应用中是很常见的，例如一张图片外面有一个div然后外面又包裹了一个 a 元素，这样用户在点击这个 div 的任何地方就都可以进行跳转了。但是如果代码是这样的 `<p><a><div></div></a></p>` 这样的写法就是不合法的。下面有解释为什么不合法。

  在 W3 的官方文档中是这样解释的，a is described as  a transparent  element，也就是说在检查元素间的嵌套关系时，a 元素可以被看作是透明的。

  ```html
  <p>
    <a>
      <div>
        我合法吗？
      </div>
    </a>
  </p>
  ```

  你不合法，在检查 p 下的嵌套 a 时合法，a 下嵌套 div 也是合法，但是 p 下嵌套 div 不合法，在检查 p 与 div 的嵌套关系时，a 可以直接被视为透明，即可以当做 a 是不存在的。

  上面的写法，在浏览器中也不会报错但是会改变上面的代码，具体改变成什么代码要结合浏览器的容错机制才能得出。

  想要知道 html 代码的嵌套关系是否合法，可以去  [html验证](https://validator.w3.org) 这个网站进行验证。

### 2.6 HTML 元素的默认样式

默认样式一方面带来很多便利(如 input 框的样式)的同时另一方面也带来一些问题(如 body 元素默认会有margin，而且有可能每个浏览器的实现上有所不同)，所以我们要想办法重新设置一些 HTML 元素的默认样式。

这些前人已经帮我们总结好了，我们直接拿过来用就好了，有下面这些：

 [CSS Reset](https://meyerweb.com/eric/tools/css/reset/)（推荐）

[yuicssreset](https://yuilibrary.com/yui/docs/cssreset/)

[Normalize.css](https://necolas.github.io/normalize.css/) （思路和其它的都不同，要做的是如果浏览器对默认样式的实现不一致，我就修改它们让它们一致）

还有下面这种方式：

```css
* {
  margin: 0;
  padding: 0;
}
```

比较有争议，因为 * 通配符选择器会带来性能问题。

### 2.7 HTML 面试真题

1）doctype 的意义是什么？

	doctype 告诉浏览器两件事： 
	
		1.它处理的是 HTML 文档  
	
		 2. HTML 文档的版本。
	
	(感觉只回答上面这两点就足够了)
	
	声明了 doctype 元素之后，浏览器就会：

- 以标准模式渲染

- 知道元素的合法性

2）HTML， XHTML，HTML5 的关系？

- HTML 属于 SGML，SGML是一种非常通用的语言。
- XHTML 属于 XML，是HTML进行XML严格化的结果
- HTML5 不属于 SGML 或XML，比XHTML宽松

3）HTML5 有什么变化？

- 新的语义化元素
- 表单增强
- 新的 API（离线，音视频（audio，video），图形（canvas，svg），实时通信（web socket），本地存储（local storage），设备能力（定位等））

- 分类和嵌套变更（例如 a 元素嵌套块级元素之前是不合法的）

4）em 和 i 有什么区别？

	em 和 i 默认样式都是斜体的，主要是语义上的区别，em 是有语义的，i 是没有语义的。

- em是语义化标签，表强调。
- i 是纯样式的标签，表斜体。
- HTML5 中 i 不推荐使用，一般用作图标时使用。

5）语义化的意义是什么？

- 开发者容易理解
- 机器容易理解结构（搜索，爬虫，读屏软件）

- 有助于 SEO 

- semantic microdata 

6）哪些元素可以自闭合？

- 表单元素 input
- 图片 img
- br hr
- meta link

7）HTML 和 DOM 的关系？

- HTML 只是一个文档
- DOM 由 HTML 解析得到的
- JS 可以维护 DOM

8）property 和 attribute 的区别

- attrribute 是 HTML 标签的特性，它的值只能够是字符串；

- property 是 DOM 中的属性

  两者在修改 attribute 和 property 时是互不影响的。

	比较难叙述举例说明一下：

```html
<input type='text' value='1' />
```

```js
// 操作 property
console.log($0.value) // 1
$0.value = 3 
console.log($0.value) // 3

//操作 attribute
console.log($0.getAttribute('value')) // 1 并不是 3
$0.setAttribute('value', 6) 
console.log($0.getAttribute('value')) // 6 

// 操作 property
console.log($0.value) // 3
```

详细介绍可以参考这篇文章 [DOM 中 Property 和 Attribute 的区别]( https://www.cnblogs.com/elcarim5efil/p/4698980.html )。

9）form 的作用有哪些

告诉浏览器现在处理的是表单元素，使用 form 后，可以设置 GET 或者 POST进行提交，也可以利用将 button 的属性设置为 reset 来清楚表单中的内容。

- 便于浏览器保存表单

  使用 form 元素后可以使得浏览器或者一些和表单有关的插件更好地访问表单中的信息。

- 第三方库可以整体提取值

  例如，用 jQuery 的 ` serializeArray ` 方法可以整体提取表单的信息， 

- 第三方库可以进行表单验证

  如果使用第三方库之后想要进行表单验证如果不加form有可能会变得很麻烦，不使用第三方库时，没有 form 元素也是可以进行表单验证的。



## 3. CSS 基础

CSS： Cascading Style Sheet  层叠样式表

### 3.1 选择器

```css
选择器 {
  属性： 值;
}
```

**浏览器解析选择器的方式是什么？**

> 或者这样问浏览器是怎样解析样式的？

以下面这段代码为例来进行说明：

```css
body div .hello {
  color: #ccc;
}
```

按照我们正常的思维是浏览器会选取寻找 body，然后再去找 body 下的 div，然后再去找 div 下的 .hello 类。但是浏览器与这个过程正好相反，它会先去找到 .hello 这个类，然后再去验证它有一个父元素是 div，然后 div 再验证它是否有一个父元素是 body。

之所以按照这样的流程是出于性能的考虑，如果是第一种方式，找 body 下的 div 时有可能有特别多的 div，然后再在这些 div 中寻找 .hello 类时是非常耗时的。

**选择器的分类**

- 元素选择器 a {}

- 伪元素选择器 ::before{}
- 类选择器 .link {}
- 属性选择器 [type=radio] {}
- 伪类选择器 :hover {}
- ID 选择器 #id {}

- 组合选择器 [type=checkbox] + label{}
- 否定选择器 :not(.link){}
- 通用选择器 *{}

**伪元素选择器和伪类选择器有什么不同？**

> 面试题往往是没有标准答案的，面试官想要看的很重要的一方面是你的思考能力，针对某个问题，给出自己的理解，但是要言之有理。

首先，表示方法不同，伪元素前面有两个冒号，伪类前面只有一个冒号

其次，伪类的效果可以通过添加一个实际的类来达到，而伪元素的效果则需要通过添加一个实际的元素才能达到，这也是为什么他们一个称为伪类，一个称为伪元素的原因。 

详细介绍参考 [详解 CSS 属性 - 伪类和伪元素的区别]( https://segmentfault.com/a/1190000000484493 )。

**选择器的权重**

- ID 选择器 +100
- 类，属性，伪类 +10
- 元素，伪元素 +1
- 其它选择器 +0

注意点：不会进位，一万个类选择器也抵不上一个id选择器。

- ！importtant 优先级最高
- 内联样式，优先级比id选择器优先级都要高
- 相同权重，后写的生效

### 3.2 字体

- 字体，字重，颜色，大小，行高
- 背景，边框

- 滚动，换行
- 粗体，斜体，下划线

**字体**

字体族：

- serif sans-serif monospace cursive fantasy
- 多字体 fallback
- 网络字体，自定义字体
- iconfont

字体书写顺序的规则：

```css
body {
  font-family: "PingFang SC", "Microsoft Yahei", monospace;
}
```

“PingFang SC ” 是 Mac 平台独有的，但是在 Mac 平台上也有的用户会安装 “Microsoft Yahei" 这个时候，如果将 "PingFang SC" 放在后面，那么在有些 Mac 电脑上会显示 “Microsoft Yahei" 字体，但是在 Mac 电脑上 “PingFang SC" 显示的效果要更好一些。

### 3.3 行高

inline-block 的元素会遵守行高的规则。
![行高示意图](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvJUU4JUExJThDJUU5JUFCJTk4JUU3JUE0JUJBJUU2JTg0JThGJUU1JTlCJUJFLnBuZw?x-oss-process=image/format,png)
![行高示意图](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvJUU4JUExJThDJUU5JUFCJTk4JUU3JUE0JUJBJUU2JTg0JThGJUU1JTlCJUJFMi5wbmc?x-oss-process=image/format,png)

![CSS中的行高](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/CSS中的行高.png)

上图中的行高最直观也符合我们日常生活中对行高的理解，其实上图中描述的行高和第二幅图中描述的行高值是相同的。在 p 标签中写的那些内容行间距就是靠 line-height 来设置的。

行高我们利用最多的还有一个地方是： 可以让一行文本在盒子中垂直居中对齐。文字的中心位置总是行高的中心位置，根据上图来理解，当行高等于元素的宽度时，文字自然就在中心位置。

当行高大于元素的宽度时，这个就要根据第二幅图来理解，当行高增大时，第一个元素的底线和第二个元素的顶线距离会加大，那么第二个元素就会整体下移，所以文字就会偏下。（这个理解并不是很严谨，但是理解这回事就可以了）

做法就是： 文字的行高等于盒子的高度。

如果 行高 等 height 高度  文字会 垂直居中

如果行高 大于 高度，文字会 偏下 

如果行高小于高度，文字会 偏上 

默认是按照基线对齐的，想要调整垂直方向的对齐方式，可以通过设置 veltical-align

```css
span {
  vertical-align: top; /*按照顶线对齐，注意并不是文字的顶部，而是顶线*/
  vertical-align: bottom; /*按照底线对齐*/
  vertical-align: middle; /*按照中线对齐，注意并不是文字的顶部，而是顶线*/
}
```

下面设置行高是 20px，有三行文字可以看到元素的总宽度刚好是 60px。

![css行高论证.png](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/css行高论证.png)

**如果图片下面有一个空白的间隙请问是为什么，如何去除？**

因为 img 是 inline-block，会遵守行高的规则，默认是基线对齐，一共有顶线，中线，基线，底线四条线，基线和底线之间是有空隙的，所以会有一个空白的间隙。

空隙的大小是由字体的大小决定的，如果字体为12px，那么空隙可能有3px左右。

清除图片下方空白间隙的方法：

1）可以通过改变 vertical-align 来调整它的对齐方式，将其改为 bottom 底线对齐即可。

2）将 img 改为 block 元素，但是这个时候图片会独占一行。

### 3.4 背景

- 背景颜色
- 渐变色背景

- 多背景叠加

- 背景图片和属性（雪碧图）

  雪碧图可以使很多张图放在一起，这样做的好处是可以减少 http 的请求。

- base64 和性能优化
- 多分辨率适配

**背景颜色**

两种表示颜色的方式

rgb（255，0， 0）(和 #ff0000等价)

hsl（颜色(0-360)，饱和度(0-100%)，亮度(0-100%)）

加上a之后，可以在第四个参数的位置指定透明度

```css
color: rgba(255, 0, 0, .3)
```

**渐变色**

用 background 的渐变可以做出非常多的效果。

```css
/* 加 -webkit 前缀是因为最新的浏览器已经不支持这种样式了 */
.c2 {
  background: -webkit-linear-gradient(left, red, green);
}
/* 下面的写法是标准写法 */
.c2 {
  background: linear-gradient(to right red, green);
}
/* 0deg 就是从上到下，其实就是z轴的方向，90deg就是y轴正方向，所以就是从左到右，其它的同理。 */
.c2 {
  background: linear-gradient(0deg, red, green); 
}
/* 指示各种颜色的出现位置 */
.c2 {
  background: linear-gradient(0deg, red 0%, green 50%， yellow 80%); 
}
/* 反斜线 */
.c2 {
  background: linear-gradient(135deg, transparent 0%, transparent: 49.5%, red 50.5%， transparent 50.5%, transparent: 100%); 
}
```

注： 在这个地方写上 transparent 时样式不起作用，原因不明。

**面试题：**

**任意角度的斜线应该怎样画**

应用背景渐变，在 49.5% 之前是透明的，49.5% 处变为绿色，50.5%处也是绿色，50.5%处也是透明的，50.5%之后也是透明的。什么角度的斜线由 linear-gradient 的第一个参数决定。下面代码画了一条 135 deg 的斜线。

```css
.c2{
  height:90px;
  background: linear-gradient(135deg, transparent 0, transparent 49.5%, green 49.5%, green 50.5%, transparent 50.5%, transparent 100%);
}
```

![1585037351182](D:\frontEndNotes\CSS\全面系统讲解CSS工作应用课程笔记\1585037351182.png)

**给你一个波浪线的图片，怎样用背景的方式去实现？**

画出 135 deg 斜线和 45deg 斜线，设置背景的尺寸之后，背景就会沿着 x 和 y 方向平铺，就会出现如图所示的结果。

```css
.c2 {
  height:90px;
  background: 
    linear-gradient(135deg, transparent 0, transparent 49.5%, green 49.5%, green 50.5%, transparent 50.5%, transparent 100%),
    linear-gradient(45deg, transparent 0, transparent 49.5%, red 49.5%, red 50.5%, transparent 50.5%, transparent 100%);
  background-size: 30px 30px;
}
```

![1585036457930](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/利用背景渐变画波浪线.png)

**背景属性**

```css
.c2 {
  /*背景图的平铺*/
  background-repeat: no-repeat; /*不要平铺背景图片，默认是平铺背景图片*/
  background-repeat: repeat-x; /*x方向平铺*/
  /*背景图的位置*/
  background-position: 横向 纵向; /* center top bottom，也可以指定具体的像素 */
  /*背景图的大小*/
  background-size: 宽度 高度;
}
```

**雪碧图**

雪碧图的样式应该怎样写？

雪碧图就是包含多张图片的一张图片，将多张图片放在一张图片中可以减少http的请求次数提高性能。

雪碧图展示图标的原理就是固定元素的大小，令雪碧图当做背景图片，通过调整 background-position 使得想要展示的图标正好展示在页面上。

```css
div {
  /*首先要加载一张雪碧图当做背景*/
  background: url(../img/test_bg.png);
  /*根据要加载的雪碧图中图标的大小确定元素的宽度和高度*/
  height: 30px;
  width: 30px;
  /*调整雪碧图的位置使想要展示的图标展示出来*/
  background-position: -10px -30px; /*值一般是负的，因为是相对于容器元素左上角的，要想雪碧图中的某个图标展示在容器元素上只能将背景图向左上方移动*/
}
```

问及怎样优化页面时，雪碧图的使用也可以说，尤其是说到怎样优化关于图片的使用时，雪碧图那就更要说了。

**多分辨率适配**

使用 background-size 的两种场景：

1）确实需要缩小背景

2）适配移动端

移动端的分辨率会比较高，即 1个CSS像素要等于几个物理像素(物理像素就是我们现在写的这些像素)，如果直接将现在的像素拿过的话可能在手机上会显示的不清晰。解决方法是背景图片做的时候就做几倍的原始尺寸的大小，然后在写css样式时再利用 background-size 将尺寸缩减几倍，这样在移动端就比较清晰了。

**base64 和性能优化**

base64 是一种文本格式，url 中不是一张图片，而是一串字符。

优点：

- 可以减少 http 请求

缺点：

- 图片的体积变为原来的 `4/3` 
- 由于那一大串的字符串在 CSS 文件中，所以 CSS 文件的体积会变大

- 浏览器在拿到 base64 字符串后会首先将其解码为一张图片，这个过程也会耗费一定的时间

应用场景：

- 很小的图片
- 在真正使用的过程中，不会在 url 中直接输入转码好的 base64 的字符串，写的时候还是写正常的url，只是在打包构建的时候将其转换为 base64 的格式。

> 其实在日常写博客等，使用 base64 之后就不需要再去搞什么图床了，当然这个过程比较麻烦而且不直观，在这里只是提一下。

### 3.5 边框

- 边框的属性：线型 大小 颜色
- 边框背景图(边框的背景是图片，之前接触过的都是颜色)
- 边框衔接（三角形）

**边框背景图**

```css
.c2 {
  height: 80px;
  width: 80px;
  border: 30px solid transparent; /*transparent 表示边框的颜色是透明的*/
  border-image: url('../img/border.png') 30 round;
}
```

原图（border.png）：

![border.png](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvYm9yZGVyLnBuZw?x-oss-process=image/format,png)

```css
.c2{
  width:400px;
  height: 200px;
  /* border-width: 30px; */
  border:30px solid transparent;
  border-image:url(./border.png) 30;
}
```

![1585038760034](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/不设置重复方式.png)

上面并没有指定 border-img 的重复方式，下面指定 border-img 的方式为 round。

```css
.c2{
  width:400px;
  height: 200px;
  /* border-width: 30px; */
  border:30px solid transparent;
  border-image:url(./border.png) 30 round;
}
```

边框背景图效果：

![边框背景图](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvJUU4JUJFJUI5JUU2JUExJTg2JUU4JTgzJThDJUU2JTk5JUFGJUU1JTlCJUJFLnBuZw?x-oss-process=image/format,png)

现在比较流利纯色扁平化，这种样式的边框背景图在实际应用中用的并不是很多。

**边框衔接（三角形）**

**面试题：如何利用边框画出一个三角形？**

先看下面这段代码，两个边框的衔接处是什么样式呢？

```css
.c1 {
  width: 40px;
  height: 40px;
  border-bottom: 20px solid red;
  border-right: 20px solid green;
}
```

边框衔接处：

![边框衔接处](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvJUU4JUJFJUI5JUU2JUExJTg2JUU4JUExJTk0JUU2JThFJUE1JUU1JUE0JTg0JUU1JTlCJUJFJUU3JTg5JTg3LnBuZw?x-oss-process=image/format,png)

可以发现是一条斜线，如果左边也有一条边框，且令左右边框的颜色都为透明，那就会构成一个梯形，如果梯形的上底没有，就变成一个三角形了。梯形的上底就是div元素的宽度，所以令div元素的宽度为0即可。

```css
.c1 {
  width: 0px;
  height: 40px;
  border-bottom: 20px solid red;
  border-right: 20px solid transparent;
  border-left: 20px solid transparent;
}
```



![边框构成三角形](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvJUU4JUJFJUI5JUU2JUExJTg2JUU2JTlFJTg0JUU2JTg4JTkwJUU0JUI4JTg5JUU4JUE3JTkyJUU1JUJEJUEyLnBuZw?x-oss-process=image/format,png)

如果想变为扇形呢？

只需设置 border-radius 即可，将上面的样式中加上 `border-radius: 20px` 就可以变为一个扇形，当然这个数值并不唯一。

### 3.5 滚动

容器装不下内容的时候就会产生滚动。

主要涉及滚动行为和滚动条，通过设置 `overflow:` 来实现，主要有下面四个值：

1） `overflow: visible` 

滚动条隐藏，超出的内容会直接显示

2）`overflow: hidden`

滚动条隐藏，超出的内容隐藏

3）`overflow: scroll`

滚动条显示，不论内容是否超出容器。

4）`overflow: auto`

当内容超出容器时，滚动条显示，当内容没有超出容器，不会显示滚动条

### 3.7 文本折行

当文字在一行显示不下的时候需要考虑换行的问题

- `overflow-wrap` 通用换行控制

  是否保留单词

  `overflow-wrap: break-word` 不保留单词，单词中间也可以换行，但是仍然会尽量保持单词的完整性，例如，

  ```css
  'and afhjadfnaaaaaaaaanfjdfnafu'
  ```

  这个字符串，它会显示成and 然后下一行显示那个长的字符串，不会在and后面就拆。

  `overflow-wrap: normal` 保留单词，单词不换行

- `word-break` 针对多字节文字

  ```css
  /*打断所有的单词*/
  word-break: break-all; 
  /*保留所有的单词不被拆开*/
  word-break: keep-all;
  ```

- white-space 空白处是否断行

  ```css
  /*不换行*/
  white-space: nowrap;
  ```

**面试题**

如何让一个很长的文本不换行？

设置 `white-space: nowrap`即可。

### 3.8 装饰性属性及其它

- 字重（粗体） font-weigth

- 斜体 `font-style: itatic`

- 下划线 `text-decoration`

  a 链接默认是有下划线的，使用 `text-decoration: none` 去掉下划线。

- 指针形状 cursor

 **字重（粗体）**

```css
font-weight: 100; /* 100~900,注意必须是100，200，300...这些，100 最细，900最粗*/
font-weight: bold; /* 700 */
font-weight: normal; /* 400 */
font-weight: bolder; /* 不一定，取决于父级 */
font-weight: lighter; /* 不一定，取决于父级 */
```

### 3.9 CSS Hack

兼容 IE 比较低的版本必不可少的东西，只在一部分浏览器上生效的CSS写法就称为 CSS Hack.

- 主要用于区分不同的浏览器
- 缺点：难理解，难维护，易失效。

CSS Hack 的替代方案：特性检测，例如检测出来是 IE6 的浏览器，那么就专门写一个 IE6 的class。

**面试题**

当问到如何处理浏览器兼容性问题事，CSS Hack 是可以作为一种解决方案的。

### 3-10 本章综合案例

**checkbox**

> 一定要学会这种思想，之前遇到这个需求自己肯定就用JS实现了，能用CSS的尽量用CSS实现。

实现当点击文字时，前面的图标变颜色。

html:

```html
<div class="checkbox">
  <input type="checkbox" id="handsome">
  <label for="handsome">加油呀</label>
</div>
```

css:

```css
input {
      display: none; /* 将复选框前面的小正方形隐藏*/
}
.checkbox input+label {
  background: url("../img/checkbox1.png"); /* 未点击时前面的图标 */
  background-size: 20px 20px; 
  background-repeat: no-repeat;
  padding-left: 20px;
}
/* 当点击复选框时,就会选中input：checked，然后再选择它的兄弟元素label，变换背景图，即可完成点击图标时前图标变颜色*/
.checkbox input:checked+label { 
  background: url("../img/checkbox2.png");
  background-size: 20px 20px;
  background-repeat: no-repeat;
  padding-left: 20px;
}
```

注意：点击input时会选中 input:checked.

**tabs**

 [tabs 代码](https://github.com/happyCoding1024/CSSLearning/src/)

**文件树**

### 3.11 CSS 面试真题

1）CSS 样式（选择器）的优先级

权重计算：

- ID 选择器 +100
- 类，属性，伪类 +10
- 元素，伪元素 +1
- 其它选择器 +0

注意点：不会进位，一万个类选择器也抵不上一个id选择器。

- ！importtant 优先级最高
- 内联样式（写在HTML元素内部的样式），优先级比id选择器优先级都要高
- 相同权重，后写的生效

2）雪碧图的作用

3）自定义字体的使用场景

原理：

使用场景：

1. 宣传/品牌/banner等固定文案
2. 字体图标(将图标做成字体)

4）base64 的使用

将图片编码成base64字符串的形式

优点：可以减少 http 请求

适用场景：小图片

缺点：base64 的体积约为原图的 4/3，而且将很长的字符串放在css文件中会增大css文件的大小。

 5）伪元素和伪类的区别

6）如何美化 checkbox？

- label[for] 和 id
- 隐藏原生的input
- input:checkout+label



## 4. CSS 布局

### 4.1 CSS 布局简介

- CSS 知识体系的重中之重，CSS 布局的掌握程度体现着 CSS 的功底。

- 早期以 table 为主（简单）

  缺点：早期的浏览器会将整个表格的内容加载完成之后才进行显示，用户等待的时间比较长，现在的浏览器这种问题比较少了。

- 后来以技巧性布局为主（难）

- 现在有 flex/grid （偏简单）

- 响应式布局是必备知识（移动端适配）

- 所谓布局其实就是能将一些元素排在一行，只要是能做到这一点的就可以说是一种布局方法。

**常用布局方式：**

- table 表格布局
- float 浮动 + margin
- inline-block 布局
- flex-box 布局

### 4.2 表格布局

将两个 div 元素并行排列。

```html
<style>
    .left{
      background: red;
    }
    .right{
      background: blue;
    }
    table{
      width: 800px;
      height: 200px;
      /* 设定相邻单元格的边框时合并还是分开，collapse表示合并*/
      border-collapse: collapse;
    }
</style>
<table>
  <tr>
    <td class="left">左</td>
    <td class="right">右</td>
  </tr>
</table>
```

其实表格布局在布局方面很简单，但是由于语义方面的问题（table 是表格并不是用来布局的，如果用来布局就不能满足语义化了）在现在并不流行。

由于 table 布局实在是太方便，所以有人用设置样式的方式模拟出表格的布局，通过给元素设置相应的类即可达到表格布局的效果。

```html
<style>  
  .left{
    background: red;
  }
  .right{
    background: blue;
  }
	.table{
      margin-top:20px;
      display: table;
      width:800px;
      height:200px;
    }
    .table-row{
      display: table-row;
    }
    .table-cell{
      vertical-align: center;
      display: table-cell;
    }
</style>  
<div class="table">
  <div class="table-row">
    <div class="left table-cell">
      左
    </div>
    <div class="right table-cell">
      右
    </div>
</div>
```

### 4.3 一些布局属性

**盒模型**

![CSS 盒模型](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvJUU3JTlCJTkyJUU2JUE4JUExJUU1JTlFJThCLnBuZw?x-oss-process=image/format,png)

我们给元素设置的宽度和高度是给 content 区域设置的。

一个元素占用的总宽度=内容区域的宽度 + padding + border

**display/position**

dispaly：确定元素的显示类型

block，inline，inline-block

- 块级 block （独占一行，形状是方形的，宽度和高度是可以改变的。）
- 行内 inline （不会独占一行，宽度和高度是不可以改变的，而且形状是不固定的，意思就是当宽度很小时有可能会分到两行中去）
- inline-block （不会独占一行，宽度和高度是可以改变的）（这样的元素比较少，向 input 这样的表单元素。）

position:  确定元素的位置

static(默认)，relative，absolute，fixed

> 文档流就是默认的布局方式，例如块级元素单独占一行，inline 元素不会单独占一行等，脱离文档流的元素对其它元素的布局不会有影响，其实就是你在页面上不占据位置了，你现在的位置下面还可以有元素，当你不存在。

position 的属性

1）static: 默认的position设置

2）relative：相对定位

**设置为 relative 的元素偏移是相对自身而言的**，例如设置 top 等属性时偏移是相对自身来说的，但是原来占有的位置还是有的，其它的元素不能占用它偏移后空出来的位置。

3）absolute: 绝对定位

**设置为 absolute 的元素会脱离文档流**，也就是你不在页面上占用位置了，你现在的位置下面仍然可以有元素，你只是浮在那个元素上面。

**设置 top 等属性时偏移是相对于最近的设置了position为relative或absolute的父级元素的，如果一直找不到这样的父级元素那么它就会相对于 body 定位。**

> 注：之前只知道子绝父相，不清楚也是相对于最近的设置了 absolute 的**父级元素**。
>
> 注意 top 不写和 0 不是一回事，top 不写元素在垂直方向上还是待在现在的位置上，不会在垂直方向上发生偏移。

4）fixed：固定定位
**设置 top 等属性是相对于屏幕（可视区域）的**，**设置为 fixed 的元素也是会脱离文档流的**。

**面试题**

如果有两个绝对定位的元素重叠在了一起，想要让下面的那个元素显示在上面应该怎样实现？

利用 z-index，将下面的元素 z-index 设置一个比上面的元素 z-index 大的值。

> 页面可以看成是一个 XY 平面，z 轴的正方向就是由屏幕向外的方向，z-index 就相当于设置 z 轴上的一个值，z 坐标越大的我们肯定会首先看到，所以要想让某个元素位于其它元素上面可以设置一个比其它元素 z-index 大的值。

**设置为 realtive，absolute，fixed 的元素是可以设置 z-index 属性的。**

**绝对定位的应用**

> 来自简书 9.4 节

将 position 设为 absolute 后，在没有宽高设置的情况下可以设置 top 和 bottom 来使其填充垂直方向的空间，在设置 left 和 right 的情况下可以用来填充水平方向的空间。

在写登录页面时，上面是 Header 组件，下面是一个背景色，这个时候可以通过设置一个绝对定位元素使其填充 Header 下面的所有空间。

```js
export const LoginWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 56px;
  background: #eee;
`;
```

![使用绝对定位元素填充空间](D:\frontEndNotes\CSS\全面系统讲解CSS工作应用课程笔记\1585490155484.png)

### 4.4 flexbox

>  `flex` 是一个CSS的[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 属性中新添加一个值。 随着`inline-flex`的使用，它将使它适用的元素成为一个[flex container](https://developer.mozilla.org/en-US/docs/Glossary/flex_container)（伸缩容器），而这个元素的每个子元素将成为 [flex item](https://developer.mozilla.org/en-US/docs/Glossary/flex_item)（伸缩项目）。伸缩项目将参与到flex布局中，所有由CSS Flexible Box Layout Module（CSS伸缩盒布局模型）定义的属性都能被它们使用。 

flexbox 是 CSS 规范规定的真正意义上专门用来布局的方法，像之前提到的 float 是用来实现图文混排的，inline-box 也不是用来专门布局的。

flex-box 声明的元素都是弹性盒子也就是每个盒子是有弹性的，是可以伸缩的，而且每个盒子都是并列的。布局上一般只要实现了并列在一排，一般就成功一大半了，而且弹性盒子还可以指定宽度等。

下面的代码将5个div元素都设置为弹性盒子，且 flex 都为 1，说明每个盒子平分父盒子的宽度。

```html
<style>
  .container{
    width:800px;
    height:200px;
    display: flex;
    border:1px solid black;
  }
  .flex{
    background:red;
    margin:5px;
    flex:1
  }
</style>
<body>
    <div class="container">
        <div class="flex">
            flex
        </div>
        <div class="flex">
            flex
        </div>
        <div class="flex">
            flex
        </div>
        <div class="flex">
            flex
        </div>
        <div class="flex">
            flex
        </div>
    </div>
</body>
```

![1585059809051](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/4.4弹性盒子例1.png)

如果想将某个盒子设置固定宽度，可以将它的 flex 设置为 none，然后设置宽度即可。

如果将某个盒子的 flex 设置为 2，那么它将占据两倍的宽度，其它的盒子平分剩余的宽度。

但是 flexbox 还是没有被大规模地使用，主要原因还是兼容上的问题，flex-box 自出现已经经历了三次属性上的变更，各个浏览器兼容的 flex-box 属性的标准也不统一，不过在移动端浏览器上兼容比较好。

React-Native，微信小程序等可以直接利用 flex 布局。

### 4.5 float

- 元素 “浮动”
- 脱离文档流
- 但不脱离文本流

关于脱离文档流不脱离文本流可以先看下面这个例子，然后说明：

```html
<!-- float.html -->
<style type="text/css">
    .outer {
      width: 400px;
      height: 100px;
      background-color: red;
    }
    .inner {
      float: left;
      width: 30px;
      height: 30px;
      background-color: green;
      top: 0;
    }
  </style>
</head>
<body>
  <div class="outer">
    <div class="inner">
    </div>
    文文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字     文字文字文字文字文字文字文字文字文字文字文字字
  </div>
</body>
```

当 inner 不设置 float 时，里面的 div 会独占一行。

![4.5](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvZmxvYXQxLnBuZw?x-oss-process=image/format,png)

当设置 `float: left` 时，里面的 div 不会独占一行，而是脱离文档流，但是会占文本的位置，也就是不会脱离文本流。这也是为什么前面说过的 float 以前是用来做图文混排的，图文混排，文字环绕是必须的。

![float脱离文档流但不脱离文本流](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvZmxvYXQlRTglODQlQjElRTclQTYlQkIlRTYlOTYlODclRTYlQTElQTMlRTYlQjUlODElRTQlQkQlODYlRTQlQjglOEQlRTglODQlQjElRTclQTYlQkIlRTYlOTYlODclRTYlOUMlQUMlRTYlQjUlODEucG5n?x-oss-process=image/format,png)

**float 的影响**

**对自身的影响**

- 形成 “块”（BFC：Block Formatting Context）

  例如当将一个 span 元素设置为浮动之后，span 之前是行内元素不能设置宽高，现在就会触发 BFC 变得能设置宽高。

- 位置尽量靠上

- 左浮动位置尽量靠左，右浮动位置尽量靠右

接下来通过代码来说明一下尽量靠上和尽量靠左(右)。

```html
<style type='text/css'>    
	.container {
      width: 500px;
      height: 100px;
      background-color: purple;
    }
	.first {
      background-color: pink;
    }
    .second {
      float: left;
      width: 300px;
      height: 100px;
      background-color: green;
    }
    .third {
      float: left;
      width: 100px;
      height: 100px;
      background-color: red;
    }
</style>
<div class="container">
  <span class="first">
    这是几个字
  </span>
  <span class="second">float</span>
  <span class="third">float</span>
</div>
```

> 绿色背景：second，红色背景：third，粉红色背景：first

尽量靠左：

![4.5 尽量靠左](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvNC41JTIwJUU1JUIwJUJEJUU5JTg3JThGJUU5JTlEJUEwJUU1JUI3JUE2LnBuZw?x-oss-process=image/format,png)

因为 `class=first` 的 span，不会占据比 container 还大的宽度，所以绿色 span 有空间让它靠左，此外它还尽量靠上。由于外面容器 div 的宽度减去绿色 span 和 红色 span 加起来占据的宽度要小于红色 span 的宽度，所以没有空间让红色 span 靠最上面了，所以只能尽量靠上，然后再此基础上尽量靠左，就出现在了图中的位置。

如果现在减小红色 span 的宽度，当三者加起来的宽度小于等于紫色的宽度时就会靠在绿色的 span 上。

![4.5 尽量靠左2](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvNC41JTIwJUU1JUIwJUJEJUU5JTg3JThGJUU5JTlEJUEwJUU1JUI3JUE2Mi5wbmc?x-oss-process=image/format,png)

**对兄弟的影响**

- 上面一般贴的是非 float 元素
- 旁边一般贴的是 float 元素
- 不影响其它块级元素的位置(这也就是它会脱离文档流)
- 影响其它块级元素的内部文本(这也就是它不脱离文本流)

**对父级元素的影响**

- 相当于从父级元素容器里消失了（脱离文档流）

- 父级元素的高度有可能会塌陷

  例如没浮动前是由它撑起的父级元素的高度，但是现在变成浮动之后，父级元素的高度当没有其他元素撑起的时候就变成零了。

下面结合代码来进行说明：

```html
<style type='text/css'>
  .container1 {
      background-color: blue;
      width: 400px;
      height: 200px;
    }
  	.first {
      background-color: pink;
    }
    .second {
      float: left;
      width: 300px;
      height: 100px;
      background-color: green;
    }
    .third {
      float: left;
      width: 100px;
      height: 100px;
      background-color: red;
    }
</style>	

<div class="container">
  <span class="first">
    这是几个字
  </span>
  <span class="second">float</span>
  <span class="third">float</span>
</div>
<div class="container1">
</div>
```

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvNC41JTIwJUU5JUFCJTk4JUU1JUJBJUE2JUU1JUExJThDJUU5JTk5JUI3LnBuZw?x-oss-process=image/format,png)

在正常情况下，红色和绿色的元素会撑开盒子，下面蓝色的 div 会从绿色的下面开始。但是，通过上图可以看到，当将元素设置为浮动时，浮动的元素并不会撑开父盒子，这就发生了**高度塌陷**，撑开父盒子的是粉红色的 span 元素，下面蓝色的 div 会从粉红色 span 下面开始，绿色和红色的浮动元素就像不存在一样，这也体现了浮动元素会脱离文档流。

**面试题**

**那有什么方式可以解决这种高度塌陷呢？**

**也就是怎样清除浮动呢？**

1）使父元素触发 BFC

> 参考文章 [BFC MDN]()

BFC（MDN的解释）：块格式化上下文包含创建它的元素内部的所有内容。

关于为什么父元素触发 BFC 之后就会清除浮动，我的理解：我的理解就是当某个元素触发了 BFC 之后，它的所有子元素都将包含在里面，要想让浮动的元素包含在里面首先你需要有宽和高，而且宽和高的值要包含浮动元素。

触发 BFC 的方式有很多，见 [BFC MDN]( https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Block_formatting_context )。比较常用的主要是设置 overflow 为非 visible 的值，还有设置 `display=flow-root` 这种方式没有任何副作用，是专门设置 BFC 的。

>  使用 `overflow` 来创建一个新的BFC，是因为 `overflow` 属性告诉浏览器你想要怎样处理溢出的内容。当你使用这个属性只是为了创建BFC的时候，你可能会发现一些不想要的问题，比如滚动条或者一些剪切的阴影，需要注意。另外，对于后续的开发，可能不是很清楚当时为什么使用`overflow`。所以你最好添加一些注释来解释为什么这样做。 

2）使用伪元素(之前没用过，但很经典)

给父元素添加一个 after 伪元素，下面通过父元素中某个类的方式给父元素添加一个 after 伪元素只是其中的一种方法，只要能给父元素添加一个 after 父元素并且设置下面的样式即可。

```css
.container-other::after {
  content: '';
  clear: both; /* 使左右两边没有浮动元素 */
  display: block;
  visibility: hidden;
  height: 0;
}
```

> 注：
>
> 1）.container-other::after 会生成一个伪元素排在父元素 div 内部元素的最后
>
> 2）clear: both;  会使生成的元素的左右两边没有浮动元素，又因为浮动元素尽量靠上，所以新生成的元素在浮动元素的下面，紧贴着浮动元素。
>
> 3）display: block; 生成的伪元素是 inline 元素， 没有宽高，但是在这里需要它独占一行，所以需要将其变成 block 元素。
>
> 4）visibility: hidden; 使用这个伪元素的目的就是想让其在浮动元素下面新创建一个元素来撑开盒子，内容没必要展示，所以设置为 hidden 隐藏内容，因为内容本来就是多余的。
>
> 5）height: 0; 这个新创建的本来就是为了撑开盒子，没必要设置宽高，因为这个元素的内容是多余的。 

创建完伪元素后，html 的内容变成下面这样

```html
<div class="container">
  <span class="first">
    这是几个字
  </span>
  <span class="second">float</span>
  <span class="third">float</span>
  ::after
</div>
```

**面试题**

**浮动布局(面试重中之重)**

两栏布局：

思路：左边的元素左浮动，右边的元素设置 margin-left 等于左边元素的宽度。

三栏布局：

思路：可以利用三个 div 元素，左边元素左浮动，右边元素右浮动，中间元素设置 margin-left 等于左边元素的宽度，margin-right 等于右边元素的宽度。

给出代码加以说明:

html 代码

```html
<div class="container">
  <div class="left">
    float
  </div>
  <div class="right">
    right
  </div>
  <div class="middle">
    middle
  </div>
```

css 代码

```css
.container {
  width: 500px;
}
.left {
  float: left;
  background-color: red;
  width: 100px;
  height: 200px;
}
.right {
  float: right;
  background-color: green;
  width: 100px;
  height: 200px;
}
.middle {
  background-color: yellow;
  height: 200px;
  margin: 0 100px;
}
```

有一个地方需要注意的是：

当 html 代码中的 right 和 middle 上颠倒时，会出现下面的情况

![float 中下元素颠倒](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvZmxvYXQlRTQlQjglQUQlRTQlQjglOEIlRTUlODUlODMlRTclQjQlQTAlRTklQTIlQTAlRTUlODAlOTIucG5n?x-oss-process=image/format,png)

出现这种情况的原因在于 middle 元素是一个块级元素会占据整行的宽度，所以下面 right 元素尽量靠上时只能靠在 middle 元素的下边。

如果令 middle 元素放在最上面，那么会出现下面的结果

![float中间元素在最上面](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvZmxvYXQlRTQlQjglQUQlRTklOTclQjQlRTUlODUlODMlRTclQjQlQTAlRTUlOUMlQTglRTYlOUMlODAlRTQlQjglOEElRTklOUQlQTIucG5n?x-oss-process=image/format,png)

left 元素尽量靠上但是由于 middle 元素是一个块级元素占据了一整行，所以只能靠在 middle 元素的下面。

### 4.6 inline-block 布局

> 布局的要点其实就是怎样将一些元素横向的排列起来，纵向由于块级元素的存在会自动占据一行。

- 向文本一样排 block 元素
- 没有清除浮动等问题

- 需要处理间隙（例如图片下面的间隙，两个元素之间的间隙）

html代码

```html
<div class="container">
  <div class="left">
    left
  </div>
  <div class="right">
    right
  </div>
</div>
```

css 代码

```css
.container {
  width: 800px;
  height: 200px;
  /*font-size: 0;*/
}
.left {
  /*font-size: 14px;*/
  background-color: red;
  display: inline-block;
  width: 200px;
  height: 200px;
}
.right {
  /*font-size: 14px;*/
  background-color: blue;
  display: inline-block;
  width: 600px;
  height: 200px;
}
```

结果如下：

![inline-block 布局1](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvaW5saW5lLWJsb2NrJUU1JUI4JTgzJUU1JUIxJTgwMS5wbmc?x-oss-process=image/format,png)

按道理说，container 的宽度正好等于 left 和 right 的宽度之和，应该并列在一起呀。

现在我们减小一些 right 的宽度，将 right 的宽度设置为 500 px，结果如下

![inline-block 布局2](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvaW5saW5lLWJsb29jayUyMCVFNSVCOCU4MyVFNSVCMSU4MDIucG5n?x-oss-process=image/format,png)

会发现中间有一个空白的间隙，这是为什么呢？

因为现在使用的是 inline-block 元素，可以将 inline-block 元素看成是两个文字，文字与文字之间不可能是连在一起的，肯定是有间隙的。

既然知道了是文字的问题，那我们就将父元素 container 的字体大小设置为 0，可是这个时候会发现 left 和 right 这两个单词也没有了，这是因为 left 和 right 元素继承了父级元素的字体大小，这时候我们只需要分别设置 left 和 right 元素的字体大小即可。

将 css 代码修改如下

```css
.container {
  width: 800px;
  height: 200px;
  font-size: 0; /* 新增 */
}
.left {
  font-size: 14px; /* 新增 */
  background-color: red;
  display: inline-block;
  width: 200px;
  height: 200px;
}
.right {
  font-size: 14px; /* 新增 */
  background-color: blue;
  display: inline-block;
  width: 600px;
  height: 200px;
}
```

结果

![inline-block 正确布局结果](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvaW5saW5lLWJsb2NrJTIwJUU2JUFEJUEzJUU3JUExJUFFJUU3JTlBJTg0JUU1JUI4JTgzJUU1JUIxJTgwJUU3JUJCJTkzJUU2JTlFJTlDLnBuZw?x-oss-process=image/format,png)

上述空隙还有一种解决方案就是从 html 代码出发，引起上面空隙的根本原因是由于 left 元素和 right 元素代码之间有一些间隙造成的，可以改成下面这样：

```html
<div class="container">
  <div class="left">
    left
  </div><div class="right">
  	right
  </div>
</div>
<!-- 或利用注释的方式 -->
<div class="container">
  <div class="left">
    left
  </div><!--
--><div class="right">
  right
  </div>
</div>
```

结果如下

![inline-block 正确布局结果](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvaW5saW5lLWJsb2NrJTIwJUU2JUFEJUEzJUU3JUExJUFFJUU3JTlBJTg0JUU1JUI4JTgzJUU1JUIxJTgwJUU3JUJCJTkzJUU2JTlFJTlDLnBuZw?x-oss-process=image/format,png)



**inline-block 不太适合应用在自适应布局之中，比较适合应用在定宽的情况下。**

### 4.7 响应式布局

所谓响应式布局，就是页面会根据当前运行的设备的大小自行进行调整，实现方案主要有以下三种：

1）隐藏

例如在 PC 端的一些友情链接或者不重要的内容在移动端可以选择隐藏起来。

2）换行

在 PC 端显示一行的内容，由于移动端设备宽度比较小，所以可以选择显示为几行。

3）自适应空间

例如，左边元素给定一个具体的值，右边元素的宽度令其根据不同的设备宽度自行调整。

具体的实现方法主要有以下几种：

1）rem

> rem 是一个相对单位，一般 1rem = html设置的 font-size 的值。
>
> 关于 rem 的详细介绍可以参考 [移动 web 开发适配秘籍 Rem](https://www.imooc.com/learn/942) 这个免费课程。

通过设置不同设备 html 的 font-size 改变 rem 的值，令 1rem 单位的值随着设备的增大而增大。

2）viewport

设置 `<meta name="viewport" content="width=device-width, initial-scale=1.0" >` ，关于这个下面会介绍。

3）media query

判断当前是什么设备，然后根据不同的设备设置不同的样式。

**接下来先说一下 viewport 这个 meta 标签。**

`<meta name="viewport" content="width=device-width, initial-scale=1.0" >` 

**为什么要让可视区域的宽度等于设备的宽度**

viewport 指的是可视区域(说白了就是展示页面的区域，一般情况下当然是设备的屏幕多大就让展示页面的区域是多大，如果屏幕的宽度是 320px，不设置可视区域的大小为 320px，将一个 960px 的页面(假设PC端页面是960px这么大)硬生生地展示在 320px 屏幕上，只能将页面整体缩小为原来的 1/3 去展示，那用户看起来页面上的字就太小了。

如果将可视区域的宽度调整为设备屏幕的宽度，这样会PC端 960px 的页面会在 320px 宽度的设备上重新布局，例如之前在 PC 端要展示在一行的内容，在移动端由于宽度只有 320px 一行肯定展示不下了，所以就会进行换行。经过这样布局显示出来的字体大小和 PC 端是一样的，用户体验就会比较好。

所以我们需要将可视区域的宽度设置为设备的宽度，接下来会有代码进行验证。

对于下面的代码

```html
 <style>
    .container{
      margin:0 auto;
      max-width:800px;
      display: flex;
      border:1px solid black;
    }
    .left{
      display: flex;
      width: 200px;
      background:red;
      margin:5px;
    }
    .right{
      display: flex;
      flex: 1;
      background:blue;
      margin:5px;
    }

  </style>
</head>
<body>
<div class="container">
  <div class="left">
    这里是一些不重要的内容，比如友情链接、广告
  </div>
  <div class="right">
    这里是一些重要的内容，比如一篇文章，文章是整个页面的核心内容。这里是一些重要的内容，比如一篇文章，文章是整个页面的核心内容。这里是一些重要的内容，比如一篇文章，文章是整个页面的核心内容。这里是一些重要的内容，比如一篇文章，文章是整个页面的核心内容。这里是一些重要的内容，比如一篇文章，文章是整个页面的核心内容。这里是一些重要的内容，比如一篇文章，文章是整个页面的核心内容。这里是一些重要的内容，比如一篇文章，文章是整个页面的核心内容。这里是一些重要的内容，比如一篇文章，文章是整个页面的核心内容。这里是一些重要的内容，比如一篇文章，文章是整个页面的核心内容。这里是一些重要的内容，比如一篇文章，文章是整个页面的核心内容。
  </div>
</div>
</body>
```

如果不加 `<meta name="viewport" content="width=device-width, initial-scale=1.0" >`，在PC 端的页面如下

![响应式布局PC端](https://img-blog.csdnimg.cn/20200104111615967.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzMTk5MzE4,size_16,color_FFFFFF,t_70)

在 iPhonex上的页面

![响应式布局移动端页面](https://img-blog.csdnimg.cn/20200104112107862.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzMTk5MzE4,size_16,color_FFFFFF,t_70)

很明显，在移动端上并没有进行适配只是进行了等比例缩放，导致字体很小，用户体验差。

这个时候再加上 `<meta name="viewport" content="width=device-width initial-scale=1.0">`，在移动端的页面如下所示

![响应式布局移动端2](https://img-blog.csdnimg.cn/20200104112629782.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzQzMTk5MzE4,size_16,color_FFFFFF,t_70)

可见并不是进行整体缩放，而是根据设备的宽度通过换行等方式进行了适配，这个时候的字体和PC端的字体大小也差不多，用户体验好。

通过 `<meta name="viewport" content="width=device-width initial-scale=1.0">` 这条语句来进行移动端适配在一些比较简单的情况，对移动端适配要求比较低的情况下是可以的，但是如果想要进行更好的移动端适配还要采用一些其他的措施，例如媒体查询等。

上图中，红色的部分实际上在移动端可以不用显示的，因为它并不是重要的内容，这个时候就可以采用媒体查询的方式当设备的宽度小于某个值之后就隐藏左边红色的区域。

可以在上面的 css 代码中添加媒体查询，当设备的宽度小于 640px 时就隐藏左边的红色区域。

```css
@media (max-width: 640px){
 .left{
   display: none;
 }
}
```

在 iphonex 的显示情况如下图所示：

![iphonex移动端适配](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvaXBob25leCVFNyVBNyVCQiVFNSU4QSVBOCVFNyVBQiVBRiVFOSU4MCU4MiVFOSU4NSU4RC5wbmc?x-oss-process=image/format,png)

再来看一个案例：

HTML 代码：

```html
<div class="container">
  <div class="intro">
    介绍1
  </div>
  <div class="intro">
    介绍2
  </div>
  <div class="intro">
    介绍3
  </div>
  <div class="intro">
    介绍4
  </div>
</div>
```

CSS 代码

```css
.container{
  margin:0 auto;
  max-width:800px;
  border:1px solid black;
}
.intro{
  display: inline-block;
  width:180px;
  height:180px;
  line-height: 180px;
  text-align: center;
  border-radius: 90px;
  border:1px solid red;
  margin:7px;
}
```

在 PC 端页面显示如下：

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvMjAyMDAxMDQyMDE1MDIucG5n?x-oss-process=image/format,png)

不加 `<meta name="viewport" content="width=device-width initial-scale=1.0">` 时移动端页面如下：

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvMjAyMDAxMDQyMDE1NDUucG5n?x-oss-process=image/format,png)

会发现页面只是在 pc 端的基础上进行了等比例缩放，现在加上 meta 标签，

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvMjAyMDAxMDQyMDE4NDYucG5n?x-oss-process=image/format,png)

可以看到添加meta标签后会自动根据设备的宽度进行适配，iphone 5 的宽度为 320px，圆圈的宽度为 182px， margin-left 为 7px，再加上右边还有 7px 的 margin-right，所以加起来一共占了 196px，所以还剩下 124px，所以第二个圆圈只能排在第二行。

现在有个问题是靠左边太多了，我们想让它在移动端时可以居中，所以利用媒体查询，加上下面的 css 代码。

```css
@media (max-width: 640px) {
  .intro {
    margin: 7px auto;
  	display: block;
  }
}
```

> 注意这个地方必须加上 display: block，不加之前是 inline-block，在 inline-block 条件下 auto 是不会起效果的，左右没有 margin 值。
>
> block 元素是会占据一行的，所以 auto 可以居中，向 inline-block 并不会单独占一行，它的宽度是有限的，谈不上 auto。

加上上面的媒体查询之后，当设备宽度小于 640px 时圆圈就会居中显示。

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvMjAyMDAxMDQyMDM4MzMucG5n?x-oss-process=image/format,png)



现在还有一个问题是由于圆圈的数值是通过 px 单位写死的，所以无论设备的大小如何改变，圆圈的大小是不会改变的，随着设备宽度（小于640px）的变化，圆圈的大小始终是不会变化的。

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvMjAyMDAxMDQyMDQwMzQucG5n?x-oss-process=image/format,png)



![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvMjAyMDAxMDQyMDQxMDgucG5n?x-oss-process=image/format,png)

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvMjAyMDAxMDQyMDQyMDEucG5n?x-oss-process=image/format,png)



这样随着设备宽度的增加，圆圈就显得比较小了，那么有没有什么方法可以使得随着设备宽度的增加，圆圈也可以随着增加呢？

可以的，通过 rem 就可以实现。

> rem 是一种根据 html 的 font-size 改变动态修改值的相对单位。

我们可以通过设置媒体查询，设置几个设备宽度下不同的 html 的 font-size ，这样当设备宽度变大时，1 rem 的值也随着变大，这样就可以实现圆圈跟着变大了。

> 这里假设 1rem = 20px 

将 css 代码中的 px 变为 rem

```css
.container{
  margin:0 auto;
  max-width:800px;
  border:1px solid black;
}
.intro{
  display: inline-block;
  width:9rem;
  height:9rem;
  line-height: 9rem;
  text-align: center;
  border-radius: 4.5rem;
  border:1px solid red;
  margin:.3rem;
}
@media (max-width: 375px){
  html{
    font-size:24px;
  }
}
@media (max-width: 320px){
  html{
    font-size:20px;
  }
}
@media (max-width: 640px) {
  .intro {
    margin: .3rem auto;
  	display: block;
  }
}
```

> 注意 @media (max-width: 375px) 一定要写在 @media (max-width: 320px) 的前面，否则将会一直应用 @media (max-width: 375px) 的样式，例如 设备的宽度为 220px，这个时候两个都满足，但是由于@media (max-width: 375px) 在后面所以它设置的样式会覆盖前面的样式。

设置完后，当设备宽度为 375 时 html 的 font-size为 24px，此时 1rem = 24px（之前 1rem = 20px）所以圆圈会被放大一些。

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvMjAyMDAxMDQyMDU4NDIucG5n?x-oss-process=image/format,png)

通过上图可以看到，圆圈的大小变成了 `218*218`，不再是之前的 `182*182`。

**注意** 使用 rem 时有时计算出来的像素是不精准的，例如上例中我想令 .intro 元素的高度为 175 px，由于 1 rem = 24 px，所以 需要设置 

`height = 7.2916666666666666666666666666667rem` 在实际应用一般不会取小数点后那么多位，假设这里取 `height = 7.3 rem` 所以 height 应该为 7.3 * 24 = 175.2，但是在浏览器中 height 却是 177.19 减去上下的边框等于 175.19 并不等于 175.2，所以会有一点偏差。

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvMjAyMDAxMDQyMTM2MjgucG5n?x-oss-process=image/format,png)



所以，在对像素精度要求很高的地方，使用 rem 时要格外谨慎。

### 4.8 主流网站的布局方式

一般都是使用的 float 布局

### 4.9 CSS 布局面试真题

1）实现两栏（三栏）布局的方法

1. 表格布局
2. float + margin 布局（国内目前使用的主流的方式）
3. inline-block 布局（注意间隙的处理）
4. flexbox 布局（专门为布局产生的，使用很简单，但是兼容性还不是很好）

2）position: absolute 和 fixed 有什么区别

- 前者相对于最近的 absolute 或 relative 父级元素定位
- 后者相对于屏幕定位（移动端相对于 viewport）

3）display: inline-block 的间隙

- 原因: html 代码之间有空白字符，这样的字符间距产生了在页面上产生了间隙。
- 解决方法：
  - 从 html 代码出发消灭中间的空白字符，在两句 html 代码加上注释或者直接将两句 html 代码紧挨在一起。
  - 从 css 代码出发消灭页面上的间距，将父级元素的 font-size 设置为 0，然后再将子元素的 font-size 设置为需要的值。

4）如何清除浮动

- 为什么要清除浮动（浮动有什么不好的影响）？
  
- 浮动带来的不好的影响是浮动元素会脱离文档流，脱离了父元素的控制，有可能会超出父元素的范围影响到其它元素，例如出现在其它元素的上方挡住了其它元素。
  
- 如何清除浮动？

  - 让盒子负责自己的布局（没听懂，不知道怎样实现，难道意思就是设置浮动元素的宽度使其不会超出父元素吗？我现在的理解就是是父元素触发BFC，触发BFC之后父元素要包含所有的子元素，所以父元素宽高的值要足以包括子元。浮动元素的影响主要在于遮盖了其它元素或者是使父元素产生了高度塌陷。父元素触发了BFC之后所有的子元素都在父元素中，所以浮动的元素对其它元素也产生不了不什么影响。）

  - overflow： hidden(auto) 

  -  ::after { clear: both; }

    在父元素的最后加一个伪元素，令其左右两边都没有浮动元素，这样就会限制浮动元素在父元素的范围内。

- 如何适配移动端页面？

  - 首先要将 viewport 的宽度等于设备的宽度，即 
  
    `<meta name= "viewport" content="width=device-width initial-scale=1.0">`
  
  - 通过 rem， media query 等方式改变不同设备上元素的大小
  
  - 在设计上还要做一些事情，例如
  
    隐藏：将 PC 端将一些不重要的内容（如友情链接等）在移动端直接隐藏掉
  
    折行：在 PC 端显示在一行的内容在移动端可以显示几行(这一点上设置了 meta 标签后会自动帮你做，也可以在此基础上自己手动设置一些样式实现折行的效果)
  
    自适应：例如在设置样式时设置一些元素的宽度是自适应的，随着设备宽度的不同会自动改变(例如使用 flex 就可以令有些元素实现自适应)

5）假设现在需要我们将一些方框排列到一行，这个时候两个方框中间的间隙一般需要用 margin-left 来做，但是有个问题是第一个小方框距离最左边也是有一个间距的。我们可以在其父盒子上写一个 `margin-left: -10px` ，然后在子盒子中再写 `margin-left` 之后最左边的盒子和左边就没有间隙了。（来自制作简书项目8.3节）

##  5. CSS 效果

主要的效果属性

- box-shadow
- text-shadow
- border-shadow
- background
- clip-path

### 5.1 box-shadow

影子在现实生活中可以是一个物体的副本，在 CSS 中也是这样的，相当于复制了那个元素（并不是真正的元素，对页面布局没有任何影响），可以从下面的代码中看出来。

```css
.container {
  width: 100px;
  height: 100px;
  background-color: red;
  margin: 50px auto; /*水平居中这样在页面上方便查看阴影*/
  box-shadow: 0 0 0 0 blue;
}
```

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200105092917.png)

这个时候实际上已经生成了一个宽度 100px，高度 100px 蓝色的正方体，现在我们通过给它加一些偏移量让其显示出来。

令 `  box-shadow: 200px 200px 0 0 blue;` 当我们令这个影子(蓝色的正方体)相对于原物体(红色的正方体)向右偏移 200px，向下偏移 200px 之后，就会看到一个红色正方体的一个副本。

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200105093313.png)

讲到这，第一个和第二个参数也讲完了，第一个参数是 x 方向的偏移量（正值表示向右偏移负值表示向左偏移），第二个参数是 y 方向的偏移量（正值表示向下偏移，负值表示向上偏移）。

接下来，我们再来看一下第四个参数，先不说是什么，先上代码看效果。

```css
.container {
	...
  box-shadow: 0 0 0 10px blue;
}
```

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/1578189308402.png)

我们会发现蓝色正方体比红色的正方体大一些，大出来的宽度其实就是我们设置的 10px，第四个参数就是指的在原有副本的基础上扩展多少。第四个参数称为扩展半径，大于 0 的值会在原有副本的基础上向外扩展(也就是会变大)，小于 0 的值会在原有副本的基础上向内扩展（也就是会变小）。

接下来我们再来看第三个参数，还是上代码看效果：

```css
.container {
  ...
  box-shadow: 0 0 10px 20px blue;
}
```

![boxshadow中的阴影模糊半径.gif](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/boxshadow中的阴影模糊半径.gif)



可以看到随着第三个参数的增大，阴影模糊的区域是以阴影的外边框处为中心内外同时变得模糊，模糊的半径就是第三个参数设置的值。

>MDN 解释：
>
><blur-radius>
>这是第三个 <length> 值。值越大，模糊面积越大，阴影就越大越淡。 不能为负值。默认为0，此时阴影边缘锐利。
>对于长而直的阴影边缘，它会创建一个过渡颜色用于模糊 以阴影边缘为中心、模糊半径为半径的局域，过渡颜色的范围在完整的阴影颜色到它最外面的终点的透明之间。 

第五个参数是颜色，没什么太多好说的，第六个参数可以选择设置为 inset，这个是可选的，默认是不设置这个值的。

还是先来看一下 MDN 上的解释：

>inset
>如果没有指定inset，默认阴影在边框外，即阴影向外扩散。
>使用 inset 关键字会使得阴影落在盒子内部，这样看起来就像是内容被压低了。 此时阴影会在边框之内 (即使是透明边框）、背景之上、内容之下。

接下来还是通过动态调整代码来说明一下：

![boxshadow中的inset.gif](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/boxshadow中的inset.gif)

通过上图可以看出，当调整扩展半径时，随着扩展半径的增大，原物体(红色的正方体)是逐渐减小的，扩展的方向是向内。

当调整模糊半径时，是以原物体边框为中心向两侧模糊，模糊半径是第三个参数设置的值。



现在有个问题，怎样不使用 border 画出一个 1px 的边框呢？通过 box-shadow 就可以实现。

```css
.container {
  box-shadow: 0 0 0 1px blue;
}
```

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200105110613.png)

经常说的，一个元素实现各种神奇的样式一般都是用 box-shadow 做的。

看看这个 [叮当猫]( https://happycoding1024.github.io/CSSLearning/src/boxshadow-叮当猫.html) 吧。

box-shadow 的作用

- 营造立体感

  例如可以将某个按钮就像是悬浮一样，例如就像是我博客园主页上的 知乎 按钮。

  ![博客园主页知乎按钮.png](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200105112646博客园主页知乎按钮.png)

- 充当没有宽度的边框

  注意使用 border 设置边框在布局时是需要考虑边框的宽度的，但是使用 shadow-box 设置的边框是不需要的，因为阴影本来就是虚拟出来的，并不是一个具体的元素，布局时根本不会考虑它。

- 特殊效果

  例如只利用一个元素来通过很多次 box-shadow 的方式，做出很多种奇妙的图形，对于一些比较难画的地方可以利用一个一个的点拼接起来，例如叮当猫的胡须。

  但是如果利用特别多的 shadow-box，性能其实并不是很好。

### 5.2 text-shadow

> MDN 
>
> text-shadow 为文字添加阴影。可以为文字与  text-decorations  添加多个阴影，阴影值之间用逗号隔开。每个阴影值由元素在X和Y方向的偏移量、模糊半径和颜色值组成。

文本阴影，使得文字有一种立体感。

```css
.container {
  ...
  text-shadow: 1px 1px 1px #ccc;
}
```

`text-shadow` 中第一个参数表示的是 x 方向的偏移量，第二个参数表示 y 方向的偏移量，第三个参数表示阴影的模糊半径，第三个参数代表阴影的颜色。

### 5.3 border-radius

> MDN
>
> CSS 属性 border-radius 允许你设置元素的外边框圆角。当使用一个半径时确定一个圆形，当使用两个半径时确定一个椭圆，这个(椭)圆与边框的交集形成圆角效果。

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200105192021.png)

可以实现以下图形

- 圆角矩形
- 圆形
- 半圆/扇形
- 一些奇怪的角

1）画出圆形

前提条件是 div 元素要是正方体

```css
border-radius: 50%;
```

2）扇形

可以指定某个角的圆角是多少，利用这种特性可以制作成一个扇形，前提条件是 div 是个正方体。

```css
border-top-left-radius: 100%;
/* 等价于 */
border-radius: 100% 0 0 0; /* 顺序依次是左上，右上，右下，左下 */
```

100% 说明它的半径就是蓝色正方体的宽度。

也可以像下面这样写，对应长轴的半径和短轴的半径，是一个椭圆的形状。

```css
border-radius: 10px 10px 10px 10px / 20px 20px 20px 20px;
```

3）半圆

前提条件是 div 元素的长和宽是两倍的关系。

注意不能再用 50% 了。

```css
/* 上半圆 */
div {
  width: 100px;
  height: 50px;
  border-radius: 50px 50px 0 0;  
}
```

4） 比较奇怪的图案

叮当猫的胡须就是利用圆角做的，加一个 border-bottom，然后再加上 border-radius。

```css
.container {
  width: 100px;
  height: 50px;
  border-bottom: 2px solid #ccc;
  border-radius: 0 0 30px 30px;
}
```

下面这样写会对应长轴的半径和短轴的半径，是一个椭圆的形状。

```css
border-radius: 10px 10px 10px 10px / 20px 20px 20px 20px;
```

通过修改不同的值也可以做出很多有趣的形状。

### 5.4 background

可以做出来一些纹理，图案，渐变等，如

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200105201046.png)

雪碧图动画

例如当鼠标移入某个图标的时候切换到雪碧图中的另一个图标，中间的过程通过 transition 加上动画。

```css
.i{
  width: 20px;
  height: 20px;
  background: url(../img/background.png) no-repeat;
  background-size: 20px 40px;
  transition: background-position .4s;
}
.i:hover{
  background-position: 0 -20px;
}
```

雪碧图动画：

![雪碧图动画.gif](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/雪碧图动画.gif)

背景图尺寸适应

```css
.container{
  width: 400px;
  height: 300px;
  border: 1px solid red;
  background:url(../img/panda.jpg); 
  background-size: contain; 
  background-repeat: no-repeat; /* 背景图不重复 */
  background-position: center center; /* 背景图的位置 */
}
```

- `background-size: contain` 背景图保持宽高比不变，完全显示在父元素中
- `background-size: cover` 背景图保持宽高比不变，超出父元素的部分会被隐藏掉。

### 5.5 clip-path

clip-path 可以对容器进行裁剪，既可以利用常见的几何图形进行裁剪又可以自定义路径进行裁剪。

```css
.container{
  width: 400px;
  height: 300px;
  border: 1px solid red;
  background:url(../img/panda.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  padding:10px;
  /* clip-path: inset(100px 50px); */
  /* clip-path: circle(50px at 100px 100px); */
  /* clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%, 10% 10%, 40px 10px); */
  clip-path: url(#clipPath);
  /* background-size: cover; */
  transition:clip-path .4s;
}
```

- `clip-path: inset(100px 50px)` 距离顶部 100px ，左边 50px 处，同样距离底部也是 100px，右边也是 50px。

- `clip-path: circle(60px at 100px 100px)` 圆心距离顶部和左边都为 100px，圆的半径为 60px。

- `clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%, 10% 10%, 40px 10px)` 由许多点连接构成的路径，可以自己定义，50% 就是某个方向上的中间位置，例如第一个点 `50% 0%` 表示的是左右的中间位置，距离顶部为 0 的点。

  > 这个每个点第一个参数表示左右方向，而上面 clip-path inset中第一个参数表示的是上下方向。

- `clip-path: url(#clipPath)` 可以和 svg 结合，svg 中的设置的点组成的路径就是要裁剪的路径。

  ```html
  <svg>
    <defs>
      <clipPath id="clipPath">
        <!-- <circle cx="60" cy="60" r="50" fill="#34538b" /> -->
        <polygon stroke="#979797" points="0.4921875 81.2070313 92.640625 81.2070313 121.601562 0.21875 153.648437 81.2070313 247.390625 80.7734375 173.394531 140.496094 200.308594 227.09375 121.601562 172.71875 53.4960937 227.09375 80.859375 140.496094">			</polygon>
      </clipPath>
    </defs>	
  </svg>
  ```

- clip-path 可以和 transition 动画结合

```css
.container:hover {
  transion: clip-path: circle(80px at 100px 100px);
}
```

这样当鼠标移到这个元素上时就会变成圆形的裁剪区域，转变的过程中会有动画效果。

### 5.6 3D 变换

> 注意只有 block 元素才有 transform 效果。

3D 变换就是在 3D 空间下进行变换。

html 代码

```html
<div class="container">
  <div id="cube">
    <div class="front">1</div>
  </div>
</div>
```

css 代码

```css
.container {
  margin:50px;
  padding: 10px;
  border: 1px solid red;
  width: 200px;
  height: 200px;
  position: relative;
  perspective: 500px;
}
#cube {
  width:200px;
  height:200px;
  transform-style: preserve-3d;
  transform: translateZ(-100px);
  transition:transform .4s;
}
#cube div {
  width: 200px;
  height:200px;
  position: absolute;
  line-height: 200px;
  font-size: 50px;
  text-align: center;
}
.front {
  transform: translateX(100px); /* 令其向右平移 100px */
  background:rgba(255,0,0,.3);
}
```

![向右平移.gif](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/向右平移.gif)



`transform: rotate(25deg) translateX(100px) translateY(10px);` 向下平移 10px，向右平移 100px，然后再顺时针旋转 25deg。

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200105215222.png)

**注意**：在 transiform 中各个变换之间是不能随意交换顺序的，交换位置后结果也是不同，背后的原理在于数学上矩阵乘法是不能交换顺序的。

![transform 参数不能随意交换顺序.gif](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/transform 参数不能随意交换顺序.gif)

可以看到，两次的结果是不同的。

现在我们都是在做 XY 平面上的平移，那么 Z 轴在哪里呢？

Z 轴就是屏幕往外的轴，屏幕往外朝向我们的是 Z 轴的正轴，往里是屏幕的负轴，我们平时设置的 z-index 就可以理解成我们在设置 Z 轴的数值。

现在我们设置 `transform: translateZ(100px)`，但是会发现根本看不出效果，这是因为我们的屏幕只能展示二维的效果。要想在一个二维的平面上展示出三维的效果有很多种方法，其中一种就可以选用透视法，在 CSS 代码中应该做以下设置。

首先给父元素一个透视的视角：

```css
.container {
  ...
  perspective: 500px;
}
```

然后设置正方体变换的样式为 3d 透视(为什么要在这个上面设置而不是在 .front 上设置)

```css
#cube {
  ...
  transform-style: preserve-3d; /* preserve 透视 */
}
```

3D 透视就是利用近大远小的原理来模拟出 3D 的效果，效果见下图：

![3D 透视近大远小.gif](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/3D 透视近大远小.gif)

现在我们将第二个元素加上数字为2，它是在 1 的后面，所以将它向z轴负方向移 100px。

```css
 .back{
 	transform: translateZ(-100px);
}
```

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200105222620.png)

从图中可以比较明显地看到数字 2 比数字 1 要小一些，这符合近大远小的原则。

为了方便查看现在沿着 y 轴进行 180deg 旋转使其出现在侧面的位置

```css
.back{
  transform: translateZ(-100px) rotateY(180deg);
}
```

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200105223247.png)

我们再将其它的元素也添加上，然后再分别旋转和平移，这个地方先不给代码了，最后一起给一个完整的。

接下来说一下，``perspective: 500px;`` 的作用是什么？还是通过一个动图先来感受一下。

![3D变换 perspective.gif](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/3D变换 perspective.gif)

perspective 是视角的意思，就相当于我们人眼距离被观察物体的距离，我们距离物体比较近的时候物体的每个面都会看得比较清楚，远的时候只能看清楚大体的轮廓。

注意 transorm 是一种变换，并不是一种动画，但是我们可以为 transform 加上动画。

```css
#cube {
 transition: transform 1s; /* 当 transform 发生时会有 1s 的动画效果 */
}
/* 当鼠标移上去后会沿着 X 轴旋转 90deg，沿着 Y 轴旋转 90deg*/
#cube：hover {
  transform: translateZ(-100px) rotateX(90deg) rotateY(90deg)
}
```

接下来就给出完整的代码和最终的效果。

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>
  <style>
    .container{
      margin:50px;
      padding: 10px;
      border: 1px solid red;
      width: 200px;
      height: 200px;
      position: relative;
      perspective: 500px;
    }
    #cube{
      width:200px;
      height:200px;
      transform-style: preserve-3d;
      transform: translateZ(-100px);
      transition:transform 1s;
    }
    #cube div{
      width: 200px;
      height:200px;
      position: absolute;
      line-height: 200px;
      font-size:50px;
      text-align: center;
    }
    #cube:hover{
       /*transform: translateZ(-100px) rotateX(270deg);*/
      transform: translateZ(-100px) rotateX(270deg) rotateY(360deg);
    }
    .front{
      transform: translateZ(100px);
       /*transform: translateX(100px); */
       /*transform: translateX(100px) translateY(10px) rotate(25deg); */
       /*transform: rotate(25deg) translateX(100px) translateY(10px);*/
      background:rgba(255,0,0,.3);
    }
    .back{
       /*transform: translateZ(-100px);*/
      transform: translateZ(-100px) rotateY(180deg);
      background:rgba(0,255,0,.3);
    }
    .left{
      transform: translateX(-100px) rotateY(-90deg);
      background:rgba(0,0,255,.3);
    }
    .right{
      transform: translateX(100px) rotateY(90deg);
      background:rgba(255,255,0,.3);
    }
    .top{
      transform: translateY(-100px) rotateX(-90deg);
      background:rgba(255,0,255,.3);
    }
    .bottom{
      transform: translateY(100px) rotateX(90deg);
      background:rgba(0,255,255,.3);
    }


  </style>
</head>
<body>
<div class="container">
  <div id="cube">
    <div class="front">1</div>
    <div class="back">2</div>
    <div class="right">3</div>
    <div class="left">4</div>
    <div class="top">5</div>
    <div class="bottom">6</div>
  </div>
</div>
</body>
</html>
```

![3D变换最终效果.gif](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/3D变换最终效果.gif)

3D 变换的缺点

- 性能不是很好，容易出现卡顿的情况
- 如果变换十分复杂，浏览器渲染出来的结果可能和你预想的不一致。

### 5.7 CSS 效果面试真题

1）如何用一个 div 画 XXX(例如叮当猫)

利用非常多次的 box-shadow（每次 box-shadow 实际上都会产生一个和原物体类似的元素，但注意这个元素是虚拟的），然后再结合 ::before 和 ::after。 

2）如何产生不占空间的边框

涉及到一些精确布局下的问题，在一些布局下有些元素宽高已经是定值了，这个时候如果需要给元素加边框，如果采用 border 的形式元素的大小就会变化了。

这个时候就需要用到不占空间的边框。

1. box-shadow 

   X，Y 方向的偏移量为 0，模糊值设置为 0，扩展半径的值就是想要加边框的宽度。

2. outline（在网上搜了一下，并没有找到很合适的方案）

这个地方可能会关联下面这个问题，如果我就想采用 border，而且保持我设置的元素的宽高不变，有什么办法吗？

有的，利用盒模型，将 `box-sizeing` 设置为 `border-box` 这样就会包含边框后还是之前设置的元素的宽高。

3）如何实现圆形元素(头像)

border-radius: 50% （前提条件是必须是宽和高相等的元素）

4）如何实现 ios 图标的圆角

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200106090505.png)

可以使用 `clip-path:(svg)` 的形式，利用一些 svg 的软件将一些图形处理成 svg 的形式，然后利用 clip-path 的形式。

5） 如何实现半圆、扇形等图形

主要是过border-radius 的组合，例如有无边框(机器猫的胡须只有一个下边框)，边框的粗细(例如可以令有的边框粗有的边框细)，还有就是设置不同的角不同的圆角半径。

6）如何实现背景图居中显示/不重复/改变大小

`background-position` 改变背景图的位置，可以采用 top，bottom，left，right，center等值，例如 

```css
background-position: center left; /* 表示上下居中，靠左 */
background-position: center center; /* 表示上下居中，左右居中 */
```

也可以指定具体的像素，例如

```css
background-position: 10px 20px; /* 距离顶部 10px 左边 20px */
```

`background-repeat` 表示背景图是否重复，怎样重复。

```css
background-repeat: no-repeat; /* 背景图不重复 */
background-repeat: repeat-x; /* 背景图沿着 x 方向重复 */
background-repeat: repeat-y; /* 背景图沿着 y 方向重复 /
```

> 注意： 在做雪碧图的时候不要让背景图重复

`background-size` 用来设置背景图的大小

```css
background-size: 20px 20px; /* 设置背景图的宽度为 20px 高度为 20px */
background-size: contain; /* 保持背景图的宽高比不变，完全显示父元素中，父元素中可能会有没有背景图覆盖的地方 */
background-size: cover; /* 保持背景图的宽高比不变，超出父元素的部分隐藏，父元素中没有背景图的空白区域 */
```

7）如何平移放大一个元素

主要考察 transform 的用法

transform:  translateX(100px) 

transform: scale(2)

8）如何实现 3D 效果

1. 设置视角

   如： `perspective: 500px`

2. 设置 `transform-style: preserve-3d;`

3. 设置 `transform: translateX(100px) rotate(90deg) ...`

   还可以添加上 `translation: transform .4s `  这样的动画。

## 6. CSS 动画

### 6.1 动画介绍

**动画的原理：**

视觉暂留的作用，人在看到一系列差异不大的图片的时候就会觉得是一种动画，所以我们需要做的就是每秒中有多少画面呈现，当然这些画面之间的差异要是比较小的。

**动画的作用：**

- 给用户带来愉悦感，提升用户体验
- 引起用户的注意，例如给用户弹出一个警告框
- 反馈，例如在输入密码时如果不正确密码输入框会左右晃动

- 掩饰，在实际中用户点击某个页面时有可能后台需要做很多事情才能将其显示出来，这个时候我们可以加一个渐变的动画加以掩饰，实际上后台在疯狂的响应用户的请求。

**CSS中的动画类型**

1. transition 补间动画

   从一个状态到另一个状态，这两个状态的切换之间是有动画的，例如背景色从红色变成蓝色的过程中是有一个动画过渡的。

2. keyframe 关键帧动画

   它其实也是一种补间动画，但是在动画的过程中可以很多个状态，指定的每个状态都是一个关键帧。

3. 逐帧动画

   中间是没有补间的动画的，只是单纯的从一个帧跳到另一个帧，也就是从一个画面直接跳转到另一个画面

> 帧按照上面的理解就是一个画面。

### 6.2 transition 动画（1）

补间动画就是 CSS 会根据两个状态中间属性的不同自动加上一些动画效果平滑地过渡过去，但是并不是所有的属性的变化 CSS 都能帮你补上这个过渡的动画。

CSS 能够做补间动画的属性：

- 位置相关的

  left，right，margin，transform

- 方位，角度

  transform

- 大小，缩放

  transform

- 透明度

  opacity

- 其它-线性变换

  像上面的位置，方位，大小都是线性变换的一种，这里指的意思是其它的一些线性变换，注意从一个圆转换成方形不是一个线性变换。

> transition: 过渡，在有些书上也叫过渡动画，其实还是直接说英语比较好一些

用法：

```css
.container {
  transition: width 1s; /* 给宽度加一个过渡动画，动画的时长是1s */
  transition-delay: 1s; /* 动画在1s之后触发 */
  /* 延时的属性是可以简写的，可以写成下面的形式 */
  transition: 1s width 1s; /* 给宽度加一个过渡动画，动画的时长是1s，在1s之后才触发这个动画 */‘
  /* transition 支持多个属性同时过渡,并且可以单独设置动画的时长，中间用逗号分隔 */
  transition： width 1s, background 3s; /* 给宽度加过渡动画且过渡时长是1s，给背景加过渡动画且过渡时长是3s */
  /* 给所有能加过渡动画的属性加过渡动画 */
  transition: all 1s;
}
```

### 6.3 transition 动画（2）

 现在我们看到动画的过程并不是匀速的，那么我们如何去修改这个动画的速度和时间的关系呢，可以通过 `transition-timing-function` 来改正。

借助 chrome 浏览器的动画面板来查看动画的效果

在打开开发者调试工具后，按 Esc 键，然后选择 Animations 即可调出动画面板。

1）`transition-timing-function: linear;  ` 

速度始终是匀速的 

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200109101247.png)

这里表示过渡动画的属性有 width 和 height，曲线的高度代表的是速度的大小，可以看到曲线的高度是没有变化的，也可以在上面调试动画的时长，延时等。

2）`transition-timing-function: ease-in-out;`

开始和结束时比较慢，中间的速度比较快。

 ![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200109101611.png)

3）`transition-timing-function: ease-in;`

动画开始时比较慢，后面越来越快

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200109101734.png)

4）`transition-timing-function: ease-out;`

动画开始时比较快，后面越来越慢

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200109101934.png)

5）`transition-timing-function: ease;`

速度是先增加，然后再减小，快结束时速度特别慢

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200109102338.png)

6）CSS 中提供的并不是特别多，如果真的有特殊需要可以采用贝塞尔曲线去做，网上的工具有很多，可以去搜 easing 等关键字。

### 6.4  keyframes 动画

transition 补间动画是在两个状态之间加上一个过渡动画，keyframes 关键帧动画会有多个状态相当于多个补间动画。

过渡动画中必须要求元素的状态发生变化，例如 a:hover，使得 a 元素由一个状态变到了另一个状态，而关键帧动画与元素的状态无关。关键帧动画可以指定元素的状态，直接开始一个动画。

看一下 keyframes 代码的书写就很清晰明了了。

```css
.container {
  width: 100px;
  height: 100px;
  background-color: red;
  animation: run 1s; /* .container对应的keyframes的名字 */
}
@keyframes run { /* 设置.container的keframes的样式 */
  0% { /* 刚开始的时候宽度是200px */
    width: 200px;
  }
  100% { /* 结束的时候宽度是400px */
    width: 400px;
  }
}
```

中间可以写很多状态用不同的百分比表示即可，在 animation 中也可以指定动画的速度和时间的关系。

```css
animation-direction: reverse; /* 反向，从100%往回放 */
animation-iteration-count: infinite /* 循环次数，无限循环或指定循环的具体次数*/
animation-play-state: paused; /* 这个属性可以用来当用户的鼠标移动到动画上时停止动画的播放 */
animation-fill-mode: /* forwards: 动画播放完后保持在100%时的状态， backwards 动画播放完后保持在原来设置的状态（注意并不是0%时的状态）这是浏览器的默认设置*/
```

关键帧动画是 CSS 提供的一种非常强大的动画功能，定义也非常灵活，可设置的选项也多。

### 6.5 逐帧动画

中间没有补间的过程，也就是两个页面之间是直接进行切换的，没有过渡效果。注意逐帧动画是关键帧动画的一个特殊用法，还是利用 `keyframes , animation` 来实现的。

**面试题**

在 CSS 中有几种实现动画的方法？

一种是 transition 另一种就是利用 animation，keyframes 这种形式。

逐帧动画主要适用于无法补间计算的动画。由于逐帧动画需要很多帧也就是很多图片所以它占用的资源一般比较大，在具体使用时使用 steps 来实现。

下面通过代码来说明，实现一个猎豹奔跑的动画：

```css
.container{
  width: 100px;
  height: 100px;
  border: 1px solid red;
  background: url(../img/animal.png) no-repeat;
  animation: run 1s infinite;
  /*animation-timing-function: steps(1);*/
}
@keyframes run{
  0%{
    background-position: 0 0;
  }
  12.5%{
    background-position: -100px 0;
  }
  25%{
    background-position: -200px 0;
  }
  37.5%{
    background-position: -300px 0;
  }
  50%{
    background-position: 0 -100px;
  }
  62.5%{
    background-position: -100px -100px;
  }
  75%{
    background-position: -200px -100px;
  }
  87.5%{
    background-position: -300px -100px;
  }
  100%{
    background-position: 0 0;
  }
}
```

![猎豹奔跑1.gif](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/猎豹奔跑1.gif)

如果是按照上面的代码，由于 keyframes 有补间的效果，所以在两张图片之间会有一个过渡效果，导致不能实现猎豹的正常奔跑的效果。所以我们现在想要去除两张图片之间的过渡动画，可以通过更改 `animation-timing-function: steps(1)` 的方式来实现，意思是在时间动的时候不要过渡动画，steps(1) 的作用就是设置两个关键帧之间画面的个数，如果设置为 1，那么在两个关键帧之间就只有前一个帧的画面。steps(2) 的作用是在两个关键帧之间再补间一个画面，steps(3) 的作用是两个关键帧之间再补间两个画面。

![猎豹奔跑2.gif](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/猎豹奔跑2.gif)

 设置为 steps(1) 后从上图中可以看出来在两个帧之间是没有补间的，只有前一个帧这一个画面。

### 6.6 CSS 动画面试真题

1）问的最多的是 transition 和 keyframes 实现一个动画具体怎样去写

2）CSS 动画的实现方式有几种

由于逐帧动画属于关键帧动画，所以一般是有两种，transition 和 keyframes。

你在面试的时候我感觉可以说有transition实现过渡动画，keyframes（需要利用animation属性）实现关键帧动画和逐帧动画。 

3）过渡动画和关键帧动画的区别

过渡动画需要有状态的变化，例如 a:hover 元素的状态由之前的a状态变成a:hover 中设置的状态时会触发动画。

关键帧动画不需要状态的变化，动画在某个时刻的状态是人为指定的，不需要触发直接就会播放。

关键帧动画可以有很多个状态，能控制地更精细。

4）如何实现逐帧动画

使用关键帧动画去定义每一帧（一般是利用背景图片上有很多图片，每一帧是背景图片的不同位置），然后将 `animation-timing-function` 设置为 `steps(1)` 去掉补间。

5）CSS 动画的性能

> 和 JS 的比较一直就没有变过，但是这是没有定论的，不能说哪一个更好，只能说针对某一种情况下某一个更好。

比较合理的结论如下：

- CSS 部分情况下优于 JS（这取决于 JS 动画是怎样写的，例如不同的动画库性能差距可能会有10倍甚至100倍）
- JS 可以做的更好（这一点指的是 JS 给我们的优化空间比较多，CSS 就给我们提供了那么多的API，优化空间并没有那么大）
- 有些高危的属性无论用哪一种方法去做动画效果都不是很好，例如对 box-shadow 等属性做动画，就很容易出现性能极低的情况。



## 7. CSS 预处理器

> CSS 预处理器和前两年相比热度是有所下降的，因为现在前端工程化对于 CSS 方面的提升有了更多的手段。

### 7.1 CSS 预处理器介绍

CSS 预处理器是基于 CSS 的另一种语言并不是一种 CSS 的语法，可以这样来理解，ES6 可以通过 babel 预处理器将 ES6 的代码编译成 ES5 的代码，CSS 的预处理器也可以将一种新的 CSS 语法编写的代码编译成 CSS 代码。

新的 CSS 语法添加了很多 CSS 不具备的特性，使得 CSS 中也有了变量等概念，提升了 CSS 代码的组织形式。

常见的 CSS 预处理器有以下两种： less 预处理器，Sass 预处理器

> Sass 有一个新的版本叫 Scss，但一般不做区分还是称为 Sass

less(基于Node) 是由 JS 编写的编译速度比较快，而且有一个浏览器中直接使用的版本不需要预先编译，入门简单，但是在一些复杂特性上面显得非常繁琐。

Sass是 Ruby 写的，编译速度比较慢，可以采用 nide-sass 来解决这个问题。

CSS 预处理器的优点

- 嵌套，反映层级和约束

- 变量和计算， 减少重复代码

- Extend 和 Mixin 代码片段

- 循环 适用于复杂有规律的样式

- import CSS 文件模块化

  在 CSS 中是有 import 语法的但是并不会做一些代码合并只是咋浏览器端动态的引入一些样式文件，在浏览器端直接引用CSS文件会有性能问题，因为每当引用一个css文件时都会发一个请求。但是使用预处理器中 CSS 的 import 就可以将一些模块的代码进行合并，不会发送那么多次的请求。

### 7.2 less 安装

安装 less，由于less 是由 Node 开发的并且是由 npm 发布，所以可以通过 npm 的命令进行安装。

```shell
npm install less 
```

上面的命令是将其安装到当前工程下，需要使用下面的命令去使用less

```bash
./node_modules/less/bin/lessc ./src/nest.less>./src/less.css
```

后面的 `>` 表示将编译完成的 CSS 文件放到 `less.css` 文件中。

### 7.3 less 嵌套

```less
body{
  padding:0;
  margin:0;
}

.wrapper{
  background:white;
  .nav{
    font-size: 12px;
  }
  .content{
    font-size: 14px;
    &:hover{
      background:red;
    }
  }
}
```

`&` 运算符表示是当前元素，在加一些伪类时非常方便，如果没有`&` 那么在上面写 hover 元素时，还需要另写一行 `:content:hover { ... }`.

编译成 CSS 代码后

```css
body {
  padding: 0;
  margin: 0;
}
.wrapper {
  background: white;
}
.wrapper .nav {
  font-size: 12px;
}
.wrapper .content {
  font-size: 14px;
}
.wrapper .content:hover {
  background: red;
}
```

不得不说一句 CSS 预处理器真的很好用呀。

### 7.3 sass 嵌套（1）

虽然 sass 是采用 Ruby 写的，但是可以通过 node-sass 使用 sass

```bash
npm install node-sass
```

sass 文件的后缀是 .scss

```bash
./node_modules/node-sass/bin/node-sass ./src/nest.scss>./src/nest.scss.css
```

### 7.4 sass 嵌套（2）

sass 代码

```scss
body{
  padding:0;
  margin:0;
}

.wrapper{
  background:white;

  .nav{
    font-size: 12px;
  }
  .content{
    font-size: 14px;
    &:hover{
      background:red;
    }
  }
}

```

编译转换完成后的 CSS

```css
body {
  padding: 0;
  margin: 0; }

.wrapper {
  background: white; }
  .wrapper .nav {
    font-size: 12px; }
  .wrapper .content {
    font-size: 14px; }
    .wrapper .content:hover {
      background: red; }
```

可以看到上面的CSS代码是保留嵌套关系的，如果想输出其它格式的CSS代码，也可以在sass编译时指定输出代码的风格。

```bash
./node_modules/node-sass/bin/node-sass --output-style expanded ./src/nest.scss>./src/nest.scss.css
```

就会看到下面没有嵌套关系格式的 CSS 代码

```css
body {
  padding: 0;
  margin: 0;
}

.wrapper {
  background: white;
}

.wrapper .nav {
  font-size: 12px;
}

.wrapper .content {
  font-size: 14px;
}

.wrapper .content:hover {
  background: red;
}

```

### 7.5 less 变量

在 less 中变量的声明方式如下：

```less
@fontSize: 12px;
@bgColor: red;
```

对颜色也可以进行运算，less 提供了很多对颜色操作的函数，例如

```less
.wrapper {
	background: lighten(@bgColor, 40%);
}
```

上面这条语句就是将变量 @bgColor 的颜色变浅 49%。

字体大小这样的数字当然也可以运算，例如

```less
.content {
  font-size: @fontSize + 2px;
}
```

实际应用中会设置比较多的变量，有了变量后以后需要改变什么的时候也比较方便，注意变零不能滥用，例如有个元素的大小刚好比 @fontSize 的大小大2px，尽量不要直接用 @fontSize + 2px 的方式设置那个元素的大小。因为它们两个只是碰巧有这种关系，使用变量时最后是有比较强的关系时才去使用那个变量。

### 7.6 sass 变量

sass 中的变量和 less 中的变量只有一个符号上的区别，sass 中采用 `$` less 中采用 `@`。

### 7.7 less中的 mixin

> mixin 
>
> 优点：实现样式代码复用
>
> 缺点：转换生成的 css 代码会产生冗余代码

如果我们需要给两个元素同时应用一种样式在可以在 html 代码中给这两个元素加一个相同的类。less 中的 mixin 可以在不在 html 代码中加类的方法实现相同的效果。

mixin 的作用是可以实现样式的复用，不是很好描述如果面试中被问到就举例来说明。

less 代码：

```less
@bgColor: red;

.box(@bgColor) {
  color: @bgColor;
}

.nav {
  .box(@bgColor);
}
.content {
  .box(@bgColor);
}
```

编译后的 css 代码

```css
.nav {
  color: red;
}
.content {
  color: red;
}
```

可以看到 .box 中定义的样式已经被应用到了 .nav 和 .content 中，而且在编译后的代码中也没有出现 .box，看起来像是一个函数调用，其实可以按照这样去记。

还有一种方法，这种方法下 .box 会出现在编译后的css代码中

less 代码如下

```less
@bgColor: red;

.box{
  color: @bgColor;
}

.nav {
  .box;
}
.content {
  .box;
}
```

编译后的 CSS 代码如下

```less
.box {
  color: red;
}
.nav {
  color: red;
}
.content {
  color: red;
}

```

可以看到在编译后的代码中也出现了 .box 这个类。

### 7.8 sass中的 mixin

和 less 中的 mixin 作用几乎是相同的。

用法上和 sass 稍微有一点不同

- 需要加一个 @mixin
- 在使用时需要在前面加一个 @include

```scss
$bgColor: red;

@mixin box($bgColor){
  color: $bgColor;
}

.nav {
  @include box($bgColor);
}
.content {
  @include box($bgColor);
}
```

转换完成后的 CSS 代码

```css
.nav {
  color: red; }

.content {
  color: red; }

```

**mixin的使用场景**

例如将清除浮动的代码封装成一个 mixin，在需要清除浮动的地方直接引用这个mixin就好了。

还有一些通用的样式想要用的元素直接引用这个 mixin 即可。

### 7.9 less中的 extend

当我们仔细观察 **mixin** 生成的 css 代码时，我们会发现有**冗余代码**，看下面的代码：

```css
.nav {
  font-size: 14px;
  color: red;
}
.content {
  font-size: 12px;
  color: red;
}
```

这样会增大 css 代码的体积，extend 就可以解决这个问题。

```less
@fontSize: 12px;
@bgColor: red;

.block{
  color: @bgColor;
}
.nav {
  &:extend(.block);
  font-size: @fontSize + 2px;
}
.content {
  &:extend(.block);
  font-size: @fontSize;
}
```

转换后的 CSS 代码

```css
.block,
.nav,
.content {
  color: red;
}
.nav {
  font-size: 14px;
}
.content {
  font-size: 12px;
}
```

**mixin 和 extend 的区别**

mixin 是将 mixin 设置的样式代码直接复制到某个选择器的样式代码中

extend 是将选择器提取出来，然后将选择器应用extend的那个选择器规定的样式。

**那么在mixin和extend中怎样做选择呢**

mixin 会产生冗余代码，如果你想让代码比较小的话要选用 extend。

具体参考这篇博客(这篇是讲 Sass 的，不过原理上是适用的) [@mixin和@extend该如何选择](https://www.w3cplus.com/preprocessor/sass-mixin-or-extend.html)

### 7.10 sass 中的 extend

和 less 中的 extend 概念是相同的，只是用法上稍微有点差别。

```scss
$fontSize: 12px;
$bgColor: red;

.block{
  color: $bgColor;
}
.nav {
  @extend .block;
  font-size: $fontSize + 2px;
}
.content {
  @extend .block;
  font-size: $fontSize;
}
```

转换为 css 代码后

```css
.block, .nav, .content {
  color: red;
}

.nav {
  font-size: 14px;
}

.content {
  font-size: 12px;
}
```

> 注意在使用 sass 的默认转换方式时，生成的 css 代码都是保留嵌套结构的，这一点和我们平时写的代码风风格并不一致，可以在转换时加上 --output-style expanded 参数。

### 7.11 less 中的 loop

less 中是没有循环的，通过递归的方式来实现循环。

```less
.gen-col(@n) when (@n > 0) {
  .gen-col(@n - 1);
  .col-@{n} {
    width: 1000px/12*@n;
  }
}

.gen-col(3);
```

转换完 CSS 代码

```css
.col-1 {
  width: 83.33333333px;
}
.col-2 {
  width: 166.66666667px;
}
.col-3 {
  width: 250px;
}
```

### 7.12 sass 中的 loop

利用 less 中递归的方式实现

```scss
 @mixin gen-col($n){
     @if $n > 0 {
         @include gen-col($n - 1);
         .col-#{$n}{
             width: 1000px/12*$n;
         }
     }
 }

 @include gen-col(12);
```

在 scss 中是支持 for 循环的也可以利用下面的方法

```scss
@for $i from 1 through 12 {
    .col-#{$i} {
        width: 1000px/12*$i;
    }
}
```

### 7.13 less 中的 import

CSS 中的 `@import` 可以引入模块，但是 CSS 的写法不会做任何的合并，在加载时有一个 `@import` 就会去加载一次，这样就会增加 http 的请求数。所以在 CSS 中为了性能优化就会将很多 CSS 代码放在一个文件中，这样不利于代码维护。

CSS 预处理做了一些优化，在引入时还是使用 `@import`，但是在编译完成后会将 CSS 代码合并到一起。

下面三个是根据实际情况拆分的三个 CSS 模块

```less
// import-variable.less
@themeColor: blue;
@fontSize: 14px;
// import-module1.less
.module1{
    .box{
        font-size:@fontSize + 2px;
        color:@themeColor;
    }
    .tips{
        font-size:@fontSize;
        color:lighten(@themeColor, 40%);
    }
}
// import-module2.less
.module2{
    .box{
        font-size:@fontSize + 4px;
        color:@themeColor;
    }
    .tips{
        font-size:@fontSize + 2px;
        color:lighten(@themeColor, 20%);
    }
}
```

现在将这三个模块引入

```less
@import "./import-variable";
@import "./import-module1";
@import "./import-module2";
```

然后进行编译生成 CSS 代码

```css
.module1 .box {
  font-size: 16px;
  color: blue;
}
.module1 .tips {
  font-size: 14px;
  color: #ccccff;
}
.module2 .box {
  font-size: 18px;
  color: blue;
}
.module2 .tips {
  font-size: 16px;
  color: #6666ff;
}
```

可以看到三个模块的 CSS 代码被合并到了一个文件中。这样以后我们就可以尽情按照实际情况去拆分样式代码文件，这样做很利于代码维护。

### 7.14 scss 中的 import

和 less 中 import 的用法没有什么大的差别，不再赘述。

### 7.15 CSS 预处理器框架

在 CSS 中使用他人写的代码时只能将别人写的代码整套引用过来，使用 CSS 预处理器框架后可以只使用别人代码中的一部分。

常用的 CSS 预处理器框架

SASS 中最出名的是 Compass

Less 中  Lesshast/EST

其实就是别人写好了很多 mixin 供你去调用，就类似于 JS 中有很多库，你可以按需调用里面的方法一样。

### 7.16 CSS 预处理器面试真题

1）常见的 CSS 预处理器

Less （Node.js)

Sass(Ruby，也有 Node 版本)

2）预处理器的作用

- 帮助开发者更好地组织 CSS 代码
- 提高代码复用率(变量。函数等)
- 提升可维护性

3）预处理器的能力

- 嵌套（反映层级和约束）
- 变量和计算（减少重复代码）
- Extend 和 Mixin 代码片段
- 循环 （适用于复杂有规律的样式）
- import （CSS 文件模块化）

4）预处理器的优缺点

优点：

- 提高代码复用率和可维护性

缺点：

- 需要引入编译过程，有学习成本

## 8. Bootstrap

一个 CSS 框架，由 twitter 出品，提供通用的基础样式。

## 9. CSS 工程化

工程化是什么意思？

工程化会关注以下几件事情

组织：代码应该怎样组织，应该把代码分成怎样的目录，分成怎样的模块才方便大家合作

优化：代码优化，怎样写代码最好

构建：代码写好了应该怎样去构建，上线也属于构建的一部分

维护：易维护

两个工具

1）PostCSS（POST 后面，后置的 CSS，它和 CSS 预处理器是一个相对的概念，CSS 预处理器是非 CSS 语言通过编译生成 CSS 语言，PostCSS 是将 CSS 代码进行处理得到新的 CSS 代码，在这个转换的过程中可以做很多事情，例如可以对 CSS 代码进行模块化，将一些模块进行合并，也可以自动给 CSS 的有些属性加上前缀，也可以去处理兼容性的问题，还可以做非常多的事情）

现在 PostCSS 官方也有说其实现在不严格区分是前置还是后置，它和 CSS 预处理器要做的就是将代码最终转换成 CSS 代码，当然中间的过程会做很多的事情。

![1578922498389](D:\frontEndNotes\CSS\全面系统讲解CSS工作应用课程笔记\1578922498389.png)

PostCSS 本身只有解析的能力，就是说对于一段 CSS 代码它会解析成一个结构化的 CSS。将 CSS 变换成另一种 CSS 的能力(中间加很多处理)是各种各样的插件做的，目前为止至少有 200 多个插件。

常用的插件有

- import 模块合并 
- autoprefixer 自动加前缀（非常有名，经常使用）
- cssnano 压缩代码（不只是压缩代码还会帮你分析是不是有无用的代码，或者代码是不是有简写的方式等等）

- cssnext 使用 CSS 新特性（一些 CSS 新特性浏览器不可能这么快地就支持，使用 cssnext 之后就可以将新特性进行编译使得浏览器能够支持，感觉有点像 babel 的作用）
- precss 变量，mixin，循环等

### 9.2 PostCSS 插件的使用

> [autoprefixer官网](https://github.com/browserslist/browserslist#best-practices)

安装 postcss-cli

```bash
npm install postcss-cli -D
```

新建一个 postcss.css 文件

```css
* {
  padding: 0;
  margin: 0;
}

.box {
  box-shadow: 0 0 3px rgba(255, 255, 255, .3);
}
```

然后利用 `postcss-cli` 命令将其编译到 build 目录下

```bash
postcss src/01-postcss.css -o build/01-postcss.css
```

编译生成后的 CSS 代码如下

```css
* {
  padding: 0;
  margin: 0;
}

.box {
  box-shadow: 0 0 3px rgba(255, 255, 255, .3);
}
```

可以看到代码并没有发生变化，正如前面我们说过的 PostCSS 本身没有代码处理的能力只是能将 CSS 代码解析出来而已。为了证明 PostCSS 是有解析 CSS 代码的能力的并不是将文件直接复制过来，现在我们将 src 中的 css 代码改变一下：

```css
* {
  padding: 0;
  margin: 0;
}

.box {
  box-shadow: 0 0 3px rgba(255, 255, 255, .3);
  zofaiofj
}

```

可以看到在添加非法的 CSS 代码之后，PostCSS 是会报错的。

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200113PostCSS解析报错.png)

要将 CSS 代码做一些处理我们需要加一些插件。

现在我们使用 autoprefixer 插件，需要先加一个 postcss.config.js 文件，文件内容如下

autoprefixer 是需要指定支持的浏览器的，它会根据你指定的浏览器决定是去加前缀还是不加前缀还是加什么样的前缀。

```js
const autoprefixer = require('autoprefixer');

module.exports = {
  plugin: [
    autoprefixer
  ]
};
```

在 src 目录下加一个 `.browserslistrc` 配置文件

```
defaults
>0%
```

在这个配置文件中可以指定要支持的浏览器，配置项有很多，可以去 [Browserslist](https://github.com/browserslist/browserslist#best-practices)  查看。

BrowserList 的配置项是有 [can I use](https://caniuse.com/) 这个网站提供的，这个网站提供了浏览器可以支持的特性和每个浏览器的占比等。

在 webpack 中的使用方式更要会，具体怎样使用见 webpack 的学习笔记。

通过指定兼容的浏览器，那岂不是也可以作为兼容浏览器的一种方式吗？

**postcss-import 插件**

考虑下面一种需求，现在我想将 `01-postcss.css` 这个文件中的 CSS 样式引入到 `02-postcss-plugin.css` 这个文件中。

 ```css
/* 现在我想将 01-postcss.css 引入进来 */
@import "./01-postcss.css";

.box {
  box-shadow: 0 0 3px rgba(255, 255, 255, .3);
}
 ```

现在我再执行 `postcss src/02-postcss-plugin.css -o build/02-postcss-plugin.css` 命令将其进行解析转换，可以看到结果如下所示。

```css
/* 现在我想将 01-postcss.css 引入进来 */
@import "./01-postcss.css";

.box {
  box-shadow: 0 0 3px rgba(255, 255, 255, .3);
}
```

可以看到并没有任何改变，还是验证了那句话，postcss 只有解析的功能并没有转换 CSS 代码的功能，如果想对代码做一些处理需要借助一些插件，在这里我们就是用 postcss-import 这个插件来实现 CSS 模块导入并将代码合并，这样在进行 http 请求时就可以减少 http 请求的次数，提高性能。

将 postcss.config.js 文件修改如下：

```css
const atImport = require('postcss-import');

module.exports = {
  plugins: [
    atImport,
  ]
}
```

这个时候，我再次执行 `postcss src/02-postcss-plugin.css -o build/02-postcss-plugin.css` 命令进行转换，转换完成的代码如下。

```css
/* 现在我想将 01-postcss.css 引入进来 */
* {
  padding: 0;
  margin: 0;
}
.box {
  box-shadow: 0 0 3px rgba(255, 255, 255, .3);
}
.box {
  box-shadow: 0 0 3px rgba(255, 255, 255, .3);
}
```

可以看到已经将导入模块的代码合并进来了。

**cssnano 插件**

cssnano 插件用来将 css 代码进行压缩，一般在最后时使用这个插件。

引入方法和前面两个方法的方式一样，这里不再赘述，直接看最终的结果

```css
@import "./01-postcss.css";.box{box-shadow:0 0 3px hsla(0,0%,100%,.3)
```

明显可以看到代码被压缩了，不仅仅是压缩，它还会分析我们的代码，如果有冗余或者是可以简化的代码也会帮我们做一些处理。

### 9.4 cssnex 插件

这个也是一个插件，只不过比较大一些，所以单独拿出来一节来讲。这个插件的作用是将一些 CSS 的新特性转换为浏览器支持的特性，思想和 babel 转换 ES6，ES7 这些 JS 新特性差不多。

下面是 CSSNext 的特性，可以看到很多和 CSS 预处理器的有些功能差不多。

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200114CSSnext.png)

注意这个地方需要安装的是 `postcss-cssnext` 并不是 `cssnext`（因为你现在是在 postcss 中去引用。.

```shell
npm install postcss-cssnext -D
```

postcss.config.js 的配置文件如下：

```js
const cssNext = require('postcss-cssnext');

module.exports = {
  plugins: [
    cssNext,
  ]
}
```

cssnext 只支持用 :root 来定义变量，如

```css
:root {
  --mainColor: red;
  /* 类似于预处理器中的 mixin */
  --danger-theme: {
    color: white;
    background-color: red;
  }
}
```

使用 var 来读取变量，如

```css
a {
  color: var(--mainColor);
}
```

使用 @apply 来应用一段代码，如

```css
.danger {
  @apply --danger-theme;
}
```

我在进行编译的时候会出现错误，有可能是现在版本的方法有了一些变动，而我在视频上看的方法还是之前的方法，这个先放一下吧。

- [ ] postcss-cssnext 无法使用

正确的结果应该如下所示

```css
a {
  color: red;
}

.danger {
  color: white;
  background-color: red;
}
```

### 9.5 precss

precss 的功能更像是预处理器，它主要的功能有：变量，条件（if），循环，mixin，extend，import，属性值引用 等。

属性值的引用指的是例如定义一个 margin 是10px，接下来定义 padding 的时候直接使用 margin 就好了。

使用方法和 sass 很类似。

precss 代码示例：

```scss
$blue: #056ef0;
$column: 200px;

.menu {
  width: calc(4 * $column);

}

@for $i from 1 to 3 {
  .b-$i {
    width: $(i)px;
  }
}
```

要在 PostCSS 中使用 precss，首先需要安装 press

```shell
npm install precss -D
```

然后修改 postcss.config.js 配置文件

```js
const precss = require('precss');

module.exports = {
  plugins: [
    precss,
  ]
}
```

然后进行转换，转换完成后的代码如下所示

```css
.menu {
  width: calc(4 * 200px);
}

.b-1 {
    width: 1px;
  }

.b-2 {
    width: 2px;
  }

.b-3 {
    width: 3px;
  }
```

其实我有一个疑问 `width: calc(4 * 200px)` 确实是将变量进行替换了，可是 `calc(4 * 200px)` 又将怎样去进行处理。

从这里可以看到 PostCSS 中 precss 的功能与 Sass，Less 等非常相似，使用哪一个都可以。

### 9.6 gulp 中使用 postcss

PostCSS 作为一个 CSS 处理工具，本身并不是很擅长构建工作，因此它需要和其它构工具来合作完成构建工作。它可以用在非常多的构建工具中，除了自带的 postcss-cli 命令行工具外，它还可以和 webpack，gulp 等等非常多的构建工具进行结合。

webpack 是通过 postcss-loader 的方式，Gulp 是通过 gulp-postcss 的方式 ... 都有对应的插件.

Gulp 本身自带的构建功能比较少，主要也是靠插件。

Gulp 怎样使用 postcss 就不说了，Gulp 自己也不了解。

### 9.7 webpack

webapck 是一个模块化打包工具，它首先解决的就是 js 模块化的问题，即使 ES6 出现了 import 等模块化的方法，但是在浏览器中还没有得到广泛的支持，所以需要借助一些工具来实现模块化。在 webpack 中可以通过使用 babel 工具来实现对 ES6 代码的解析。

下图是 webpack 的文件转换图，从图上可以看出，它可以将左边的那些类型的文件转换为右边 .js, .css, .jpg, .png 这四种类型的文件。

![1584842789916](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/webpack转换的文件.png)

webpack 的核心思想

1）JS 是整个应用的核心入口

​	只需要在一个 html 文件中引入一个 js 文件，剩下的由 js 来掌握。

2）一切资源均由 JS 管理依赖

3）一切资源均由 webpack 打包

### 9.8 webpack 处理 CSS（还没有学）

## 10. 三大框架中的 CSS

### 10.6 React 中的 CSS（1）

和 Vue 相比，React 官方并没有提供 React 中书写样式的方案，需要从社区中寻找方案。

社区中的方案较多，主要有 

- css modules

- styled-components

  React 为我们提供了组件但是并没有给我们提供样式的封装，styled-components 为我们提供了带样式的组件，也就是组件中也封装了样式，使用组件时就自带了样式。

- styled jsx

  直接在 JSX 中写样式

### 10.7 React 中的 CSS（2）

**CSS Modules**

 因为**CSS的规则都是全局的**，任何一个组件的样式规则，都对整个页面有效，这可能会导致大量的冲突。例如，如果我有两个css文件，它们的中的一些样式名是一样的，那么就会被覆盖，简单的解决办法就是将样式的命名变得复杂且不重复，但这样样式多了也很难避免重复，且命名变得复杂。 

CSS Modules 就解决了这个问题，在一个组件中引入的类经过构建工具编译之后会变成独一无二的哈希字符串.

下面是一个 App 组件

```js
import React, { Component } from 'react';
import xxx from 'index.css';

class App extends Component {

	render() {
		return <div className={xxx.huisiyuan}>组件App</div>
	}

}

export default App;
```

和上面引入 css 文件不同的是，这里将 index.css 文件输入到 xxx 对象，`xxx.huisiyuan` 代表一个 class。

```css
.huisiyuan {
  background: red;
}
```

构建工具会将 `xxx.huisiyuan` 编译成一个哈希字符串，同样 index.css 文件中的 `.huisiyuan` 也将被编译成同样的哈希字符串，这样这个类名就独一无二了。

这样这个类就有了局域的概念，其它组件不引入使用这个 index.css 文件就不会应用到这个类的样式，因为编译后的哈希字符串其它组件是不知道的。

一般情况下，

|          | 局部样式文件                              | 全局样式文件                          |
| -------- | ----------------------------------------- | ------------------------------------- |
| 命名方式 | xxx.module.css                            | xxx.css                               |
| 引入方式 | import xxx from './xxx.mouule.css'        | import  './xxx.css'                   |
| 用法     | <div className={xxx.类名}>huisiyuan</div> | <div className='类名'>huisiyuan</div> |

**styled-components**

styled-components 见名知义就是一个带样式的组件。

React 的一个理念就是 `all in JS`，styled-components 将样式直接写入到组件中，得到的是一个样式的组件，在调用组件时是带着样式的。

 Styled Component是react的一个第三方库，是CSS in JS 的优秀实践和代表，将CSS写在JS中，可以实现常规CSS所不好处理的逻辑复杂、函数方法、复用、避免干扰。 

使用方法：

首先安装 style-components， `npm install style-components --save`.

下面的代码中 Div 就是一个带样式的组件(带样式的 Div)

```js
import React, { Component } from 'react';
import styled from 'styled-components';

const Div = styled.div`
	color: red;
`;

class App extends Component {

	render() {
		return (
			<div>
				<Div big>hello world</Div>
			</div>
		) 
	}

}

export default App;
```

右下图可以看出，styled-components 自动给 div 加了一个 class。

![1584863507228](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/styled-components加的类名.png)

styled-components 还可以获取到组件的属性，并且在定义样式时进行一些逻辑操作。

```js
const Div1 = styled.div`
	color: red;
	${(props)=> props.big&&`
		font-size: 72px
		`}
`;

const Div2 = styled.div`
	color: blue;
	${(props)=> props.small&&`
		font-size: 30px
		`}
`;

class App extends Component {
	render() {
		return (
			<div>
				<Div1 big>hello world</Div1>
				<Div2 small>hello world</Div2>
			</div>
		) 
	}
}

```

当 Div1 组件中有 big 属性时会设置 `font-size: 72px`，结果如下图。

![1584864134816](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/styled-components设置属性逻辑.png)

**styled jsx**

见名知义就是带样式的 JSX，一般有下面三种形式。

1） 行内样式

 行内样式是一种最基本的写法，和在HTML中写的元素内联样式差不多，但是设置的样式是一个对象。

```js
<div style={{color: red, background: blue}}>hello<div/>
```

 为什么要用两个大括号？

因为在JSX中渲染的JS表达式，它们必须被放在一对大括号里，{style}可以视为一个JS对象。所以第一对大括号正是将JS表达式放入JSX解析，里面的那对大括号则创建了一个style对象实例，所以在这里style是作为一个对象传入组件 。

2）声明样式

 声明样式其实是行内样式的一种改进写法，在render函数外部创建style对象，然后传递给组件，让css与标签分离 。

```js]
const style = {
	color: red,
	background: blue
}

class App extends Components {
	render() {
		return (
			<div style={style}>hello</div>
		)
	}
}
```

3）引入样式文件

其实这一种是 CSS Modules 中全局样式文件的应用，在这里再提一下，用法比较简单就是将样式文件通过 import 语句引入进来，问题就是页面上的所有组件都能应用这个文件中的样式。

App.css 

```css
div {
  color: red;
  background: blue;
}
```

App.js

```js
import './App.css';

class App extends Components {
	render() {
		return (
			<div>hello</div>
		)
	}
}
```





 