# React中获取DOM节点的两种方法

> 原文链接： https://www.jianshu.com/p/f533a9d7645c 

React提供的获取DOM元素的方法有两种，一是react-dom中的findDOMNode()，二是refs。

#### 1、findDOMNode

findDOMNode通常用于React组件的引用，其语法如下：

```jsx
import ReactDOM from 'react-dom';
ReactDOM.findDOMNode(ReactComponent);
```

当组件被渲染到DOM中后，findDOMNode会返回该组件实例对应的DOM节点。

示例：

```kotlin
componentDidMount(){
    const dom = ReactDOM.findDOMNode(this);
    // this为当前组件的实例
}

render() {}
```

注：如果render()中返回null，那么findDOMNode()也返回null。findDOMNode只对已经挂载的组件有效。

#### 2、refs

refs多用于React组件内子组件的引用。使用ref获取DOM节点有两种情况：

（1）子组件为原生DOM组件：获取到的就是这个DOM节点。如下例，this.input就获取到了当前``节点。

```csharp
<input ref={(ref)=>{this.myInput = ref}} />
```

通过this.myInput，我就可以对``进行一系列操作，比如让输入框聚焦：

```css
this.myInput.focus();
```

注：refs也支持字符串格式：

```csharp
<input ref='myInput' />
```

通过this.refs.myInput获取到节点。

（2）子组件为React组件，比如``：获得的就是``的实例，因此就可以调用``的实例方法。
 示例：

```jsx
componentDidMount(){
    const myComp = this.refs.myComp;  // 获取到的是<Comp />的实例myComp
    const dom = ReactDOM.findDOMNode(myComp);  // 获取到实例对应的DOM节点
}

render(){
    return (
        <div>
            <Comp ref='myComp' />
        </div>
    );
}
```

注：调用 `<Comp />` 实例方法的方式：this.refs.myComp.method()，但并不建议这种调用方式。