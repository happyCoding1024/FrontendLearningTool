CSS 中有两种盒模型，分别是 **IE 盒模型 **和 **W3C 标准盒模型**。

![标准盒子模型](http://img.blog.csdn.net/20140124141001609?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvenl1eml4aWFv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

从上图可以看到标准 **W3C 盒模型的范围包括 margin、border、padding、content，并且 content 部分不包含其他部分。**

![IE盒子模型](http://img.blog.csdn.net/20140124141131218?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvenl1eml4aWFv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

从上图可以看到 IE 盒子模型的范围也包括 margin、border、padding、content，和标准 W3C 盒模型不同的是：**IE 盒模型的 content 部分包含了 border 和 pading。**

**W3C 标准盒模型**

```js
元素空间占据空间大小
元素空间高度 ＝ height ＋ padding-top ＋ padding-bottom ＋ border-top + border-bottom + margin-top  + margin-bottom
元素空间宽度 ＝ width + padding-left + padding-right + border-left + border-right + margin-left + margin-right

内盒尺寸计算（元素大小）
元素高度 ＝ height ＋ padding-top ＋ padding-bottom ＋ border-top + border-bottom
元素宽度 ＝ width ＋ padding-left ＋ padding-right + border-left + border-right
```

**IE 模型**

```js
元素空间占据空间大小
元素空间高度 ＝ height ＋ padding-top ＋ padding-bottom ＋ border-top + border-bottom(height 包含了 padding, border)
元素空间宽度 ＝ width ＋ padding-left ＋ padding-right + border-left + border-right(width包含了 padding, border)

内盒尺寸计算（元素大小）
元素高度＝height(height包含了padding,border)
元素宽度＝width(width包含了padding,border)
```

我们平常使用的大都是 W3C 标准盒模型