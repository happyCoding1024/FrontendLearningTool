# React中父子组件之间如何进行传值

### 1. 父组件向子组件传值

父组件向子组件传值通过调用子组件时属性的方式。

```jsx
// 父组件向子组件传递item
<TodoItem content={item}></TodoItem>
// 子组件通过props接收父组件传递过来的item，父组件传递过来的值就在子组件的props上。
通过 this.props.content 就可以获取到传递过来的值
```

### 2. 子组件向父组件传值

子组件通过调用父组件传递过来的方法进行传值，实际上将子组件中的值传递给父组件，父组件也是需要将这个值进行一些处理，处理的途径就是将其放到父组件中的方法中，这样在子组件中调用父组件的方法，将子组件的值通过函数参数的方式将其传递给父组件的方法，也就相当于将子组件的值传递给父组件。

举例说明，当子组件中的`“点我加1”` 被点击时，子组件需要向父组件传递变量a的值，父组件中要将变量a的值加1.

```jsx
// 父组件
import React, { Component, Fragment } from 'react';
import Son from './Son';

class Father extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    }
  }
  render() {
    // 注意这个地方必须加上bind，因为要保证子组件中调用的add方法是在父组件的运行环境下执行的。
    return (
      <Fragment>
        <Son
          add={this.add.bind(this)}
          a={this.state.count}
        >
        </Son>
        <div>count:{this.state.count}</div>
      </Fragment>
    )
  }
  add(num) {
    this.setState({
      count: num+1
    })
  }
}

export default Father;


// 子组件
import React, { Component } from 'react';

class Son extends Component {
  constructor(props) {
    super(props);
    this.state = {
      a: 10
    }
    this.handleClick = this.handleClick.bind(this);
  }
  render() {
    return (
      <div onClick={this.handleClick}>
        点我加1
      </div>
    )
  }
  handleClick() {
    this.props.add(this.state.a)
  }
}

export default Son;
```

