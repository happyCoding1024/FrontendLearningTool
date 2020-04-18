[TOC]

# 字符串的扩展

## 1. 字符的Unicode表示法

JavaScript允许采用 `\uxxxx` 形式表示一个字符，其中 `xxxx` 表示字符的 `Unicode` 码点。

```js
"\u0061" // 表示小写字母"a"
```

但是这种表示法只限于码点在 `\u0000-\uFFFF` 之间的字符，有些字符的 `Unicode` 编码超出了这个范围，那么就必须使用2个双字节的形式表示。

```js
"\uD842\uDFB7" // "𠮷" 注意不是吉祥的"吉"
"\u5409" // "吉" 这个才是吉祥的"吉"
```

在 `ES5` 中如果在 `\u` 后面超过 `oxFFFF` 的数值，如 `"\u0061我"` 输出结果为 `a我` 即 `"\u0061我"` 在 `JS` 引擎看来就是 `"\u0061+'我'"` 后面的通过字符串拼接拼接上。

`ES6` 对这一点做出了改进，只要将码点放入大括号，就能正确解读该字符。

例如 `\u20BB7` 表示的是 ``"𠮷"`` ,在 `ES5` 下 `"\u20BB7"` 被 `JS` 引擎解析成 `"7"` ，这是因为 `\u20BB` 是一个不可打印的字符，所以只会显示一个空格，后面拼接上一个 `7` .

在 `ES6` 中 `"\u{20BB7}"` 的解析结果为 `"𠮷"` .

## 2. codePointAt()

`JavaScript`内部，字符以 `UTF-16` 的格式存储，每个字符固定为2个字节(范围 `\u0000-\uFFFF`)，但是有些字符的码点是大于 `0xFFFF` 的，`JavaScript`会认为它是两个字符。

```js
var s1 = "你好";
var s2 = "𠮷";

s1.length // 2
s2.length // 2
```

这是因为 `𠮷` 的码点大于  `0xFFFF`，`JS` 引擎认为它是两个字符，即占四个字节。

```js
s2.charCodeAt(0) // 55362
s2.charCodeAt(0) // 57271
s2.codePointAt(0) // 134071=0X20BB7
s2.codePointAt(1) // 57271
```

可以看出 `charCodeAt` 方法一次只能返回两个字节的值，而 `codePointAt(0)` 可以返回四个字节的值，`codePointAt(1)` 与 `charCodeAt(1)` 返回的值相同。

```js
var s = "𠮷a";
s.codePointAt(0) // "13401" 对应"𠮷" 
s.codePointAt(2) // "61" 对应"a"
```

可以看到在传入 `2` 时才能得到第二个字符 `a` , 可以通过 `for...of` 循环来解决这个问题，因为它会正确识别32位的 `UTF-16` 字符。

```js
var s = "𠮷a";
for (let ch of s) {
    console.log(ch.codePointAt(0).toString(16));
}
// 20bb7
// 61
```

`codePointAt()` 方法还可以用来测试一个字符是2个字节还是4个字节。

```js
function is32Bit(c) {
    return c.codePointAt(0) > 0xFFFF;
}

is32Bit("𠮷"); // true
is32Bit("a"); // false
```

## 3. String.fromCodePoint()

`ES5` 提供了 `String.fromCharCode` 方法，用于从码点返回对应字符，但是这个方法不能识别32位的 `UTF-16` 字符(Unicode 编号大于 `0xFFFF`)。

```js
String.fromCharCode(0x20061); // 'a'  
```

`String.fromCharCode` 方法不能识别大于 `0xFFFF` 的码点，所以 `0x20BB7` 就发生了溢出，最高位2被舍弃，最后返回码点 `U+0061` 对应的字符 `a`。

`ES6` 提供了 `String.fromCodePoint` 方法，可以识别大于 `0xFFFF` 的字符，作用上与 `codePointAt` 方法正好相反。

```JS
String.fromCodePoint(0x78, 0x1f680, 0x79) ==== 'x\uD83D\UDE80y';
```

`String.fromCharCode` 方法如果有多个参数，那么它们就会拼接成一个字符串。

**注意： `fromCodePoint` 方法定义在 `String` 对象上，而 `codePointAt` 方法定义在字符串的实例对象上。**

## 4. 字符串的遍历器接 口

`ES6` 为字符串添加了遍历器接口，使得字符串可以由 `for...of` 循环遍历。

```js
for (let codePoint of 'foo') {
    console.log(codePoint);
}
// 'f'
// 'o'
// 'o'
```

前面已经提到过，利用 `for...of` 可以识别大于 `0xFFFF` 的码点，传统的 `for` 循环无法识别大于 `0xFFFF` 的码点。

```js
var text = String.fromCodePoint(0x20BB7);

for (let i = 0, length = text.length; i < length; i++) {
    console.log(text[i]);
}
// ''
// '' 输出两个不可打印的字符

for (let i of text) {
    console.log(i);
}
// '𠮷'
```

在上面的代码中 `0x20BB7` 只有一个字符，但是 `for` 循环认为它包含 `2` 个字符，而 `for...of` 循环会正确识别出这个字符。

## 5. at()(提案)

`ES5` 中为字符串对象提供了 `charAt` 方法，返回字符串给定位置的字符，该方法不能识别码点大于 `0xFFFF` 的字符。

```js
'abc'.charAt(0) // 'a'
'𠮷'.charAt(0) // '\uD842'，一个不可打印的字符
```

`charAt` 方法只能返回 `UTFF-16` 编码中的第一个字节，目前有一个提案提出字符串实例的 `at` 方法，可以识别 `Unicode` 编号大于 `0xFFFF` 的字符，返回正确的字符。

```js
'𠮷'.charAt(0) // '𠮷',可以正确返回
```

## 6. normalize()

许多欧洲语言有重音符号和语调符号，为了表示它们， `Unicode` 提供了两种方法：

1. 直接提供带重音符号的字符
2. 利用合成符号(原字符+重音符号)

但是合成符号在 `JS` 引擎看来实际上是两个字符，合成字符并不等于带重音符号的字符。

`normalize` 方法解决了这个问题，将字符的不同表示方法统一为同样的形式，这称为 `Unicode` 正规化。

不过 `nomalize` 方法目前不能识别三个或三个以上字符的合成，这种情况下还是只能利用正则表达式，通过 `Unicode` 编号区间判断。

## 7. includes(),startWith(),endsWith()

`ES5:` 

- `indexOf` 确定一个字符串是否包含在另一个字符串中。

`ES6:`

- `includes` 返回布尔值，表示是否找到了传入的参数字符串
- `startWith` 返回布尔值，表示参数字符串是否在源字符串的头部
- `endWith` 返回布尔值，表示参数字符串是否在源字符串的尾部

```js
var s = "hello JS";

s.includes("ell"); // true
s.startWith("h"); // true
s.endWith("S"); // true
```

这三个方法都支持第二个参数，表示开始搜索的位置。

```js
var s = "hello JS";

s.includes("JS", 6); // true, 从第个7个(从0开始)字符位置开始
s.startWith("JS", 6); // true, 从第7个(从0开始)字符位置开始
s.endWith("hello", 5); // false, 前5个字符(下标为0,1,2,3,4)  
```

## 8. repeat()

**功能：返回一个新字符串，将原字符串重复传入的参数次。**

```JS
'x'.repeat(2); // "xx"
```

如果传入的参数是小数，会被取整。

1. 大于0时想下取整

```js
'x'.repeat(2.9) // 'xx'
```

2. 大于-1小于0时等于0

```js
'x'.repeat(-0.9) // ''
```

3. 小于-1时报错

```js
'x'.repeat(-2) // RangeError
```

如果传入的参数不是数字，会先将其准换为数字。

```js
'x'.repeat('x'); // ''
'x'.repeat('2'); // 'xx'
```

## 9. padStart(),padEnd()(ES2017)

`ES2017` 引入了字符串补全长度的功能，如果某个字符串长度不够指定长度，会在头部或尾部补全。

- `padStart()` 用于头部补全
- `padEnd()` 用于尾部补全

上面两个方法都接收两个参数，第一个参数用来指定字符串的最小长度，第二个参数是用来补全的字符串。

```js
'x'.padStart(5, 'ab'); // 'ababx'
'x'.padEnd(5, 'ab'); // 'xabab'
```

如果原字符串的长度等于或大于指定的最小长度，则返回原字符串。

```js
'xxx'.padStart(2, 'ab'); // 'xxx'
'xxx'.padEnd(2, 'ab'); // 'xxx'
```

如果补全的字符串与原字符串的长度之和大于指定的最小长度，则会截去超出位数的补全字符串。

```js
'xxx'.padStart(5, '01234'); // '01xxx'
```

如果省略第二个参数，则会用空格来补全。

```js
'x'.padStart(4); // '    x'
```

**`padStart()` 的两种常用用途：**

1. 为数值补全位数

```js
'1'.padStart(10,'0'); // '0000000001'
```

2. 提示字符串格式

```js
'12'.padStart(10, 'YYYY-MM-DD'); // 'YY-MM-12'
```

## 10. 模板字符串

模板字符串是增强版的字符串，用反引号 `` ` 来标识，主要有以下三种用法。

1. 当作普通字符串

```js
`hello ES6`
```

2. 定义多行字符串

   所有的空格和缩进都会保留在输出中。

```JS
`

hello 
ES6

` 
// 所有的空格和换行都会被保留，输出结果： 
"

hello
ES6

"
```

​	`trim()` 方法可以消除模板字符串反引号 `` ` 和模板字符串内容之间的空格和换行。

​	注意：模板字符串中的字符串之间的空格和换行是不受影响的

```js
`
hello 
ES6
`.trim(); 
//输出结果： 
"
hello
ES6
"
```

​	用单引号或双引号定义的字符串是不能有换行符的，否则会报错。

```js
"
hello
ES6
"
// 输出结果：
//Uncaught SyntaxError: Invalid or unexpected token
```

3. 在字符串中嵌入变量

   在模板字符串中嵌入变量需要将变量名放在 `${}` 中, `{}` 中实际上可以是任意的 `JavaScript` 表达式，可以进行运算，引用对象属性等，如果大括号中的值不是字符串，则会按照一定的规则将其转换为字符串。

```JS
var name = 'zhangsan', age = 18;
`hello, my name is ${name}, I am ${age} years old`
// 输出结果：
hello, my name is zhangsan, I aam 18 years old 
```

## 11. 标签模板

模板字符串可以紧跟在一个函数名后面，这个函数将会被调用来处理这个模板字符串，这被称为“标签模板”功能。

```js
alert `123`
// 等同于
alert (123)
```

标签模板实际上不是模板，而是函数调用的一种特殊形式，“标签”指的就是函数，紧跟在它后面的模板字符串就是它的参数。

如果模板字符串中有变量，就不再是简单的调用了，而是将模板字符串先处理成多个参数，再调用函数。

```js
var a = 5;
var b = 10;

tag `hello ${ a + b } world ${ a * b }`;
// 等同于
tag(["hello ", " world ", ""], 15, 50);
```

`tag` 函数的第一个参数是一个数组，该数组的成员是模板字符串中那些没有变量替换的部分。

`tag` 函数所有参数的实际值如下：

- 第一个参数： `["hello ", " world ", ""]`
- 第二个参数： `15`
- 第三个参数： `50`

**标签模板的两个重要应用**

1. **过滤HTML字符串，防止用户输入恶意内容**

   ```JS
   function saferHTML(templateData) {
       var s = templateData[0]; // templateData=["<p>"," has sent you a message.</p>"]
       for (var i = 1; i < arguments.length; i++) {
           var arg = String(arguments[i]); // argument[1]="<script>alert('abc')</script>"
   
           s += arg.replace(/&/g, "&amp;")
               .replace(/</g, "&lt;")
               .replace(/>/g, "&gt");
   
           s += templateData[i];
       }
       return s;
   }
   
   var sender = "<script>alert('abc')</script>"; // 恶意代码
   var message = saferHTML`<p>${sender} has sent you a message.</p>`;
   
   输出结果：
   // <p>&lt;script&gtalert('abc')&lt;/script&gt has sent you a message.</p>
   ```

   我们一般要保证用户输入的内容中不能含有可执行的 `JS` 代码，这是为了防止那些黑客将这些代码植入到我们的程序中对我们的程序进行攻击。

   因此，我们要将 `script` 标签等一切可引入 `JS` 代码的方式都过滤掉，上面的程序中只考虑 `script` 标签可引入 `JS` 代码这一种方式。

2. **多语言转换**

   这里的语言不仅指中文，英文这种语言之间的转换，还指在 `JS` 中还可以运行其它的计算机语言。

   当然模板字符串本身并不具有这样的功能，这种功能的完成是依靠一些标签模板来完成的。

```js
i18n`Welcome to ${siteName}, you are visitor number ${visitorNumber}!`
// 输出结果：
// "欢迎访问xxx， 您是第xxx位访问者!"
```

`i18n` 函数可以将英文转换为中文。

```js
jsx`
	<div>
		<input 
			ref = 'input'
			onChange = '${this.handleChange}' 
			defaultValue = '${this.state.value}'
		/>
		${this.state.value}
	</div>
`
```

上面的代码是通过 `jsx` 函数将一个 `DOM` 字符串转换为 `React` 对象。

**模板处理函数的第一个参数(模板字符串数组)还有一个raw属性，raw属性中保存的是转义后的原字符串。**

```js
tag`First line\nSecond line`

function tag (string) {
    console.log(string.raw[0]);
}
// 输出结果：
// "First line \\nSecond line" 保存的是转义后的字符串
// 而string = "First line\nSecond line"
```

`string` 和 `string.raw` 唯一的区别就在于 `string.raw` 里面保存的是转义后的字符串。这是为了方便取得转义之前的原始模板而设计的。

## 12. String.raw()

`ES6` 为 **`String`** 对象提供了一个 `raw` 方法。

`String.raw()` 方法往往用来充当模板字符串的处理函数，返回一个连反斜线都会转义的字符串。

```js
String.raw`hello\n{2+3}`;
// "hello\\n5" 
```

`String.raw()` 方法也可以当作正常的函数使用，但是第一个参数必须是一个就有`raw` 属性的对象，并且 `raw` 属性的值必须是一个数组。

## 13. 模板字符串的限制

一句话总结就是模板字符串会将字符串进行转义，比如

```js
function latex {
    ...
}
    
let document = latex`
\newcommand{\unicode}{\textbf{Unicode!}}` // 报错
```

这是因为 `\u` 在 `LaTex` 中具有特殊的含义，但是 `JS` 将它们进行了转义。

为了解决这个问题，有个提案提出放松对标签模板里字符串转义的限制，如遇到不合法的字符串转义，就返回 `undefined` ,而不是报错。