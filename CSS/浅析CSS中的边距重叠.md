# 浅析 CSS 中的边距重叠

## 边距重叠是什么

在说边距重叠之前，先以正常的思维来考虑如果你现在是浏览器引擎遇到这种情况应该怎么办？

现在有两个元素 div1 和 div2 紧挨着，中间没有它元素，它们的外边距就会发生重叠。div1 在左，div2 在右，div1 的 margin-left 为 20px， div2 的 margin-right 为 30px，那两个元素应该距离多少呢？

50px 吗？应该不是的，如果是 50px，那么 div1 的 margin-left 设置的没起作用，距离右边的元素并不是 20px， div2 元素的 margin-right 也没有起作用。

如果至少要让一个起作用，那应该要让数值大的 margin 起作用，因为如果让 margin 小的起作用有可能会影响显示。

所以当两个相邻的外边距重合时，取较大的 margin。

如果出现magin 为负的情况，则在最大的正maigin中减去绝对值最大的负margin。（这样距离会比较远不会影响相互的显示）

如果没有正边界，则从零中减去绝对值最大的负边界。 

上面说完了相邻元素的边距重叠，还有一种就是父子元素之间的边距重叠。

首先说明一下什么情况下父子元素之间会发生边距重叠，现在**考虑父元素中包含一个子元素**的情况，**当子元素设置了 margin，父元素的 border，padding 为 0 的情况下才会发生边距重叠，如果父元素的 border 或 padding 不为 0，那么子元素外边距和父元素的外边距之间会隔着父元素的 border 或 padding，这样父子元素的 margin 就不会在一起了，也就不会发生边距重叠了。**

下面结合图说明可能出现的几种情况：

**情况一：**父元素: margin: 0,  子元素： margin-top： 60px; 我们的本意是子元素距离父元素的顶部 60px，父元素距离其它元素的 margin 为 0。可是我们可以看到父元素距离顶部有一段间距，这就是子元素设置的 margin-top，父子元素的 margin 发生了重叠，这和我们本意并不相符。

```html
<section id = 'sec'>
  <style media="screen">
    #sec {
  background: yellowgreen;
}
  .child {
    height: 100px;
    margin-top: 60px;
    background: pink;
  }
</style>
<article class='child'>
  </article>
</section>
```

子元素

![1587373692578](D:\frontEndNotes\CSS\1587373692578.png)

父元素

![1587373706878](D:\frontEndNotes\CSS\1587373706878.png)



**情况二：**父元素: margin-top: 100px,  子元素： margin-top： 60px;  通过下面的结果可以看到，父元素距离外部元素的 margin-top 是 100px，验证了边距重叠时，会取较大的 margin 值。

```html
<section id = 'sec'>
  <style media="screen">
    #sec {
  		background: yellowgreen;
			margin-top: 100px;
    }
    .child {
      height: 100px;
      margin-top: 60px;
      background: pink;
    }
	</style>
	<article class='child'>
  </article>
</section>
```

父元素

![1587374044850](D:\frontEndNotes\CSS\1587374044850.png)

子元素

![1587374122983](D:\frontEndNotes\CSS\1587374122983.png)

平常我们经常见到的**外边距塌陷**一般指的是下面这种情况。

父子元素的上方有一个元素，这个时候又会发生边距重叠，并且当这个元素的 margin-bottom 的值要大于等于父子元素边距重叠后最终取得的 margin-top 的值时，父子元素的 margin-top 就不起作用了，这就是**外边距塌陷**。

使用 MDN 上的外边距塌陷的例子吧。

.blue 元素的 margin-bottom 是 12px， .red-inner 元素的 margin-top 也为 10px。这个时候 ，如图所示，.blue 元素和 .red-outer 元素之间的 margin 为 12px，.red-inner 元素的 margin-top 并没有起作用，发生了外边距塌陷。

```html
  <section id = 'sec'>
    <style>
      .blue {
        height: 50px;
        margin-bottom: 12px;
        background: blue;
      }
  
      .red-outer {
        background: red;
      }

      .red-inner {
        height: 50px;
        margin-top: 10px;
      }
    </style>
    <div class="blue">blue</div>
    <div class="red-outer">
      <div class="red-inner">red inner</div>
    </div>
  </section>
```

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200421145700.png)

## 如何解决边距重叠

就上面外边距塌陷的例子而言，本质问题在于子元素没有按照我们的本意距离父元素的顶部 10px，而是与父元素发生了边距重叠。

在最开始的时候我们分析过导致父子元素边距重叠的根本原因就是父元素的 border， padding 为 0，导致父子元素的外边距挨在一起，因此发生了边距重叠。

那么**给父元素的 border或者 padding 一个值即可父子元素边距重叠**的问题。

但是无缘无故给父元素一个 border 或 padding 值似乎不太合适，因此一般我们不采用这种方法，而是**触发父元素的 BFC**。

接下来就详细地讲一下 BFC 到底是什么，BFC 究竟是个什么神奇的东西呢，为什么父元素触发了 BFC 就可以解决边距重叠了，为什么父元素触发了 BFC 就可以清除浮动了呢？

关于 BFC 我们在下一篇文章 [浅析 BFC](https://www.cnblogs.com/zhangguicheng/p/12743437.html) 中一探究竟。

