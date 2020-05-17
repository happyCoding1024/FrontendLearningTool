# React 中获取 DOM 节点的方法

通过 ref 的方式，如果是 html 元素，那么可以获取到 DOM 节点，如果是一个组件，那么获取到的是组件的实例，要想获取到真实的 DOM 节点需要使用 ReactDOM.findDOMNode 方法。

## 1. ref 的使用方法

### 1.1 回调函数

1.dom节点上使用回调函数

```js
<input ref={(input) => {this.textInput = input;}} type="text" />
```

2.类组件上使用

```js
<CustomInput ref={(input) => {this.textInput = input;}} />
```

3.可用通过props跨级传递的方式来获取子孙级dom节点或组件实例

下面是在跨两级获取到孙级别的组件内部的dom节点

```js
function CustomTextInput(props) {
    return (
        <div>
            <input ref={props.inputRef} />
        </div>
    );
}
function Parent(props) {
  return (
    <div>
      My input: <CustomTextInput inputRef={props.inputRef} />
    </div>
  );
}
class Grandparent extends React.Component {
  render() {
    return (
      <Parent
        inputRef={el => this.inputElement = el}
      \/>
    );
  }
}
```

### 1.2 React.createRef()

在React 16.3版本后，使用此方法来创建ref。将其赋值给一个变量，通过ref挂载在dom节点或组件上，该ref的current属性将能拿到dom节点或组件的实例
例如：

```
class Child extends React.Component{
    constructor(props){
        super(props);
        this.myRef=React.createRef();
    }
    componentDidMount(){
        console.log(this.myRef.current);
    }
    render(){
        return <input ref={this.myRef}/>
    }
}
```

## 2. ReactDOM.findDOMNode()

```js
componentDidMount() {
    console.log(this.CommentList);    // undefined
    // console.log(this.refs.commnet.offsetWidth);
    console.log(ReactDOM.findDOMNode(this.CommentList));    // Comment组件的真实dom节点:<div>
    console.log(ReactDOM.findDOMNode(this.CommentList).offsetWidth);    // 1904
}

<div>
    <CommentList ref={CommentList = this.CommentList = CommentList} />
</div>
```

可以看到对于组件来说只有在使用 `ReactDOM.findDOMNode()` 方法之后才能获取到真实的 DOM 节点。

