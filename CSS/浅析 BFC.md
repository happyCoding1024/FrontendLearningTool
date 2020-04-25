#  浅析 BFC

我们常说的文档流其实分为定位流、浮动流和普通流三种。而普通流其实就是指BFC中的FC。FC是formatting context的首字母缩写，直译过来是格式化上下文，它是页面中的一块渲染区域，有一套渲染规则，决定了其子元素如何布局，以及和其他元素之间的关系和作用。常见的FC有BFC、IFC，还有GFC和FFC。BFC是block formatting context，也就是块级格式化上下文，是用于布局块级盒子的一块渲染区域。

简单来说，**BFC 实际上是一块区域，在这块区域中遵循一定的规则，有一套独特的渲染规则。**

我们经常说的**父级元素触发了 BFC，实际上就是这个元素所在的区域要遵循 BFC 的渲染规则。**

那么 BFC 的渲染规则到底是什么呢？

## BFC 的原理是什么（BFC 的渲染规则）

1）BFC 区域内的元素外边距会发生重叠

	这一点和外部的元素是一样的，如果 BFC 内的相邻元素或父子元素	满足边距重叠的条件也会发生重叠

2）BFC 区域内的元素不会与浮动元素重叠

	BFC 内的元素不会与外部的浮动元素重叠

3）计算 BFC 区域的高度时，浮动元素也参与计算

	清除浮动的原理，浮动元素也能撑开盒子，这也是为什么说父元素触发 BFC 后就可以解决父元素高度塌陷的	原因。

4）BFC 区域就相当于一个容器，内部的元素不会影响到外部，同样外部的元素也不会影响到内部。

	解决父子元素的外边距重叠问题。

5）BFC 区域内部元素的排列和外部元素是一致的，也遵循块元素占一行，行内块元素不占一行等规则。

## 如何创建 BFC

> 平常说的触发 BFC 是针对元素说的，元素触发 BFC 后它所在的区域就变成了一个 BFC 区域，创建 BFC 是针对 BFC 本身来说的，因为它本身就是一个区域，所以用创建。

float 不为 none，浮动元素所在的区域就是一个 BFC 区域。

position 的值不是 static 或 relative 的元素所在的区域就是一个 BFC 区域

[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)为 `table-cell` 的表格单元格元素所在的区域也是一个 BFC 区域

overflow 不为 visible 的元素所在的区域也是一个 BFC 区域

下面是 MDN 列举出来的，创建 BFC 的方式

- 根元素(html) （html 元素所在的区域就是一个 BFC 区域，所以我们平时编写的元素都是在一个 BFC 区域内渲染的，有很多东西为什么要这样应该有些也理解了） 
- 浮动元素（元素的 [`float`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/float) 不是 `none`）
- 绝对定位元素（元素的 [`position`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) 为 `absolute` 或 `fixed`）
- 行内块元素（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `inline-block`）
- 表格单元格（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)为 `table-cell`，HTML表格单元格默认为该值）
- 表格标题（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 为 `table-caption`，HTML表格标题默认为该值）
- 匿名表格单元格元素（元素的 [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)为 `table、``table-row`、 `table-row-group、``table-header-group、``table-footer-group`（分别是HTML table、row、tbody、thead、tfoot的默认属性）或 `inline-table`）
- [`overflow`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/overflow) 值不为 `visible` 的块元素
- [`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display) 值为 `flow-root` 的元素
- [`contain`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/contain) 值为 `layout`、`content`或 paint 的元素
- 弹性元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)为 `flex` 或 `inline-flex`元素的直接子元素）
- 网格元素（[`display`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/display)为 `grid` 或 `inline-grid` 元素的直接子元素）
- 多列容器（元素的 [`column-count`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-count) 或 [`column-width`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/column-width) 不为 `auto，包括 ``column-count` 为 `1`）
- `column-span` 为 `all` 的元素始终会创建一个新的BFC，即使该元素没有包裹在一个多列容器中（[标准变更](https://github.com/w3c/csswg-drafts/commit/a8634b96900279916bd6c505fda88dda71d8ec51)，[Chrome bug](https://bugs.chromium.org/p/chromium/issues/detail?id=709362)）。

## BFC 规则验证及应用

接下来根据上面列出的几条规则，通过举例一一验证并且说明每条规则到底有什么实际应用。

### 规则一 BFC 区域内的元素外边距会发生重叠

BFC 区域内的元素和外部元素一样如果满足边距重叠的条件也会发生边距重叠。不知道你有没有发现在 MDN 列举出来的创建 BFC 的方法中，第一条就说 HTML 元素就是一个 BFC，所以我们在页面上写的元素实际上都是在 BFC 区域中。外部元素（其实也是在 BFC 区域内）会发生的事情，BFC 区域内的元素当然也会发生同样的事情。

例如，下面的代码中，两个 article 元素上边距都为 10 px，下边距都为 40 px，但是显示在页面上时发现两个元素的边距只有 40px，发生了边距重叠，并且边距值变成了较大的 40 px。

即使父元素 sec 触发了 BFC，其**内部的元素依然会发生边距重叠**，这也验证了上面的 BFC 渲染规则中的第一条：BFC 区域内部的元素会发生边距重叠。

```html
  <section id = 'sec'>
    <style media="screen">
      #sec {
        background: yellowgreen;
        overflow: hidden;
      }
      .art1 {
        height: 100px;
        margin: 10px auto 40px;
        background: pink;
      }
      .art2 {
        height: 100px;
        margin: 10px auto 40px;;
        background: rgb(202, 24, 178);
      }
    </style>
    <article class='art1'>
    </article>
    <article class='art2'>
    </article>
  </section>
```

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvMjAyMDA0MjAyMDU3MzAucG5n?x-oss-process=image/format,png)

其实消除边距重叠很简单，只需要给 article2 一个父元素，然后触发 BFC 即可。

```html
  <section id = 'sec'>
    <style media="screen">
      #sec {
        background: yellowgreen;
        overflow: hidden;
      }
      .wrapper {
        overflow: hidden;
      }
      .art1 {
        height: 100px;
        margin: 10px auto 40px;
        background: pink;
      }
      .art2 {
        height: 100px;
        margin: 10px auto 40px;;
        background: rgb(202, 24, 178);
      }
    </style>
    <article class='art1'>
    </article>
    <div class='wrapper'>
      <article class='art2'>
      </article>
    </div>
  </section>
```

![1587388160421](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvMTU4NzM4ODE2MDQyMS5wbmc?x-oss-process=image/format,png)

### 规则二 BFC 区域的元素不会与外部的浮动元素重叠

如下面的代码中，.art1 和 .art2 元素是相邻的两个元素。

.art1 是粉红色向左浮动元素，.art2 元素会出现在浮动元素的下方和浮动元素重叠。

```html
  <section id = 'sec'>
    <style media="screen">
      #sec {
        background: yellowgreen;
        overflow: hidden;
      }
      .wrapper {
        /* overflow: hidden; */
      }
      .art1 {
        float: left;
        height: 100px;
        width: 100px;
        background: pink;
      }
      .art2 {
        height: 200px;
        background: rgb(202, 24, 178);
      }
    </style>
    <article class='art1'>
    </article>
    <div class='wrapper'>
      <article class='art2'>
      </article>
    </div>
  </section>
```

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvMjAyMDA0MjAyMTI2MDgucG5n?x-oss-process=image/format,png)

现在我们让 .art2 元素触发 BFC，即给 .wrapper 元素加上 overflow: hidden.结果如下图所示：

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/1587389451350.png)

可以看到当将 art2 元素触发 BFC 之后，它和浮动元素就不会重叠了。

### 规则三 计算 BFC 区域的高度时，浮动元素也参与计算（应用：清除浮动）

浮动带来的问题主要就是父元素中的浮动元素不参与高度计算，所以导致父元素高度塌陷，这条规则使得浮动元素也参与到父元素的高度计算，因此这条规则也是清除浮动的原理。

现在令 .art1 元素左浮动。根据下图可以看到，父元素 section 的高度为 0，这说明浮动元素并未参与高度计算。

```html
  <section id = 'sec'>
    <style media="screen">
      #sec {
        background: yellowgreen;
      }
      .art1 {
        float: left;
      }
    </style>
    <article class='art1'>
      我是浮动元素
    </article>
  </section
```

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvMjAyMDA0MjAyMTQ2NTAucG5n?x-oss-process=image/format,png)

现在令父元素 section 触发 BFC（例如可以给父元素加一个 overflow: hidden 触发 BFC），结果如下图。

![1587390681322](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvMTU4NzM5MDY4MTMyMi5wbmc?x-oss-process=image/format,png)

现在可以看到父元素有了高度。

### 规则四 BFC 区域就相当于一个容器，内部的元素不会影响到外部，同样外部的元素也不会影响到内部（应用：消除边距重叠）

.blue 元素的 margin-bottom 是 12px， .red-inner 元素的 margin-top 也为 10px。这个时候 ，如下图所示，.blue 元素和 .red-outer 元素之间的 margin 为 12px，.red-inner 元素的 margin-top 并没有起作用，发生了外边距塌陷。

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

![](https://img-blog.csdnimg.cn/20200421153903612.png)

现在我们令 .red-outer 元素触发 BFC（例如可以给父元素加一个 overflow: hidden 触发 BFC），结果如下图所示。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20200421154015494.png)

当触发 BFC 之后，.red-outer 元素就是一块 BFC 区域了，利用**规则四**，内部的元素和外部的元素相互不影响，.red-inner 元素是内部的元素，因此它不会再和父元素  .red-outer 的外边距重合了（可以这样理解 父元素的 margin 就是外部区域了）。所以现在它的 margin-top 10px 是相对于父元素的，由于父元素的宽度是由它撑开的，因此现在父元素的高度变成了 60px。

### 规则五 BFC 区域内部元素的排列和外部元素是一致的，也遵循块元素占一行，行内块元素不占一行等规则。

这个前面已经提到过了，在 MDN 触发 BFC 的第一条就是 HTML 元素，可见 HTML 元素所在的区域就是一个 BFC 区域。因此 BFC 区域的内部元素和外部元素的行为是一致的，也遵循块级元素独占一行，行内块元素不占一行等规则。



完，如果发现有什么问题麻烦指正，非常感谢。

