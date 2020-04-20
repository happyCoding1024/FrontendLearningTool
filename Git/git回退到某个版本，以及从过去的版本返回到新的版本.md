## Git 版本前后切换

### 主要内容：

> 1） HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令git reset --hard commit_id。
> 2）用git log可以查看提交历史，可以查询到我们要返回版本的ID。
> 3）版本回退之后，需要再次回到会退前，可以用git reflog查看命令历史，可以查看到每次命令的记录，里面会有我们需要的版本ID。

假设在工作中，你将辛辛苦苦写了一半的代码改乱了，想要回到这次修改之前，而不至于所有的劳动功亏一篑，这时候我们该怎么做呢

例如：我们已经有一个将 text 这个项目提交到Git 仓库了，并且已经有了多次的提交

> 第一次提交：add index.html (首页布局已完成)
> 第二次提交： add 1.txt
> 第三次提交： change 1.txt

这时候，修改 text1.txt 之后，我觉得之前的版本好像更合适一些，需要回退到之前的版本
我只需要用到 **git reset** 就可以做到的



#### 情景一： 明确知道我们要回退到第几个版本

打开相应的Git 命令行，在Git中，用HEAD表示当前版本，所以回退到上一个版本就只需要使用命令：

```bash
git reset --hard HEAD^ 
```

如果是上上一个版本的话，只需要使用命令：  

`git reset --hard HEAD^^`
要是需要回退到20个版本之前的话，就可以使用命令：

 `git reset --hard HEAD~20`



### 情景二：已经不记得是第几个版本了

有时候，提交的东西多了，或者是一段时间后，再来继续这个项目，可能早就不记得到底是第几个版本了，这时候，我们可以使用命令：**git log** 来查看每次的更改记录

> $ git log
> commit 580361e6bf5ce744c0ca4a2295e97bc42f5a6c36 (HEAD -> master)
> Author: leyale [mogu163@yeah.net](mailto:mogu163@yeah.net)
> Date: Sat Dec 1 11:44:08 2018 +0800
> chgange 1.txt

> commit 5a73f7b0689653dafddf5a37c1b3dde5b19f144e
> Author: leyale [mogu163@yeah.net](mailto:mogu163@yeah.net)
> Date: Sat Dec 1 11:43:28 2018 +0800
> add 1.txt

> commit 52602b0b04b57b33310fa256707518b126d2648c
> Author: leyale [mogu163@yeah.net](mailto:mogu163@yeah.net)
> Date: Sat Dec 1 11:42:12 2018 +0800
> add index.html

从上面我们可以看到相关的提交日志，一共是3次修改，在Data中我们可以看到每次提交的具体时间，Data后面是我们每次提交的时候，所填写的提交备注，这样就可以知道自己需要回退到哪个版本了，另外值得注意的是commit 后面的一串字符，这个是我们的提交ID，每个人的都是不一样的，在这个时候，我们回退就可以直接借助这个ID来回退了
ID回退命令： `$ git reset --hard 52602b0b04b57b33310fa256707518b126d2648c`
执行后返回：`HEAD is now at 52602b0 add index.html`

这时候，我们回到了第一次提交，也就是说，text 中就只有第一次提交的index.html这一个文件了



### 情景三：回退到某一个文件之后，又需要返回到最近更新的某个版本

原命令行窗口还未关闭： 直接往上查看一下要回到的那个版本的ID，然后执行命令：
**$ git reset --hard 580361e6bf5ce744c0ca4a2295e97bc42f5a6c36**

已经关闭：
可以借助命令： **$ git reflog** 来**查看每一次命令的记录**![在这里插入图片描述](https://img-blog.csdnimg.cn/20181201151257345.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MzQxMDQxOQ==,size_16,color_FFFFFF,t_70)

查看到之后，我们再利用 git reset 来返回到相应的版本即可，HEAD前面的一串字符为我们简写的ID
命令： `$ git reset --hard 580361e`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20181201151601813.png)

大功告成，这时候再次查看你的text 文件夹，里面的以及修改过的 1.txt 已经回来啦.                      