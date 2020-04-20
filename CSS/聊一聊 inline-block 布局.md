### 4.6 inline-block 布局

> 布局其实就是想办法怎样将一些元素横向的排列起来，纵向由于块级元素的存在会自动占据一行。

inline-block 元素会占据一行而且可以调整宽高很适合将这些元素排列在一行，而且使用 inline-block 元素排列没有清除浮动这样的问题。

但是，使用 inline-block 布局两个元素之间会有一个空白间隙，下面一起来看一下。

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

![inline-block 布局1](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/inline-block布局1.png)

按道理说，container 的宽度正好等于 left 和 right 的宽度之和，应该并列在一起，但是没有，现在我们减小一些 right 的宽度，将 right 的宽度设置为 500 px，结果如下

![inline-block 布局2](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/inline-bloock 布局2.png)

会发现中间有一个空白的间隙，这是为什么呢？

因为现在使用的是 inline-block 元素，为了方便理解，可以将 inline-block 元素看成是两个文字，文字与文字之间不可能是连在一起的，肯定是有间隙的。

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

![inline-block 正确布局结果](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/inline-block 正确的布局结果.png)



上面是一种方法，下面可以从 html 代码的角度来解决这个问题。

引起上面间隙的根本原因是由于 left 元素和 right 元素代码之间不是紧挨着的导致中间有间隙，可以将 html 代码改成下面这样：

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

![inline-block 正确布局结果](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/inline-block 正确的布局结果.png)



完，如有不恰当之处，欢迎指正哦.

![img]( https://images.cnblogs.com/cnblogs_com/zhangguicheng/1618684/o_200104014755爱你表情.gif)