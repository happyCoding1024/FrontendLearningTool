# 为Git仓库里的.idea文件夹正名

> 原文链接：https://blog.csdn.net/weixin_34186950/article/details/88013044 

在网络上，我曾多次看到人们对于Git仓库中的.idea文件夹的偏见。最近的一次是在某个博客中技术专家对于志愿者提交的项目的点评，其中在“项目规范”中有一条加分项为“没有 .idea 这种不该上传的文件夹”；另一次是在知乎评价某程序员的问题下某个回答的评论中，有人发现该程序员的GitHub仓库里有.idea目录，就居高临下的将其作为理由讽刺该程序员，潜台词即“项目里有.idea = 水平低下”。想当然的，我没看到的类似情况会更多，而这些观点又会影响很多不熟悉具体事实的人，我想我应该尽一份力来改变这个错误的观点继续蔓延。

提示 尽管本文的标题使用了Git，本文的内容同样适用于其他VCS（Version Control System，版本控制系统）。

## 什么是.idea文件夹

当你使用JetBrains出品的IDE（Integrated Development Enviroment，集成开发环境）时，比如PyCharm、WebStorm或IntelliJ IDEA等，它们会在创建项目后在项目根目录创建一个.idea文件夹，**其中保存了项目特定的配置文件**。

至于为什么命名为.idea，则是因为IntelliJ IDEA是JetBrains最早推出的IDE（JetBrains一开始叫IntelliJ），因此使用IDEA作为配置文件夹的名称。按照这个SO回答里[最高票答案](https://link.juejin.im/?target=https%3A%2F%2Fstackoverflow.com%2Fa%2F24180322%2F5511849)的猜测，或许IntelliJ IDEA这个名字的含义是这样组成的：

- Intelli ===> Intelligent
- J ===> Java
- Idea ===>IDE that is Advanced or Idea just means idea( I have a good idea ...like this ) ...

## 是否应该把.idea提交进Git仓库

这个问题没有唯一的答案，在Stack Overflow有很多类似的讨论。总的来说，开发者可以自由选择是否把IDE相关的配置文件（即.idea目录下的文件）提交到Git仓库中：

- 如果你想让其他使用相同IDE的用户可以更方便（规范）的对项目进行开发，那么就把它提交到Git仓库中。
- 如果你觉得Git仓库不应该包含和项目本身无关的文件，那么也可以不将它提交到Git仓库中。

## 正确的提交方法

当然，**将.idea目录整个提交到Git仓库的行为并不可取**。因为.idea目录下的文件中有包含隐私的内容，比如你的文件操作变动、用户词典、系统环境变量、数据库密码等等，这些文件对项目其他潜在的参与者没有用处，而且会泄露你的隐私。

按照[JetBrains官方的建议](https://link.juejin.im/?target=https%3A%2F%2Fintellij-support.jetbrains.com%2Fhc%2Fen-us%2Farticles%2F206544839)，在使用VCS时我们应该遵循下面的原则：

分享下面的文件：

- 除了workspace.xml、usage.statistics.xml和tasks.xml以外.idea目录下的所有文件
- 所有可以被在不同模块目录下定位到的.iml模块文件（适用于IntelliJ IDEA）

**谨慎**分享下面的文件**：**

- Android artifacts that produce a signed build，因为它们包含keystore密码（前半句不理解，暂时保留原文）
- 在IntelliJ IDEA 13 和之前的版本中的dataSources.ids和datasources.xml文件，它们包含数据库密码

**避免**分享下面的文件：

- 对于使用Gradle或Maven的项目，避免分享.iml和.idea/modules.xml文件，因为它们会在导入时生成
- gradle.xml文件
- 用户字典（dictionaries文件夹）
- .idea/libraries目录下的XML文件，因为它们会从Gradle或Maven项目中生成

另外，对于旧的项目格式（.ipr/.iml/.iws files）来说：

- 分享项目.ipr文件和所有的.iml模块文件，不要分享.iws文件，因为它存储用户特定设置。

对于Git，你可以参考[GitHub提供的JetBrains适用的.gitignore模板](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fgithub%2Fgitignore%2Fblob%2Fmaster%2FGlobal%2FJetBrains.gitignore)。

[我的还没上市的新书](https://link.juejin.im/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F29907260)中包含[多个Flask项目](https://link.juejin.im/?target=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F38342129)，这些项目中的.gitignore文件则是通过[gitignore.io](https://link.juejin.im/?target=https%3A%2F%2Fwww.gitignore.io%2F)来生成的。你可以在gitignore.io主页的输入框中输入你使用的操作系统、编程语言和IDE，它会快速为你来生成一份适用这些语言和平台的.gitignore规则，比如[这个](https://link.juejin.im/?target=https%3A%2F%2Fwww.gitignore.io%2Fapi%2Fpython%2Cpycharm)是输入Python+PyCharm生成的模板。你可以在这个模板的基础上添加自定义规则。

## 总结

如果你不想在Git仓库中提交IDE相关的配置文件，那么你可以忽略.idea文件夹；相反，你也可以有选择的把.idea目录下的文件提交进Git仓库。也就是说，**项目Git仓库中是否包含.idea文件夹与程序员的开发水平并没有直接关系。**