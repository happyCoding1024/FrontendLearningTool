### styled-components解决全局样式'injectGlobal' 废除的问题

> 原文链接： https://www.cnblogs.com/cxx9759/p/9807866.html 

在以前的styled-components中设置全局样式只需要 引入injectGlobal 即可，然而今天我用injectGlobal 的时候，总是提示不存在，找了半天找到原因。

The injectGlobal API was removed and replaced by createGlobalStyle in styled-components v4. 用官方的话来讲，就是这个API 从现在开始废除了，换成 createGlobalStyle 新的API，作为一个样式组件出现，按照样式组件思想，以一个标签形式被引入。

例如

1. 用createGlobalStyle定义全局样式

```js
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`　
body{
　　margin: 0;
　　padding: 0
　}
`;
```

​	然后当做样式组件一样使用引入即可

2. 在项目主文件导入样式

```js
import { GlobalStyle } from './style'
```

3. 以样式组件的方式当作标签引入

```js
render() {
　　return (
　　　　<div>
　　　　　　<GlobalStyle />
　　　　</div>
);
```

