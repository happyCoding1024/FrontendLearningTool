# 面向对象之三个基本特征（javaScript）

> 参考文章：https://segmentfault.com/a/1190000018239556

了解过面向对象的同学应该都知道，面向对象三个基本特征是：封装、继承、多态，但是对于这三个词具体可能不太了解。对于前端来讲接触最多的可能就是`封装`与`继承`，对于多态来说可能就不是那么了解了。

> ### 封装

在说封装之先了解一下封装到底是什么？

> 什么是封装

[封装](https://baike.baidu.com/item/封装/2796965?fr=aladdin)：将对象运行所需的资源封装在程序对象中——基本上，是方法和数据。对象是“公布其接口”。其他附加到这些接口上的对象不需要关心对象实现的方法即可使用这个对象。这个概念就是“不要告诉我你是怎么做的，只要做就可以了。”对象可以看作是一个自我包含的原子。对象接口包括了公共的方法和初始化数据。（节选自百度百科）

我对于封装的理解，可能还有一个步骤就是`抽离`，首先你要清楚在一个对代码中你应该抽离那些属性方法，有了这些为基础才能更好的做好封装。

封装无非就是其属性和方法封装。

1. 类：封装对象的属性和行为
2. 方法：封装具体逻辑功能
3. 访问封装：访问修饰封装无非就是对其访问权限进行封装

```js
class Employees {
    constructor(name,age){
        this.name = name;
        this.age = age;
    }
    getInfo(){
        let {name,age} = this;
        return {name,age};
    }
    static seyHi(){
        console.log("Hi");   
    }
}

let lisi = new Employees("Aaron",18);
lisi.seyHi();   // lisi.seyHi is not a function
lisi.getInfo();  // {name: "Aaron", age: 18}
Employees.seyHi();  // Hi
```

在`Employees`中抽出的公共属性有`name`,`age`,公共方法有`getInfo`,`seyHi`，然而`getInfo`与`seyHi`所不同的是`seyHi`使用了`static`修饰符，改变其为静态方法，`seyHi`只属于`Employees`这个类。然而`getInfo`方法则是属于实例的。

这里使用了`static`对`seyHi`方法对其进行了访问权限的封装。

再举一个例子。

```js
Promise.then()  //  Promise.then is not a function
let p1 = new Promise(() => {})
p1.then();  //  Promise {<pending>}
Promise.all([1]);   //  Promise {<resolved>: Array(1)}
```

从上面的代码中可以看出`Promise`也使用了`static`对其方法的访问权限进行了封装。

> ### 继承

[继承](https://baike.baidu.com/item/继承/20267560?fr=aladdin)：说到继承并不太陌生，继承可以使得子类具有父类的各种的公有`属性`和公有`方法`。而不需要再次编写相同的代码。在令子类别继承父类别的同时，可以重新定义某些属性，并重写某些方法，即覆盖父类别的原有属性和方法，使其获得与父类别不同的功能。（节选自百度百科）

子类继承父类后，子类具有父类属性和方法，然而也同样具备自己所独有的属性和方法，也就是说，子类的功能要比父类多或相同，不会比父类少。

```js
class Employees {
    constructor(name){
        this.name = name;
    }
    getName(){
        console.log(this.name)
    }
    static seyHi(){
        console.log("Hi");   
    }
}
class Java extends Employees{
    constructor(name){
        super(name);
    }
    work(){
        console.log("做后台工作");
    }
}
let java = new Java("Aaron");
java.getName();
java.work();
// java.seyHi();    //  java.seyHi is not a function
```

从上面的例子可以看出继承不会继承父类的静态方法，只会继承父类的公有属性与方法。这一点需要注意。

子类继承之后既拥有了`getName`方法，同样也拥有自己的`worker`方法。

> ### 多态

[多态](https://baike.baidu.com/item/多态/2282489?fr=aladdin)：按字面的意思就是“多种状态”，允许将子类类型的指针赋值给父类类型的指针。（节选自百度百科）

说白了多态就是相同的事物，一个接口，多种实现，同时在最初的程序设定时，有可能会根据程序需求的不同，而不确定哪个函数实现，通过多态不需要修改源代码，就可以实现一个接口多种解决方案。

多态的表现形式重写与重载。

> 什么是重写

[重写](https://baike.baidu.com/item/重写/9355942?fr=aladdin)：子类可继承父类中的方法，而不需要重新编写相同的方法。但有时子类并不想原封不动地继承父类的方法，而是想作一定的修改，这就需要采用方法的重写。方法重写又称方法覆盖。（节选自百度百科）

```js
class Employees {
    constructor(name){
        this.name = name;
    }
    seyHello(){
        console.log("Hello")
    }
    getName(){
        console.log(this.name);
    }
}
class Java extends Employees{
    constructor(name){
        super(name);
    }
    seyHello(){
        console.log(`Hello,我的名字是${this.name},我是做Java工作的。`)
    }
}
const employees = new Employees("Aaron");
const java = new Java("Leo");
employees.seyHello();   //  Hello
java.seyHello();    //  Hello,我的名字是Leo,我是做Java工作的。
employees.getName();    //  Aaron
java.getName(); //  Leo
```

通过上面的代码可以看出`Java`继承了`Employees`,然而子类与父类中都存在`seyHello`方法，为了满足不同的需求子类继承父类之后重写了`seyHello`方法。所以在调用的时候会得到不同的结果。既然子类继承了父类，子类也同样拥有父类的`getName`方法。

> 什么是重载

[重载](https://note.youdao.com/)就是函数或者方法有相同的名称，但是参数列表不相同的情形，这样的同名不同参数的函数或者方法之间，互相称之为重载函数或者方法。（节选自百度百科）

```js
class Employees {
    constructor(arg){
        let obj = null;
        switch(typeof arg)
        {
            case "string":
                  obj = new StringEmployees(arg);
                  break;
            case "object":
                  obj = new ObjEmployees(ObjEmployees);
                  break;
            case "number":
                obj = new NumberEmployees(ObjEmployees);
                break;
        }
        return obj;
    }
}
class ObjEmployees {
    constructor(arg){
        console.log("ObjEmployees")
    }
}
class StringEmployees {
    constructor(arg){
        console.log("StringEmployees")
    }
}
class NumberEmployees {
    constructor(arg){
        console.log("NumberEmployees")
    }
}
new Employees({})   // ObjEmployees
new Employees("123456") //  StringEmployees
new Employees(987654)   //  NumberEmployees
```

因为JavaScript是没有重载的概念的所以要自己编写逻辑完成重载。

在上面的代码中定义了`Employees`,`ObjEmployees`,`StringEmployees`,`NumberEmployees`类,在实例化`Employees`的时候在`constructor`里面进行了判断，根据参数的不同返回不同的对应的类。

这样完成了一个简单的类重载。

> ### 总结

1. 封装可以隐藏实现细节，使得代码模块化；
2. 继承可以扩展已存在的代码模块（类），它们的目的都是为了——代码重用。
3. 多态就是相同的事物，调用其相同的方法，参数也相同时，但表现的行为却不同。多态分为两种，一种是行为多态与对象的多态。

在编程的是多多运用这个写思想对其编程时很有用的，能够使你的代码达到高复用以及可维护。