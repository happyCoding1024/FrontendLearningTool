#### React 值得注意的小知识点

##### 1. `import` `css` 文件问题

在 react 中 使用 `import './index.css'` 这种形式去引入 `css` 文件时，无论是在哪一个组件中引入的 `css` 文件，那么在整个项目中的任何一个组件中都会生效，这样的方式不好，会相互影响。

解决方法有一种是使用 `styled-Components` 模块，新建 `style.js` 文件后，使用 `import 'style.js'` 引入。

##### 2. `react` 兼容性问题

`react` 只兼容到 `IE8`，即使尽全力去兼容，也没有办法做到兼容 `IE8` 以下的版本。

##### 3. `react` 中组件在引用时使用双标签和单标签有差异

```js
export const NavSearch = styled.input.attrs({
  placeholder: '珍惜时光，不负韶华'
})`
	css 样式
`
```

在使用 ref 时发现两种方式使用 NavSrarch 组件会得到不同的结果。

双标签的形式

```js
<NavSearch 
	ref={node => {this.inputElem_header = node}}
>
</NavSearch>
```

结果

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200413202959.png)

单标签的形式

```js
<NavSearch 
	ref={node => {this.inputElem_header = node}}
/>
```

结果

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200413203159.png)

