[TOC]

# 12种不宜使用的JavaScript语法

这几天，我在读《Javascript语言精粹》。

这本书很薄，100多页，正好假日里翻翻。

该书的作者是Douglas Crockford，他是目前世界上最精通Javascript的人之一，也是Json格式的创造者。

他认为Javascript有很多糟粕。因为1995年Brendan Eich设计这种语言的时候，只用了三个月，很多语言特性没有经过深思熟虑，就推向了市场。

结果等到人们意识到这些问题的时候，已经有100万程序员在使用它了，不可能再大幅修改语言本身了。所以，Douglas Crockford决定，他要告诉大家，Javascript中哪些部分是精粹，哪些部分是糟粕和鸡肋。

这个想法非常好，但是我不得不说，这本书写得不够好，不适合新手阅读。

原因如下：

1. Douglas Crockford叙述得不清晰，更像与同行讨论问题，而不是由浅入深地讲解问题。这本书的重点不是解释，所以读完后，我觉得Javascript好像变得更复杂了。
2. 他固执地使用铁路图（railroad diagram）解释每一条语句。全世界似乎只有他一个人使用这种比Javascript更难看懂的图。
3. 该书基本上是一本简化的Javascript语法手册，缺乏足够的新内容。
4. 该书举例过少，而且在最难的函数和对象部分，使用的例子都是环环相套、层层递进的例子，导致阅读起来很吃力。

该书最有价值的内容不是正文，反而是附录。

在附录B中，Douglas Crockford列出了12种应该避免使用的Javascript语法，我觉得非常值得推广。

-------

=======================================================================================

## **1. ==**

Javascript有两组相等运算符，一组是==和!=，另一组是===和!==。前者只比较值的相等，后者除了值以外，还比较类型是否相同。

请尽量不要使用前一组，永远只使用===和!==。因为==默认会进行类型转换，规则十分难记。如果你不相信的话，请回答下面五个判断式的值是true还是false：

　　false == 'false'

　　false == undefined

　　false == null

　　null == undefined

　　0 == ''

前三个是false，后两个是true。

## **2. with**

with的本意是减少键盘输入。比如

　　obj.a = obj.b;

　　obj.c = obj.d;

可以简写成

　　with(obj) {
　　　　a = b;
　　　　c = d;
　　}

但是，在实际运行时，解释器会首先判断obj.b和obj.d是否存在，如果不存在的话，再判断全局变量b和d是否存在。这样就导致了低效率，而且可能会导致意外，因此最好不要使用with语句。

## **3. eval**

eval用来直接执行一个字符串。这条语句也是不应该使用的，因为它有性能和安全性的问题，并且使得代码更难阅读。

eval能够做到的事情，不用它也能做到。比如

　　eval("myValue = myObject." + myKey + ";");

可以直接写成

　　myValue = myObject[myKey];

至于ajax操作返回的json字符串，可以使用官方网站提供的解析器[json_parse.js](http://www.json.org/json_parse.js)运行。

## **4. continue**

这条命令的作用是返回到循环的头部，但是循环本来就会返回到头部。所以通过适当的构造，完全可以避免使用这条命令，使得效率得到改善。

## **5. switch 贯穿**

switch结构中的case语句，默认是顺序执行，除非遇到break，return和throw。有的程序员喜欢利用这个特点，比如

　　switch(n) {
　　　　case 1:
　　　　case 2:
　　　　　　break;
　　}

这样写容易出错，而且难以发现。因此建议避免switch贯穿，凡是有case的地方，一律加上break。

　　switch(n) {
　　　　case 1:
　　　　　　break;
　　　　case 2:
　　　　　　break;
　　}

## **6. 单行的块结构**

if、while、do和for，都是块结构语句，但是也可以接受单行命令。比如

　　if (ok) t = true;

甚至写成

　　if (ok)
　　　　t = true;

这样不利于阅读代码，而且将来添加语句时非常容易出错。建议不管是否只有一行命令，都一律加上大括号。

　　if (ok){
　　　　t = true;
　　}

## **7. ++和--**

递增运算符++和递减运算符--，直接来自C语言，表面上可以让代码变得很紧凑，但是实际上会让代码看上去更复杂和更晦涩。因此为了代码的整洁性和易读性，不用为好。

## **8. 位运算符**

Javascript完全套用了Java的位运算符，包括按位与&、按位或|、按位异或^、按位非~、左移<<、带符号的右移>>和用0补足的右移>>>。

这套运算符针对的是整数，所以对Javascript完全无用，因为Javascript内部，所有数字都保存为双精度浮点数。如果使用它们的话，Javascript不得不将运算数先转为整数，然后再进行运算，这样就降低了速度。而且"按位与运算符"&同"逻辑与运算符"&&，很容易混淆。

## **9. function语句**

在Javascript中定义一个函数，有两种写法：

　　function foo() { }

和

　　var foo = function () { }

两种写法完全等价。但是在解析的时候，前一种写法会被解析器自动提升到代码的头部，因此违背了函数应该先定义后使用的要求，所以建议定义函数时，全部采用后一种写法。

## **10. 基本数据类型的包装对象**

Javascript的基本数据类型包括字符串、数字、布尔值，它们都有对应的包装对象String、Number和Boolean。所以，有人会这样定义相关值：

　　new String("Hello World");

　　new Number(2000);

　　new Boolean(false);

这样写完全没有必要，而且非常费解，因此建议不要使用。

另外，new Object和new Array也不建议使用，可以用{}和[]代替。

## **11. new语句**

Javascript是世界上第一个被大量使用的支持Lambda函数的语言，本质上属于与Lisp同类的函数式编程语言。但是当前世界，90%以上的程序员都是使用面向对象编程。为了靠近主流，Javascript做出了妥协，采纳了类的概念，允许根据类生成对象。

类是这样定义的：

　　var Cat = function (name) {
　　　　this.name = name;
　　　　this.saying = 'meow' ;
　　}

然后，再生成一个对象

　　var myCat = new Cat('mimi');

这种利用函数生成类、利用new生成对象的语法，其实非常奇怪，一点都不符合直觉。而且，使用的时候，很容易忘记加上new，就会变成执行函数，然后莫名其妙多出几个全局变量。所以，建议不要这样创建对象，而采用一种变通方法。

Douglas Crockford给出了一个函数：

　　Object.beget = function (o) {
　　　　var F = function (o) {};
　　　　F.prototype = o ;
　　　　return new F;
　　};

创建对象时就利用这个函数，对原型对象进行操作：

　　var Cat = {
　　　　name:'',
　　　　saying:'meow'
　　};

　　var myCat = Object.beget(Cat);

对象生成后，可以自行对相关属性进行赋值：

　　myCat.name = 'mimi';

## **12. void**

在大多数语言中，void都是一种类型，表示没有值。但是在Javascript中，void是一个运算符，接受一个运算数，并返回undefined。

　　void 0; // undefined

这个命令没什么用，而且很令人困惑，建议避免使用。

