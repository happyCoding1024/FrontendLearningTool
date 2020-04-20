# webstorm中配置Eslint的两种方式及差异比较详解

这篇文章主要介绍了webstorm中配置Eslint的两种方式及差异比较详解，小编觉得挺不错的，现在分享给大家，也给大家做个参考。一起跟随小编过来看看吧

**写在前面**

这两种方式的配置基本相同，都是配一下node地址，Eslint执行文件的地址，Eslint的配置文件（就是.eslintrc）等，而且网上很方便就可以搜索到，就不多说了。

之所以要比较一下两者的差异，就是因为对于没有配置过的同学来说，看了诸如“怎么在webstorm下配置Eslint”的问题下面的回答，既有说用方式1，又有说方式2的，然后这两种方式配置项还差不多（都是在webstorm的一个setting页面里面设置三四个项目，然后勾上enable复选框），就容易混淆。

再加上笔者自身在使用的时候，也是在一番摸索，比较差异之后，才选定了适合自己的那一种方式。特留下此文，以示记录。

**方式一：webstorm自带Eslint**

两种方式配置都很简单，就都简单说了。

用webstorm自带Eslint这种方式的话，只需要打开setting，找到eslint设置页面，填完几个项目，勾选enable复选框就行了。

![img](https://files.jb51.net/file_images/article/201810/2018101911324432.png)

**方式二：使用插件Eslint**

这种方式呢，分两步，第一步：需要先到plugin插件库，找到eslint插件，点击install。如下图：

![img](https://files.jb51.net/file_images/article/201810/2018101911324433.png)

第二步：插件安装完成后，去setting页面，搜索eslint，这时你会发现，除了方式一那个eslint设置页面外，还多了一个设置页面，在setting对话框最下面的菜单。里面的设置项和方式一差不多。

**差异比较**

**差异1：使用方式。**

自带的使用方式是在左侧项目目录列表上，选中某个你想eslint自动修复的文件夹或文件，右键，会出现fix eslint problems菜单。如下图。

![img](https://files.jb51.net/file_images/article/201810/2018101911324434.png)

当然你也可以在右侧，代码编辑区域，选中某个要自动修复eslint监测出来有bug的文件，右键，点击fix eslint problems菜单。如下图。

![img](https://files.jb51.net/file_images/article/201810/2018101911324435.png)

这是第一种，webstorm自带eslint方式的使用。

下面说第二种，用了第三方插件eslint的使用。

第二种配置好以后，会在webstorm的code菜单多一个子菜单，叫做：Eslint Fix。下面两张图，一个是用第二种方式配置前，一个是用第二种方式配置后。可以发现code菜单多出来的子菜单。

![img](https://files.jb51.net/file_images/article/201810/2018101911324436.png)

![img](https://files.jb51.net/file_images/article/201810/2018101911324437.png)

这两种配置方案在使用方案上的差别，看起来相似，实则不同，第二种方式在code菜单下选eslint Fix 子菜单会把你整个webstorm当前加载的所有项目，检测出来不符合你在setting里面设置的那个.eslintrc的文件都自动修复了。而webstorm自带的，则可以自由选择想修复哪个目录。因此，第一种方式在修复哪些文件这件事上的定制化对我们比较友好。

当然了，第二种配置方案的自动修复方式的最大问题在于，一旦你点了code菜单下eslint Fix 子菜单，所有webstorm下项目自动修复，会带来很多问题，因为很多时候你只是想给webstorm下的某个项目设置eslint功能。

**差异2：对vue文件是否检测上**

方式一直接支持检测出vue文件中的不合eslint规则的代码区域，并且用红色波浪线标识，而第二种方式在不多加配置的情况下，不支持检测出vue文件的代码不合.eslintrc规则的代码区域。

下图是第一种方式，在一个空行，打了几个空格，就显示了红色波浪线，说不符合规则，然后右击文件，选择fix eslint problems子菜单，就能把红色波浪线去除。

![img](https://files.jb51.net/file_images/article/201810/2018101911324438.png)

**最后**

目前没找到可以只对webstorm单个项目起作用的配置项。这两种方式，都会对webstorm加载出来的所有项目适用。这用起来就有点不爽了，因为毕竟不是所有项目都需要eslint的。