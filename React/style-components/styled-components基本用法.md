## styled-components的基本使用指南

> 原文链接： https://www.jianshu.com/p/2d5f037c7df9 

本文讲解一些`styled-components`的基本使用方法，主要讲由`styled-components`生成的样式组件里面的`html`标签的样式是如何写的。找了一圈发现中文社区里目前还没有我想讲的这一部分的内容，但是这部分内容又是相当基础且重要的。所以现在我们就一起来学习一下吧。

本文的大部分内容都是我从官方文档里翻译来的，有兴趣的同学看完文章后可以移步[官方文档](https://www.styled-components.com/)，我这里只起一个抛砖引玉的作用。

### 安装



```undefined
  npm install --save styled-components
```

### 最基础的用法

在下面这个例子中，我们用`styled-components`创建了一个样式组件，该组件渲染之后是一个`div`标签。注意组件首字母必须大写不然无法识别。



```jsx
  /* 创建了一个Wrapper样式组件，该组件渲染之后是一个div标签 */
  const Wrapper = styled.div`
    color: blue;
  `;

  /* Wrapper组件跟其余的react组件一样，只不过现在他们有了自己的样式 */
  render(
    <Wrapper>
        Hello World!
    </Wrapper>
  );
```

渲染结果如下：



![img](https:////upload-images.jianshu.io/upload_images/16206223-b6a4bbf74ce23201.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/946/format/webp)

styled-components-2-1.jpg

### 选择器：标签名和类名

我们可以通过标签名和类名设置样式组件中的`html`标签的样式：



```jsx
  const Wrapper = styled.div`
    /* 应用于Wrapper组件本身和Wrapper组件里的所有html标签 */
    color: black;

    /* 应用于Wrapper组件里的h3标签 */
    h3 {
    color: red
    }

    /* 应用于Wrapper组件里的className为blue的html标签 */
    .blue {
    color: blue
    }
  `

  render(
    <Wrapper>
      <p>黑色 p 标签 </p>
      <h3>红色 h3 标签</h3> 
      <p className="blue" >蓝色 p 标签</p>
    </Wrapper>
  )
```

渲染结果如下：



![img](https:////upload-images.jianshu.io/upload_images/16206223-bf5736df8eda7173.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/953/format/webp)

styled-components-2-2.jpg

### 选择器：伪类和伪元素

在`styled-components`同样可以使用伪类和伪元素，使用方法和原生`css`一模一样：



```jsx
  const Thing = styled.button`

    color: blue;

    ::before {
      content: '！！！';
    }

    :hover {
      color: red;
    }
  `

  render(
    <Thing>Hello world!</Thing>
  )
```

渲染结果如下：



![img](https:////upload-images.jianshu.io/upload_images/16206223-41ddb679562c08f3.gif?imageMogr2/auto-orient/strip|imageView2/2/w/457/format/webp)

styled-components-2-3.gif

### 嵌套

`&`符号表示引用主组件，注意体会加上`&`符号与不加的区别：



```jsx
  const Thing = styled.div`
    /* 应用于className为blue的Thing组件 */
    &.blue{
    color: blue;
    }

    /* 应用于className为red的Thing组件里的所有子组件或者html标签 */
    .red {
    color: red;
    }
  `

  render(
    <React.Fragment>
      <Thing className="blue" >Thing组件</Thing>
      <Thing>
      <p className="red" >p标签</p>
      </Thing>
    </React.Fragment>
  )
```

渲染结果如下：



![img](https:////upload-images.jianshu.io/upload_images/16206223-804e6fca48d6d4f9.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/928/format/webp)

styled-components-2-4.jpg

### 上下文选择符

在`styled-components`同样可以使用各类上下文选择符：



```jsx
  const Thing = styled.div`

    /* 应用于紧邻Thing组件的下一个Thing组件 */
    & + & {
    color: red;
    }

  `

  render(
    <React.Fragment>
      <Thing>第一个Thing组件</Thing>
      <Thing>第二个Thing组件</Thing>
    </React.Fragment>
  )
```

渲染结果如下：



![img](https:////upload-images.jianshu.io/upload_images/16206223-0786fb0c6b964cf2.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/941/format/webp)

styled-components-2-5.jpg

通过这几个例子可以看出来，`styled-components`中的`css`写法和原生的`css`写法其实差别并不大。而今天刚刚介绍的其实这些仅仅是`styled-components`的冰山一角。基于`react`的组件化思想，用`styled-components`对样式也进行了组件化，这样每个组件拥有了自己的功能，还拥有了自己的样式，从而能够实现真正意义上的复用。`react`通过`state`来控制组件，而`styled-components`也可以通过`state`的改变来动态的改变组件的样式。`react`和`styled-components`可以说是男才女貌了。

想要了解更多`styled-components`知识还是希望大家能够去阅读她的[官方文档](https://www.styled-components.com/)。