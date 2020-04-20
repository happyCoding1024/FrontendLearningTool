## 聊一聊 React 中的 CSS 样式方案

和 Angular，Vue 不同，React 并没有如何在 React 中书写样式的官方方案，依靠的是社区众多的方案。社区中提供的方案有很多，例如 CSS Modules，styled-components，styles jsx 等等。

接下来会详细地说一下这几种方案，在说这几种方案之前，首先说一下 React 官方提供的构建工具 create-react-app 构建的项目中使用 css 的问题。

### 使用 create-react-app 创建的项目引入 css 文件的问题

使用 create-react-app 构建一个项目之后，会有 index.js，index.css，App.js 等文件，为了说明问题我又新建了一个 App1.js 文件，为了简便文件内容让我删除改动了一些。

index.css

```css
.huisiyuan {
  background: red
}
```

index.js

```js
import App from './App';
import App1 from './App1';
import './index.css';

ReactDOM.render(
  <React.StrictMode>
    <App />
    <App1 />
  </React.StrictMode>,
  document.getElementById('root')
);
```

App.js 

```js
import React, { Component } from 'react';
class App extends Component {
	render() {
		return <div className='huisiyuan'>组件App</div>
	}
}
export default App;
```

App1.js

```js
import React, { Component } from 'react';
class App1 extends Component {
	render() {
		return <div className='huisiyuan'>组件App1</div>
	}
}
export default App1;
```

index.js 中引入的 index.css 在浏览器中是出现在 head 标签下的 style 标签下，因此任何在 index.js 中使用的组件都可以使用 index.css 中的样式。

![1584845869211](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/style.png)

例如想让组件 App 的背景颜色为红色，index.css 中正好是这样设置的，但是 App1 中的背景颜色也会跟着变成红色。

![](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/20200322111431.png)

说明了 creat-react-app 创建项目后直接使用 import 引入 css 文件出现的问题，接下来讲一下社区中提供的各种方案。

### CSS Modules

**CSS Modules 的核心**

> CSS Modules更详细的介绍可以参考阮一峰老师 [CSS Modules 用法教程]( http://www.ruanyifeng.com/blog/2016/06/css_modules.html )。

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

### styled-components

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

### styled jsx

见名知义就是带样式的 JSX，一般有下面三种形式。

1） 行内样式

 行内样式是一种最基本的写法，和在HTML中写的元素内联样式差不多，但是设置的样式是一个对象。

```js
<div style={{color: 'red', background: 'blue'}}>hello<div/>
```

> 注意在 JSX 中写样式时 red 这些都是需要加上引号的，因为这不是 css 文件，如果不加引号那么 JSX 就会认为 red 是一个变量的名字，很明显它并不是一个变量的名字，但是在 css 文件中，写 red 在 css 文件中是认识的。

为什么要用两个大括号？

因为在JSX中渲染的JS表达式，它们必须被放在一对大括号里，{style}可以视为一个JS对象。所以第一对大括号正是将JS表达式放入JSX解析，里面的那对大括号则创建了一个style对象实例，所以在这里style是作为一个对象传入组件 。

2）声明样式

 声明样式其实是行内样式的一种改进写法，在render函数外部创建style对象，然后传递给组件，让css与标签分离 。

```js
const style = {
	color: 'red',
	background: 'blue'
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
.huisiyuan {
  color: 'red';
  background: 'blue';
}
```

App.js

```js
import React, { Components } from 'react';
import './App.css';
import  App1 from './App1';

class App extends Components {
	render() {
		return (
      <App1 >
		)
	}
}
```

APP1.js

```js
import React, { Components } from 'react'; 

class App1 extends Components {
	render() {
		return (
      <div className='huisiyuan'>hello</div>
		)
	}
}
```

在 App.js 中引入了 App.css 但是在 App1.js 中·并没有引入，但是在 App1 组件内部依然可以使用 App.css 中的样式，App1 组件中`hello`  应用 App.css 中的样式，如下图所示。

![1584926371574](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/import全局样式.png)

总结：

上面总结的三种方法，推荐使用 CSS Modules 或者 styled-components，在平时做一些小 demo 的时候可以使用 styled jsx 的方法。

完，如有不恰当之处欢迎指正哦。



 



 

