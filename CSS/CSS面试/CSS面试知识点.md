### CSS 面试知识点

**1）box-sizing**

- `content-box` 是默认值。如果你设置一个元素的宽为100px，那么这个元素的内容区会有100px 宽，并且任何边框和内边距的宽度都会被增加到最后绘制出来的元素宽度中。
- `border-box` 告诉浏览器：你想要设置的边框和内边距的值是包含在width内的。也就是说，如果你将一个元素的width设为100px，那么这100px会包含它的border和padding，内容区的实际宽度是width减去(border + padding)的值。大多数情况下，这使得我们更容易地设定一个元素的宽高。2）

**2）outline**

[CSS](https://developer.mozilla.org/en-US/docs/CSS)的`outline`属性是用来设置一个或多个单独的轮廓属性的[简写属性](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Shorthand_properties) ， 例如 [`outline-style`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/outline-style), `outline-width` 和 [`outline-color`](https://developer.mozilla.org/zh-CN/docs/Web/CSS/outline-color)。 多数情况下，简写属性更加可取和便捷。

轮廓与边框在以下几个方面存在不同：

- 轮廓不占据空间，它们被描绘于内容之上
- 轮廓可以是非矩形的。在Gecko/Firefox中，轮廓是矩形的，但是Opera则会围绕元素结构绘制非矩形的形状。

 语法

```css
/* 宽度 | 样式 | 颜色 */
outline: 1px solid white;
```

