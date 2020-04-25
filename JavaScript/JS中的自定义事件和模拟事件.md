在 JS 中模拟事件指的是模拟 JS 中定义的一些事件，例如点击事件，键盘事件等。

自定义事件指的是创建一个自定义的，JS 中之前没有的事件。

接下来分别说一下创建这两种事件的方法。

## 创建自定义事件

创建自定义事件可以使用 Event 和 CustomEvent 两种方法，接下来分别做一下介绍。

### 1. 利用 Event

> [MDN Event]( https://developer.mozilla.org/zh-CN/docs/Web/API/Event/Event )

#### Event 用法

`event = new Event(typeArg, eventInit);`

**typeArg**：指定事件类型，传递一个字符串。这里的事件类型指的是像点击事件（click）、提交事件（submit）、加载事件（load）等等。

**eventInit**：可选，也可以以键值对的形式设置以下属性。

　　**bubbles**：事件是否支持冒泡，传递一个boolean类型的参数，默认值为false。

　　**cancelable**：是否可取消事件的默认行为，传递一个boolean类型的参数，默认值为false。

　　**composed**：事件是否会触发shadow DOM（阴影DOM）根节点之外的事件监听器，传递一个boolean类型的参数，默认值为false。

**示例**

```html
  <section id="Event">
    <div id="root"></div>
    <script type="text/javascript">
      // 创建事件对象
      const newEvent = new Event('customType', { bubbles:true,cancelable:true,composed:true })
      // 获取 DOM 元素
      const div = document.getElementById('root')
      // 绑定事件对象
      document.addEventListener('customType', () => {
        alert('自定式 customType 事件执行了')
      })
      // 触发事件对象(真正开发中可以满足某个条件后才触发事件)
      div.dispatchEvent(newEvent)
    </script>
  </section>
```

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvMjAyMDA0MjExMDI4MDEucG5n?x-oss-process=image/format,png)

### 2. 利用 CustomEvent

`CustomEvent()` 可以像 `Event()` 那样使用，但它也可以在 Web Workers 中使用（与主线程分离的另一个线程），可以传递跟事件关联的相关值（detail），detail 的默认值为null，类型为any（也就是说可以传递任意类型的参数），这个值就是和事件相关联的值。 

通过示例可以很明白地看出来两者的区别。

```html
  <section id="CustomEvent">
    <div id="root"></div>
    <script type="text/javascript">
      // 创建事件对象
      const newEvent = new CustomEvent('customType', { 
        bubbles:true,
        cancelable:true,
        composed:true,
        detail: {
          log: '我是 detail 属性中的'
        }
      })
      // 获取 DOM 元素
      const div = document.getElementById('root')
      // 绑定事件对象
      document.addEventListener('customType', () => {
        // 打印 event.detail.log 的值
        alert(`自定式 customType 事件执行了,${event.detail.log}`)
      })
      // 触发事件对象(真正开发中可以满足某个条件后才触发事件)
      div.dispatchEvent(newEvent)
    </script>
  </section>
```

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvMjAyMDA0MjExMDM2NTMucG5n?x-oss-process=image/format,png)

可以看到在 event 对象中会有 detail 属性，我们可以输出 detail 属性中的内容。

## 创建模拟事件

想要模拟用户的点击等行为，可以通过模拟事件来实现。

**步骤：**

1）在 document 对象上使用 createEvent() 方法创建 event 对象，这个方法接收一个创建类型的字符串，主要有下面四种。

- UIevents：一般化的 UI 事件，鼠标和键盘事件都继承自 UI 事件，DOM3 中是 UIEvent。
- MouseEvents：鼠标事件，DOM3 中是 MouseEvent。
- MutationEvents：DOM 变动事件，DOM3 中是 MutationEvent。
- HTMLEvents：HTML 事件。

使

2）初始化事件对象

在使用 `document.createEvent()` 创建出一个 event 对象之后，event 对象上会得到一个初始化的属性，不同类型的 Event 对象属性名不同，例如 `MouseEvent` 类型对应的属性就是 `initMouseEvent` .

3）触发事件

在实际开发中当满足一定条件后我们可以使用  `DOM元素.dispatchEvent(event)` 来触发事件。

接下来以模拟鼠标点击事件为例，说明一下上面的各个步骤。定义了一个 div 元素，绑定了一个 click 事件处理程序，内容是 `alert('我不是用户点击的')`，然后再模拟触发 click 事件，可以发现即使在用户不点击时也可以弹出 `'我不是用户点击的'`.

```html
  <section id="SimulateEvent">
    <div id="root"></div>
    <script type="text/javascript">
      // 获取 DOM 元素
      const div = document.getElementById('root')
      // 绑定事件处理程序
      div.addEventListener('click', () => {
        alert('我不是用户点击的')
      }, false)
      // 创建鼠标事件对象
      const event = document.createEvent('MouseEvents')
      // 初始化事件对象
      event.initMouseEvent('click', true, true, document.defaultView)
      // 触发事件对象(真正开发中可以满足某个条件后才触发事件)
      div.dispatchEvent(event)
    </script>
  </section>
```

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL2hhcHB5Q29kaW5nMTAyNC9pbWFnZS1ob3N0aW5nL21hc3Rlci9pbWcvMjAyMDA0MjExMTA5MjYucG5n?x-oss-process=image/format,png)

从上面的结果可以看到，即使我们没有点击 div 元素，它也会执行绑定的 click 的事件处理程序，原因就在于我们通过程序模拟了点击事件。