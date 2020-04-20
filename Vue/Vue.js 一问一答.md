## Vue.js 一问一答

1. **Vue.js 的核心是什么？**

   > 官网：Vue.js 的核心是一个允许采用简洁的模板语法来声明式的将数据渲染进 DOM 的系统。

   以下面的例子来说明：

   ```js
   // Vue 中的模板语法
   <div id="app">
     {{message}}
   </div>
   
   var app = new Vue({
     el: "#app",
     data: {
       message: "hello Vue"
     }
   })
   ```

   上面的例子中上面的 `div` 是 Vue 中的模板写法，通过模板语法将数据 `message` 渲染进了 DOM 中。

2. **计算属性和计算方法有什么区别？**

   计算属性有缓存机制，只有和它相关的属性改变时才会重新渲染，而计算方法则是只要属性变化就会改变。

   例： 全名 FullName 用计算属性和计算方法都可以实现，当用计算属性时，只要当名或姓改时才会重新渲染，而当用计算方法时，就算是改变年龄也会重新渲染。

   在这一点上，计算方法是优于计算属性的。

3. **如何做到数组变化的时候页面跟着变化?**

   - 使用 数组方法：`push, pop, shift, unshift, splice, sort, reverse`.

   - 改变数组的引用，比如给这个数组重新赋予一个新的数组。

   - 利用 `set` 方法修改数组的值，例如:

     ```js
     Vue.set(vm.list, 1, 5) // 将 list 数组索引为1的项改为5
     // 或
     vm.$set(vm.list, 1, 5)
     ```

4. **如何做到对象变化时页面跟着变化?**

   - 如果是对象中已有的属性，那么改变这个属性的值页面就会跟着变化。
   - 如果往对象里面添加属性，那么页面不会跟着变化，想让其变变化可以改变对象的引用，比如给这个对象重新赋予一个新的对象。

   - 通过 `set` 方法给对象设置属性，页面也会跟着变化。例如：

     ```js
     Vue.set(vm.userInfo, 'sala', 'secret')
     // 或
     vm.$set(vm.userInfo, 'sala', 'secret')
     ```

5. **想要在 `tbody, select, ul, ol` 等元素中使用 `VUe` 组件应该怎么实现？**

   由于它们的特殊性，直接将组件写在这些元素中，会发现组件虽然在页面上显示，但是它们并不包裹在这些标签之中。

   解决方法： 使用 `is`

   ```js
   // 假设 row 是一个组件，想要作为 tbody 的子元素
   <table>
     <tbody>
       <tr is='row'></tr>
       <tr is='row'></tr> 
     </tbody>
   </table>
   ```

6. **说一下当点击子组件时子组件中的 number + 1，如何实现同时父组件中的 counter 也跟着 + 1 ？**

   - 在子组件中定义事件处理函数，事件处理函数的内容：
     - 当点击子组件时实现子组件的 number + 1
     - 触发一个新的事件

   - 父组件捕获这个事件，父组件事件处理函数的内容是将子组件的number赋给父组件中的 counter。

   - 在父组件中如何获得子组件的number属性呢？

     可以在使用子组件时设置 ref 属性，这样在父组件的事件处理函数中就可以获得子组件中的数据了。

7. **父子组件如何传值？**

   - **父组件如何向子组件中传值？**

     - 使用子组件时设置属性的方式，在子组件中使用 props 进行接收。

       ```js
       <父组件>
         // 这样写时传给子组件的是一个字符串 "1"
         <子组件 count="1"></子组件> 
         // 这样写时传给子组件的是数字1，因为这样写双引号后面的内容是一个JS表达式
         <子组件 :count="1"></子组件> 
       </父组件>
       ```
   
   - **子组件如何向父组件传值？**
   
     -  通过事件触发的方式
   
       在子组件中通过 `this.$emit('触发的事件名'， 向父组件传入的参数)` 方式，触发一个事件，在使用子组件的地方捕获到这个事件，然后触发写在父组件中的事件处理函数，父组件的事件处理函数可以接受到从子组件传递过来的数据。
   
       当然也可以通过问题 6 中 `ref` 方式向父组件中传值，但是无论哪种方式都需要采用事件触发的方式。
   
   - 何为单向数据流，为什么要规定单向数据流？
     - 单向数据流指的就是子组件不能修改从父组件传递过来的数据。
     - 如果从父组件传递过来的数据是一个引用类型的话，在子组件中如果将其改变之后，那么父组件传递给其它组件时也将是修改之后的数据。
   
8. **什么是参数校验？**

   参数校验就是在将父组件传递过来的值进行校验，比如规定父组件传递过来的数据要是字符串类型，否则就会在控制台发出警告。

9. **如何给组件绑定原生事件？**

   - 先说一下为什么有这个需求：

   ```js
   // 下面形式事件称为自定义事件
   <组件 @click="handleClick"></组件>
   ```

   在点击这个组件时，在父组件中定义的 `handleClick` 是不能被触发的，因为这个自定式的是不能通过点击触发的，只能通过组件中的 `this.$emit('click')` 来触发。但是有时候我们有这样的需求就是当点击这个组件时，就能触发 `handleClick` 事件，这个时候就需要给组件绑定原生事件。

   - 如何实现给组件绑定原生事件？

     通过 `.native` ，举例说明：

     ```js
     // 原生事件
     <组件 @click.native="handleClick"></handleClick>
     ```

     这样在点击这个组件时就会触发 `handleClick` 函数。

10. **怎样解决非父子组件之间的传值问题？**

    - 使用 Vue 官方提供的 Vuex

    - 总线/ 发布订阅模式/观察者模式

      简单说一下思路吧：

      - 在 Vue 的 `prototype` 上创建一个 `bus` 属性，值是一个 vue 对象。

        ```js
        Vue.prototype.bus = new Vue();
        ```

        经过这一条语句之后每一个 `vue` 对象上都有一个 bus 属性，由于 `bus` 又是一个 `vue` 对象，所以它也可以去监听事件等。

        在我看来 `bus` 就是一个中转站，联系人，两个兄弟组件之间不是不能直接传值吗，那通过我就可以进行传值了，因为那两个兄弟组件上都有 bus 属性，一个触发一个事件并把要传递数值当做参数，另一个bus属性上负责监听这个事件，那个要传递的值自然也就得到了。

        > 代码可以参考 [非父子组件之间传值](https://github.com/happyCoding1024/Vue.js-Project/blob/master/VueComponent/%E9%9D%9E%E7%88%B6%E5%AD%90%E7%BB%84%E4%BB%B6%E4%B9%8B%E9%97%B4%E7%9A%84%E4%BC%A0%E5%80%BC.html)

11. **如何将父组件中传入的 html 代码在子组件显示出来？ Vue 中的插槽是什么，有什么作用？**

    将父组件传入的Html代码显示出来有两种方式（我现在会的）：

    - 利用接收父组件传递过来指的方式，也就是利用 props 接收父组件传递过来的值然后经过处理之后在页面上展示出来。

      ```js
      <child><p>hello</p></child>
      
      Vue.component('child', {
        props: {
        	content
        },
        data: {
          selfContent: this.content
        },
        template: `
      		<div v-html="this.selfContent"></div>
      	`
      }
      ```

    - 利用 Vue 插槽

      Vue 插槽可以很方便地将父组件传入的Html 代码在子组件中显示出来，看下面的例子:

      ```js
      <child>
      	<p>hello</p>
      </child>
      
      Vue.component('child', {
        template: `
      		<slot></slot>
      	`
      })
      ```

      上面的代码可以实现相同的效果。

      再讲一下具名插槽，具名，也就是有具体的名字，上面的写法中slot就指代child中的所有内容。那么我们不想这样的话就可以使用 具名插槽。

      ```js
      <child>
      	<p slot='header'>hello</p>
      	<p slot='footer'>hello</p>
      </child>
      
      Vue.component('child', {
        template: `
      		<slot name='header'></slot>
      		<slot name='footer'></slot>
      	`
      })
      ```

12. **Vue 中的作用域插槽是什么？**

    通过看老师视频上讲的那段代码，感觉和普通的插槽的区别就在于，使用作用域插槽可以使用 `slot` 传递过来的数据。其它的暂时感觉，普通的插槽也可以实现。

13. **什么是动态组件？**

    动态组件在 Vue 中可以用 component 元素来实现，用下面的例子来说明一下。

    ```js
    <component :is='type'></component>
    ```

    type的值是哪一个组件的名字那么在页面上就会显示哪一个组件，内部的实现过程是创建销毁过程。

14. **在使用动态组件时重复地创建销毁是很消耗性能，那么有什么办法呢？**

    可以通过 `v-once` 指令，在子组件模板的 `template` 中加上这条指令。

    利用 v-once 指令之后在初次加载完后就会被放到内存中，这样在第二次加载时就会直接从内存中取，而不是重新创建。

15. **Vue 中的 transition 过渡动画实现的原理是什么？**

    > 官网：
    >
    > 当插入或删除包含在 transition 组件中的元素时，Vue 会做以下处理：
    >
    > 1. 自动嗅探目标元素是否应用了 CSS 过渡或动画，如果是，在恰当的时机添加/删除 CSS 类名。
    > 2. 如果过渡组件提供了 JavaScript 钩子函数，这些钩子函数将在恰当的时机被调用。
    > 3. 如果没有找到 JavaScript 钩子并且也没有检测到 CSS 过渡/动画，DOM 操作（插入/删除)在下一帧中立即执行。
    >
    > 注： 现在对第二步的钩子函数的使用还不是很熟悉，在下一轮学习时补上，现在先稍微放一下。

    结合下面这张图说一下元素在页面上从无到有显示过程中的动画实现流程：

    当 transition 中的元素要向页面上展示时，最开始的时候会往元素上自动添加两个类，即fade-enter 和 fade-enter-active (前面写fade是因为transition的name叫 'fade',如果什么都不写那就用 v)，其中fade-enter是元素最开始的 CSS 样式。紧接着，元素fade-enter类被移除，新增了一个fade-enter-to 类，就是元素在动画结束时的CSS样式。 fade-enter-active 规定了 元素从最开始的样式到最后的样式所采用的形式是什么，所采用的时间是多少等等。这样以fade-enter-active 规定的方式由最开始的样式到最终的样式就构成了动画效果。

    元素从无到有CSS类变化图：

    ![Vue中transition的v-enter](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/Vue中transition的v-enter.png)

    

    同理，元素在页面上从有到无的过程也是如此，只是由 enter 变成了 leave。

    元素从有到无CSS类变化图：

    ![Vue中transition中的元素从有到无类变化图](https://raw.githubusercontent.com/happyCoding1024/image-hosting/master/img/Vue.png)

16. **animated.css 库如何使用？**

    > [Vue中使用animate.css库示例代码]( [https://github.com/happyCoding1024/Vue.js-Project/blob/master/Vue%E4%B8%AD%E7%9A%84%E5%8A%A8%E7%94%BB%E7%89%B9%E6%95%88/Vue%E4%B8%AD%E4%BD%BF%E7%94%A8animate.css%E5%BA%93.html](https://github.com/happyCoding1024/Vue.js-Project/blob/master/Vue中的动画特效/Vue中使用animate.css库.html) )
    >
    > [animate.css官网](https://daneden.github.io/animate.css/)

    animated 库是一款强大的 CSS3 动画库，实际上是@keyframe这种CSS3动画，上面讲的fade-enter这种的是过渡动画。怎样使用呢？

    在之前我们定义动画时，过程比较复杂需要设置  .fade-enter，.fade-enter-to， .fade-enter-active 等。而且 transition 中name是什么 类名中最前面的字符就需要是什么。

    那么我们可不可以使用自定义的类名呢，当然是可以的。

    ```js
    <transition 
    	name='fade'
    	enter-active-class='active'
    	enter-leave-class='leave'
    >
    	<div v-if="show">
      	hello world
      </div>
    </transition>
    ```

    这样 `.fade-enter-active` 就可以写成 `.active`。

    有了上面的这种自定义类名之后只需要将 `enter-active-class` 变为 `animate.css` 库中的类名即可实现动画效果，`.fade-enter` 和 `.fade-enter-to` 都可以不用写了，太方便了。

    ```js
    <transition 
    	name='fade'
    	enter-active-class='animate 要使用的类名'
    	enter-leave-class='animate 要使用的类名'
    >
    	<div v-if="show">
      	hello world
      </div>
    </transition>
    ```

    上面这样写时，在第一次显示在页面上时是没有动画的，如何解决在第一次显示时就有动画效果？

    ```js
    <transition>
      appear
    	name='fade'
    	enter-active-class='animate 要使用的类名'
    	enter-leave-class='animate 要使用的类名'
    	enter-appear-class='animate 要使用的类名'
    >
    	<div v-if="show">
      	hello world
      </div>
    </transition>
    ```

17. **如何实现 animate CSS3动画和transition 过渡动画同时存在？**

    > [Vue中同时使用animate CSS3动画和 transition 过渡动画代码]( [https://github.com/happyCoding1024/Vue.js-Project/blob/master/Vue%E4%B8%AD%E7%9A%84%E5%8A%A8%E7%94%BB%E7%89%B9%E6%95%88/Vue%E4%B8%AD%E5%90%8C%E6%97%B6%E4%BD%BF%E7%94%A8%E8%BF%87%E6%B8%A1%E5%92%8C%E5%8A%A8%E7%94%BB.html](https://github.com/happyCoding1024/Vue.js-Project/blob/master/Vue中的动画特效/Vue中同时使用过渡和动画.html) )

    只需将上面的 `enter-active-class='animate 要使用的类名'` 改为  `enter-active-class='animate 要使用的类名 fade-enter-active'`，出场动画同理。然后再在 `style` 中书写 `.fade-enter，.fade-enter-to，.fade-enter-active` 类即可。

     ```js
    <transition
      appear
      name="fade"
      enter-active-class="animated swing fade-enter-active"
      leave-active-class="animated shake fade-enter-leave"
      appear-active-class="animated shake"
    >
      <div v-if="show">
        hello world
      </div>
    </transition>
     ```

18. **说一下 Vue 中的动画封装？**

    动画封装就是将一个动画效果封装在一个组件中，以后想使用这个组件的时候只需要调用这个组件将想要实现这个动画的元素包裹在里面即可。

    举个例子：

    ```js
    // 将下面的动画效果封装成 fade 组件
    Vue.component('fade', {
      props: ['show'],
      template: `
    <transition
    @before-enter="handleBeforeEnter"
    @enter="handleEnter"
    >
    <slot v-if="show"></slot>
    </transition>
    `,
      methods: {
        handleBeforeEnter(el) {
          el.style.color = 'red';
        },
        handleEnter(el, done) {
          setTimeout(() => {
            el.style.color = 'green';
          }, 2000);
          setTimeout(() => {
            done();
          }, 4000);
        }
      }
    });
    
    // 使用 fade 组件
    <fade :show="show">
        <div>
          hello world
        </div>
    </fade>
    ```

19. **单页应用和多页应用**

    多页应用：比如在开发的去哪儿网的页面上点击某个链接时跳到该app的下一个页面时，会重新请求一个 html，这就叫多页应用。

    - 优点：首屏时间快(因为第一次加载时的内容要少)，SEO 效果好。
    - 缺点：页面切换慢（因为切换页面时需要再去请求html）

     单页应用：比如在开发的去哪儿网的页面上点击某个链接跳到该App的下一个页面时，不会重新请求一个html，单页应用只会请求一次html，其它的页面都是通过  JS 渲染来实现的。

    - 优点：页面切换快（因为只需要发送一次HTML请求）
    - 缺点：首屏时间慢，SEO差（因为第一次HTML请求的内容比较多，所以首屏时间慢。因为SEO只认识html，不认识 JS，所以SEO比较差。）

20. **请说一下右边字母表变动时左边的城市名跟着变动是如何实现的？**

    首先为字母表绑定 `touchstart, touchmove, touchend` 事件，利用 offsetTop 获取 A 字母距离顶部的高度，然后利用 clientY 记录手指在字母表上滑动时所在的距离顶部的高度，两者作差即可得到当前手指的位置是在哪一个字母上，然后将这个字母传递给右边的城市列表组件，右边的列表组件通过 `this.scroll.scrollToElement()` 来滚动到当前字母所在的城市。

21. **请问如何减少 touchmove 的触发频率？**

    在 touchmove 的事件处理函数中利用 setTimeout 设定一个延时时间再执行这个事件处理函数，这样就减少了 touchmove 的事件处理函数的执行频率，并且用户并不能清晰地察觉出来。

22. **keep-alive 有什么作用？**

    keep-alvie 可以使得之前访问过的内容加载到内存之中，下次再访问相同路由的时候就不需要再次去请求内容，直接从内存中读取即可。

    ```js
    <keep-alive>
    	<router-view/>
    </keep-alive>
    ```

    提到 keep-alive 一般就会用到 activated 这个方法，这个方法是在请求相同的路由时触发。在开发去哪儿网 app 时有这样一个场景：在城市列表中选择一个城市会返回到主页，使用 keep-alive 之后不论点击的是哪个城市，返回的主页都不会重新去请求数据都会从内存中读取之前那个城市的首页。但是每个城市的首页是不相同的，所以就需要我们判断当用户选择的是不同的城市的时候就返回那个城市的首页。

    解决方案：当利用 keep-alive 之后访问相同的路由读取内存中的内容时都会触发 activated 方法，那么我们就可以通过用户再城市列表中点击的城市来判断是不是当前城市，如果是当前城市那么就不再发送 ajax 请求，如果不是当前城市那么就发送 ajax 请求。lastCity 的值可以从 mounted 方法中获取，因为mouted 方法在访问相同的路由时是不会执行的，currentCity 的值可以可以从绑定的点击事件中获取。

23. 解释下面的路由是什么路由？

    ```js
    {
          path: '/detail/:id',
          name: 'City',
          component: City,
    }
    ```

    `'/detail/:id'` 的形式是一个动态路由，url 前面的形式必须是 `/detail` 后面的形式是一个变量，比如 `/detail/0001` 这种形式的路由就是可以命中的。 

24. 为什么在一个组件中注册了全局事件后，一定不要忘记解绑？

    ```js
    activated() {
      window.addEventListener('scroll', this.handleScroll);
    },
    ```

    在这个组件中注册了一个全局事件，在其它组件中也能触发这个事件，这是我们不希望看到的，所以在注册完全局事件之后要在那个组件中使用完后立即在合适的时机解绑。

    ```js
    deactivated() {
      window.removeEventListener('scroll', this.handleScroll);
    }
    ```

25. 什么是递归组件，如何使用？

    所谓递归组件就是在当前组件中调用当前组件，和正常递归的使用思想是一致的，一定注意不要忘了加加递归的终止条件。

    下面是一个利用递归组件实现多级列表案例的部分代码：

    ```vue
    <!--当前组件：DetailList-->
    <div class="item-title border-bottom">
      <span class="item-title-icon"></span>
    	{{item.title}}
    </div>
    <!-- v-if 就是递归终止条件, 在这里递归调用当前组件 DetailList -->
    <div v-if="item.children" class="item-children">
      <detail-list :list="item.children"></detail-list>
    </div>
    ```

    

    