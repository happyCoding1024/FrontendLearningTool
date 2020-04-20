## 循序渐进地聊一聊 box-shaow

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